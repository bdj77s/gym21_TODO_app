# 시스템 아키텍처 (System Architecture)

## 개요

본 프로젝트는 3-Tier 아키텍처를 기반으로 한 풀스택 웹 애플리케이션입니다.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │────▶│   Database      │
│   (React)       │◀────│   (FastAPI)     │◀────│   (SQLite)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
     Port 5173              Port 8000              File-based
```

---

## 계층별 상세

### 1. Presentation Layer (프론트엔드)

**기술 스택**
| 구성요소 | 기술 | 역할 |
|----------|------|------|
| Framework | React 18 | UI 컴포넌트 |
| Build Tool | Vite | 번들링, HMR |
| Styling | Tailwind CSS | 스타일링 |
| State Management | TanStack Query | 서버 상태 관리 |
| HTTP Client | Axios | API 통신 |

**디렉토리 구조**
```
frontend/src/
├── main.jsx          # 앱 진입점
├── App.jsx           # 루트 컴포넌트
├── index.css         # 글로벌 스타일
├── api/              # API 클라이언트
│   └── todoApi.js
├── hooks/            # 커스텀 훅
│   └── useTodos.js
└── components/       # UI 컴포넌트
    ├── TodoList.jsx
    ├── TodoItem.jsx
    ├── TodoForm.jsx
    ├── CategoryFilter.jsx
    └── PriorityBadge.jsx
```

**데이터 흐름**
```
User Action → Component → Hook → API Client → Backend
                  ↑                              │
                  └──────── Response ────────────┘
```

---

### 2. Application Layer (백엔드)

**기술 스택**
| 구성요소 | 기술 | 역할 |
|----------|------|------|
| Framework | FastAPI | REST API |
| ORM | SQLAlchemy | DB 추상화 |
| Validation | Pydantic | 데이터 검증 |
| Server | Uvicorn | ASGI 서버 |

**디렉토리 구조**
```
backend/app/
├── __init__.py
├── main.py           # FastAPI 앱, 미들웨어
├── database.py       # DB 연결 설정
├── models.py         # SQLAlchemy 모델
├── schemas.py        # Pydantic 스키마
└── routers/          # API 라우터
    ├── __init__.py
    ├── todos.py
    └── categories.py
```

**요청 처리 흐름**
```
HTTP Request
    │
    ▼
┌─────────────┐
│   Router    │  ← URL 매핑
└─────────────┘
    │
    ▼
┌─────────────┐
│   Schema    │  ← 입력 검증
└─────────────┘
    │
    ▼
┌─────────────┐
│   Service   │  ← 비즈니스 로직
└─────────────┘
    │
    ▼
┌─────────────┐
│   Model     │  ← DB 작업
└─────────────┘
    │
    ▼
HTTP Response
```

---

### 3. Data Layer (데이터베이스)

**기술**: SQLite (파일 기반 관계형 데이터베이스)

**ERD (Entity Relationship Diagram)**
```
┌──────────────────┐       ┌──────────────────┐
│    categories    │       │      todos       │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │───┐   │ id (PK)          │
│ name             │   │   │ title            │
│ color            │   │   │ description      │
└──────────────────┘   │   │ completed        │
                       │   │ priority         │
                       │   │ due_date         │
                       └──▶│ category_id (FK) │
                           │ created_at       │
                           │ updated_at       │
                           └──────────────────┘
```

**테이블 상세**

| categories | 타입 | 제약조건 |
|------------|------|----------|
| id | INTEGER | PRIMARY KEY |
| name | TEXT | NOT NULL |
| color | TEXT | DEFAULT '#6366f1' |

| todos | 타입 | 제약조건 |
|-------|------|----------|
| id | INTEGER | PRIMARY KEY |
| title | TEXT | NOT NULL |
| description | TEXT | NULLABLE |
| completed | BOOLEAN | DEFAULT false |
| priority | TEXT | DEFAULT 'medium' |
| due_date | DATETIME | NULLABLE |
| category_id | INTEGER | FK → categories.id |
| created_at | DATETIME | DEFAULT now() |
| updated_at | DATETIME | DEFAULT now() |

---

## 통신 프로토콜

### API 통신
- **프로토콜**: HTTP/1.1
- **데이터 형식**: JSON
- **인코딩**: UTF-8

### CORS 설정
```python
allow_origins=["http://localhost:5173"]
allow_methods=["*"]
allow_headers=["*"]
```

---

## 확장 고려사항

### 스케일 업 시 변경 포인트

| 현재 | 확장 시 |
|------|---------|
| SQLite | PostgreSQL / MySQL |
| 로컬 파일 | 클라우드 스토리지 |
| 단일 서버 | 로드 밸런서 + 다중 인스턴스 |
| 세션 없음 | JWT 인증 |

### 추가 가능한 기능
- 사용자 인증 (JWT)
- 실시간 업데이트 (WebSocket)
- 파일 첨부 (S3)
- 검색 기능 (Elasticsearch)
- 캐싱 (Redis)
