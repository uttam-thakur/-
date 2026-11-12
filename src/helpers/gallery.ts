export function wrapIndex(index: number, count: number) {
  return count > 0 ? ((index % count) + count) % count : 0;
}
export function galleryOffset(index: number, active: number, count: number) {
  const offset = wrapIndex(index - active, count);
  return offset > Math.floor(count / 2) ? offset - count : offset;
}
