# YakSok 와이어프레임

다제약물 복용자(시니어)와 보호자를 위한 약·영양제 통합 복약관리 서비스 — 프로토타입.

> 🔗 **라이브 데모**: https://yaksok-team.github.io/yaksok-prototype/
>
> ⚠️ 데스크톱 권장 — viewport 1480px 고정. 모바일에선 가로 스크롤됩니다.

## 빠른 이동

- 📋 [제품 요구 명세 (PRD)](../YakSok_PRD.md)
- 🗺️ [IA 모델 — Zone × Tab × Type](./핸드오프-IA모델.md)
- 📐 [기능명세 — ERD · 상태 · API · 화면 매트릭스](./핸드오프-기능명세.md)
- 🎨 [디자인 시스템 토큰 (Phase 2 진입점)](./design-system/)
- 💻 [와이어프레임 소스](./docs/)
- 🧱 [Claude Design 핸드오프 번들](./design/)

## 페르소나

- **박정숙(68)** — 만성질환 약 + 영양제 복용 시니어
- **김민재(42)** — 부모님 복약을 챙기는 보호자

## 화면 구성

4 Zone + EXPLORE — 총 9 섹션, 활성 38 화면 + EXPLORE 데모 6.

1. **ENTRY** · 온보딩 (8 화면)
2. **SENIOR MAIN** · 박정숙 — 오늘 / 내 약 / 내 정보 (3-tab)
3. **CAREGIVER** · 김민재 — 보호자 홈
4. **SYSTEM** · 잠금화면 푸시 (1 화면)
5. *EXPLORE — TabBar 디자인 후보 (채택안 / 보존, IA 영향 없음)*

## 기술 메모

- 빌드 단계 없음 — `docs/index.html`을 브라우저에서 직접 열면 작동
- React 18 + Babel-standalone (CDN) + JSX 인라인 변환
- 데스크톱 전용 (viewport 1480px, 화면들이 phone-frame 안에 0.56× scale로 가로 나열)

## 로컬에서 보기

```bash
git clone https://github.com/yaksok-team/yaksok-prototype.git
cd yaksok-prototype
# Chromium 계열 브라우저로 docs/index.html 열기
```

## 폴더 구조

```
yaksok-prototype/
├── docs/                          GitHub Pages 서빙 루트 (와이어프레임 쇼케이스)
│   ├── index.html                 IA 9섹션 인덱스 (4 Zone + EXPLORE)
│   ├── assets/
│   │   ├── colors_and_type.css    활성 디자인 토큰 — CSS 변수 SSOT
│   │   ├── fonts/                 Pretendard · Inter · Plus Jakarta Sans
│   │   └── icons/                 SVG 아이콘
│   └── components/
│       └── senior-screens.jsx     44개 컴포넌트 단일 파일 (~6.3k 라인)
│                                  ├ 활성 38 (시니어 화면·보호자·시스템)
│                                  └ EXPLORE 6 (TabBar 디자인 데모)
├── design/                        Claude Design (claude.ai/design) 핸드오프 번들
│                                  read-only reference — 작업은 docs/에서
├── design-system/                 Phase 2 RN 토큰 SSOT 후보
│   ├── tokens.ts                  Karrot SEED 카피 (palette × semantic × type × spacing × radius)
│   └── ThemeProvider.tsx          useTheme() Provider — RN 패턴
├── 핸드오프-IA모델.md              Zone × Tab × Frame Type × RN Navigator 매핑 (SSOT)
├── 핸드오프-기능명세.md            4-layer 명세 — ERD / 상태 / API / 화면 매트릭스
└── README.md                      본 문서
```

`YakSok_PRD.md`는 한 단계 위(`../`) 부모 디렉토리에 있습니다.

## 디자인 시스템

YakSok은 토큰 시스템을 **의도적으로 두 개로 분리**해 운영합니다 — 충돌이 아니라, 같은 브랜드의 **다른 단계 자산**입니다.

