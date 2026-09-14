# Studio — Project Memory

This file records decisions that are important enough to preserve between development sessions.

It is not a task list.

It is not a copy of the PRD.

It exists so a developer or coding agent can understand the current state of the project without reconstructing decisions from the entire repository.

---

# 1. Project Identity

Name:

```text
Studio
```

Type:

```text
Full-stack web application
```

Primary purpose:

```text
A focused workspace for creating, managing, and publishing digital projects.
```

---

# 2. Current Product State

Current stage:

```text
Active Implementation
```

The core product is not considered complete until the main journey works:

```text
Sign up
   ↓
Dashboard
   ↓
Create project
   ↓
Edit project
   ↓
Save
   ↓
Preview
   ↓
Publish
```

---

# 3. Technology Decisions

Current intended stack:

```text
Frontend:
Next.js + React + TypeScript

Styling:
Tailwind CSS

Validation:
Zod

Database:
PostgreSQL

Database layer:
Prisma

Storage:
Object storage (Supabase Storage / local fallback)

Authentication:
Server-authoritative session with JWT & HTTP-only cookies

Deployment:
Managed web hosting + managed PostgreSQL + object storage
```

These are the current defaults, not permanent laws.

If a technology changes, record the reason below.

---

# 4. Architecture Decisions

## Decision 001 — Start as a modular monolith

Reason:

The first version does not need microservices.

Keeping frontend, server logic, database access, and domain logic in one application reduces operational complexity.

Status:

```text
Accepted
```

---

## Decision 002 — PostgreSQL

Reason:

Studio has relational data and relationships between users, projects, assets, and activity.

Status:

```text
Accepted
```

---

## Decision 003 — Object storage for files

Reason:

Binary files should not be stored directly in the relational database.

Status:

```text
Accepted
```

---

## Decision 004 — Server-authoritative permissions

Reason:

Client-side permission checks are not security boundaries.

Status:

```text
Accepted
```

---

# 5. Important Domain Concepts

## User

Represents an authenticated person using Studio.

## Project

The main unit of work.

## Asset

A file associated with a project.

## Activity

A record of important actions.

## Publication

The publicly accessible representation of a project.

---

# 6. Important Product Decisions

### Keep version one focused

Do not build collaboration, billing, AI, marketplace functionality, or enterprise features until there is a concrete requirement.

### Prioritize the core workflow

The main product value comes from making project creation and publishing straightforward.

### Avoid unnecessary complexity

Infrastructure should grow with actual requirements.

---

# 7. Current Open Questions

These questions should be answered before the relevant implementation phase:

```text
What exact type of content does a Studio project contain?

Will projects have custom public URLs?

Will users eventually belong to teams/workspaces?

Will billing be subscription-based?

Will collaboration be real-time?

Will AI be part of the core product or an optional feature?

What external storage provider will be used?

What authentication provider will be used?

What analytics are required?
```

Until these are decided, implementation should not assume a specific answer unless required by the current phase.

---

# 8. Change Log

Record meaningful decisions here.

Format:

```text
YYYY-MM-DD
Decision:
Reason:
Impact:
Status:
```

Example:

```text
2026-09-14
Decision: Keep the first release as a modular monolith with Next.js App Router and Prisma.
Reason: The product does not currently justify distributed services and avoids duplication across layers.
Impact: Simpler deployment and unified server operations.
Status: Accepted.
```

---

# 9. Agent Context

Any AI coding agent working on Studio should understand:

* do not invent product requirements
* inspect existing code before modifying it
* preserve existing patterns
* prefer small changes
* protect user data
* validate all server inputs
* check authorization before mutations
* do not expose secrets
* do not rewrite unrelated code
* update memory when a meaningful architectural decision changes
* update the relevant documentation when requirements change

When uncertain, choose the simplest implementation consistent with the existing architecture and document the decision.

---

# 10. Documentation Relationship

