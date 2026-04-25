import { Buffer } from "node:buffer"; // 용도 Markdown 내용을 GitHub API용 Base64 문자열로 변환

const GITHUB_API_BASE_URL = "https://api.github.com";
const POSTS_DIRECTORY = "src/content/posts";
const MARKDOWN_EXTENSION = ".md";

type CommitPostParams = {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} 환경변수가 설정되지 않았습니다.`);
  }

  return value;
}

function getOptionalEnv(name: string) {
  return process.env[name];
}

function encodeBase64(content: string) {
  return Buffer.from(content, "utf-8").toString("base64");
}

function encodeGithubFilePath(filePath: string) {
  return filePath.split("/").map(encodeURIComponent).join("/");
}

function createTodayText() {
  return new Date().toISOString().slice(0, 10);
}

function escapeFrontmatterValue(value: string) {
  return value.replace(/"/g, '\\"').trim();
}

function createMarkdownContent(params: CommitPostParams) {
  const createdAt = createTodayText();

  return `---
title: "${escapeFrontmatterValue(params.title)}"
description: "${escapeFrontmatterValue(params.description)}"
category: "${escapeFrontmatterValue(params.category)}"
createdAt: "${createdAt}"
---

${params.content}
`;
}

function createGithubFilePath(slug: string) {
  return `${POSTS_DIRECTORY}/${slug}${MARKDOWN_EXTENSION}`;
}

function createGithubFileUrl(owner: string, repo: string, filePath: string) {
  const encodedFilePath = encodeGithubFilePath(filePath);

  return `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${encodedFilePath}`;
}

function createGithubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

async function getExistingFileSha(fileUrl: string, token: string) {
  const response = await fetch(fileUrl, {
    method: "GET",
    headers: createGithubHeaders(token),
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`기존 게시글 조회 실패: ${errorText}`);
  }

  const data = await response.json();

  return data.sha as string;
}

async function requestGithubCommit(params: CommitPostParams) {
  const token = getRequiredEnv("GITHUB_TOKEN");
  const owner = getRequiredEnv("GITHUB_OWNER");
  const repo = getRequiredEnv("GITHUB_REPO");
  const branch = process.env.GITHUB_BRANCH || "main";

  const filePath = createGithubFilePath(params.slug);
  const fileUrl = createGithubFileUrl(owner, repo, filePath);
  const markdownContent = createMarkdownContent(params);
  const existingSha = await getExistingFileSha(fileUrl, token);

  const response = await fetch(fileUrl, {
    method: "PUT",
    headers: createGithubHeaders(token),
    body: JSON.stringify({
      message: `post: ${params.title}`,
      content: encodeBase64(markdownContent),
      branch,
      sha: existingSha,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub 게시글 저장 실패: ${errorText}`);
  }

  return response.json();
}

async function triggerVercelDeploy() {
  const deployHookUrl = getOptionalEnv("VERCEL_DEPLOY_HOOK_URL");

  if (!deployHookUrl) {
    return {
      triggered: false,
      message: "VERCEL_DEPLOY_HOOK_URL이 없어 자동 배포는 건너뛰었습니다.",
    };
  }

  const response = await fetch(deployHookUrl, {
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Vercel 자동 배포 요청 실패: ${errorText}`);
  }

  return {
    triggered: true,
    message: "Vercel 자동 배포가 요청되었습니다.",
  };
}

export async function commitPostToGithub(params: CommitPostParams) {
  const commitResult = await requestGithubCommit(params);
  const deployResult = await triggerVercelDeploy();

  return {
    commitResult,
    deployResult,
  };
}