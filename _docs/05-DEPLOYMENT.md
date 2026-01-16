# 배포 가이드 (Deployment Guide)

## 배포 옵션 개요

| 옵션 | 백엔드 | 프론트엔드 | 비용 | 난이도 |
|------|--------|------------|------|--------|
| 로컬 서버 | Uvicorn | Nginx | 무료 | 쉬움 |
| Render + Vercel | Render | Vercel | 무료* | 쉬움 |
| Railway | Railway | Railway | 무료* | 쉬움 |
| AWS | EC2/Lambda | S3+CloudFront | 유료 | 어려움 |
| Docker | Docker | Docker | 변동 | 중간 |

*무료 티어 제한 있음

---

## 옵션 1: Render (백엔드) + Vercel (프론트엔드)

### 백엔드 - Render 배포

#### 1. 준비

`backend/render.yaml` 생성:
```yaml
services:
  - type: web
    name: todo-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

#### 2. Render 설정

1. https://render.com 접속 및 로그인
2. New → Web Service
3. GitHub 리포지토리 연결
4. 설정:
   - Name: `todo-api`
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### 3. 환경 변수

Render 대시보드 → Environment:
```
DATABASE_URL=sqlite:///./todo.db
```

### 프론트엔드 - Vercel 배포

#### 1. 준비

`frontend/vercel.json` 생성:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

#### 2. 환경 변수 수정

`frontend/src/api/todoApi.js` 수정:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})
```

#### 3. Vercel 설정

1. https://vercel.com 접속 및 로그인
2. New Project → GitHub 리포지토리 선택
3. 설정:
   - Framework Preset: Vite
   - Root Directory: `frontend`
4. Environment Variables:
   ```
   VITE_API_URL=https://your-render-url.onrender.com/api
   ```

---

## 옵션 2: Railway (풀스택)

### 1. 준비

`railway.json` 생성 (프로젝트 루트):
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  }
}
```

### 2. Railway 설정

1. https://railway.app 접속 및 로그인
2. New Project → Deploy from GitHub repo
3. 두 개의 서비스 추가:
   - Backend (Root: `/backend`)
   - Frontend (Root: `/frontend`)

### 3. 환경 변수

**Backend**:
```
PORT=8000
```

**Frontend**:
```
VITE_API_URL=${{Backend.RAILWAY_PUBLIC_DOMAIN}}/api
```

---

## 옵션 3: Docker 배포

### 백엔드 Dockerfile

`backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 프론트엔드 Dockerfile

`frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

`docker-compose.yml` (프로젝트 루트):
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
    environment:
      - DATABASE_URL=sqlite:///./data/todo.db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://localhost:8000/api
```

### 실행

```bash
# 빌드 및 실행
docker-compose up --build

# 백그라운드 실행
docker-compose up -d

# 중지
docker-compose down
```

---

## 배포 전 체크리스트

### 보안

- [ ] 환경 변수로 민감 정보 관리
- [ ] CORS 설정 프로덕션 도메인으로 변경
- [ ] HTTPS 적용
- [ ] 에러 메시지에서 민감 정보 제거

### 성능

- [ ] 프론트엔드 빌드 최적화 (`npm run build`)
- [ ] 정적 파일 압축 (gzip)
- [ ] 데이터베이스 인덱스 확인

### 모니터링

- [ ] 로깅 설정
- [ ] 헬스체크 엔드포인트 (`/health`)
- [ ] 에러 추적 (Sentry 등)

---

## 프로덕션 CORS 설정

`backend/app/main.py` 수정:
```python
import os

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

환경 변수:
```
CORS_ORIGINS=https://your-frontend-domain.vercel.app,https://your-custom-domain.com
```

---

## 데이터베이스 마이그레이션 (프로덕션)

SQLite → PostgreSQL 전환 시:

### 1. 의존성 추가

```bash
pip install psycopg2-binary
```

### 2. 환경 변수 변경

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

### 3. database.py 수정

```python
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todo.db")

# PostgreSQL 연결 시 check_same_thread 제거
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)
```
