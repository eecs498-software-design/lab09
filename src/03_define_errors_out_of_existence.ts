/**
 * Exercise 3 — Define Errors Out of Existence
 *
 * In this exercise you will redesign functions so that they do NOT throw errors,
 * but instead eliminate the need for those errors through better design.
 *
 * Key idea:
 * If a function can reasonably handle a situation, it should do so instead of
 * forcing the caller to handle it.
 */

// -------- Example --------
function exampleNormalizeName(name: string | null): string {
  return (name ?? "").trim();
}

console.log("example:", exampleNormalizeName(null));

// -------- Exercise 3A --------
export function removeLast<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Cannot remove from empty array");
  }
  return arr.pop()!;
}

// TODO:
// Redesign removeLast so it does NOT throw.
// Think: what should happen if the array is empty?

// -------- Exercise 3B --------
export function getFirstChar(str: string): string {
  if (str.length === 0) {
    throw new Error("Empty string");
  }
  return str[0];
}

// TODO:
// Redesign getFirstChar so it does NOT throw.

// -------- Exercise 3C (slightly harder) --------
export function getPage<T>(items: T[], page: number, pageSize: number): T[] {
  if (page < 0) {
    throw new Error("Page cannot be negative");
  }
  if (pageSize <= 0) {
    throw new Error("Page size must be positive");
  }

  const start = page * pageSize;
  if (start >= items.length) {
    throw new Error("Page out of range");
  }

  return items.slice(start, start + pageSize);
}

// TODO:
// Redesign getPage so it does NOT throw.
// Consider:
// - negative page
// - non-positive page size
// - page beyond the end
// What is a reasonable behavior that keeps the API simple?

const arr: number[] = [];
console.log("removeLast result:", removeLast(arr));
console.log("first char:", getFirstChar(""));
console.log("page result:", JSON.stringify(getPage([10, 20, 30], 5, 2)));