```text
                    ┌──────────────┐
                    │   prd.md     │
                    │ WHAT / WHY   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  design.md   │
                    │ HOW IT FEELS │
                    └──────┬───────┘
                           │
                           ▼
                 ┌────────────────────┐
                 │  architecture.md   │
                 │ HOW IT IS BUILT    │
                 └─────────┬──────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   rules.md   │
                    │ HOW WE CODE  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  phases.md   │
                    │ WHEN WE BUILD│
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  memory.md   │
                    │ WHAT WE KNOW │
                    └──────────────┘
```

---

# 11. How the Six Files Work Together

## `prd.md`

This is the product contract.

Use it when asking:

> What are we actually building?

It contains:

* product purpose
* users
* features
* requirements
* success criteria
* non-goals

A developer should read this before starting a new feature.

---

## `design.md`

This is the interface contract.

Use it when asking:

> How should the product look and behave?

It contains:

* layout
* visual language
* components
* responsive behavior
* states
* accessibility
* interaction rules

The frontend is implemented from this document.

---

## `architecture.md`

This is the technical contract.

Use it when asking:

> Where does this feature belong technically?

It defines:

```text
Frontend
    ↓
Server
    ↓
Validation
    ↓
Authorization
    ↓
Database / Storage
```

It also defines the data model and application structure.

---

## `rules.md`

This is the engineering contract.

Use it when asking:

> How should we write and change the code?

It prevents different developers or AI coding agents from creating completely different patterns.

---

## `phases.md`

This is the execution plan.

Use it when asking:

> What should we build next?

The order matters.

For example, publishing should not be built before projects and the workspace exist.

---

## `memory.md`

This is the project's long-term context.

Use it when asking:

> Why did we build it this way?

It stores:

* decisions
* assumptions
* unresolved questions
* technology choices
* important domain concepts
* changes in direction

This is especially useful when using AI coding tools across many development sessions.

---

# 12. How the Application Pieces Connect

At a high level:

```text
User
 │
 ▼
Authentication
 │
 ▼
Dashboard
 │
 ├──────────────► Projects
 │                    │
 │                    ▼
 │                Workspace
 │                    │
 │          ┌─────────┼─────────┐
 │          ▼         ▼         ▼
 │       Content    Assets   Settings
 │          │         │         │
 │          └─────────┼─────────┘
 │                    ▼
 │                Save/Validate
 │                    │
 │                    ▼
 │                Permission
 │                    │
 │                    ▼
 │                 Publish
 │                    │
 │                    ▼
 │              Public Project
 │
 └──────────────► Account/Settings
```

The database sits underneath these application operations:

```text
User
 │
 └── Project
       ├── Asset
       ├── Activity
       └── Publication
```

The frontend never directly bypasses the server to modify protected data.

The normal path is:

```text
UI
 ↓
Server operation
 ↓
Validation
 ↓
Authentication
 ↓
Authorization
 ↓
Database
 ↓
Result
 ↓
UI state
```

Files follow a different path:

```text
Browser
 ↓
Upload operation
 ↓
Validation
 ↓
Object Storage
 ↓
Asset metadata
 ↓
PostgreSQL
```

This keeps large files out of the database while still allowing Studio to understand which assets belong to which projects.

---

# 13. What Gets Updated When

| Change                        | Update                          |
| ----------------------------- | ------------------------------- |
| New product feature           | `prd.md`                        |
| Product requirement removed   | `prd.md`                        |
| New UI behavior               | `design.md`                     |
| New database/service decision | `architecture.md`               |
| New coding convention         | `rules.md`                      |
| Development sequence changes  | `phases.md`                     |
| Important decision/context    | `memory.md`                     |
| Major architectural change    | `architecture.md` + `memory.md` |
| Major product change          | `prd.md` + `memory.md`          |
| Major design change           | `design.md` + `memory.md`       |

---

# 14. Final Project Rule

The six files are not six independent documents.

They form a single project specification.

Before implementing something new, determine:

```text
1. Is it required by the PRD?
2. What should it look/behave like according to Design?
3. Where does it belong according to Architecture?
4. What implementation rules apply?
5. Which development Phase should contain it?
6. Does the decision need to be remembered?
```

If those questions are answered, implementation should be straightforward.

If they cannot be answered, clarify the requirement or document the decision before building.
