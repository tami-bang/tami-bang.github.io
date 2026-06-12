const QA_TARGETS = [
  {
    id: "quick-scan",
    keywords: ["quick scan", "context menu", "right click"],
    title: "Quick scan action",
    place: "Desktop client > File context menu > Quick scan",
    steps: [
      "Prepare a sample file that matches the issue conditions.",
      "Run Quick scan from the file context menu.",
      "Confirm completion state, detection result, and user-facing message.",
    ],
  },
  {
    id: "policy-sync",
    keywords: ["policy", "sync", "not applied", "refresh"],
    title: "Policy synchronization",
    place: "Admin console > Policy settings",
    steps: [
      "Change only the policy related to the issue.",
      "Trigger policy synchronization on the test client.",
      "Confirm that the changed behavior is reflected without affecting unrelated settings.",
    ],
  },
  {
    id: "log-export",
    keywords: ["log", "export", "report", "xlsx"],
    title: "Log and report export",
    place: "Desktop client > Logs and Admin console > Reports",
    steps: [
      "Create a log entry using the issue reproduction steps.",
      "Compare the client log with the admin console record.",
      "Export the report and confirm its structure and contents.",
    ],
  },
];

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function inferTargets(text) {
  const normalized = normalizeText(text);

  return QA_TARGETS.filter((target) =>
    target.keywords.some((keyword) => normalized.includes(keyword)),
  );
}

function fallbackTarget() {
  return {
    id: "core-flow",
    title: "Core user flow",
    place: "Desktop client and related admin setting",
    steps: [
      "Reproduce the user flow described in the issue.",
      "Compare the actual result with the expected result.",
      "Record affected areas and evidence needed for follow-up.",
    ],
  };
}

function parseIssue(issue) {
  const summary = String(issue.summary || "").trim();
  const description = String(issue.description || "").trim();
  const targets = inferTargets(`${summary}\n${description}`);
  const selectedTargets = targets.length > 0 ? targets : [fallbackTarget()];

  return {
    sourceKey: issue.key || "ISSUE-UNKNOWN",
    overview: summary || "Summary requires review",
    priority: issue.priority || "Unspecified",
    scenarios: selectedTargets.map((target, index) => ({
      id: `A${index + 1}`,
      title: target.title,
      place: target.place,
      steps: target.steps,
    })),
  };
}

export {
  inferTargets,
  parseIssue,
};
