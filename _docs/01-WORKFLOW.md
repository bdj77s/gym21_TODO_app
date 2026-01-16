# 개발 워크플로우 (Development Workflow)

풀스택 프로젝트 개발 시 따라야 할 표준 워크플로우입니다.

## 전체 흐름

```
1. Planning → 2. Setup → 3. Backend → 4. Frontend → 5. Testing → 6. Version Control → 7. Documentation
```

---

## Phase 1: Planning (계획)

### 1.1 요구사항 정의
- [ ] 프로젝트 목표 명확화
- [ ] 핵심 기능 목록 작성
- [ ] 기술 스택 선정

### 1.2 기술 스택 결정
질문 체크리스트:
- 플랫폼은? (웹, 모바일, 데스크톱, CLI)
- 데이터 저장 방식은? (로컬, SQLite, PostgreSQL, MongoDB 등)
- 필요한 기능 범위는? (MVP vs Full Feature)

### 1.3 설계 문서 작성
- 프로젝트 구조 설계
- 데이터베이스 스키마 설계
- API 엔드포인트 설계

**산출물**: 프로젝트 계획서, 기술 스택 문서

---

## Phase 2: Project Setup (프로젝트 설정)

### 2.1 폴더 구조 생성
```bash
mkdir -p project-name/{backend,frontend,docs}
```

### 2.2 버전 관리 초기화
```bash
git init
```

### 2.3 환경 설정 파일 생성
- `.gitignore` 작성
- 환경 변수 템플릿 (`.env.example`)

**산출물**: 프로젝트 기본 구조, Git 저장소

---

## Phase 3: Backend Development (백엔드 개발)

### 3.1 프로젝트 초기화
```bash
# Python (FastAPI)
cd backend
pip install fastapi uvicorn sqlalchemy pydantic
```

### 3.2 핵심 구성요소 구현 순서
1. **Database** - 데이터베이스 연결 설정
2. **Models** - 데이터 모델 정의
3. **Schemas** - 요청/응답 스키마 정의
4. **Routers** - API 엔드포인트 구현
5. **Main** - 앱 진입점 및 미들웨어 설정

### 3.3 API 구현 체크리스트
- [ ] CRUD 엔드포인트
- [ ] 에러 핸들링
- [ ] CORS 설정
- [ ] 입력 유효성 검사

**산출물**: 작동하는 REST API

---

## Phase 4: Frontend Development (프론트엔드 개발)

### 4.1 프로젝트 초기화
```bash
# React + Vite
cd frontend
npm create vite@latest . -- --template react
npm install
```

### 4.2 핵심 구성요소 구현 순서
1. **Config** - Vite, Tailwind 등 설정
2. **API Client** - 백엔드 API 연동 모듈
3. **Hooks** - 데이터 페칭 커스텀 훅
4. **Components** - UI 컴포넌트
5. **App** - 메인 앱 조합

### 4.3 컴포넌트 구현 체크리스트
- [ ] 레이아웃 컴포넌트
- [ ] 폼 컴포넌트
- [ ] 리스트 컴포넌트
- [ ] 상태 표시 컴포넌트

**산출물**: 작동하는 웹 UI

---

## Phase 5: Testing (테스트)

### 5.1 백엔드 테스트
```bash
# 서버 실행
uvicorn app.main:app --reload --port 8000

# API 테스트
# - Swagger UI: http://localhost:8000/docs
# - 수동 테스트: curl 또는 Postman
```

### 5.2 프론트엔드 테스트
```bash
npm run dev
# 브라우저에서 http://localhost:5173 접속
```

### 5.3 통합 테스트
- [ ] 프론트엔드 → 백엔드 연동 확인
- [ ] CRUD 전체 흐름 테스트
- [ ] 에러 케이스 테스트

**산출물**: 테스트 결과 보고서

---

## Phase 6: Version Control (버전 관리)

### 6.1 Git 초기 설정
```bash
git init
git add .
git commit -m "Initial commit: Project description"
```

### 6.2 원격 저장소 연결
```bash
git remote add origin <repository-url>
git push -u origin main
```

### 6.3 커밋 메시지 컨벤션
```
<type>: <subject>

<body>

Co-Authored-By: Name <email>
```

**Type 종류**:
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가

**산출물**: Git 히스토리, 원격 저장소

---

## Phase 7: Documentation (문서화)

### 7.1 필수 문서
- [ ] README.md - 프로젝트 개요
- [ ] API 명세서
- [ ] 개발 환경 설정 가이드
- [ ] 아키텍처 문서

### 7.2 선택 문서
- [ ] 배포 가이드
- [ ] 기여 가이드
- [ ] 변경 이력 (CHANGELOG)

**산출물**: 완성된 프로젝트 문서

---

## 워크플로우 체크리스트 요약

```
□ Phase 1: Planning
  □ 요구사항 정의
  □ 기술 스택 선정
  □ 설계 문서 작성

□ Phase 2: Setup
  □ 폴더 구조 생성
  □ Git 초기화
  □ .gitignore 작성

□ Phase 3: Backend
  □ 의존성 설치
  □ DB 설정
  □ API 구현
  □ 테스트

□ Phase 4: Frontend
  □ 프로젝트 생성
  □ UI 라이브러리 설정
  □ 컴포넌트 구현
  □ API 연동

□ Phase 5: Testing
  □ 백엔드 테스트
  □ 프론트엔드 테스트
  □ 통합 테스트

□ Phase 6: Version Control
  □ 커밋
  □ 원격 저장소 푸시

□ Phase 7: Documentation
  □ README 작성
  □ 기술 문서 작성
```
