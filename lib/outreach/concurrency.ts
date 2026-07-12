/**
 * Runs `fn` over `items` with at most `limit` in flight at once. Plain
 * sequential awaits over ~60-100 network fetches would blow the cron's
 * time budget; unbounded Promise.all risks hammering target sites/rate
 * limits. This keeps a fixed-size worker pool pulling from a shared cursor.
 */
export async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;

  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await fn(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
