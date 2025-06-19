# Task Sync API (Backend)

This is the backend of the **Task Sync** project, built with **Node.js**, **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**. I also added real-time support via **Socket.IO** to enable live updates.

---

## ✨ Features

- RESTful API for task management  
- WebSocket support using Socket.IO  
- PostgreSQL with Prisma ORM  
- Dockerized development environment  
- Centralized error handling  
- Paginated and filtered endpoints  
- Seed script for initial data population  

---

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/camilatigre/task-sync.git
cd task-sync/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

```env
PORT=3333
DATABASE_URL=postgresql://user:password@localhost:5432/tasksync
```

### 4. Start Docker (PostgreSQL)

```bash
docker compose up -d
```

### 5. Setup Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Seed the database (optional)

```bash
npm run seed
```

### 7. Start the development server

```bash
npm run dev
```

API will be running at: `http://localhost:3333`

---

## ⚙️ Project Structure

```
src/
├── controllers/     # HTTP route handlers
├── routes/          # Express route definitions
├── services/        # Business logic
├── prisma/          # Prisma client wrapper
├── errors/          # Custom error classes
├── middlewares/     # Express middlewares
└── index.ts         # App entry point
```

---

## 🔬 API Endpoints

> Postman collection: _to be added_  
> Swagger UI: _to be added_

| Method | Path        | Description                                      | Body                                 | Response         |
|--------|-------------|--------------------------------------------------|--------------------------------------|------------------|
| GET    | /tasks      | List all tasks (with optional filters/pagination) | `?status=pending&page=1&pageSize=10` | `Task[]`         |
| GET    | /tasks/:id  | Retrieve a task by ID                            | -                                    | `Task`           |
| POST   | /tasks      | Create a new task                                | `{ title, description, status }`     | Created `Task`   |
| PUT    | /tasks/:id  | Update a task                                    | Partial `Task`                       | Updated `Task`   |
| DELETE | /tasks/:id  | Delete a task                                    | -                                    | `204 No Content` |

---

## 🚀 Useful Commands

```bash
# Reset the entire database (will erase all data!)
npx prisma migrate reset

# Seed with sample data
npm run seed
```

---

## ✍️ Technical Decisions & Notes

### Prisma Client Generation

I use `npx prisma generate` after every schema change to generate a type-safe Prisma Client. This improves my development experience with autocompletion and prevents mismatch between the database and code.

### Prisma Client Wrapper

I created a dedicated `client.ts` wrapper inside the `prisma/` folder so I can easily reuse the Prisma client without repeating imports across the application.

### Error Handling

I handle all exceptions using a centralized middleware. Errors are thrown via a custom `AppError` class to provide consistent HTTP responses and better debugging context.

### TypeScript & Express Response Types

Express route handlers are expected to return `void | Promise<void>` in TypeScript, so I never return `res.json(...)` directly. Instead, I use response side-effects for type correctness.

### Pagination & Filtering

The `GET /tasks` endpoint supports optional query parameters:  
- `status` for filtering  
- `page` and `pageSize` for pagination  

This allows for scalable task listing in real-world apps.

### Seed Script

I created a seed script using Prisma to populate the database with example tasks for local development and testing. You can run it with `npm run seed`.

### Schema Validation with Zod

I use [`zod`](https://github.com/colinhacks/zod) to validate request bodies on the server. It integrates seamlessly with TypeScript, enabling me to enforce type-safe validation as middleware. It also improves reusability and developer ergonomics across both backend and frontend code.

---

## 🎓 Suggestions for Future Improvements

- [ ] Add authentication & authorization (JWT)  
- [ ] Integrate Swagger UI for documentation  
- [ ] Add Winston or Pino for structured logging  
- [ ] Improve testing coverage (unit + integration)  
- [ ] Enforce linting rules (ESLint + Prettier)  
- [ ] Add JSDoc annotations to services and DTOs  
- [ ] Add Husky pre-commit hook for Conventional Commits  
