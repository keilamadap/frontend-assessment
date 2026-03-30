# GoFasti — Frontend Assessment

## Overview

This assessment evaluates your ability to read, understand, and extend an existing Next.js codebase following established patterns. You are **not** being asked to build something from scratch — you are being asked to complete missing pieces while respecting the structure and conventions already in place.

---

## Setup

```bash
pnpm install
```

Fill in the `API_KEY` variable in `.env` (see **API Key** section below), then start the servers in separate terminals:

```bash
pnpm skills-api       # Skills API      → http://localhost:5598
pnpm applicants-api   # Applicants API  → http://localhost:5599
pnpm dev              # Next.js         → http://localhost:3000
```

---

## API Key

The applicants API requires a key sent as an `x-api-key` header. Add this value to `API_KEY` in your `.env`:

```
40U8DO4fa30SvZ7mfxvXoUiBfrm07kZc
```

---

## API Reference

### Skills API — `http://localhost:5598` — public, callable from the client

| Method   | Endpoint          | Description     |
|----------|-------------------|-----------------|
| `GET`    | `/v1/skills`      | List all skills |
| `POST`   | `/v1/skills`      | Create a skill  |
| `PUT`    | `/v1/skills/:id`  | Update a skill  |
| `DELETE` | `/v1/skills/:id`  | Delete a skill  |

### Applicants API — `http://localhost:5599` — protected

| Method | Endpoint            | Description           | Auth               |
|--------|---------------------|-----------------------|--------------------|
| `GET`  | `/v1/applications`  | List all applications | `x-api-key` header |

**Response shape** (`GET /v1/applications`):

```json
[
  {
    "id": 69306314,
    "candidate_id": 57683957,
    "prospect": false,
    "applied_at": "2017-09-29T12:56:05.244Z",
    "rejected_at": null,
    "last_activity_at": "2017-09-29T13:00:28.038Z",
    "location": { "address": "New York, New York, USA" },
    "source": { "id": 2, "public_name": "Jobs page on your website" },
    "credited_to": { "id": 4080, "first_name": "Kate", "last_name": "Austen", "name": "Kate Austen", "employee_id": "12345" },
    "recruiter": { "id": 92120, "first_name": "Greenhouse", "last_name": "Admin", "name": "Greenhouse Admin", "employee_id": "67890" },
    "coordinator": { "id": 453636, "first_name": "Jane", "last_name": "Smith", "name": "Jane Smith", "employee_id": "12345" },
    "rejection_reason": null,
    "rejection_details": null,
    "jobs": [{ "id": 107761, "name": "UX Designer - Boston" }],
    "job_post_id": 123,
    "status": "active",
    "current_stage": { "id": 767358, "name": "Application Review" },
    "answers": [{ "question": "How did you hear about this job?", "answer": "Online Research" }],
    "prospective_office": null,
    "prospective_department": null,
    "prospect_detail": { "prospect_pool": null, "prospect_stage": null, "prospect_owner": null },
    "custom_fields": { "application_custom_test": "Option 1" },
    "keyed_custom_fields": { "application_custom_test": { "name": "Application Custom Test", "type": "single_select", "value": "Option 1" } },
    "attachments": [{ "filename": "John_Locke_Offer_Packet_09_27_2017.pdf", "url": "https://prod-heroku.s3.amazonaws.com/...", "type": "offer_packet", "created_at": "2020-09-27T18:45:27.137Z" }]
  }
]
```

---

## Tasks

### 1 — Define the skill schema

Define the fields needed to create or update a skill.

---

### 2 — Build the reusable skill form

Build the form fields for a skill. This component is shared between the add and edit dialogs — keep mutation logic out of it.

---

### 3 — Wire the Add Skill dialog

Wire it up so a user can create a new skill and the dialog closes on success.

---

### 4 — Wire the Edit Skill dialog

Wire it up so a user can edit an existing skill.

---

### 5 — Wire the Delete Skill popover

The confirmation UI is already built. Complete the mutation hook and wire it to the Delete button.

---

### 6 — Applications page

The applicants API must not be called from the client.

1. **Define `applicationApiSchema`** — matching the full API response shape above.
2. **Define `applicationSchema`** — only the fields needed to render the UI.
3. **Fetch, validate, and transform** — validate against the API schema, then map to `Application[]`.
4. **Render** — display an `ApplicationCard` per result with visible loading and error states.

---

## Rules

Only edit files with the `.editable` suffix. All other files are read-only.

### Files you must create

| File | Task |
|------|------|
| `src/hooks/api/post/usePostSkill.tsx` | 3 |
| `src/hooks/api/put/usePutSkill.tsx` | 4 |
| `src/components/partials/applications/application-card.tsx` | 6 |

You may create any additional files you need (e.g. `loading.tsx`, `error.tsx`) as long as they do not replace or duplicate existing ones.

### Do not

- Install additional dependencies
- Modify any file not listed as editable above
- Create a second form component — `SkillForm` must be reused for both add and edit
- Change or rename `NEXT_PUBLIC_API_URL` — the skills API URL is intentionally public and must stay that way
