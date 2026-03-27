/**
 * Exercise 1 — Error handling approaches
 *
 * In this file you will compare three small approaches:
 * - 1A: EAFP + exceptions
 * - 1B: LBYL + preconditions / assert
 * - 1C: errors as values
 */

type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// ---------- Example ----------
function exampleLoadName(raw: string | null): string {
  if (raw === null) {
    throw new Error("Missing name");
  }
  return raw.trim();
}

try {
  console.log("example:", exampleLoadName(" Ada "));
} catch {
  console.log("example failed");
}

// ---------- 1A: EAFP + exceptions ----------
export function loadSaveSlotName(slotNames: string[], index: number): string {
  // TODO:
  // Redesign this so it follows EAFP with exceptions.
  // This version currently uses a placeholder implementation.
  if (index < 0 || index >= slotNames.length) {
    return "INVALID";
  }
  return slotNames[index];
}

let ex1a = "";
try {
  ex1a = loadSaveSlotName(["autosave", "manual-1"], 1);
} catch {
  ex1a = "caught";
}

// ---------- 1B: LBYL + assert / preconditions ----------
export function saveToExistingSlot(slotNames: string[], index: number): string {
  // TODO:
  // Treat an invalid index as a precondition violation.
  // This exercise is about LBYL / assert style reasoning.
  return slotNames[index] ?? "INVALID";
}

const ex1b = saveToExistingSlot(["autosave", "manual-1"], 0);

// ---------- 1C: errors as values ----------
export function tryLoadSaveSlotName(
  slotNames: string[],
  index: number,
): Result<string, string> {
  // TODO:
  // Return Ok(...) or Err(...) instead of throwing.
  return Ok(slotNames[index] ?? "INVALID");
}

const ex1c = tryLoadSaveSlotName(["autosave"], 5);

console.log("1A result:", ex1a);
console.log("1B result:", ex1b);
console.log("1C ok:", ex1c.ok);
console.log("1C detail:", ex1c.ok ? ex1c.value : ex1c.error);
