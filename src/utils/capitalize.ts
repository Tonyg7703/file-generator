export function capitalize(input?: string): string | undefined {
  return input
    ? input.replace(/\b\w/g, (char) => char.toUpperCase())
    : undefined;
}
