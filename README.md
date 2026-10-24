# 📚 북로그 (Book Log)

React + Supabase로 만든 **독서 기록 SPA**입니다. 읽은 책 / 읽는 중인 책 / 읽고 싶은 책을 기록하고, 별점과 짧은 리뷰를 남길 수 있습니다. 핵심 데이터는 **책(books)** 하나이며 등록·조회·수정·삭제(CRUD)를 지원합니다.

## 제출 정보

| 항목 | 링크 |
| --- | --- |
| 배포 URL | https://book-log-ruddy.vercel.app |
| GitHub | https://github.com/kkhaa0405-hub/book-log |

## 1. 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| UI | React 18 (함수형 컴포넌트, Hooks) |
| 빌드 도구 | Vite 5 |
| 라우팅 | React Router v6 |
| 백엔드(BaaS) | Supabase (PostgreSQL, `@supabase/supabase-js` v2) |
| 스타일 | 순수 CSS |
| 언어 | JavaScript |
| 배포 | Vercel |

## 2. 실행 방법

사전 준비: **Node.js 18 이상**, Supabase 프로젝트

```bash
# 1) 저장소 받기
git clone https://github.com/kkhaa0405-hub/book-log.git
cd book-log

# 2) 의존성 설치
npm install

# 3) 환경변수 파일 만들기 (Windows 명령 프롬프트: copy .env.example .env)
cp .env.example .env
#    → .env 를 열어 Supabase 값 입력 (3절 참고)

# 4) 개발 서버 실행
npm run dev        # http://localhost:5173
```

## 3. Supabase 설정

