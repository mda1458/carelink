# SECURITY

- Report vulnerabilities to security@carelink.example (SLA: triage 3 business days).
- CI gates: Semgrep (High fail), Grype (Critical/High fail), ZAP baseline (High fail).
- CSP strict in prod; JSON-LD hashes required if inline scripts present.
- Cookies HttpOnly/Secure/SameSite=Lax; no auth in localStorage.