| 시스템 | 위치 | 단계 | 브랜드 앵커 |
|---|---|---|---|
| **Active runtime** | `docs/assets/colors_and_type.css` + `senior-screens.jsx` 상단 `TC` 객체 | 현재 prototype | `#5f3add` |
| **Reference scaffold** | `design-system/tokens.ts` + `ThemeProvider.tsx` | Phase 2 RN 진입점 | `#7C5CFC` (violet-600, Karrot SEED 표기) |

prototype 런타임은 브라우저 babel-standalone에서 `.ts` 모듈을 로드할 수단이 없어 `tokens.ts`는 현재 **미적용** — 의도된 상태입니다. RN 이식 시점(Phase 2)에 `tokens.ts`가 활성 SSOT로 전환됩니다.

**컨셉** — "The Ethereal Guardian": Violet-rooted, atmospheric, clinically warm. No-Line 원칙(1px border 대신 tonal shift), 시간대 컬러 (아침 amber / 점심 mint / 저녁 violet), Pill radius 9999px (모든 버튼).

**타이포그래피** — Pretendard(한글) + Inter(라틴/숫자) + Plus Jakarta Sans(display). RN은 `<Text>` 당 단일 fontFamily 바인딩이므로, 한글 본문은 Pretendard로 두고 숫자/시간 같은 짧은 라틴 run만 별도 `<Text>`로 분리하는 패턴을 권장합니다.

**SEED 구조 (`tokens.ts`)** — palette(violet/gray/red/yellow/green/blue, 100~1000 scale) × semantic(`bg` / `fg` / `stroke` × role × variant × state) × typography(t1~t10) × spacing(4px base) × radius. WCAG AA 보장 — 브랜드 텍스트는 violet-700, 스트로크/마크는 violet-600.

## 기능명세 (개발팀 핸드오프)

[`핸드오프-기능명세.md`](./핸드오프-기능명세.md) — Tab 1(오늘) · Tab 2(내 약) · 등록 flow를 구현하기 위한 **데이터·상태·계약·화면** 레벨 단일 명세서.

세 문서가 짝을 이룹니다:
- **PRD**가 *"무엇을 만들지"* — 문제·페르소나·MVP 범위·KPI를 정의
- **IA 모델**이 *"어디에 배치할지"* — Zone × Tab × Frame Type 트리, 화면별 RN navigator 매핑
- **기능명세**가 *"어떻게 동작하는지"* — entity, 상태 전이, API endpoint, 화면 × 액션 row 단위 명세

#### 4-layer anchor 피라미드

기능명세는 단일 산출물이 아니라, **데이터 → 상태 → 계약 → 화면** 순서로 받칩니다. 각 layer가 다음 layer의 입력입니다.

```
§ 1 ERD (10 entity, 8 핵심 결정)          ← PRD §7 Data + 와이어프레임 demo data
   ↓ 무엇이 있는지
§ 2 상태 머신 (6 lifecycle + 시나리오 2)  ← index.html flows + chat microflow
   ↓ 어떻게 변하는지
§ 3 API contract (REST endpoints)         ← ERD + 상태 전이 트리거
   ↓ 무엇이 호출되는지
§ 4 화면 × 액션 매트릭스 (32 row)         ← 위 3 + IA 모델 + 와이어프레임
```

#### 각 § 무엇이 있는지

- **§ 1 ERD** — `Prescription` / `Medication` / `IntakeSchedule` / `IntakeLog` / `StockSnapshot` / `AnalysisResult` / `Notification` / `Note` 등 10 entity 의 field·관계, 8개 핵심 설계 결정, demo 데이터 역추적 검증, 등록 시나리오별 entity 생성 매핑.
- **§ 2 상태 머신** — 6 entity lifecycle (예: `IntakeLog: pending → done / missed → done(소급)`) + 등록 시나리오 ① 약(11 화면) · ② 영양제(17 화면) flow lifecycle.
- **§ 3 API contract** — REST endpoint × 요청/응답, aggregate read 최적화, **§ 3-K RN 클라이언트 패턴**(native picker, 권한), 공통 에러 응답.
- **§ 4 화면 × 액션 매트릭스** — 와이어프레임의 모든 화면(variant 포함)을 row 단위로 펴고, 각 row에 (표시 데이터, 사용자 액션, 호출 API, 상태 전이) 4-컬럼을 채움. **총 32 row**.

