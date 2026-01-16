# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

Always respond in Korean (한글로 응답).

## Project Overview

Full-stack TODO application with React frontend and FastAPI backend.

## Development Commands

### Backend (FastAPI + SQLite)
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build
```

## Architecture

**3-Tier Structure:**
- Frontend (React 18 + TanStack Query + Tailwind CSS) on port 5173
- Backend (FastAPI + SQLAlchemy + Pydantic) on port 8000
- Database (SQLite file at `backend/todo.db`)

**Backend Pattern:**
- `app/main.py` - FastAPI app with CORS middleware
- `app/routers/` - API endpoints (`todos.py`, `categories.py`)
- `app/models.py` - SQLAlchemy ORM models
- `app/schemas.py` - Pydantic request/response validation
- `app/database.py` - SQLite connection setup

**Frontend Pattern:**
- `src/api/todoApi.js` - Axios API client (base URL: `http://localhost:8000/api`)
- `src/hooks/useTodos.js` - TanStack Query hooks wrapping API calls
- `src/components/` - React components (TodoList, TodoItem, TodoForm, etc.)

**Data Flow:**
```
Component → useTodos hook → todoApi.js → FastAPI router → SQLAlchemy model → SQLite
```

## API Routes

All routes prefixed with `/api`:
- `GET/POST /todos` - List/create todos (supports `category_id`, `priority`, `completed`, `sort_by` query params)
- `GET/PUT/DELETE /todos/{id}` - Single todo operations
- `PATCH /todos/{id}/toggle` - Toggle completion
- `GET/POST /categories` - List/create categories
- `DELETE /categories/{id}` - Delete category

## Database

SQLite file auto-created on first run. Two tables:
- `todos` - id, title, description, completed, priority, due_date, category_id, timestamps
- `categories` - id, name, color

Reset database: delete `backend/todo.db` and restart server.
