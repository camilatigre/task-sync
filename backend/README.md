# Task Sync API (Backend)

This is the backend of the Task Sync project built with Node.js, TypeScript, Express, Prisma, and PostgreSQL. It supports real-time communication via Socket.IO.

---

## ✨ Features

* RESTful API for task management
* WebSocket support (Socket.IO)
* PostgreSQL via Prisma ORM
* Dockerized development environment
* Centralized error handling
* Paginated and filtered endpoints

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

### 3. Create `.env`

```env
PORT=3333
DATABASE_URL=postgresql://user:password@localhost:5432/tasksync
```

### 4. Start Docker (Postgres)

```bash
docker compose up -d
```

### 5. Setup Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Start development server

```bash
npm run dev
```

API will be running at: `http://localhost:3333`

---

## ⚙️ Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/          # Express routers
├── services/        # Business logic layer
├── prisma/          # Prisma client
├── errors/          # Custom error classes
├── middlewares/     # Express middlewares
└── index.ts         # App entry point
```

---

## 🔬 API Endpoints

> Collection: [Postman](#) or use [Swagger UI](#) *(optional, add later)*

| Method | Path        | Description                                      | Body                                 | Response         |
| ------ | ----------- | ------------------------------------------------ | ------------------------------------ | ---------------- |
| GET    | /tasks      | List all tasks (optionally filtered & paginated) | `?status=pending&page=1&pageSize=10` | `Task[]`         |
| GET    | /tasks/\:id | Get task by ID                                   | -                                    | `Task`           |
| POST   | /tasks      | Create task                                      | `{ title, description, status }`     | `Task`           |
| PUT    | /tasks/\:id | Update task                                      | Partial `Task` object                | Updated `Task`   |
| DELETE | /tasks/\:id | Delete task                                      | -                                    | `204 No Content` |

---

## 🚀 Useful Commands

```bash
# Reset database (will delete all data!)
npx prisma migrate reset

# Seed (to be implemented)
npm run seed
```

---

## ✍️ Decisions & Notes

### Prisma Client Generation

> We use `npx prisma generate` after every schema update to generate a type-safe client. This improves developer experience with autocomplete and ensures safety between schema and code.

### Prisma Client Wrapper

> A `client.ts` wrapper was created inside `src/prisma` to avoid duplicated imports across the app.

### Error Handling

> All exceptions are thrown using a custom `AppError` class and handled by a centralized middleware for consistent response format.

### TypeScript Response Errors

> Express expects handlers to return `void | Promise<void>`, so returning the `res.json(...)` call directly causes type mismatch. Instead, we avoid returning responses directly.

### Pagination & Filtering

> The `GET /tasks` endpoint supports optional query parameters (`status`, `page`, `pageSize`) for real-world scalability.

---

## 🎓 Suggestions for Future Improvements

* [ ] Add authentication & authorization layer (JWT)
* [ ] Add Swagger UI documentation via `swagger-ui-express`
* [ ] Add seeding script with mock data
* [ ] Add unit & integration tests with Jest + Supertest
* [ ] Enable ESLint/Prettier config for linting
* [ ] Apply JSDoc to services and DTOs
* [ ] Add a pre-hook using Husky to ensure all commits follow the  [Conventional Commits](https://www.conventionalcommits.org/) standard
