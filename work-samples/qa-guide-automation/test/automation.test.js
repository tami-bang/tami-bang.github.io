import test from "node:test";
import assert from "node:assert/strict";

import { parseIssue } from "../src/issue-parser.js";
import {
  COMPLETION_MARKER_PREFIX,
  validateTemplateState,
} from "../src/template-guard.js";

function emptyTemplate(extraBlocks = []) {
  return {
    blocks: [
      { type: "heading", text: "Details", owner: "template" },
      { type: "heading", text: "Scenarios", owner: "template" },
      { type: "heading", text: "Test results", owner: "template" },
      ...extraBlocks,
    ],
  };
}

test("parseIssue creates focused scenarios from issue keywords", () => {
  const parsed = parseIssue({
    key: "ISSUE-1042",
    summary: "Quick scan result is missing from exported report",
    description: "Compare the client log and admin report after export.",
    priority: "High",
  });

  assert.equal(parsed.sourceKey, "ISSUE-1042");
  assert.deepEqual(
    parsed.scenarios.map((scenario) => scenario.title),
    ["Quick scan action", "Log and report export"],
  );
});

test("template guard allows an untouched template", () => {
  assert.deepEqual(validateTemplateState(emptyTemplate()), {
    ok: true,
    reasons: [],
  });
});

test("template guard blocks user-authored text", () => {
  const result = validateTemplateState(
    emptyTemplate([
      { type: "paragraph", text: "Existing note", owner: "user" },
    ]),
  );

  assert.equal(result.ok, false);
  assert.match(result.reasons.join("\n"), /User-authored text/);
});

test("template guard blocks repeated automation", () => {
  const result = validateTemplateState(
    emptyTemplate([
      {
        type: "paragraph",
        text: `${COMPLETION_MARKER_PREFIX}:ISSUE-1042`,
        owner: "automation",
      },
    ]),
  );

  assert.equal(result.ok, false);
  assert.match(result.reasons.join("\n"), /completion marker/);
});
