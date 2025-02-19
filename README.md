


## 주요 설정
- ✅ **Redux**: Redux는 글로벌 상태(예: 유저 정보, 테마 설정)를 관리, RTK Query를 사용하여 API 상태를 관리
- ✅ **Jotai**: Redux의 리듀서가 너무 복잡해지는 걸 방지하기 위해 특정 UI 상태(모달, 토스트 메시지 등), UI 레벨 상태(필터 상태, 일시적인 데이터 등)를 Jotai로 관리.
- ✅ **react-hook-form**: 폼 데이터 유효성 검사
- ✅ **react-router-dom**: 페이지 라우팅

## 프로젝트 구조
```
my-project/
├── src/
│   ├── assets/
│   ├── atoms/       # Jotai 상태 관리
│   ├── context/     # Context Provider 컴포넌트
│   ├── features/    # 비즈니스별 컴포넌트
│   ├── stories/     # 재사용 가능한 UI 컴포넌트
│   ├── pages/       # 페이지 컴포넌트
│   ├── store/       # Redux 관련 코드
│   ├── hooks/       # 커스텀 훅
│   ├── index.tsx
│   ├── routes.tsx   # React Router 설정
├── tsconfig.json
├── package.json
```