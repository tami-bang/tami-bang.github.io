import { NextRequest, NextResponse } from "next/server"; // 용도 API 요청/응답 처리
import { commitPostToGithub } from "@/lib/github"; // 용도 GitHub 게시글 커밋 및 Vercel 자동 배포 요청

type CreatePostRequestBody = {
  title?: string;
  description?: string;
  category?: string;
  content?: string;
  password?: string;
};

const FALLBACK_SLUG_PREFIX = "post";

function createDateText() {
  return new Date().toISOString().slice(0, 10);
}

function createSafeSlug(title: string) {
  const safeSlug = title
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^\w\sㄱ-ㅎㅏ-ㅣ가-힣-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/_+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (safeSlug.length > 0) {
    return safeSlug;
  }

  return `${FALLBACK_SLUG_PREFIX}-${createDateText()}`;
}

function validatePassword(password?: string) {
  const adminPassword = process.env.ADMIN_WRITE_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_WRITE_PASSWORD 환경변수가 설정되지 않았습니다.");
  }

  if (password !== adminPassword) {
    throw new Error("관리자 비밀번호가 올바르지 않습니다.");
  }
}

function validatePostInput(body: CreatePostRequestBody) {
  if (!body.title?.trim()) {
    throw new Error("제목을 입력해야 합니다.");
  }

  if (!body.description?.trim()) {
    throw new Error("설명을 입력해야 합니다.");
  }

  if (!body.category?.trim()) {
    throw new Error("카테고리를 입력해야 합니다.");
  }

  if (!body.content?.trim()) {
    throw new Error("내용을 입력해야 합니다.");
  }
}

function createSuccessMessage(deployTriggered: boolean) {
  if (deployTriggered) {
    return "게시글이 GitHub에 저장되었고 Vercel 자동 배포가 시작되었습니다.";
  }

  return "게시글이 GitHub에 저장되었습니다. VERCEL_DEPLOY_HOOK_URL이 없어 자동 배포는 건너뛰었습니다.";
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePostRequestBody;

    validatePassword(body.password);
    validatePostInput(body);

    const title = body.title!.trim();
    const slug = createSafeSlug(title);

    const result = await commitPostToGithub({
      slug,
      title,
      description: body.description!.trim(),
      category: body.category!.trim(),
      content: body.content!.trim(),
    });

    return NextResponse.json({
      success: true,
      slug,
      deployTriggered: result.deployResult.triggered,
      message: createSuccessMessage(result.deployResult.triggered),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 400,
      },
    );
  }
}