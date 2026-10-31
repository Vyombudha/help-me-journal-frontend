# Help Me Journal

Help Me Journal is a project-first journaling app: organize work into projects, then keep journal pages, technical notes, and moods alongside the work they describe.

Live app: <https://vyombudha.github.io/help-me-journal-frontend/>

This repository contains the React frontend. It requires a separately running API and a Clerk application for authentication.

## Run locally

### Requirements

- Node.js 20.19+ or 22.12+
- npm
- A running Help Me Journal API with the `/api/v1` routes listed below
- A Clerk application and its publishable key

### Setup

```bash
git clone https://github.com/Vyombudha/help-me-journal-frontend.git
cd help-me-journal-frontend
npm install
cp .env.example .env.local
```

Set the values in `.env.local`, then start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite (by default, <http://localhost:5173>).

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | API base URL, including `/api/v1` (for example, `http://localhost:3000/api/v1`). |
| `VITE_CLERK_PUBLISHABLE_KEY` | Yes | Publishable key for your Clerk application. This is a browser-visible key; never put a Clerk secret key here. |

Vite embeds `VITE_` variables in the client bundle. Do not put secrets in them.

## What it does

- Uses Clerk for sign-in and attaches the current Clerk session token as a bearer token to API requests.
- Displays workspaces as projects and their pages as journal or technical-note entries.
- Supports creating, renaming, and deleting workspaces and pages.
- Supports editing page titles and rich-text content, with content saved automatically.
- Uses TanStack Query to fetch and synchronize API data.

Signed-out visitors see the landing page. After signing in, the app opens the default workspace (or the first available workspace) and its first page.

## API contract

The frontend expects the API base URL to include `/api/v1`; the examples below use `http://localhost:3000/api/v1`. All endpoints require a Clerk session token. Replace `$CLERK_SESSION_TOKEN` with a valid token for local API testing.

Successful responses use the shape `{"success":true,"data":...}`. Error responses use `{"success":false,"message":"..."}`. The examples show representative responses; IDs and timestamps will differ.

### Workspaces

#### List workspaces

```bash
curl -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  http://localhost:3000/api/v1/workspaces
```

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
      "name": "Website launch",
      "description": "Plan and reflect on the launch",
      "isDefault": true,
      "ownerId": "user_123",
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Create a workspace

```bash
curl -X POST http://localhost:3000/api/v1/workspaces \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Website launch","description":"Plan and reflect on the launch"}'
```

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "name": "Website launch",
    "description": "Plan and reflect on the launch",
    "isDefault": false,
    "ownerId": "user_123",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

#### Update a workspace

Both `newName` and `newDescription` are sent in the request body.

```bash
curl -X PATCH http://localhost:3000/api/v1/workspaces/a1b2c3d4-e5f6-4789-a012-3456789abcde \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"newName":"Website launch","newDescription":"Plan, build, and reflect on the launch"}'
```

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "name": "Website launch",
    "description": "Plan, build, and reflect on the launch",
    "isDefault": false,
    "ownerId": "user_123",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:00:00.000Z"
  }
}
```

#### Delete a workspace

```bash
curl -X DELETE \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  http://localhost:3000/api/v1/workspaces/a1b2c3d4-e5f6-4789-a012-3456789abcde
```

The client expects the deleted workspace in the success response:

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "name": "Website launch",
    "description": "Plan and reflect on the launch",
    "isDefault": false,
    "ownerId": "user_123",
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:00:00.000Z"
  }
}
```

### Pages

Page status values are `IN_PROGRESS`, `COMPLETED`, and `ABANDONED`. Mood values are `HAPPY`, `CALM`, `SAD`, `ANGRY`, `ANXIOUS`, `EXCITED`, `TIRED`, and `NEUTRAL`.

#### List pages in a workspace

```bash
curl -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  http://localhost:3000/api/v1/workspaces/a1b2c3d4-e5f6-4789-a012-3456789abcde/pages
```

```json
{
  "success": true,
  "data": [
    {
      "id": "b2c3d4e5-f6a7-4890-b123-456789abcdef",
      "title": "First steps",
      "content": "[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"I started by outlining the launch.\"}]}]",
      "workspaceId": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
      "status": "IN_PROGRESS",
      "templateConfig": null,
      "moods": ["EXCITED"],
      "createdAt": "2026-01-15T10:00:00.000Z",
      "updatedAt": "2026-01-15T10:00:00.000Z"
    }
  ]
}
```

#### Create a page

`moods` is required and may be an empty array.

```bash
curl -X POST http://localhost:3000/api/v1/workspaces/a1b2c3d4-e5f6-4789-a012-3456789abcde/pages \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"First steps","moods":["EXCITED"]}'
```

```json
{
  "success": true,
  "data": {
    "id": "b2c3d4e5-f6a7-4890-b123-456789abcdef",
    "title": "First steps",
    "content": "",
    "workspaceId": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "status": "IN_PROGRESS",
    "templateConfig": null,
    "moods": ["EXCITED"],
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-15T10:00:00.000Z"
  }
}
```

#### Update a page title

```bash
curl -X PATCH http://localhost:3000/api/v1/pages/b2c3d4e5-f6a7-4890-b123-456789abcdef/title \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"newTitle":"First week"}'
```

```json
{
  "success": true,
  "data": {
    "id": "b2c3d4e5-f6a7-4890-b123-456789abcdef",
    "title": "First week",
    "content": "",
    "workspaceId": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "status": "IN_PROGRESS",
    "templateConfig": null,
    "moods": ["EXCITED"],
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:00:00.000Z"
  }
}
```

#### Update page content

The content value is a JSON-serialized BlockNote document. The API accepts an empty string as well.

```bash
curl -X PATCH http://localhost:3000/api/v1/pages/b2c3d4e5-f6a7-4890-b123-456789abcdef/content \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"newContent":"[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"I started by outlining the launch.\"}]}]"}'
```

```json
{
  "success": true,
  "data": {
    "id": "b2c3d4e5-f6a7-4890-b123-456789abcdef",
    "title": "First week",
    "content": "[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"I started by outlining the launch.\"}]}]",
    "workspaceId": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "status": "IN_PROGRESS",
    "templateConfig": null,
    "moods": ["EXCITED"],
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:05:00.000Z"
  }
}
```

#### Delete a page

```bash
curl -X DELETE \
  -H "Authorization: Bearer $CLERK_SESSION_TOKEN" \
  http://localhost:3000/api/v1/pages/b2c3d4e5-f6a7-4890-b123-456789abcdef
```

The client expects the deleted page in the success response:

```json
{
  "success": true,
  "data": {
    "id": "b2c3d4e5-f6a7-4890-b123-456789abcdef",
    "title": "First week",
    "content": "",
    "workspaceId": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "status": "IN_PROGRESS",
    "templateConfig": null,
    "moods": ["EXCITED"],
    "createdAt": "2026-01-15T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:05:00.000Z"
  }
}
```

There is no OpenAPI/Swagger specification in this repository. The frontend's shared API types are in [`src/types/dtos.ts`](./src/types/dtos.ts).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and create a production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript validation without emitting files. |
| `npm run format` | Format TypeScript and TSX files with Prettier. |

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
