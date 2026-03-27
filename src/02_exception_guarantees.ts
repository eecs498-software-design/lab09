/**
 * Exercise 2 — Exception guarantees
 *
 * In this file you will:
 * - identify methods that only provide the basic guarantee or worse
 * - upgrade methods toward the strong guarantee
 * - use “do stuff that can fail first” and temp-then-commit
 *
 * Goal:
 * Preserve state and invariants when copying work can throw.
 */

class CopyError extends Error {}

function copyTokenOrThrow(token: string): string {
  if (token === "BOOM") {
    throw new CopyError("copy failed");
  }
  return `${token}`;
}

function copyWithPrefixOrThrow(prefix: string, token: string): string {
  return `${prefix}${copyTokenOrThrow(token)}`;
}

class TokenBuffer {
  private items: string[];
  private shadowSize: number;

  constructor(items: readonly string[]) {
    this.items = [...items];
    this.shadowSize = this.items.length;
  }

  snapshot(): string {
    return this.items.join(",");
  }

  invariantHolds(): boolean {
    return this.shadowSize === this.items.length;
  }

  // TODO:
  // Fix this to provide the strong guarantee.
  // Right now, if copying the last item throws, the item has already been removed.
  popLastCopy(): string {
    if (this.items.length === 0) {
      throw new Error("empty buffer");
    }
    const raw = this.items.pop()!;
    this.shadowSize = this.items.length;
    return copyTokenOrThrow(raw);
  }

  // TODO:
  // This is closer to an assignment operator.
  // Right now, a throw can leave this object partially rewritten
  // with shadowSize already set to the wrong value.
  // Upgrade it to provide the strong guarantee.
  assignFrom(rhs: TokenBuffer): void {
    if (this === rhs) {
      return;
    }
    this.items = [];
    this.shadowSize = rhs.items.length;
    for (const token of rhs.items) {
      this.items.push(copyTokenOrThrow(token));
    }
  }

  // TODO:
  // Right now, this mutates items in place.
  // If one copy throws midway through, the state is only partially rewritten.
  // Upgrade it to provide the strong guarantee.
  prefixAll(prefix: string): void {
    for (let i = 0; i < this.items.length; ++i) {
      this.items[i] = copyWithPrefixOrThrow(prefix, this.items[i]);
    }
    this.shadowSize = this.items.length;
  }
}

const popSuccess = new TokenBuffer(["A", "B", "C"]);
console.log("pop success value:", popSuccess.popLastCopy());
console.log("pop success state:", popSuccess.snapshot());
console.log("pop success invariant:", popSuccess.invariantHolds());

const popFailure = new TokenBuffer(["X", "BOOM"]);
try {
  popFailure.popLastCopy();
} catch (_error) {
  // expected
}
console.log("pop failure state:", popFailure.snapshot());
console.log("pop failure invariant:", popFailure.invariantHolds());

const assignSuccessDst = new TokenBuffer(["old"]);
assignSuccessDst.assignFrom(new TokenBuffer(["CUP", "PLATE"]));
console.log("assign success state:", assignSuccessDst.snapshot());
console.log("assign success invariant:", assignSuccessDst.invariantHolds());

const assignFailureDst = new TokenBuffer(["keep1", "keep2"]);
try {
  assignFailureDst.assignFrom(new TokenBuffer(["SAFE", "BOOM"]));
} catch (_error) {
  // expected
}
console.log("assign failure state:", assignFailureDst.snapshot());
console.log("assign failure invariant:", assignFailureDst.invariantHolds());

const prefixSuccess = new TokenBuffer(["A", "B"]);
prefixSuccess.prefixAll("PRE-");
console.log("prefix success state:", prefixSuccess.snapshot());
console.log("prefix success invariant:", prefixSuccess.invariantHolds());

const prefixFailure = new TokenBuffer(["SAFE", "BOOM", "LAST"]);
try {
  prefixFailure.prefixAll("PRE-");
} catch (_error) {
  // expected
}
console.log("prefix failure state:", prefixFailure.snapshot());
console.log("prefix failure invariant:", prefixFailure.invariantHolds());
