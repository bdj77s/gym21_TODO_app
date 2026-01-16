# API 명세서 (API Specification)

## 기본 정보

| 항목 | 값 |
|------|-----|
| Base URL | `http://localhost:8000` |
| API Prefix | `/api` |
| Content-Type | `application/json` |
| 문서 (Swagger) | `http://localhost:8000/docs` |

---

## 인증

현재 버전에서는 인증이 필요하지 않습니다.

---

## 공통 응답 형식

### 성공 응답
```json
{
  "id": 1,
  "field": "value",
  ...
}
```

### 에러 응답
```json
{
  "detail": "Error message"
}
```

### HTTP 상태 코드
| 코드 | 설명 |
|------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 |
| 404 | 리소스 없음 |
| 422 | 유효성 검사 실패 |
| 500 | 서버 오류 |

---

## Todos API

### 1. 할 일 목록 조회

```
GET /api/todos
```

**Query Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| category_id | integer | X | 카테고리 필터 |
| priority | string | X | 우선순위 필터 (low, medium, high) |
| completed | boolean | X | 완료 상태 필터 |
| sort_by | string | X | 정렬 기준 (created_at, due_date, priority) |

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "할 일 제목",
    "description": "상세 설명",
    "completed": false,
    "priority": "high",
    "due_date": "2024-12-31T23:59:59",
    "category_id": 1,
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00",
    "category": {
      "id": 1,
      "name": "업무",
      "color": "#ef4444"
    }
  }
]
```

---

### 2. 할 일 단일 조회

```
GET /api/todos/{id}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| id | integer | O | 할 일 ID |

**Response** `200 OK`
```json
{
  "id": 1,
  "title": "할 일 제목",
  "description": "상세 설명",
  "completed": false,
  "priority": "high",
  "due_date": "2024-12-31T23:59:59",
  "category_id": 1,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00",
  "category": {
    "id": 1,
    "name": "업무",
    "color": "#ef4444"
  }
}
```

**Error** `404 Not Found`
```json
{
  "detail": "Todo not found"
}
```

---

### 3. 할 일 생성

```
POST /api/todos
```

**Request Body**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| title | string | O | 제목 |
| description | string | X | 상세 설명 |
| priority | string | X | 우선순위 (기본: medium) |
| due_date | datetime | X | 마감일 (ISO 8601) |
| category_id | integer | X | 카테고리 ID |

**Request Example**
```json
{
  "title": "보고서 작성",
  "description": "분기 보고서 작성하기",
  "priority": "high",
  "due_date": "2024-12-31T18:00:00",
  "category_id": 1
}
```

**Response** `200 OK`
```json
{
  "id": 1,
  "title": "보고서 작성",
  "description": "분기 보고서 작성하기",
  "completed": false,
  "priority": "high",
  "due_date": "2024-12-31T18:00:00",
  "category_id": 1,
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00",
  "category": {
    "id": 1,
    "name": "업무",
    "color": "#ef4444"
  }
}
```

---

### 4. 할 일 수정

```
PUT /api/todos/{id}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| id | integer | O | 할 일 ID |

**Request Body** (모든 필드 선택)
| 필드 | 타입 | 설명 |
|------|------|------|
| title | string | 제목 |
| description | string | 상세 설명 |
| completed | boolean | 완료 상태 |
| priority | string | 우선순위 |
| due_date | datetime | 마감일 |
| category_id | integer | 카테고리 ID |

**Request Example**
```json
{
  "title": "수정된 제목",
  "priority": "low"
}
```

**Response** `200 OK`
```json
{
  "id": 1,
  "title": "수정된 제목",
  "description": "분기 보고서 작성하기",
  "completed": false,
  "priority": "low",
  ...
}
```

---

### 5. 할 일 삭제

```
DELETE /api/todos/{id}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| id | integer | O | 할 일 ID |

**Response** `200 OK`
```json
{
  "message": "Todo deleted successfully"
}
```

---

### 6. 완료 상태 토글

```
PATCH /api/todos/{id}/toggle
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| id | integer | O | 할 일 ID |

**Response** `200 OK`
```json
{
  "id": 1,
  "title": "할 일 제목",
  "completed": true,
  ...
}
```

---

## Categories API

### 1. 카테고리 목록 조회

```
GET /api/categories
```

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "name": "업무",
    "color": "#ef4444"
  },
  {
    "id": 2,
    "name": "개인",
    "color": "#22c55e"
  }
]
```

---

### 2. 카테고리 생성

```
POST /api/categories
```

**Request Body**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| name | string | O | 카테고리 이름 |
| color | string | X | 색상 코드 (기본: #6366f1) |

**Request Example**
```json
{
  "name": "쇼핑",
  "color": "#f59e0b"
}
```

**Response** `200 OK`
```json
{
  "id": 3,
  "name": "쇼핑",
  "color": "#f59e0b"
}
```

---

### 3. 카테고리 삭제

```
DELETE /api/categories/{id}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| id | integer | O | 카테고리 ID |

**Response** `200 OK`
```json
{
  "message": "Category deleted successfully"
}
```

> 카테고리 삭제 시, 해당 카테고리에 속한 할 일의 `category_id`가 `null`로 변경됩니다.

---

## 사용 예시

### cURL

```bash
# 할 일 목록 조회
curl -X GET "http://localhost:8000/api/todos"

# 할 일 생성
curl -X POST "http://localhost:8000/api/todos" \
  -H "Content-Type: application/json" \
  -d '{"title": "새 할 일", "priority": "high"}'

# 완료 토글
curl -X PATCH "http://localhost:8000/api/todos/1/toggle"

# 할 일 삭제
curl -X DELETE "http://localhost:8000/api/todos/1"
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// 할 일 목록 조회
const todos = await api.get('/todos');

// 할 일 생성
const newTodo = await api.post('/todos', {
  title: '새 할 일',
  priority: 'high'
});

// 완료 토글
const toggled = await api.patch(`/todos/${id}/toggle`);

// 할 일 삭제
await api.delete(`/todos/${id}`);
```

### Python (urllib)

```python
import urllib.request
import json

# 할 일 생성
data = json.dumps({
    'title': '새 할 일',
    'priority': 'high'
}).encode('utf-8')

req = urllib.request.Request(
    'http://localhost:8000/api/todos',
    data=data,
    headers={'Content-Type': 'application/json'},
    method='POST'
)

with urllib.request.urlopen(req) as response:
    result = json.loads(response.read().decode('utf-8'))
    print(result)
```
