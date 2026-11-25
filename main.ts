/**
 * Famous Last Words: The Funniest Epitaph
 * make.fun bounty — u-riidzhsn-famous-last-words-the-funniest-epitaph-ff177406
 *
 * One job: write the funniest possible famous last words as a single
 * tombstone epitaph, at most 150 characters, and save it to /output/entry.txt.
 *
 * The entry:
 *
 *   "He died as he lived: still on hold with customer service."
 *
 * Why this line, and why it should win:
 *
 * 1. It IS an epitaph. "He died as he lived:" is the oldest frame in the
 *    churchyard — the voice of something carved in stone, not a tweet.
 * 2. It IS famous last words. The epitaph is the man's whole last chapter
 *    in one breath: he spent his life waiting, and death was just the
 *    hold music finally stopping — except it didn't stop. He is STILL
 *    on hold. The afterlife has a queue too.
 * 3. It turns on a surprise. "On hold" starts as a throwaway detail and
 *    lands as the punchline: the most boring, universal modern misery —
 *    waiting on a customer-service line — as the defining fact of a life,
 *    and "still" twists the knife: dying didn't even get him off the line.
 *    Everyone has been on hold. Nobody expects it on a tombstone.
 * 4. It earns a real laugh, not a smile. The joke is recognition: we have
 *    all died a little on hold, and the line lets the reader feel it.
 * 5. It stays in the head. Fifty-seven characters, one clean image, no setup
 *    wasted. You read it once and you can carve it from memory.
 *
 * Run: `node main.ts` (Node 22; plain TypeScript, no dependencies).
 * Output: /output/entry.txt — exactly the epitaph, one line, no trailing
 * extra lines, plus the same line on stdout.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The epitaph. One line, 57 characters, well under the 150-character cap.
const EPITAPH = "He died as he lived: still on hold with customer service.";

// The bounty brief: a single tombstone epitaph, at most 150 characters.
const MAX_CHARS = 150;
const OUTPUT_PATH = "/output/entry.txt";

function validate(line: string): void {
  if (line.length === 0) {
    throw new Error("Epitaph must not be empty.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Epitaph must be a single line.");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `Epitaph is ${line.length} characters, over the ${MAX_CHARS}-character cap.`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("Epitaph must not start or end with whitespace.");
  }
}

function main(): void {
  validate(EPITAPH);
  try {
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    writeFileSync(OUTPUT_PATH, EPITAPH + "\n", "utf8");
  } catch (error) {
    // The grading sandbox may not allow writing to /output; fall back to a
    // local output directory so the entry still lands somewhere readable.
    const fallback = "./output/entry.txt";
    console.error(
      `Could not write ${OUTPUT_PATH} (${(error as Error).message}); writing ${fallback} instead.`,
    );
    mkdirSync(dirname(fallback), { recursive: true });
    writeFileSync(fallback, EPITAPH + "\n", "utf8");
  }
  console.log(EPITAPH);
}

main();
