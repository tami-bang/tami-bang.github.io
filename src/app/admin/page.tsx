"use client";

import { FormEvent, useState } from "react"; // 용도 폼 제출 이벤트와 화면 상태 관리
import { studyCategories } from "@/lib/site"; // 용도 게시글 카테고리 선택 데이터 조회

type SaveStatus = "idle" | "saving" | "success" | "error";

type ApiResponse = {
  success: boolean;
  slug?: string;
  deployTriggered?: boolean;
  message?: string;
};

const DEFAULT_CATEGORY = "Backend/API";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [message, setMessage] = useState("");

  function validateForm() {
    if (!password.trim()) return "관리자 비밀번호를 입력하세요.";
    if (!title.trim()) return "제목을 입력하세요.";
    if (!description.trim()) return "요약 설명을 입력하세요.";
    if (!category.trim()) return "카테고리를 선택하세요.";
    if (!content.trim()) return "본문을 입력하세요.";

    return "";
  }

  async function requestSavePost() {
    const response = await fetch("/api/github-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        content,
        password,
      }),
    });

    const data = (await response.json()) as ApiResponse;

    if (!response.ok) {
      throw new Error(data.message || "저장에 실패했습니다.");
    }

    return data;
  }

  function resetEditor() {
    setTitle("");
    setDescription("");
    setCategory(DEFAULT_CATEGORY);
    setContent("");
  }

  function createSuccessMessage(data: ApiResponse) {
    const postUrl = `/blog/${data.slug}`;

    if (data.deployTriggered) {
      return `GitHub 저장 완료. Vercel 자동 배포가 시작되었습니다. 생성된 글 주소: ${postUrl}`;
    }

    return `GitHub 저장 완료. 로컬에서는 git pull 후 확인하세요. 생성된 글 주소: ${postUrl}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setStatus("error");
      setMessage(validationMessage);
      return;
    }

    try {
      setStatus("saving");
      setMessage("GitHub에 게시글을 저장하고 있습니다.");

      const data = await requestSavePost();

      setStatus("success");
      setMessage(createSuccessMessage(data));
      resetEditor();
    } catch (error) {
      setStatus("error");
      setMessage(getErrorMessage(error));
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-hero page-section--reveal">
        <p className="section-eyebrow admin-eyebrow">Admin Editor</p>

        <h1>공부 기록 작성</h1>

        <p>
          이 화면에서 작성한 글은 GitHub 저장소의 Markdown 파일로 커밋되고,
          Vercel 자동 배포로 웹에 반영됩니다.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="admin-form page-section--reveal-delayed"
      >
        <label className="admin-field">
          <span>관리자 비밀번호</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="ADMIN_WRITE_PASSWORD 값 입력"
          />
        </label>

        <label className="admin-field">
          <span>제목</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: API는 프론트와 백엔드를 어떻게 연결할까?"
          />
        </label>

        <label className="admin-field">
          <span>요약 설명</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="목록 카드에 보일 짧은 설명"
          />
        </label>

        <label className="admin-field">
          <span>카테고리</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {studyCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="admin-field">
          <span>본문</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="# 제목&#10;&#10;공부한 내용을 Markdown 형식으로 작성하세요."
          />
        </label>

        <button
          type="submit"
          disabled={status === "saving"}
          className="admin-submit-button"
        >
          {status === "saving" ? "저장 중..." : "GitHub에 저장"}
        </button>

        {message && (
          <p className={`admin-message admin-message--${status}`}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
}