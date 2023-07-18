export function extractString(
  input: string,
  {
    afterKeyword,
    beforeKeyword,
  }: { afterKeyword: string; beforeKeyword: string }
) {
  const splitAfter = input.split(afterKeyword).pop();
  if (!splitAfter) return '';
  const result = splitAfter.split(beforeKeyword).shift();
  return result || '';
}
