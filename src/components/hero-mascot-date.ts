export const HERO_MASCOTS = ["star", "cat", "jelly", "cloud"] as const;

const DAY_MS = 86_400_000;
const FIRST_DAY = Date.UTC(2026, 8, 27) / DAY_MS;

// 로컬 달력 날짜만 UTC 숫자로 바꿔 DST의 23/25시간 날짜에도 순서를 유지합니다.
export function getLocalDayNumber(date = new Date()) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS;
}

export function getMascotForDay(day: number) {
  const index =
    (((day - FIRST_DAY) % HERO_MASCOTS.length) + HERO_MASCOTS.length) %
    HERO_MASCOTS.length;
  return HERO_MASCOTS[index];
}

export function millisecondsUntilNextDate(now = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return Math.max(100, next.getTime() - now.getTime() + 100);
}

export function subscribeToLocalDate(notify: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const update = () => {
    notify();
    clearTimeout(timer);
    timer = setTimeout(update, millisecondsUntilNextDate());
  };

  update();
  window.addEventListener("focus", update);
  document.addEventListener("visibilitychange", update);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", update);
    document.removeEventListener("visibilitychange", update);
  };
}