1. [supabase.com](https://supabase.com)에서 새 프로젝트를 만듭니다.
2. **SQL Editor**에 `supabase/schema.sql` 전체를 붙여넣고 **Run** 합니다. (`books` 테이블, 접근 정책, 샘플 데이터 3건 생성)
3. **Project Settings → API Keys**에서 `Project URL`과 공개용 키(`anon` 또는 `Publishable key`)를 확인합니다.
4. 두 값을 `.env`에 입력합니다.

> 샘플 데이터는 `schema.sql`을 실행할 때마다 다시 들어가므로 처음 한 번만 전체를 실행하세요.

## 4. 환경변수

| 변수 | 설명 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase 공개용(anon / publishable) 키 |

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxx
```

- `.env`는 `.gitignore`에 포함되어 커밋되지 않으며, 저장소에는 `.env.example`만 있습니다.
- 값에는 따옴표나 공백을 넣지 않습니다.
- `service_role` / secret 키는 사용하지 않습니다.

## 5. 배포

Vercel로 배포했습니다.

1. 코드를 GitHub에 푸시합니다.
2. Vercel에서 저장소를 가져옵니다. (Framework Preset: Vite)
3. **Environment Variables**에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 등록하고 Deploy 합니다.

`vercel.json`의 rewrite 설정으로 `/books/:id` 같은 주소에서 새로고침해도 404가 나지 않습니다.

## 6. 요구사항 충족 현황

### 프로젝트 기본 구성

- [x] React 프로젝트 (Vite + React 18)
- [x] `pages` / `components` / `hooks` / `lib` 폴더 분리
- [x] 공통 레이아웃(헤더·네비게이션)이 모든 페이지에 적용
- [x] 단일 핵심 데이터: `books`

### 라우팅

- [x] 6개 라우트 + Not Found
- [x] 목록 / 상세 라우트: `/books`, `/books/:id`
- [x] 잘못된 주소 → `NotFoundPage`
- [x] 헤더 링크로 주요 라우트 이동

### 컴포넌트 설계

- [x] props에 따라 동작·표시가 달라지는 재사용 컴포넌트 8개 이상
- [x] 페이지(`pages/`)와 UI 컴포넌트(`components/`) 분리
- [x] 로딩 / 에러 / 빈 상태를 `AsyncBoundary`로 통일

### 상태 관리

- [x] 폼 입력: controlled input
- [x] 목록 / 상세 데이터 상태, 로딩 / 에러 상태
- [x] 커스텀 훅: `useBooks`, `useBookDetail`, `useBookMutations`

### CRUD (Supabase 원격 데이터)

- [x] 목록 조회 → 카드 리스트 렌더링
- [x] 상세 조회 → 라우트 파라미터 `id`로 한 권 조회
- [x] 등록 / 수정 → 폼 입력 → 제출 → 성공 시 상세로 이동
- [x] 삭제 → 성공 시 목록으로 이동

### 폼 UX

- [x] 필수값 검증
- [x] 필드 아래 에러 메시지
- [x] 제출 중 버튼 스피너 + 비활성화
- [x] 요청 실패 시 화면에 실패 표시

### 이벤트 & 렌더링

- [x] 상태 변경 → 렌더링 변화 지점 3곳 이상 (12절)

### 배포

- [x] Vercel 배포, 환경변수 등록
- [x] 배포 URL에서 목록·상세·등록·수정·삭제 동작

## 7. 라우트

| 경로 | 페이지 | 설명 |
| --- | --- | --- |
| `/` | `HomePage` | 독서 현황 요약 |
| `/books` | `BookListPage` | 목록, 필터 / 정렬 / 검색 |
| `/books/new` | `BookNewPage` | 책 등록 |
| `/books/:id` | `BookDetailPage` | 상세 조회, 수정 이동, 삭제 |
| `/books/:id/edit` | `BookEditPage` | 책 수정 |
| `/about` | `AboutPage` | 서비스 소개 |
| `*` | `NotFoundPage` | 잘못된 주소 |

## 8. 폴더 구조

```
src/
├─ pages/        # 라우트 단위 화면
├─ components/   # 재사용 UI 컴포넌트 (layout/ 포함)
├─ hooks/        # useBooks, useBookDetail, useBookMutations
└─ lib/          # supabaseClient, booksApi, validators, format
```

```
pages ──▶ hooks ──▶ lib/booksApi ──▶ Supabase
  │
  └────▶ components (props 로만 데이터를 받음)
```

## 9. 컴포넌트 · 훅

### 재사용 컴포넌트 (`src/components`)

| 컴포넌트 | 역할 |
| --- | --- |
| `Button` | 공통 버튼. `loading`이면 스피너 + 비활성화 |
| `FormField` | 라벨 + 입력 + 에러 메시지 |
| `RatingInput` / `RatingStars` | 별점 입력 / 표시 |
| `StatusBadge` | 읽기 상태 배지 |
| `BookCard` / `BookList` | 책 카드 / 목록 |
| `BookForm` | 등록·수정 공용 폼 |
| `FilterBar` | 필터·정렬·검색 UI |
| `Loading` / `ErrorState` / `EmptyState` | 로딩 / 실패 / 빈 상태 |
| `AsyncBoundary` | 로딩 → 에러 → 빈 상태 → 성공 분기 |
| `ConfirmButton` | 삭제 확인 버튼 |
| `Layout` / `Header` / `PageHeader` | 공통 레이아웃, 네비게이션, 제목 영역 |

### 커스텀 훅 (`src/hooks`)

| 훅 | 반환값 |
| --- | --- |
| `useBooks({ status, sort })` | `{ books, loading, error, reload }` |
| `useBookDetail(id)` | `{ book, loading, error, reload }` |
| `useBookMutations()` | `{ create, update, remove, pending, error }` |

## 10. 데이터 모델

테이블 `public.books`

| 컬럼 | 타입 | 설명 |
| --- | --- | --- |
| `id` | uuid (PK) | 라우트 파라미터로 사용 |
| `title` | text | 책 제목 (1~100자) |
| `author` | text | 저자 (1~50자) |
| `status` | text | `want` / `reading` / `done` |
| `rating` | int | 별점 1~5 |
| `review` | text | 리뷰 (최대 1000자) |
| `created_at` | timestamptz | 등록 시각 |
| `updated_at` | timestamptz | 수정 시각 |

## 11. 폼 검증

검증은 `lib/validators.js`의 `validateBook(values)` 한 곳에 있습니다.

| 필드 | 규칙 |
| --- | --- |
| 제목 | 필수, 100자 이내 |
| 저자 | 필수, 50자 이내 |
| 읽기 상태 | `want` / `reading` / `done` 중 하나 |
| 별점 | 1~5 정수 |
| 리뷰 | 필수, 5자 이상 1000자 이내 |

- 제출하면 모든 필드의 에러가 표시되고, 검증에 실패하면 요청은 나가지 않습니다.
- 제출 중에는 버튼이 스피너와 함께 비활성화됩니다.
- 서버 요청이 실패하면 폼 상단에 실패 메시지가 표시되고 입력값은 유지됩니다.

## 12. 상태 변경 → 렌더링 지점

| # | 사용자 이벤트 | 상태 변화 | 렌더링 변화 |
| --- | --- | --- | --- |
| 1 | 상태 탭 / 정렬 변경 | `status`, `sort` → 재조회 | 로딩 스피너 후 목록 교체 |
| 2 | 검색어 입력 | `search` | 목록 즉시 필터링 |
| 3 | 폼 입력 | `values` | 미리보기 카드 변경 |
| 4 | 제출 시도 | `submitted` | 필드 에러 표시 |
| 5 | 제출 클릭 | `pending` | 버튼 스피너 + 비활성화 |

## 13. 과제 목표 설명

### 13-1. 컴포넌트를 왜, 어떤 기준으로 쪼갰는가

컴포넌트를 쓰면 반복되는 UI를 한 번만 만들고, 바뀌는 부분만 props로 넘길 수 있습니다.

쪼갠 기준은 **"무엇을 할지"와 "어떻게 보일지"의 분리**입니다.

- **페이지**: 라우트 파라미터를 읽고, 훅을 호출하고, 성공 후 이동을 결정합니다.
- **UI 컴포넌트**: props만 받아 보여 주는 일에 집중하며 직접 fetch하지 않습니다.
- **반복 패턴은 한 번만**: 로딩 / 에러 / 빈 상태는 `AsyncBoundary`로, 등록·수정 폼은 `BookForm` 하나로 통일했습니다.
- **React와 무관한 로직은 `lib/`로**: 검증, API 호출, 포맷을 분리했습니다.

### 13-2. props와 state의 차이, 상태의 위치

- **props**: 부모가 내려주는 읽기 전용 값.
- **state**: 컴포넌트가 소유하고, 바뀌면 리렌더링을 일으키는 값.

상태는 그 값을 필요로 하는 컴포넌트들의 **가장 가까운 공통 부모**에 둡니다.

| 상태 | 위치 | 이유 |
| --- | --- | --- |
| `status`, `sort`, `search` | `BookListPage` | `FilterBar`(변경)와 목록(표시)이 함께 쓰므로 부모에 두고 값과 핸들러를 props로 내려줌 |
| `values`, `submitted` | `BookForm` | 입력 UI와 미리보기가 같은 컴포넌트 안에서만 쓰임 |
| `errors` | state 아님 | `values`에서 계산되는 파생값이라 state로 두지 않음 |
| `pending`, `error` | `useBookMutations` → 페이지 → props | 요청을 수행하는 쪽이 아는 정보 |

### 13-3. useEffect는 언제 실행되고 데이터 요청과 어떤 관계인가

`useEffect`는 렌더링이 화면에 반영된 **뒤** 실행되며, 의존성 배열의 값이 바뀔 때마다 다시 실행됩니다.

| 훅 | 의존성 | 실행 시점 |
| --- | --- | --- |
| `useBooks` | `[status, sort, reloadKey]` | 마운트 시, 필터·정렬 변경 시, 다시 시도 시 |
| `useBookDetail` | `[id, reloadKey]` | 마운트 시, 라우트 파라미터 변경 시, 다시 시도 시 |

흐름: `loading = true`로 초기화 → Supabase 요청 → 성공하면 데이터 저장, 실패하면 `error` 저장 → `loading = false`.

### 13-4. 비동기 흐름의 UI 표현

`AsyncBoundary`가 **로딩 → 에러 → 빈 상태 → 성공** 순서로 분기합니다.

| 상태 | 표현 |
| --- | --- |
| 로딩 | `Loading` 스피너 |
| 실패 | `ErrorState` ("요청에 실패했습니다. 다시 시도하세요." + 다시 시도 버튼) |
| 빈 상태 | `EmptyState` ("표시할 데이터가 없습니다.") |
| 성공 | 목록 / 상세 렌더링 |
| 제출 중 | 버튼 스피너 + 비활성화 |
| 제출 실패 | 폼 상단 에러 메시지, 페이지 이동 없음 |

### 13-5. 하나의 기능이 연결되는 흐름: "책 등록"

```
/books/new 접속
 → Router 가 BookNewPage 렌더링
 → BookForm 렌더링 (values = 초기값)
 → 사용자가 입력 (onChange)
     → values state 변경 → 입력창·미리보기 카드 리렌더링
 → 제출 클릭 (onSubmit)
     → 검증 실패: errors 표시, 요청 안 함
     → 검증 통과: create(values)
         → pending = true → 버튼 스피너·비활성화
         → Supabase insert
             ├ 성공: navigate('/books/:id')
             │        → BookDetailPage 마운트 → useBookDetail effect 실행
             │        → 로딩 스피너 → 상세 렌더링
             └ 실패: error 저장 → 폼 상단 에러 표시 (이동 없음)
         → pending = false
```
