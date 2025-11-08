# 🧩 TodoApp

A **full-stack to-do task management application** built with:

* **Frontend:** React 18 + TypeScript + Redux Toolkit + Axios
* **Backend:** .NET 8 Web API + Entity Framework Core
* **Database:** SQLite (with optional EF In-Memory provider for testing)

This project demonstrates clean architecture, separation of concerns, and modern full-stack communication between a REST API and a single-page frontend.

---

## 🎯 Objective

This take-home project implements a simple, scalable **task manager** where users can:

* View all tasks
* Create a new task
* Mark a task as complete/incomplete (toggle)
* Delete tasks

It’s designed to showcase:

* Backend API design in **.NET Core**
* Frontend component design in **React**
* Database modeling and persistence with **EF Core**
* Communication between layers
* Clean architecture, modular structure, and readable code
* Thought process, trade-offs, and future scalability

---

## ⚙️ Setup & Running the Application

### 🧱 Prerequisites

* [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
* [Node.js 18+](https://nodejs.org/en/download)
* npm or yarn
* SQLite CLI (for inspecting or resetting the database)

---

### 🚀 Run Backend

```bash
cd backend
dotnet restore
dotnet run
```

The API will start on **[http://localhost:5223](http://localhost:5223)** by default.

You can test endpoints via Swagger at:

```
http://localhost:5223/swagger
```

---

### 💻 Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will start the app at **[http://localhost:5173](http://localhost:5173)**

The frontend automatically communicates with the backend using an environment variable:

```env
VITE_API_BASE_URL=http://localhost:5223/api
```

---

### 🧪 Run Tests

```bash
cd Todo.Test
dotnet test
```

Unit tests are implemented with **xUnit** using the **EF Core InMemory provider** for fast, isolated database testing.

---

### 🧰 Rebuild or Reset Database

```bash
cd backend
sqlite3 todo.db < create_todo_db.sql
```

You can also delete `todo.db` and EF Core will re-create it on next run.

---

## 🧩 Architecture Overview

### Backend (.NET 8 Web API)

#### Structure

```
backend/
├── Controllers/
│   └── TasksController.cs
├── Services/
│   └── TaskService.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│   └── TaskItem.cs
├── Middleware/
│   └── ErrorHandlingMiddleware.cs
├── Program.cs
└── appsettings.json
```

#### Design Notes

* **Controllers** handle HTTP requests and responses only (no database logic).
* **Services** encapsulate business logic and data access through EF Core.
* **AppDbContext** defines the data schema and SQLite connection.
* **Dependency Injection** is used throughout for testability (`ITaskService` injected into controllers).
* **ErrorHandlingMiddleware** centralizes exception logging and returns structured JSON errors.
* **Logging** uses the built-in `ILogger<T>` for structured console output.

#### Data Model

```csharp
public class TaskItem {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}
```

#### Example Endpoints

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/tasks`      | Get all tasks           |
| POST   | `/api/tasks`      | Create a task           |
| PUT    | `/api/tasks/{id}` | Update or toggle a task |
| DELETE | `/api/tasks/{id}` | Delete a task           |

---

### Frontend (React + TypeScript + Vite)

#### Structure

```
frontend/src/
├── components/
│   ├── TaskForm/
│   ├── TaskList/
│   └── TaskItem/
├── features/
│   └── tasks/
│       ├── tasksSlice.ts
│       └── taskTypes.ts
├── store/
│   └── index.ts
├── api/
│   └── axiosClient.ts
└── main.tsx
```

#### Design Notes

* **Redux Toolkit** manages global state (`tasksSlice` for CRUD operations).
* **Axios** handles REST calls to the backend.
* **CSS Modules** provide scoped component styling.
* **ErrorBoundary** ensures graceful UI recovery from runtime errors.
* **Vite** is used as the build system for fast hot-reloads and `.env` management.

#### Component Behavior

| Component  | Role                                                 |
| ---------- | ---------------------------------------------------- |
| `TaskForm` | Handles task creation and input validation           |
| `TaskList` | Maps state tasks to individual `TaskItem` components |
| `TaskItem` | Displays task title and handles toggling/deletion    |

Each toggle updates Redux state and persists via an API `PUT` call to `/api/tasks/{id}`.

---

## 🧠 Trade-offs & Assumptions

* **Single-user app:** No authentication implemented for simplicity.
* **SQLite chosen** for easy local setup. EF Core can switch to SQL Server or PostgreSQL with minimal config changes.
* **Optimistic UI updates:** The frontend updates state immediately on toggle before the API responds.
* **Minimal validation:** Real MVP would include required field validation and error toasts.
* **Simple styling:** Focused on component structure, not polished design.

---

## 🚀 Future Enhancements (Production MVP)

1. **Authentication & Authorization**
   Add JWT-based login and per-user task storage.
2. **Pagination & Filtering**
   Support large datasets efficiently.
3. **Task Categories / Due Dates / Priorities**
4. **UI Improvements**
   Better UX with modals, animations, and Material UI.
5. **Persistent storage abstraction**
   Introduce repository pattern or CQRS for scaling.
6. **Containerization**
   Add Dockerfile + docker-compose for full environment parity.
7. **Monitoring / Metrics**
   Add Serilog or Application Insights for production logging.

---

## 🧾 Summary

This project demonstrates:

* Modern **React + . NET 8** integration
* Clean, testable **API architecture** with a service layer
* Realistic **Redux + Axios** data flow
* Thoughtful design decisions, trade-offs, and room for scalability

