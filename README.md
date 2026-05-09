# Event Management System

A full-stack Event Management System built with Next.js, NestJS, PostgreSQL, Prisma and Material UI.

The application allows users to create, view, update and delete events. It also includes a simple recommendation algorithm that suggests similar events based on category, location and date.

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Material UI
### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
### Monorepo

- npm workspaces
- Turborepo
## Project Structure

```txt
event-management-system/
  apps/
    api/        # NestJS backend
    web/        # Next.js frontend
  packages/
  docker-compose.yml
  package.json
  turbo.json
  README.md
```

## Backend Features

- Create event
- Get all events
- Get event by id
- Update event
- Delete event
- Filter events by category
- Filter events by date range
- Sort events by date, title, category or creation date
- Recommend similar events
- Request validation
- Global error handling
- Seed data
## Backend API

Base URL:

```
http://localhost:5000/api
```

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /events | Get all events |
| GET | /events/:id | Get event by id |
| POST | /events | Create event |
| PATCH | /events/:id | Update event |
| DELETE | /events/:id | Delete event |
| GET | /events/:id/recommendations | Get recommended similar events |

### Query Parameters

`GET /events`

| Query | Description | Example |
|-------|-------------|---------|
| category | Filter by event category | MEETUP |
| dateFrom | Filter events from date | 2026-06-01T00:00:00.000Z |
| dateTo | Filter events to date | 2026-06-30T23:59:59.000Z |
| sortBy | Sort by field | date, createdAt, title, category |
| order | Sort order | asc, desc |

Example:

```
GET /api/events?category=MEETUP&sortBy=date&order=asc
```

### Event Categories

- `CONFERENCE`
- `WORKSHOP`
- `MEETUP`
- `CONCERT`
- `SPORT`
- `OTHER`
### Create Event Example

```http
POST /api/events
```

```json
{
  "title": "React Meetup Lviv",
  "description": "Frontend meetup about React, Next.js and modern UI development.",
  "date": "2026-06-15T18:00:00.000Z",
  "location": "Lviv",
  "category": "MEETUP",
  "latitude": 49.8397,
  "longitude": 24.0297
}
```

### Update Event Example

```http
PATCH /api/events/1
```

```json
{
  "title": "Updated React Meetup Lviv"
}
```

## Recommendation Algorithm

The recommendation endpoint suggests similar events based on a simple scoring system.

```
GET /api/events/:id/recommendations
```

Scoring rules:

| Points | Condition |
|--------|-----------|
| +3 | Same category |
| +2 | Same location |
| +2 | Event date within 7 days |
| +1 | Event date within 30 days |

The API calculates a score for each candidate event, sorts events by score and returns the most relevant results.

Example response:

```json
[
  {
    "id": 3,
    "title": "Frontend Conference",
    "description": "Conference for frontend developers.",
    "date": "2026-06-20T10:00:00.000Z",
    "location": "Kyiv",
    "category": "MEETUP",
    "latitude": 50.4501,
    "longitude": 30.5234,
    "createdAt": "2026-05-09T15:03:25.053Z",
    "updatedAt": "2026-05-09T15:03:25.053Z",
    "recommendationScore": 5,
    "recommendationReasons": [
      "Same category",
      "Date within 7 days"
    ]
  }
]
```

## Getting Started

### 1. Clone the repository

```bash
  git clone https://github.com/Qvendsh/event-management-system
  cd event-management-system
```

### 2. Install dependencies

```bash
  npm install
```

### 3. Start PostgreSQL with Docker

```bash
  npm run db:up
```

### 4. Create backend environment file

Create file: `apps/api/.env`

Use values from: `apps/api/.env.example`

Example:

```env
DATABASE_URL="postgresql://ems_user:ems_password@localhost:5432/ems_db?schema=public"
PORT=5000
FRONTEND_URL="http://localhost:3000"
```

### 5. Run Prisma migration

```bash
  npm run prisma:migrate
```

### 6. Seed database

```bash
  npm run prisma:seed
```

### 7. Start backend

```bash
  npm run dev:api
```

Backend will run on: `http://localhost:5000/api`

### 8. Start frontend

```bash
  npm run dev:web
```

Frontend will run on: `http://localhost:3000`

## Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs frontend and backend together using Turborepo |
| `npm run dev:api` | Runs only NestJS backend |
| `npm run dev:web` | Runs only Next.js frontend |
| `npm run db:up` | Starts PostgreSQL container |
| `npm run db:down` | Stops PostgreSQL container |
| `npm run prisma:migrate` | Runs Prisma migrations |
| `npm run prisma:seed` | Seeds database with test events |
| `npm run build` | Builds all apps |

## Error Response Format

```json
{
  "statusCode": 404,
  "message": "Event with id 999 not found",
  "error": "Not Found",
  "timestamp": "2026-05-09T15:20:00.000Z",
  "path": "/api/events/999",
  "method": "GET"
}
```