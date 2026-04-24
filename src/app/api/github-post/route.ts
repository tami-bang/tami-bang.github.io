import { NextRequest, NextResponse } from "next/server"; // 용도 API 요청/응답 처리
import { commitPostToGithub } from "@/lib/github"; // 용도 GitHub 게시글 커밋 처리

type CreatePostRequestBody = {
  title?: string;
  description?: string;
  category?: string;
  content?: string;
  password?: string;
};

function createSlug(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (slug.length > 0) {
    return slug;
  }

  return `post-${Date.now()}`;
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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreatePostRequestBody;

    validatePassword(body.password);
    validatePostInput(body);

    const title = body.title!.trim();
    const slug = createSlug(title);

    await commitPostToGithub({
      slug,
      title,
      description: body.description!.trim(),
      category: body.category!.trim(),
      content: body.content!.trim(),
    });

    return NextResponse.json({
      success: true,
      slug,
      message: "게시글이 GitHub에 저장되었습니다.",
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
      }
    );
  }
}