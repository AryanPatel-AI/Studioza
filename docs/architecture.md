# Studio — Architecture

## 1. Architecture Goal

Studio should start as a modular full-stack application rather than a collection of disconnected services.

The default architecture is:

```text
Browser
   |
   v
Web Application
   |
   +---- UI
   |
   +---- Server/API
   |
   +---- Authentication
   |
   v
Database
   |
   +---- File/Object Storage
   |
   +---- External Services
```

The system should remain simple until scale or product requirements justify additional infrastructure.

---

# 2. Recommended Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* component library built around the project's design system

## Backend

Use the Next.js server layer for the initial application.

Server responsibilities include:

* authentication
* authorization
* database access
* mutations
* validation
* publishing
* server-side business logic

Avoid duplicating business rules in multiple layers.

---

## Database

PostgreSQL is the primary relational database.

Use it for:

* users
* projects
* project content
* assets metadata
* activity
* settings
* future billing/workspace information

---

## ORM

Use Prisma or Drizzle.

Pick one and use it consistently.

Do not mix ORMs.

For this project, Drizzle is preferred if the team wants a lightweight SQL-oriented approach.

---

## Validation

Use Zod for request and form validation.

Validation should happen at the server boundary.

Client validation is useful for user experience but never replaces server validation.

---

## Authentication

Use a dedicated authentication solution compatible with the selected framework.

Authentication should produce a trusted server-side user identity.

Authorization should be based on that identity.

---

## File Storage

Files should not be stored directly in PostgreSQL.

Use object storage for:

* uploaded images
* documents
* project assets

The database stores:

```text
asset.id
asset.ownerId
asset.projectId
asset.fileName
asset.mimeType
asset.size
asset.storageKey
asset.createdAt
```

---

# 3. Application Structure

Recommended structure:

```text
studio/
├── app/
│   ├── (marketing)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── projects/
│   ├── admin/
│   ├── api/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── projects/
│   ├── dashboard/
│   └── shared/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validation/
│   ├── storage/
│   ├── permissions/
│   └── utils/
│
├── server/
│   ├── projects/
│   ├── assets/
│   ├── publishing/
│   └── activity/
│
├── db/
│   ├── schema/
│   └── migrations/
│
├── public/
│
├── tests/
│
├── prd.md
├── architecture.md
├── rules.md
├── phases.md
├── design.md
└── memory.md
```

The exact framework routing structure may change during implementation, but the separation of responsibilities should remain.

---

# 4. Data Model

Core entities:

```text
User
 |
 +---- Project
          |
          +---- Asset
          |
          +---- Activity
```

Future:

```text
User
 |
 +---- Workspace
          |
          +---- Membership
          |
          +---- Project
```

---

# 5. Core Tables

## users

```text
id
email
name
avatarUrl
role
createdAt
updatedAt
```

## projects

```text
id
ownerId
name
slug
description
status
content
settings
createdAt
updatedAt
publishedAt
```

## assets

```text
id
projectId
ownerId
name
storageKey
mimeType
size
url
createdAt
```

## activities

```text
id
projectId
userId
type
metadata
createdAt
```

---

# 6. API Boundaries

The application should expose clear operations around resources.

Example:

```text
GET    /api/projects
POST   /api/projects

GET    /api/projects/:id
PATCH  /api/projects/:id
DELETE /api/projects/:id

POST   /api/projects/:id/publish
POST   /api/projects/:id/archive

GET    /api/projects/:id/assets
POST   /api/projects/:id/assets

GET    /api/projects/:id/activity
```

The actual implementation may use server actions instead of REST for internal operations. The important point is that operations have clear boundaries.

---

# 7. Authorization

Authorization follows:

```text
request
  ↓
authenticate
  ↓
identify user
  ↓
load resource
  ↓
check permission
  ↓
perform operation
```

Never:

```text
request
  ↓
trust projectId from client
  ↓
update database
```

Every protected resource must be checked server-side.

---

# 8. Publishing Architecture

Publishing should separate working data from the public representation when necessary.

Initial approach:

```text
Project Draft
     |
     | Publish
     v
Published Project
```

For simple projects, published data can be represented using the project record and publication state.

If the product later requires version history, introduce:

```text
Project
   |
   +---- ProjectVersion
             |
             +---- PublishedVersion
```

Do not build versioning prematurely.

---

# 9. Error Handling

Server errors should be converted into safe user-facing responses.

Never expose:

* database errors
* stack traces
* internal IDs unnecessarily
* secrets
* infrastructure details

Use structured errors internally.

---

# 10. Environment Variables

Example:

```text
DATABASE_URL=
AUTH_SECRET=
STORAGE_ENDPOINT=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
STORAGE_BUCKET=
NEXT_PUBLIC_APP_URL=
```

Secrets must never be committed to source control.

Use `.env.example` to document required variables without exposing values.

---

# 11. Deployment

Initial deployment can use:

```text
Frontend / Server
        |
      Hosting
        |
   PostgreSQL
        |
  Object Storage
```

Production infrastructure should remain boring and predictable.

Only introduce queues, workers, Redis, containers, or separate services when an actual requirement exists.

---

# 12. Architecture Principles

1. Keep the application modular.
2. Keep business logic server-authoritative.
3. Keep database access centralized.
4. Keep UI components reusable.
5. Avoid unnecessary abstractions.
6. Prefer explicit code over magic.
7. Make future expansion possible without building future features now.
8. Keep infrastructure proportional to the product.
