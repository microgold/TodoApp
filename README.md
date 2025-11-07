# TodoApp

Full-stack demo using React (TypeScript) + .NET 8 Web API + SQLite.

## Run Backend
cd backend
dotnet run

## Run Frontend
cd frontend
npm install
npm run dev

## Run Tests
cd backend
dotnet test

## Rebuild Database
cd backend
sqlite3 todo.db < create_todo_db.sql
