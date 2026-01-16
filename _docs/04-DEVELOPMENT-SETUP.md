# 개발 환경 설정 가이드 (Development Setup Guide)

## 사전 요구사항

### 필수 소프트웨어

| 소프트웨어 | 버전 | 확인 명령어 |
|------------|------|-------------|
| Python | 3.11+ | `python --version` |
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |
| Git | 2.0+ | `git --version` |

### 설치 안내

**Python**
- Windows: https://www.python.org/downloads/
- macOS: `brew install python`
- Linux: `sudo apt install python3`

**Node.js**
- 모든 OS: https://nodejs.org/ (LTS 버전 권장)
- macOS: `brew install node`
- Linux: `sudo apt install nodejs npm`

---

## 프로젝트 클론

```bash
git clone https://github.com/bdj77s/lecture-claude-code-mastery.git
cd lecture-claude-code-mastery/todo-app
```

---

## 백엔드 설정

### 1. 디렉토리 이동

```bash
cd backend
```

### 2. 가상환경 생성 (권장)

```bash
# 가상환경 생성
python -m venv venv

# 활성화
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 3. 의존성 설치

```bash
pip install -r requirements.txt
```

### 4. 서버 실행

```bash
uvicorn app.main:app --reload --port 8000
```

### 5. 확인

- API 서버: http://localhost:8000
- Swagger 문서: http://localhost:8000/docs
- ReDoc 문서: http://localhost:8000/redoc

---

## 프론트엔드 설정

### 1. 디렉토리 이동

```bash
cd frontend
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 확인

- 웹 앱: http://localhost:5173

---

## 동시 실행 (권장)

두 개의 터미널을 열어 각각 실행하거나, 아래 방법을 사용합니다.

### 방법 1: 두 개의 터미널

**터미널 1 (백엔드)**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**터미널 2 (프론트엔드)**
```bash
cd frontend
npm run dev
```

### 방법 2: 백그라운드 실행 (Unix/macOS)

```bash
# 백엔드 백그라운드 실행
cd backend && uvicorn app.main:app --reload --port 8000 &

# 프론트엔드 실행
cd frontend && npm run dev
```

---

## 환경 변수 (선택)

### 백엔드

`backend/.env` 파일 생성:
```env
DATABASE_URL=sqlite:///./todo.db
CORS_ORIGINS=http://localhost:5173
```

### 프론트엔드

`frontend/.env.local` 파일 생성:
```env
VITE_API_URL=http://localhost:8000/api
```

---

## 데이터베이스

### SQLite 파일 위치

```
backend/todo.db
```

### 초기화 (데이터 삭제)

```bash
rm backend/todo.db
# 서버 재시작 시 자동 생성
```

### DB 확인 도구

- CLI: `sqlite3 backend/todo.db`
- GUI: [DB Browser for SQLite](https://sqlitebrowser.org/)

---

## 트러블슈팅

### 포트 충돌

**문제**: `Address already in use`

**해결**:
```bash
# 사용 중인 프로세스 확인
# Windows
netstat -ano | findstr :8000

# macOS/Linux
lsof -i :8000

# 프로세스 종료
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

### CORS 오류

**문제**: 프론트엔드에서 API 호출 시 CORS 에러

**해결**: `backend/app/main.py`에서 CORS 설정 확인
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 모듈 없음 오류

**문제**: `ModuleNotFoundError`

**해결**:
```bash
# 가상환경 활성화 확인
which python  # venv 경로여야 함

# 의존성 재설치
pip install -r requirements.txt
```

### npm 오류

**문제**: `npm install` 실패

**해결**:
```bash
# 캐시 정리
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

---

## IDE 설정

### VS Code 권장 확장

**백엔드**
- Python (ms-python.python)
- Pylance (ms-python.vscode-pylance)

**프론트엔드**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier - Code formatter

### VS Code 설정 (`.vscode/settings.json`)

```json
{
  "editor.formatOnSave": true,
  "python.defaultInterpreterPath": "./backend/venv/bin/python",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  }
}
```
