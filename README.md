# Error Handling Lab

This repo follows the same format as the previous labs:

- each exercise lives in `src/`
- each exercise prints deterministic output
- `npm run test` runs the student files and diffs them against the expected output in `solution/`

## Setup

```bash
npm install
npm run test
```

The student files contain `TODO`s and are intended to be edited during lab.

---

## Lab structure

This lab is designed for about one hour and mirrors the lecture themes:

1. **Approaches to error handling**
   - EAFP + exceptions
   - LBYL + assertions / preconditions / undefined behavior
   - errors as values
2. **Exception guarantees**
   - identify code that violates the basic or strong guarantee
   - redesign it so failure does not leave state half-updated
3. **Define errors out of existence**
   - redesign APIs so certain error cases disappear instead of being pushed to callers

---

## Exercise 1 — Error handling approaches

Open `src/01_error_approaches.ts`.

This file has three small exercises:
- **1A** EAFP + exceptions
- **1B** LBYL + assert / preconditions
- **1C** errors as values

Each part includes a tiny worked example before the TODOs.
```

---

## Exercise 2 — Exception guarantees

Open `src/02_exception_guarantees.ts`.

This file focuses on exception safety:
- a worked example that violates the basic guarantee
- three methods you should strengthen:
  - `popLastCopy`
  - `assignFrom`
  - `prefixAll`

The goal is not just “catch errors,” but to change the code so failures do not corrupt state.
```

---

## Exercise 3 — Define errors out of existence

Open `src/03_define_errors_out_of_existence.ts`.

This file asks you to redesign functions so they do **not** throw:
- **3A** removing the last element of an empty array
- **3B** getting the first character of an empty string
- **3C** paginating with negative, invalid, or out-of-range arguments

The question in each case is:
> can the abstraction reasonably handle this case itself instead of making the caller deal with it?
```

---

## Full check

Student files:
```bash
npm run test
```
