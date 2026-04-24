const GITHUB_API_BASE_URL = "https://api.github.com";

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

function encodeBase64(content: string) {
  return Buffer.from(content, "utf-8").toString("base64");
}

function createMarkdownContent(params: CommitPostParams) {
  const createdAt = new Date().toISOString().slice(0, 10);

  return `---
title: "${params.title}"
description: "${params.description}"
category: "${params.category}"
createdAt: "${createdAt}"
---

${params.content}
`;
}

async function getExistingFileSha(fileUrl: string, token: string) {
  const response = await fetch(fileUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error("기존 게시글 조회 중 오류가 발생했습니다.");
  }

  const data = await response.json();

  return data.sha as string;
}

export async function commitPostToGithub(params: CommitPostParams) {
  const token = getRequiredEnv("GITHUB_TOKEN");
  const owner = getRequiredEnv("GITHUB_OWNER");
  const repo = getRequiredEnv("GITHUB_REPO");
  const branch = process.env.GITHUB_BRANCH || "main";

  const filePath = `src/content/posts/${params.slug}.md`;
  const fileUrl = `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}/contents/${filePath}`;
  const markdownContent = createMarkdownContent(params);
  const existingSha = await getExistingFileSha(fileUrl, token);

  const response = await fetch(fileUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `post: ${params.title}`,
      content: encodeBase64(markdownContent),
      branch,
      sha: existingSha,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}