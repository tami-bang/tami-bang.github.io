"use client";

import { PointerEvent, useRef } from "react"; // 용도 마우스 좌표 추적 및 DOM 참조 관리

const POINTER_CENTER_VALUE = "0";

function getPointerRatio(
  pointerPosition: number,
  elementPosition: number,
  elementSize: number,
) {
  return ((pointerPosition - elementPosition) / elementSize - 0.5).toFixed(3);
}

function resetPointerPosition(element: HTMLDivElement) {
  element.style.setProperty("--pointer-x", POINTER_CENTER_VALUE);
  element.style.setProperty("--pointer-y", POINTER_CENTER_VALUE);
}

function updatePointerPosition(
  event: PointerEvent<HTMLDivElement>,
  element: HTMLDivElement,
) {
  const elementRect = element.getBoundingClientRect();

  const pointerX = getPointerRatio(
    event.clientX,
    elementRect.left,
    elementRect.width,
  );

  const pointerY = getPointerRatio(
    event.clientY,
    elementRect.top,
    elementRect.height,
  );

  element.style.setProperty("--pointer-x", pointerX);
  element.style.setProperty("--pointer-y", pointerY);
}

export default function HeroObjectScene() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!sceneRef.current) {
      return;
    }

    updatePointerPosition(event, sceneRef.current);
  }

  function handlePointerLeave() {
    if (!sceneRef.current) {
      return;
    }

    resetPointerPosition(sceneRef.current);
  }

  return (
    <div
      ref={sceneRef}
      className="hero-object-scene"
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <img
        src="/images/3d_obj1.png"
        alt=""
        className="hero-object-depth"
        draggable={false}
      />

      <img
        src="/images/hero-main.png"
        alt=""
        className="hero-object-main"
        draggable={false}
      />
    </div>
  );
}
