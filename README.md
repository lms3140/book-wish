# Book Wish

책 위시리스트를 등록하고 관리하는 MVP 웹 애플리케이션입니다.

로그인한 사용자가 읽고 싶은 책을 목록으로 관리하고, 제목/장르 기준으로 찾고, 선택한 책 목록을 복사할 수 있는 기본 흐름에 집중했습니다.

## MVP 범위

- 로그인 기반 접근 제어
- 책 목록 조회
- 책 등록
- 책 상세 확인
- 책 정보 수정
- 제목/장르 필터링
- 테이블 정렬, 페이지 이동, 컬럼 표시 설정
- 선택한 책 목록 클립보드 복사
- 라이트/다크 테마 전환
- Access Token 만료 시 Refresh Token으로 재발급 후 요청 재시도

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- TanStack Table
- Zustand
- React Hook Form
- Zod
- Axios
- Tailwind CSS
- shadcn/ui 기반 UI 컴포넌트

## 시작하기

```bash
npm install
npm run dev
```

개발 서버가 실행되면 Vite가 안내하는 로컬 주소로 접속합니다.

## 사용 가능한 스크립트

```bash
npm run dev
```

개발 서버를 실행합니다.

```bash
npm run build
```

TypeScript 빌드와 Vite 프로덕션 빌드를 실행합니다.

```bash
npm run lint
```

ESLint 검사를 실행합니다.

```bash
npm run preview
```

빌드 결과물을 로컬에서 미리 확인합니다.

## 백엔드 API

프론트엔드는 기본적으로 아래 서버를 바라봅니다.

```txt
http://localhost:3000
```

현재 코드에서 사용하는 주요 API는 다음과 같습니다.

| Method | Endpoint            | 용도                  |
| ------ | ------------------- | --------------------- |
| POST   | `/auth/login`       | 로그인                |
| POST   | `/auth/logout`      | 로그아웃              |
| GET    | `/auth/me`          | 현재 로그인 상태 확인 |
| POST   | `/auth/refresh`     | Access Token 재발급   |
| GET    | `/books`            | 책 목록 조회          |
| POST   | `/books`            | 책 등록               |
| POST   | `/books/:id/update` | 책 수정               |
| POST   | `/books/:id/delete` | 책 삭제               |

인증은 Access Token과 HttpOnly Cookie 기반 Refresh Token 조합을 전제로 합니다. Access Token은 Zustand persist를 통해 로컬 스토리지에 저장되고, Axios 인터셉터가 요청 헤더에 `Authorization: Bearer <token>`을 붙입니다.

## 주요 구조

```txt
src/
  components/        공통 UI 컴포넌트
  feature/Auth/      로그인 및 인증 API
  feature/book/      책 목록, 등록, 수정, 상세, 테이블 기능
  feature/BookSidePanel.tsx
  lib/api.ts         Axios 인스턴스와 토큰 refresh 처리
  router/            라우터와 인증 가드
  store/             Zustand 상태 저장소
```

## MVP 화면 흐름

1. 사용자는 `/login`에서 로그인합니다.
2. 로그인 성공 시 `/`로 이동합니다.
3. `/` 진입 시 `/auth/me`로 인증 상태를 확인합니다.
4. 인증된 사용자는 책 목록 테이블을 확인합니다.
5. 우측 패널에서 책 상세, 등록, 수정을 진행합니다.
6. 테이블에서 책을 필터링하거나 선택한 목록을 클립보드로 복사합니다.

## 개발 메모

- `src/lib/api.ts`에서 401 응답을 처리하고 `/auth/refresh` 요청을 공유 Promise로 관리합니다.
- 동시에 여러 요청이 401을 받아도 refresh 요청은 한 번만 보내도록 구성되어 있습니다.
- 관련 정리 문서는 `docs/20260506.md`에 있습니다.

## 앞으로 개선할 수 있는 것

- 책 삭제 UI 연결 및 사용자 확인 흐름 추가
- 등록/수정 mutation의 성공/실패 상태 처리 강화
- 모바일 화면에서 사이드 패널 대체 UI 제공
- API baseURL 환경 변수 분리
- 깨진 한글 문자열 정리
