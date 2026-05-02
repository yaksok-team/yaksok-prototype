# YakSok 와이어프레임

다제약물 복용자(시니어)와 보호자를 위한 약·영양제 통합 복약관리 서비스 — 프로토타입.

> 🔗 **라이브 데모**: https://yaksok-team.github.io/yaksok-prototype/
>
> ⚠️ 데스크톱 권장 — viewport 1480px 고정. 모바일에선 가로 스크롤됩니다.

## 빠른 이동

- 📋 [제품 요구 명세 (PRD)](./YakSok_PRD.md)
- 🗺️ [IA 모델 — Zone × Tab × Type](./핸드오프-IA모델.md)
- 🎨 [디자인 시스템 토큰](./design-system/)
- 💻 [와이어프레임 소스](./docs/)
- 🧱 [Claude Design 핸드오프 번들](./design/)

## 페르소나

- **박정숙(68)** — 만성질환 약 + 영양제 복용 시니어
- **김민재(42)** — 부모님 복약을 챙기는 보호자

## 화면 구성 (Zone)

1. **ENTRY** · 온보딩 (8화면)
2. **SENIOR MAIN** · 박정숙 — 오늘 / 내 약 / 내 정보 (3-tab)
3. **CAREGIVER** · 김민재 — 보호자 홈
4. **SYSTEM** · 잠금화면 푸시
5. **EXPLORE** · TabBar 디자인 후보 (채택안 / 보존)

## 기술 메모

- 빌드 단계 없음 — `docs/index.html`을 브라우저에서 직접 열면 작동
- React 18 + Babel-standalone (CDN) + JSX 인라인 변환
- 데스크톱 전용 (viewport 1480px, 화면들이 phone-frame 안에 0.56× scale로 가로 나열)
- Phase 2에서 React Native로 이식 예정

## 로컬에서 보기

```bash
git clone https://github.com/yaksok-team/yaksok-prototype.git
cd yaksok-prototype
# Chromium 계열 브라우저로 docs/index.html 열기
```

## 폴더 구조

```
yaksok-prototype/
├── docs/                       GitHub Pages 서빙 루트 (와이어프레임)
│   ├── index.html              IA 8섹션 wireframe 인덱스
│   ├── assets/                 폰트·CSS·로고·아이콘
│   └── components/
│       └── senior-screens.jsx  38개 화면 정의 (~3.4k 라인)
├── design/                     Claude Design (claude.ai/design) 핸드오프 번들
├── design-system/              RN 토큰 SSOT (Phase 2 진입점)
├── 핸드오프-IA모델.md           Zone × Tab × Type × Flow 매핑
└── YakSok_PRD.md               제품 요구 명세서
```
