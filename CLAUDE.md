@AGENTS.md

## Agent skills

### Issue tracker

Issues live in GitHub Issues for `efarr/story-bearings` (via `gh`). See `docs/agents/issue-tracker.md`.

### Triage labels

Default role names: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### add-book

Author a Book into the catalog. See `.cursor/skills/add-book/SKILL.md`.

### check-book

Audit a loaded Book; reports, does not rewrite. See `.cursor/skills/check-book/SKILL.md`.

### Git

Commit and push on `main`. Do not create branches.
