# 📝 TaskSync

TaskSync is a simple fullstack task management application and this is the frontend built with:

* **Frontend**: ReactJS + TypeScript + TailwindCSS

## 🚀 Features

* List, create, edit, and delete tasks
* Task status: `pending`, `in-progress`, `done`
* Modal form reused for both creating and editing
* Real-time updates with WebSocket when tasks are created, updated, or deleted
* Centralized state management using React Context + Reducer
* Clear loading and error handling during task fetch

## 🗂️ Project Structure

```
/task-sync
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   ├── prisma
│   │   └── index.ts (server setup)
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── types
│   │   └── main.tsx
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-sync.git
cd task-sync
```
```

### 2. Setup frontend

```bash
cd frontend
npm install
npm run dev
```

Access at: [http://localhost:5173](http://localhost:5173)

---

## 🧠 Technical Decisions

* **WebSocket (Socket.IO)**: real-time updates across clients via `task:created`, `task:updated`, `task:deleted`
* **Task modal reuse**: one modal reused for both creating and editing
* **index.ts in components**: simplifies centralized imports and folder refactors

## 🧪 Testing (planned)

* Backend: Jest + Supertest (controllers)
* Frontend: React Testing Library

### Planned test coverage

* [ ] TaskPage integration (modal + list interaction)
* [ ] Reducer isolated logic

---

## 🧩 Future Improvements

### ✅ Additional Tests (Frontend)

* [ ] Test `TaskPage` integration flow (modal & list)
* [ ] Isolated reducer tests

### 🔍 UX Enhancements

* [ ] Toasts for success/error actions
* [ ] Loading state on submit buttons
* [ ] Confirmation modal before deleting

### 📦 Functional Enhancements

* [ ] Pagination and page control (frontend)
* [ ] Filter by status (all, pending, etc.)
* [ ] Improved validation on form fields
* [ ] Search or keyword filter

### ☁️ Deployment

* [ ] Add Dockerfile and docker-compose for local/dev/prod environments
* [ ] CI/CD pipeline for lint, type-check and tests



