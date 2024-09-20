export function changeUpperCase(word) {
  return word.replace(/\b\w/g, (match) => match.toUpperCase());
}
