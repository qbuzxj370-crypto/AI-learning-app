# All-in-One Learning App (Figma AI → React/Vite)

이 저장소는 Figma AI가 생성한 프로토타입을 기반으로 한 **React + Vite + TypeScript** 웹 프로젝트입니다.  
Tailwind CSS를 설정해 실행 가능한 상태로 보완했습니다.

## 1) 요구사항
- Node.js 18 이상 권장 (LTS)
- npm 또는 pnpm, yarn 중 하나

## 2) 설치 & 실행
```bash
npm install
npm run dev
```
- 브라우저가 자동으로 열리지 않으면 `http://localhost:3000`으로 접속하세요.

## 3) 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 4) 구조 개요
- `src/components/` : 화면을 구성하는 UI 컴포넌트들 (lucide-react, radix, shadcn 스타일 기반)
- `src/styles/globals.css` : Tailwind 레이어 및 디자인 토큰 포함
- `src/App.tsx` : 시나리오/연령대(40·50·60·70대) · 이지모드 등 상태에 따라 다른 홈/화면 조합을 렌더링

## 5) 배포
- Vercel, Netlify, Cloudflare Pages, GitHub Pages 등 **정적 호스팅**에 배포가 가능합니다.
- 일반적인 CI/CD에서는 다음 스텝을 사용하세요.
  1. `npm ci`
  2. `npm run build`
  3. `dist/` 디렉토리를 정적 호스팅 루트로 배포

## 6) 참고
- Tailwind가 필요한 유틸리티 클래스(`min-h-screen`, `bg-black`, `p-6` 등)를 사용하므로 본 문서대로 Tailwind 설정이 포함되어야 올바르게 스타일이 적용됩니다.
- 추가 페이지 라우팅이 필요하다면 `react-router-dom`을 설치하고 `src/pages/` 디렉토리에 화면을 분리하세요.
