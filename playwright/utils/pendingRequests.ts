import { Page } from '@playwright/test';

/**
 * Счётчик незавершённых запросов страницы — замена `waitForLoadState('networkidle')`.
 *
 * `networkidle` ждёт 500ms тишины в сети и потому не возвращается быстрее полусекунды даже
 * когда грузить нечего. Счётчик отдаёт управление сразу, как только in-flight запросов не
 * осталось, и ждёт, пока они есть.
 */
const trackers = new WeakMap<Page, { inflight: number }>();

/** Вешает счётчик на page. Вызывается один раз при создании page (auto-фикстура). */
export function trackPendingRequests(page: Page): void {
  if (trackers.has(page)) return;

  const state = { inflight: 0 };
  trackers.set(page, state);

  page.on('request', () => {
    state.inflight += 1;
  });
  page.on('requestfinished', () => {
    state.inflight -= 1;
  });
  page.on('requestfailed', () => {
    state.inflight -= 1;
  });
}

/**
 * Ждёт, пока не останется незавершённых запросов. `timeout` — тот же потолок, что был у
 * `networkidle`: страница может держать долгоживущее соединение (HMR-WebSocket dev-Storybook,
 * EventSource), и ждать его бесконечно нельзя.
 */
export async function waitForPendingRequests(page: Page, timeout = 5000): Promise<void> {
  const state = trackers.get(page);

  if (!state) {
    // Вызов в обход фикстур (helpers, не-test код): счётчик не навешен.
    await page.waitForLoadState('networkidle', { timeout }).catch(() => {});
    return;
  }

  const deadline = Date.now() + timeout;
  while (state.inflight > 0 && Date.now() < deadline) {
    await new Promise<void>(resolve => {
      setTimeout(resolve, 20);
    });
  }
}
