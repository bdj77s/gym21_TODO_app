# TODO App

풀스택 TODO 애플리케이션 (React + FastAPI + SQLite)

## 기술 스택

### Backend
- Python 3.11+
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- React 18
- Vite
- Tailwind CSS
- TanStack Query (React Query)
- Axios

## 주요 기능

- TODO CRUD (생성, 조회, 수정, 삭제)
- 완료 상태 토글
- 카테고리 분류 및 필터링
- 우선순위 설정 (높음/보통/낮음)
- 마감일 설정 및 기한 초과 표시
- 정렬 (최신순, 마감일순, 우선순위순)

## 설치 및 실행

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- API: http://localhost:8000
- API 문서: http://localhost:8000/docs

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- 웹 앱: http://localhost:5173

## API 엔드포인트

### Todos
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/todos | 전체 목록 |
| GET | /api/todos/{id} | 단일 조회 |
| POST | /api/todos | 생성 |
| PUT | /api/todos/{id} | 수정 |
| DELETE | /api/todos/{id} | 삭제 |
| PATCH | /api/todos/{id}/toggle | 완료 토글 |

### Categories
| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | /api/categories | 전체 목록 |
| POST | /api/categories | 생성 |
| DELETE | /api/categories/{id} | 삭제 |

### 필터링 옵션 (GET /api/todos)
- `category_id` - 카테고리 필터
- `priority` - 우선순위 필터 (low, medium, high)
- `completed` - 완료 상태 필터 (true, false)
- `sort_by` - 정렬 기준 (created_at, due_date, priority)

## 프로젝트 구조

```
todo-app/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI 앱
│   │   ├── database.py       # DB 설정
│   │   ├── models.py         # SQLAlchemy 모델
│   │   ├── schemas.py        # Pydantic 스키마
│   │   └── routers/
│   │       ├── todos.py
│   │       └── categories.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── components/
    │   ├── hooks/
    │   └── api/
    ├── package.json
    └── vite.config.js
```

## 문서 (Documentation)

프로젝트 관련 상세 문서는 `_docs/` 폴더에서 확인할 수 있습니다.

| 문서 | 파일명 | 설명 |
|------|--------|------|
| 개발 워크플로우 | [01-WORKFLOW.md](./_docs/01-WORKFLOW.md) | 7단계 개발 프로세스 가이드 |
| 시스템 아키텍처 | [02-ARCHITECTURE.md](./_docs/02-ARCHITECTURE.md) | 3-Tier 구조, ERD, 데이터 흐름 |
| API 명세서 | [03-API-SPECIFICATION.md](./_docs/03-API-SPECIFICATION.md) | REST API 전체 명세 및 사용 예제 |
| 개발 환경 설정 | [04-DEVELOPMENT-SETUP.md](./_docs/04-DEVELOPMENT-SETUP.md) | 환경 구성, 트러블슈팅, IDE 설정 |
| 배포 가이드 | [05-DEPLOYMENT.md](./_docs/05-DEPLOYMENT.md) | Render, Vercel, Docker 배포 방법 |
| 프로젝트 체크리스트 | [06-PROJECT-CHECKLIST-TEMPLATE.md](./_docs/06-PROJECT-CHECKLIST-TEMPLATE.md) | 재사용 가능한 프로젝트 템플릿 |
