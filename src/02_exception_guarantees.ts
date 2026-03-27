/**
 * Exercise 2 — Exception guarantees
 *
 * In this file you will inspect and strengthen methods so they provide
 * better exception-safety guarantees.
 *
 * Focus on:
 * - the basic guarantee
 * - the strong guarantee
 * - doing failure-prone work before mutating visible state
 */

class FragileBuilder {
  private _parts: string[];

  constructor(parts: string[]) {
    this._parts = [...parts];
  }

  toString(): string {
    return this._parts.join("|");
  }

  // ---------- Worked example ----------
  appendWithPossibleFailure(next: string, failAfterAppend: boolean): void {
    this._parts.push(next); // state changed first
    if (failAfterAppend) {
      throw new Error("failed after append");
    }
  }

  // ---------- Exercise 2A ----------
  popLastCopy(failWhileCopying: boolean): string[] {
    // TODO:
    // Current design mutates visible state too early.
    // Redesign so that failure does not leave this object half-updated.
    const removed = this._parts.pop();
    if (failWhileCopying) {
      throw new Error("copy failed");
    }
    return removed === undefined ? [] : [removed];
  }

  // ---------- Exercise 2B ----------
  assignFrom(other: FragileBuilder, failWhileCloning: boolean): void {
    // TODO:
    // Current design clears and rebuilds in place.
    // Strengthen its guarantee.
    this._parts = [];
    for (const part of other._parts) {
      if (failWhileCloning && part === "B") {
        throw new Error("clone failed");
      }
      this._parts.push(part);
    }
  }

  // ---------- Exercise 2C ----------
  prefixAll(prefix: string, failOn: string | null): void {
    // TODO:
    // Current design updates part-by-part.
    // Strengthen its guarantee.
    for (let i = 0; i < this._parts.length; ++i) {
      if (failOn !== null && this._parts[i] === failOn) {
        throw new Error("prefix failed");
      }
      this._parts[i] = prefix + this._parts[i];
    }
  }
}

const exA = new FragileBuilder(["A", "B", "C"]);
try {
  exA.popLastCopy(true);
} catch {}
console.log("2A state:", exA.toString());

const exB = new FragileBuilder(["old"]);
try {
  exB.assignFrom(new FragileBuilder(["A", "B", "C"]), true);
} catch {}
console.log("2B state:", exB.toString());

const exC = new FragileBuilder(["A", "B", "C"]);
try {
  exC.prefixAll("x-", "B");
} catch {}
console.log("2C state:", exC.toString());
