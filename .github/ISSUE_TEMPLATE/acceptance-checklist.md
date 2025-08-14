name: Acceptance Checklist
description: Definition of Done for quality gates
title: "DoD: "
labels: ["quality", "acceptance"]
body:
  - type: checklist
    attributes:
      label: Gates
      options:
        - label: Snyk (no High/Critical)
        - label: Gitleaks (no secrets)
        - label: CodeQL (no new alerts)
        - label: Playwright E2E + axe pass
        - label: Lighthouse budgets green
        - label: Coverage ≥ 80% (lines)
        - label: RBAC guard & Audit log in place
