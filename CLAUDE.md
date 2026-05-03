# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

YakSok 와이어프레임 — **빌드 단계 없는** single-page HTML+JSX 프로토타입. [docs/index.html](docs/index.html)을 브라우저에서 직접 열면 React 18 + Babel-standalone (CDN)이 JSX를 인라인 트랜스파일해 38개 화면을 phone frame(390×844)에 0.56× scale로 가로 나열한다. 빌드/테스트/lint 도구 없음. 데스크톱 전용(viewport 1480px 고정). 라이브 데모와 페르소나·폴더 구조는 [README.md](README.md)에.

PRD·문서·UI 카피의 1차 언어는 **한국어**. 번역하지 말 것.

## 화면 추가/수정/제거 — registration sites (가변)

[docs/components/senior-screens.jsx](docs/components/senior-screens.jsx)는 약 3.4k줄 단일 파일에 모든 `S_*` fullscreen 컴포넌트(현재 38개)를 담는다. 화면을 붙이거나 빼는 작업은 **케이스별 2~7곳**의 site를 건드린다 — 고정된 "3 step"이 아니다:

| Site | 언제 |
|---|---|
| 컴포넌트 정의 (senior-screens.jsx) | 새 컴포넌트 — 항상. Variant — 기존 컴포넌트에 prop 분기 추가 |
| `window.YS = { ... }` export 블록 | **새 컴포넌트만**. Variant는 skip (이미 export됨) |
| `flows` map ([docs/index.html](docs/index.html)) | **항상** — 없으면 IA 쇼케이스에 frame 안 보임 |
| `<section class="flow">` 블록 (index.html) | 새 sub-flow / 새 section id 만들 때만 |
| [핸드오프-IA모델.md](핸드오프-IA모델.md) 매핑 표 | IA 분류 변경 시 (새 컴포넌트, 새 섹션, prop enum 변경) |
| `TC` 토큰 + [colors_and_type.css](docs/assets/colors_and_type.css) 변수 | 새 색 토큰 추가 시 — **반드시 페어로** |

전형:
- 새 화면, 기존 섹션 — 3곳 (컴포넌트 + window.YS + flows)
- 새 화면, 새 섹션 — 4곳 (위 + `<section>` 블록)
- Variant (prop 분기) — 2곳 (컴포넌트 수정 + flows). window.YS skip
- IA 분류 영향 — + 매핑 표
- 새 색 — + TC + CSS (둘 다)

→ **상세 절차·rollback 포함은 [.claude/skills/yaksok-screen-design/SKILL.md](.claude/skills/yaksok-screen-design/SKILL.md)** (claude code skill — 화면 추가·제거 발화 시 자동 트리거).

실패 모드: window.YS 누락 → `Y.S_Foo is undefined`. flows 누락 → IA 쇼케이스에 안 보임. `<section>` 블록 누락 → flows entry가 렌더 위치 없음.

## 내부 atom은 export되지 않음

`Shell`, `TopBar`, `BigButton`, `Card`, `Pill`, `TabBar`, `Capsule`, `Ic` 같은 atom들은 senior-screens.jsx 내부에 정의되어 있고 `window.YS`에 노출되지 않는다. 외부(또는 Figma Code Connect)에서 쓰려면 export 블록에 명시적으로 추가해야 함. underscore-prefix 헬퍼(`_NavBar`, `_NavTab`, `_DemoBody` 등)는 EXPLORE 데모 전용이지만 같은 파일 안에서는 `TabBar`도 호출함 (forward reference로 동작).

`TabBar`의 active prop 키는 `"today"` / `"meds"` / `"me"` 3개 (3-tab 채택안). 5-tab 시안과 워드마크 시안은 EXPLORE 섹션에 데모 컴포넌트 형태로 보존되어 있으니 지우지 말 것.

## 두 가지 토큰 시스템 (의도된 분리)

런타임 활성 토큰은 [docs/assets/colors_and_type.css](docs/assets/colors_and_type.css)의 CSS 변수와 senior-screens.jsx 상단 `TC` 객체 — 두 군데에만 있다. [design-system/tokens.ts](design-system/tokens.ts) / [ThemeProvider.tsx](design-system/ThemeProvider.tsx)는 Karrot SEED 구조를 카피해 둔 reference 스캐폴드로, Phase 2 (React Native 이식) 진입점이며 brand anchor도 다르다(`#5f3add` vs `#7C5CFC`). 충돌이 아니라 **다른 단계의 자산**이니 토큰 추가/변경은 CSS + TC 두 군데를 동시에 갱신.

## IA 모델 = SSOT

[핸드오프-IA모델.md](핸드오프-IA모델.md)가 화면들의 분류·소유관계 SSOT. 4 Zone(ENTRY / SENIOR MAIN / CAREGIVER / SYSTEM) + Tab-Owned 트리 + Frame Type(📄page / 🔲modal / ⬆️sheet / 🔔system / ⏳transient / 🌊flow). 새 화면을 추가하면 이 문서의 매핑 표·트리·Phase 1 작업 목록도 함께 갱신해야 일관성이 유지됨.

원칙: **"오버레이는 자기 흐름이 사는 탭에 속한다"**. SYSTEM zone은 OS-level push (`S_DosePush`) 한 개뿐.

## design/ 폴더

[design/](design/)는 Claude Design (claude.ai/design) 원본 export — **read-only reference**. 같은 컴포넌트가 `design/yaksok/project/components/senior-screens.jsx`에도 있지만 출처 스냅샷이니 작업은 항상 `docs/`에서. [design/yaksok/README.md](design/yaksok/README.md)는 upstream의 "agents read first" 노트인데 그 안의 지시("read chats first", "read YakSok Senior Flows.html")는 *이 폴더를 처음 받았을 때* 한 번 적용된 것 — 이미 `docs/`로 재구성된 지금은 그대로 따르지 말 것.
