/**
 * Exercise 1 — Error-handling approaches and boundaries
 *
 * In this file you will:
 * - implement one EAFP + exceptions example at a boundary
 * - implement one LBYL example plus an assert-based precondition
 * - implement one errors-as-values example using a Result type
 *
 * Goal:
 * Compare how different error-handling approaches affect control flow,
 * clarity, and what the caller is forced to do.
 *
 * This exercise intentionally avoids the exact lecture examples.
 * Instead, it uses a small “load a save slot / autosave” scenario.
 */

class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message);
  }
}

class ParseSlotError extends Error {}
class QuitError extends Error {}
class MissingSaveError extends Error {}

type SaveSlot = 1 | 2;

function parseSaveSlotOrThrow(raw: string): SaveSlot {
  const trimmed = raw.trim().toLowerCase();
  if (trimmed === "q") {
    throw new QuitError("User chose to quit");
  }
  if (trimmed === "1") {
    return 1;
  }
  if (trimmed === "2") {
    return 2;
  }
  throw new ParseSlotError("Expected 1, 2, or q.");
}

function loadSaveSlotOrThrow(slot: SaveSlot): string {
  if (slot === 2) {
    throw new MissingSaveError("slot 2 is empty");
  }
  return `Loaded save slot ${slot}`;
}

// TODO:
// Use EAFP style here.
// - parse and load inside a try block
// - catch ParseSlotError => "Invalid input: <message>"
// - catch QuitError => "Thanks for playing!"
// - catch MissingSaveError => "Cannot load save: <message>"
// - re-throw anything else
function runLoadSaveEAFP(raw: string): string {
  return "TODO";
}

// TODO:
// LBYL style wrapper.
// - If index is out of range, return "Index out of range"
// - Otherwise return "Favorite: <save name>"
function previewFavoriteSaveLBYL(saves: readonly string[], index: number): string {
  return "TODO";
}

// TODO:
// Undefined behavior / precondition with assert:
// assert that index is in range before reading.
function readFavoriteSaveRequiresIndex(saves: readonly string[], index: number): string {
  return saves[index];
}

type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// TODO:
// Errors as values:
// return Ok(store[key]) if the autosave exists,
// otherwise return Err("Autosave not found").
function loadAutosaveResult(
  store: Record<string, string>,
  key: string,
): Result<string, string> {
  return Err("TODO");
}

console.log("eafp good:", runLoadSaveEAFP("1"));
console.log("eafp parse error:", runLoadSaveEAFP("banana"));
console.log("eafp missing save:", runLoadSaveEAFP("2"));
console.log("eafp quit:", runLoadSaveEAFP("q"));

console.log("lbyl ok:", previewFavoriteSaveLBYL(["autosave", "backup"], 0));
console.log("lbyl bad:", previewFavoriteSaveLBYL(["autosave", "backup"], 3));

console.log("assert ok:", readFavoriteSaveRequiresIndex(["autosave", "backup"], 1));
let assertCaught = false;
try {
  readFavoriteSaveRequiresIndex(["autosave", "backup"], 99);
} catch (error) {
  assertCaught = error instanceof Error && error.name === "AssertionError";
}
console.log("assert caught:", assertCaught);

const resultOk = loadAutosaveResult({ latest: "SAVE_DATA" }, "latest");
console.log("result ok:", resultOk.ok ? resultOk.value : resultOk.error);

const resultErr = loadAutosaveResult({ latest: "SAVE_DATA" }, "missing");
console.log("result error:", resultErr.ok ? resultErr.value : resultErr.error);
