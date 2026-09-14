# Studio — Engineering & Product Rules

## 1. General Rule

The codebase should optimize for clarity.

A developer opening the project for the first time should be able to understand where a feature belongs without asking the original author.

---

# 2. Source of Truth

The documentation hierarchy is:

```text
prd.md
   ↓
design.md
   ↓
architecture.md
   ↓
rules.md
   ↓
phases.md
   ↓
memory.md
```

The PRD defines product intent.

Architecture defines technical implementation.

Design defines interface behavior.

Rules define development conventions.

Phases define implementation sequence.

Memory records decisions and context.

If documents conflict, resolve the conflict explicitly instead of silently choosing one.

---

# 3. TypeScript

Use TypeScript throughout the application.

Avoid:

```ts
any
```

unless there is a documented reason.

Prefer explicit types.

Do not use types simply to silence compiler errors.

---

# 4. Components

Components should have one clear responsibility.

Avoid huge components such as:

```text
ProjectPage.tsx
```

containing the entire application.

Prefer:

```text
ProjectHeader
ProjectSidebar
ProjectEditor
ProjectSettings
PublishButton
ProjectActivity
```

---

# 5. Database

Database queries should not be scattered randomly throughout UI components.

Database access belongs in the server/data layer.

Every mutation must verify authorization.

---

# 6. API/Input Rules

Every external input must be validated.

Validate:

* forms
* query parameters
* route parameters where appropriate
* API bodies
* uploaded files
* configuration

Never trust data because it came from the frontend.

---

# 7. Authentication Rules

Authentication answers:

> Who is this user?

Authorization answers:

> Is this user allowed to do this?

Never treat authentication as authorization.

---

# 8. UI States

Every asynchronous UI operation should consider:

```text
idle
loading
success
error
empty
```

Do not design only the happy path.

---

# 9. Destructive Actions

For destructive operations:

* make the action visually clear
* require deliberate interaction
* explain what will happen
* provide recovery where practical

---

# 10. Naming

Use descriptive names.

Bad:

```text
data
thing
handleIt
doStuff
temp
```

Good:

```text
project
projectSettings
handleProjectPublish
publishedAt
```

---

# 11. Files

Keep files reasonably focused.

If a file starts handling unrelated responsibilities, split it.

Do not split every five lines merely to create abstractions.

---

# 12. Dependencies

Before adding a package ask:

1. Do we actually need it?
2. Is the problem difficult to solve without it?
3. Is the package maintained?
4. Does it introduce unnecessary complexity?

If the answer is unclear, don't add it yet.

---

# 13. Security

Never commit:

* API keys
* passwords
* private tokens
* production credentials
* private certificates

Never expose server-only secrets through client-side environment variables.

---

# 14. Git

Commits should describe the change.

Examples:

```text
feat: add project creation
fix: prevent unauthorized project updates
refactor: simplify project editor state
docs: update publishing flow
```

Avoid:

```text
changes
update
stuff
final
final2
```

---

# 15. Testing

Important business behavior should be tested.

Priority:

1. authorization
2. authentication
3. project creation
4. project updates
5. publishing
6. destructive actions
7. important UI workflows

Do not chase arbitrary test coverage numbers.

Test behavior that matters.

---

# 16. AI Coding Rules

AI coding tools may be used, but they must follow the project documents.

Before implementing a feature:

1. inspect existing code
2. understand the current architecture
3. check the relevant PRD requirement
4. check existing patterns
5. implement the smallest appropriate change
6. run validation/tests
7. update documentation if architecture changes

AI should not:

* rewrite unrelated files
* introduce random libraries
* redesign existing UI without instruction
* change database structure casually
* remove working functionality
* create duplicate utilities

---

# 17. Change Rule

If a change affects architecture, update:

```text
architecture.md
memory.md
```

If a change affects product behavior, update:

```text
prd.md
memory.md
```

If a change affects visual behavior, update:

```text
design.md
memory.md
```
