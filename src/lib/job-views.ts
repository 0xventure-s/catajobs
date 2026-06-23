const MIN_INITIAL_JOB_VIEWS = 10;
const INITIAL_JOB_VIEW_RANGE = 20;

export function getInitialJobViews() {
  return (
    MIN_INITIAL_JOB_VIEWS + Math.floor(Math.random() * INITIAL_JOB_VIEW_RANGE)
  );
}

export function getFallbackJobViews(seed: string | number) {
  const input = String(seed);
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return MIN_INITIAL_JOB_VIEWS + (hash % INITIAL_JOB_VIEW_RANGE);
}
