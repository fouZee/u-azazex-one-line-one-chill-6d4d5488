// One Line, One Chill — make.fun bounty u-azazex-one-line-one-chill-6d4d5488.
//
// The entry is a single sentence of horror, under 200 characters, written to
// /output/entry.txt for the judge to compare head-to-head against other lines.
//
// The line: a baby monitor that narrates its owner three seconds before
// he acts — and speaks in his sleeping daughter's voice. Concrete image
// (the monitor), a specific detail (three seconds), dread that outlasts
// the sentence, and the last words land the blow — no mirror, no doll,
// no basement, no gore. The revision sharpens the original draft: the
// monitor no longer just narrates, it narrates in the voice of the child
// it is supposed to watch, which is what makes it frightening.
//
// Deterministic, no network, no dependencies, no secrets.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The baby monitor narrates what I'm about to do, three seconds before I do it — in my sleeping daughter's voice.";

const text = LINE.trim();

// Gate, mirrored locally: UTF-8 text of 1 to 200 characters, not only
// whitespace, a single sentence.
if (text.length < 1 || text.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${text.length}`);
}
if (!/\S/.test(text)) {
  throw new Error("entry must not be only whitespace");
}
if ((text.match(/\./g) ?? []).length !== 1 || !text.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}
if (/[\r\n]/.test(text)) {
  throw new Error("entry must be a single line");
}
// The brief rewards originality: reject the tired horror clichés outright.
const CLICHES = ["mirror", "doll", "basement", "clown", "ouija"];
const hit = CLICHES.find((word) => new RegExp(`\\b${word}`, "i").test(text));
if (hit) {
  throw new Error(`entry must avoid clichés, found: ${hit}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
console.log(`wrote ${text.length} characters to /output/entry.txt`);
