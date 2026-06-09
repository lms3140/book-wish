# Book Wish (책 위시리스트)

책 위시리스트를 등록하고 관리하는 MVP 웹 애플리케이션입니다.

로그인한 사용자가 읽고 싶은 책을 목록으로 관리하고, 제목/장르 기준으로 필터링하며, 선택한 책 목록을 관리하는 핵심 기능에 집중했습니다.

## 주요 특징

- **로그인 기반 접근 제어**: 인증된 사용자만 위시리스트 접근 및 관리 가능.
- **도서 목록 관리**: 도서 등록, 상세 조회, 정보 수정 및 삭제(단일/다중).
- **데이터 필터링 및 정렬**: 제목, 장르별 필터링과 테이블 컬럼 정렬 기능.
- **반응형 사이드 패널**: 선택한 도서의 상세 정보 확인 및 등록/수정 폼을 하나의 패널에서 처리.
- **클립보드 복사**: 테이블에서 선택한 도서 목록을 클립보드로 복사하는 편의 기능.
- **테마 지원**: 시스템 설정 연동 및 수동 전환이 가능한 라이트/다크 테마.
- **안정적인 인증 처리**: Access Token 만료 시 Refresh Token을 통한 자동 재발급 및 요청 재시도 인터셉터 구현.

## 기술 스택

- **Framework**: React 19, Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui
- **State Management**: Zustand 5
- **Data Fetching**: TanStack Query (React Query) v5
- **Table**: TanStack Table v8
- **Form**: React Hook Form, Zod
- **API**: Axios (Interceptors for Token Refresh)
- **Icons**: Hugeicons, Lucide React

## 프로젝트 구조

```txt
src/
  components/        # 공통 UI 컴포넌트 (shadcn/ui 기반)
  feature/
    Auth/            # 로그인 및 인증 로직
    book/            # 도서 목록, 테이블, 등록/수정/삭제 기능
    BookSidePanel.tsx # 통합 관리 사이드 패널
  lib/
    api.ts           # Axios 설정 및 토큰 갱신 인터셉터
    utils.ts         # 공통 유틸리티
  router/            # React Router 설정 및 Auth Guard
  store/             # Zustand를 이용한 전역 상태 관리
```

## 최근 개선 사항

- **UI/UX 개선**: 사이드 패널의 상태(등록/수정)를 시각적으로 명확하게 구분(타이틀 색상 및 버튼 문구 개선).
- **비동기 처리 최적화**: `useMutation`을 도입하여 생성/수정/삭제 후 데이터 즉시 갱신(Invalidation) 처리 강화.
- **삭제 기능 추가**: 단일 도서 삭제 및 테이블 내 다중 선택 삭제 기능 구현.
- **환경 변수 분리**: API Base URL을 환경 변수로 관리하여 배포 환경 유연성 확보.

## 트러블슈팅

### 1. 비동기 작업 후 데이터 갱신 누락

- **문제**: 도서 등록/수정 후 테이블 데이터가 즉시 갱신되지 않는 현상 발생.
- **원인**: 비동기 요청이 완료되기 전에 `invalidateQueries`가 호출되어 실제 데이터가 반영되기 전의 상태를 다시 불러옴.
- **해결**: TanStack Query의 `useMutation`을 도입하여 `onSuccess` 콜백에서 쿼리 무효화(`invalidateQueries`)를 처리함으로써 비동기 작업 완료 후 즉각적인 UI 반영 보장.

### 2. 동시 다발적 401 에러와 Refresh Token 경쟁 상태

- **문제**: 여러 API 요청이 동시에 401(Unauthorized)을 받을 때, 각각 Refresh Token 요청을 보내 세션이 만료되거나 꼬이는 문제 발생.
- **원인**: Refresh Token Rotation 방식에서 첫 번째 요청이 토큰을 갱신하면 서버는 기존 토큰을 폐기하므로, 동시에 진행된 다른 요청들은 유효하지 않은 토큰으로 접근하게 됨.
- **해결**: Axios 인터셉터 내에서 `refreshPromise` 변수를 공유하는 패턴을 적용. 진행 중인 Refresh 요청이 있다면 새로운 요청을 보내지 않고 기존 Promise를 await 하게 하여 단 한 번의 갱신만 수행되도록 개선.

### 3. 사용자 인지 부하를 줄이는 UI/UX 개선

- **문제**: 사용자가 기능 사용을 위해 학습이 필요하다고 느끼는 인지 코스트 발생.
- **원인**: 등록/수정 폼의 UI가 혼재되어 있고, 현재 작업 상태가 시각적으로 명확하지 않음.
- **해결**: 조건부 렌더링을 통해 작업 모드(등록/수정)에 따라 필요한 UI 요소만 노출. 사이드 패널의 타이틀 색상 차별화(등록: 파란색, 수정: 주황색) 및 버튼 문구 구체화를 통해 직관적인 사용 환경 제공.

## 라이선스

이 프로젝트는 개인 학습 및 MVP 개발 목적으로 제작되었습니다.
