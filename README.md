# 📚 북로그 (Book Log)

React + Supabase 로 만든 독서 기록 SPA 입니다. 핵심 데이터는 **책(books)** 이며 등록 / 조회 / 수정 / 삭제(CRUD)를 지원합니다.

- 배포 URL: `https://YOUR-APP.vercel.app` ← 배포 후 교체
- GitHub: `https://github.com/YOUR-ID/book-log` ← 푸시 후 교체

## 기술 스택

- React 18, Vite (JavaScript)
- React Router v6 (라우팅)
- Supabase (PostgreSQL, `@supabase/supabase-js`)
- 순수 CSS
- 배포: Vercel (Netlify 도 가능)

## 로컬 실행 방법

```bash
# 1) 의존성 설치 (Node.js 18 이상)
npm install

# 2) 환경변수 파일 생성 후 값 입력
cp .env.example .env        # Windows: copy .env.example .env

# 3) 개발 서버 실행
npm run dev                 # http://localhost:5173

# (선택) 프로덕션 빌드 확인
npm run build
npm run preview
```

### Supabase 준비

1. [supabase.com](https://supabase.com) 에서 새 프로젝트 생성
2. **SQL Editor** 에 `supabase/schema.sql` 전체를 붙여넣고 **Run** (테이블 + RLS 정책 + 샘플 데이터 생성)
3. **Project Settings → API** 의 `Project URL`, `anon (publishable) key` 를 `.env` 에 입력

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxx
```

> `.env` 는 `.gitignore` 에 포함되어 있어 커밋되지 않습니다. 저장소에는 `.env.example` 만 올라갑니다.
> 학습용으로 RLS 정책을 anon 에게 모두 열어 두었습니다(로그인 없이 CRUD 가능). 실서비스라면 Auth + 사용자별 정책이 필요합니다.

## 배포 방법 (Vercel)

1. GitHub 에 푸시 (`.env` 가 올라가지 않았는지 확인)
2. Vercel → **Add New Project** → 저장소 선택 (Framework: Vite 자동 인식)
3. **Environment Variables** 에 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 등록 후 Deploy
4. `vercel.json` 의 rewrite 설정 덕분에 `/books/123` 같은 주소로 직접 접속/새로고침해도 동작합니다.
   (Netlify 는 `public/_redirects` 가 같은 역할을 합니다.)

> 환경변수를 추가/변경한 뒤에는 **Redeploy** 해야 반영됩니다. (Vite 는 빌드 시점에 값을 주입합니다.)

## 라우트

| 경로 | 페이지 | 설명 |
| --- | --- | --- |
| `/` | HomePage | 독서 현황 요약, 최근 책 3권 |
| `/books` | BookListPage | 목록, 상태 필터 / 정렬 / 검색 |
| `/books/new` | BookNewPage | 책 등록 폼 |
| `/books/:id` | BookDetailPage | 상세 조회, 삭제 |
| `/books/:id/edit` | BookEditPage | 책 수정 폼 |
| `/about` | AboutPage | 소개 |
| `*` | NotFoundPage | 잘못된 주소 |

## 폴더 구조

```
src/
├─ pages/        라우트 단위 화면 (데이터 연결, 이동, 알림 담당)
├─ components/   재사용 UI 컴포넌트 (props 로만 동작)
│  └─ layout/    Layout, Header, PageHeader
├─ hooks/        useBooks, useBookDetail, useBookMutations (커스텀 훅)
├─ context/      ToastContext (전역 알림 상태)
└─ lib/          supabaseClient, booksApi(원격 CRUD), validators, format
```

## 요구사항 체크리스트

- [x] 라우트 6개 + Not Found, 헤더 네비게이션 링크
- [x] 원격(Supabase) CRUD, 목록/상세 페이지
- [x] 폼: 필수값/길이 검증, 필드별 에러 메시지, 제출 중 스피너 + 버튼 비활성화, 요청 실패 배너
- [x] 로딩/에러/빈 상태를 `AsyncBoundary` 로 모든 핵심 화면에서 통일
- [x] 재사용 컴포넌트 15개 이상 (Button, FormField, RatingInput, RatingStars, StatusBadge, BookCard, BookList, BookForm, FilterBar, Loading, ErrorState, EmptyState, AsyncBoundary, ConfirmButton, ToastContainer ...)
- [x] 커스텀 훅 3개
- [x] 보너스: 전역 상태(Context 알림), 메모이제이션(`React.memo`, `useMemo`, `useCallback`)

## 설계 설명 (과제 목표 정리)

### 1. 컴포넌트를 쪼갠 기준
- **페이지**(`pages/`): 라우트 파라미터, 훅 호출, 성공 후 이동·알림처럼 "무엇을 할지" 결정한다.
- **UI 컴포넌트**(`components/`): props 만 받아 "어떻게 보일지"만 담당하며 데이터 fetch 를 직접 하지 않는다.
- **반복되는 패턴**은 한 번만 만든다. 로딩/에러/빈 상태는 `AsyncBoundary`(Loading / ErrorState / EmptyState) 하나로 통일했다.

### 2. props 와 state, 상태의 위치
- `BookListPage` 가 `status / sort / search` 상태를 소유하고, `FilterBar` 에는 값과 변경 핸들러를 props 로 내려준다. (상태 끌어올리기 + 단방향 데이터 흐름)
- `BookForm` 은 입력값(`values`)과 `touched` 를 자기 state 로 소유한다. 에러(`errors`)는 `values` 에서 계산되는 파생값이라 state 로 두지 않고 `useMemo` 로 계산한다.
- 제출 중(`submitting`)·실패(`submitError`)는 요청을 수행하는 페이지의 훅이 갖고 있어 props 로 내려준다.
- `ConfirmButton` 의 "확인 중" 여부는 그 컴포넌트에서만 쓰이므로 내부 state 로 둔다.
- 여러 페이지에서 쓰는 알림은 Context(`ToastContext`)로 전역 관리한다.

### 3. useEffect 와 데이터 요청
- `useBooks` 의 `useEffect` 는 **마운트 시, 그리고 `[status, sort, reloadKey]` 가 바뀔 때** 실행된다. 필터 탭을 바꾸면 의존성이 바뀌어 재조회한다.
- `useBookDetail` 은 `[id, reloadKey]` 가 의존성이라 라우트 파라미터가 바뀌면 재조회한다.
- cleanup 에서 `ignore = true` 로 두어, 이전 요청의 늦은 응답이 최신 화면을 덮어쓰는 경쟁 상태를 막는다.
- "다시 시도" 버튼은 `reloadKey` 를 올려 같은 effect 를 다시 실행시킨다.

### 4. 비동기 흐름의 UI 표현
| 상태 | 표현 |
| --- | --- |
| 로딩 | `Loading` 스피너 ("불러오는 중...") |
| 실패 | `ErrorState` ("요청에 실패했습니다. 다시 시도하세요." + 상세 + 다시 시도 버튼) |
| 빈 상태 | `EmptyState` ("표시할 데이터가 없습니다." + 등록 유도 버튼) |
| 성공 | 목록/상세 렌더링 |
| 제출 중 | 버튼 스피너 + 비활성화 ("저장 중...") |
| 제출 실패 | 폼 상단 에러 배너, 페이지 이동 없음 |

### 5. 하나의 기능이 연결되는 흐름 — "책 등록"
`/books/new` 라우트 → `BookNewPage` → `BookForm`(입력 이벤트 → `values` state 변경 → 입력창·미리보기 카드 리렌더링) → 제출 이벤트 → 검증 통과 → `useBookMutations.create`(`pending=true` → 버튼 스피너) → Supabase insert → 성공 시 `showToast` + `navigate('/books/:id')` → `BookDetailPage` 의 `useBookDetail` 이 조회 → 상세 렌더링.

### 상태 변경이 렌더링으로 이어지는 지점
1. 상태 탭/정렬 변경 → 서버 재조회 → 목록 변경 (로딩 스피너 포함)
2. 검색어 입력 → 클라이언트 필터링 → 목록 즉시 변경
3. 폼 입력 → 오른쪽 미리보기 카드 변경
4. 입력 오류 → 필드 아래 에러 메시지 표시 / 제출 중 → 버튼 상태 변경
5. 저장·삭제 성공 → 토스트 알림 표시 + 페이지 이동

### 메모이제이션 적용 위치
- `React.memo`: `BookCard`, `BookList`
- `useMemo`: 검색 필터 결과, 홈 통계, 폼 에러 계산, 훅/Context 의 반환 객체
- `useCallback`: `reload`, `create/update/remove`, 토스트 `showToast/dismiss`
