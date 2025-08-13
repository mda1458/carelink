# RUNBOOK

- Rotate secrets via Doppler/Vault; restart deployments.
- Rollback: revert commit, re-deploy; feature flags to disable modules.
- Incident: open PagerDuty; collect Sentry error IDs and OTel trace IDs.