#### Scope (포함 / 제외)

| | 컴포넌트 |
|---|---|
| **포함** (v1) | Tab 1 · Tab 2 · 등록 시나리오 ① 약 (11) · ② 영양제 (17) |
| **제외** (v1 보류) | Tab 3 (마이페이지·공유·리포트), Caregiver 모드, System zone push 시스템, ENTRY 온보딩 8 화면, Legacy 보존 (S_DoseNotice) |

#### 어떻게 읽어야 할까

- **새로 합류한 개발자** → § 0 Context → § 1 ERD → 담당 화면을 § 4에서 검색 → 그 row의 API 컬럼을 § 3에서 → 전이 컬럼을 § 2에서 (위→아래로)
- **API 작업자** → § 3을 직접 펴고, 각 endpoint가 트리거하는 § 2 전이 + § 1 entity 변경을 확인
- **QA** → § 4 매트릭스의 row × variant × 액션을 그대로 테스트 케이스로 변환
- **디자이너** → § 0 페르소나 제약(본문 ≥20px, BigButton ≥68px, 한국어 정중·간결, 시간대 컬러) + § 4 row의 "표시 데이터" 컬럼

진행 상태: § 0~4 모두 ✅ 작성 완료. v2에서 Tab 3 + 보호자 + 접근성 row 추가 예정.

## RN 핸드오프 plan

이 prototype은 정리가 끝난 뒤 React Native로 **직접 포트**됩니다 — `핸드오프-IA모델.md` line 5의 결정대로 **Path B = RN 직접** (web SPA / PWA 단계를 거치지 않음).

#### 3 Phase

| Phase | 무엇 | 산출물 |
|---|---|---|
| **Phase 1** *(현재 진행 중)* | 정리 — IA 모델 + 기능명세 + design-system 스캐폴드 | `핸드오프-*.md`, `design-system/` |
| **Phase 2** | RN 이식 — iOS / Android | RN 앱 (`screens/`, `components/`, navigation tree) |
| **Phase 3** *(선택)* | Figma 핸드오프 — 디자인 시스템 라이브러리 + Code Connect | Figma file + `.figma.ts` 매핑 ([`../지식정리.md`](../지식정리.md) Stage 0~5 참조) |

#### Phase 2에서 무엇이 어디로 옮겨가는지

| 현재 자산 | RN 단계 변환 |
|---|---|
| `design-system/tokens.ts` | 활성 SSOT로 전환 — `useTheme()` Provider 사용 |
| `senior-screens.jsx` (44 컴포넌트, 단일 파일) | 화면별 `.tsx` 분리 (`screens/`), `Shell` / `TopBar` / `BigButton` 등 atom은 `components/`로 |
| `핸드오프-IA모델.md § 3` (Zone↔Navigator) | React Navigation tree 구성 (Stack × Tab × Modal) |
| `핸드오프-기능명세.md § 3` (REST endpoints) | API 클라이언트(fetch/axios) + § 3-K native picker 결정 적용 |
| `핸드오프-기능명세.md § 4` (화면 매트릭스) | 화면 검증 — 각 row의 (데이터·액션·API·전이) 4-컬럼이 RN에서 1:1 일치하는지 |
| `docs/assets/colors_and_type.css` | 역할 종료 (활성 SSOT가 `tokens.ts`로 이전) |

#### Native UI 대체 (기능명세 § 3-K 요약)

시니어 페르소나에게 익숙한 native UX를 우선합니다:

| Wireframe sheet | RN 권장 구현 |
|---|---|
| `S_TimeSheet` (시·분·오전/오후 wheel) | iOS: `DateTimePickerIOS` (display:spinner) / Android: `TimePickerAndroid` |
| `S_RxDetail` / `S_RxEdit` (커스텀 sheet) | iOS: `<Modal presentationStyle="pageSheet">` / Android: `BottomSheetDialog` |
| `S_RxDelete` (centered alert) | iOS/Android `Alert.alert` (destructive 버튼) |
| `S_DaySheet` (요일 chips) / `S_DoseSheet` (0.5/1/1.5) | 직접 구현 — native 동등물 없음 |
