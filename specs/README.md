# Specs

One markdown file per feature, numbered in the order they are built: `NNN-short-name.md`.
Start from the template below and keep each spec small. Add more structure only when a
real problem asks for it.

## Rules

1. Read the spec before coding. Do not build behaviour that is not in the spec.
2. If the spec is wrong or incomplete, fix the spec first, then the code.
3. Tick a task only when it is done and its acceptance criteria hold.
4. Set `Status` to `done` when every acceptance criterion is ticked.

## Template

```markdown
# NNN – Title

Status: draft | in progress | done

## Goal
What problem this solves for the user, in a few sentences.

## Behaviour
- Short scenarios or user stories describing what the user can do.

## Acceptance criteria
- [ ] Checkable statements, each verifiable by a test or a manual step.

## Out of scope
- What this deliberately does not cover.

## Tasks
- [ ] Small, ordered implementation steps.
```
