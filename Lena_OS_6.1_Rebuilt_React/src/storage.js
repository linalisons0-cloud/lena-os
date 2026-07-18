export function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
