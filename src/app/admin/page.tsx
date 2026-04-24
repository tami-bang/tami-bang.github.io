"use client";

import { FormEvent, useState } from "react"; // 용도 폼 제출 이벤트와 화면 상태 관리
import { studyCategories } from "@/lib/site"; // 용도 게시글 카테고리 선택 데이터 조회

type SaveStatus = "idle" | "saving" | "success" | "error";

const DEFAULT_CATEGORY = "Backend/API";

type ApiResponse = {
  success: boolean;
  slug?: string;
  message?: string;
};

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
      setMessage("GitHub에 저장 중입니다.");

      const data = await requestSavePost();

      setStatus("success");
      setMessage(
        `GitHub 저장 완료. 생성된 글 주소: /blog/${data.slug}`
      );
      resetEditor();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

      setStatus("error");
      setMessage(errorMessage);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="mb-5 text-sm font-black uppercase tracking-[0.45em] text-pink-600">
        Admin Editor
      </p>

      <h1 className="text-fluid-title font-black tracking-tight text-slate-950">
        공부 기록 작성
      </h1>

      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        이 화면에서 작성한 글은 GitHub 저장소의 Markdown 파일로 커밋됩니다.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <label className="block">
          <span className="text-sm font-black text-slate-800">
            관리자 비밀번호
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="ADMIN_WRITE_PASSWORD 값 입력"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-slate-800">제목</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="예: API는 프론트와 백엔드를 어떻게 연결할까?"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-slate-800">요약 설명</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="목록 카드에 보일 짧은 설명"
          />
        </label>

        <label className="block">
          <span className="text-sm font-black text-slate-800">카테고리</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          >
            {studyCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-black text-slate-800">본문</span>
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="mt-2 min-h-[420px] w-full rounded-2xl border border-slate-300 px-4 py-3 leading-7 outline-none focus:border-indigo-500"
            placeholder="# 제목&#10;&#10;공부한 내용을 Markdown 형식으로 작성하세요."
          />
        </label>

        <button
          type="submit"
          disabled={status === "saving"}
          className="rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "saving" ? "저장 중..." : "GitHub에 저장"}
        </button>

        {message && (
          <p
            className={`rounded-2xl px-4 py-3 text-sm font-bold ${
              status === "error"
                ? "bg-red-50 text-red-600"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}