# YakSok IA 모델 — 핸드오프 매핑 (Zone × Tab × Type × Flow)

## Context

[핸드오프-지식정리2.md](핸드오프-지식정리2.md)의 결론(**Path B = RN 직접**, Phase 1 정리부터)을 따른다. 본 문서는 그 직전 단계 산출물 — **모든 38개 컴포넌트의 IA 위치를 단일 트리로 고정**해 두고, 각 위치가 RN navigation 패턴으로 어떻게 옮겨지는지(+ Figma 매핑 reference) 정리한다.

수신자: Phase 1 정리 작업자, Phase 2 RN 이식 작업자, (선택) Phase 3 Figma 핸드오프 작업자.

---

## 1. IA 모델 트리

```
APP STRUCTURE
│
├─ ENTRY · 온보딩 (1회성, self-contained mini-flow)
│
├─ SENIOR MAIN (박정숙 페르소나 — 메인 모드)
│   ├─ TAB · 오늘
│   ├─ TAB · 내 약 (등록 flow 16화면 포함)
│   └─ TAB · 내 정보
│
├─ CAREGIVER MAIN (김민재 페르소나 — 별도 모드)
│
└─ SYSTEM (탭/모드 무관 OS 레벨 — 단 1 frame)
```

### Ownership 원칙
> **"오버레이는 자기 흐름이 사는 탭에 속한다."**
- 모달·시트·로딩이 어느 탭에서 트리거되면 그 탭의 자식
- 흐름이 여러 화면을 가로지르더라도 시작점이 사는 탭이 owner
- 진짜 SYSTEM zone = "탭 진입 전 / 외부 OS 컨텍스트"만

---

## 2. Frame Type ↔ RN/Figma 매핑

| 태그 | Type | RN 구현 | Figma 표현 (Phase 3) |
|---|---|---|---|
| 📄 | **page** | `Stack.Screen` | Frame |
| 🔲 | **modal** | `Stack.Screen` w/ `presentation: 'modal'` 또는 Portal+dim | Frame + overlay properties |
| ⬆️ | **sheet** | `@gorhom/bottom-sheet` 또는 `react-native-bottom-sheet` | Bottom-anchored frame |
| 🔔 | **system** | `@notifee/react-native` 또는 `expo-notifications` (navigation tree 외부) | OS mock frame |
| ⏳ | **transient** | inline loading state, 자동 진행 (timer-based) | Variant + auto-animate |
| 🌊 | **flow** | Stack 내 screen sequence (page+modal+sheet 혼재) | Frame connections (prototype links) |

---

## 3. Zone ↔ RN Navigator 매핑

| Zone | RN 구조 |
|---|---|
| **ENTRY · 온보딩** | 별도 `Stack.Navigator`. 첫 진입 시만 mount, AsyncStorage flag로 완료 후 skip |
| **SENIOR MAIN** | `Tab.Navigator` 3탭 (오늘 / 내 약 / 내 정보), 각 탭 안에 `Stack.Navigator` |
| **CAREGIVER MAIN** | RootNavigator의 별도 mode (페르소나 분기). 진입 = 로그인/모드 선택 |
| **SYSTEM** | Notifee/expo-notifications handler. tap 시 deep link로 SENIOR MAIN · 오늘 탭 진입 |

### RootNavigator 골격 (의사코드)
```
<NavigationContainer>
  {hasOnboarded ? (
    <RootStack>
      {personaMode === 'senior' ? <SeniorTabs /> : <CaregiverStack />}
    </RootStack>
  ) : (
    <OnboardingStack />
  )}
</NavigationContainer>

<SeniorTabs>
  <Tab.Screen name="Today">    {TodayStack}
  <Tab.Screen name="MyMeds">   {MyMedsStack}
  <Tab.Screen name="MyInfo">   {MyInfoStack}
</SeniorTabs>
```

---

## 4. 38 컴포넌트 매핑 표 (단일 SOT)

### ENTRY · 온보딩 (8 화면)
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_Splash` | 📄 page | OnboardingStack/Splash | 자동 진행 |
| `S_Welcome` | 📄 page | OnboardingStack/Welcome | 가치 제안 |
| `S_Terms` | ⬆️ sheet | OnboardingStack/Terms | 약관 동의 |
| `S_ProfileName` | 📄 page | OnboardingStack/ProfileName | "1/3" 입력 |
| `S_ProfileChronic` | 📄 page | OnboardingStack/ProfileChronic | "2/3" 만성질환 |
| `S_PermissionsCare` | 📄 page | OnboardingStack/Permissions | "3/3" 알림·카메라 |
| `S_OnboardingLoading` | ⏳ transient | OnboardingStack/Preparing | 자동 진행 |
| `S_OnboardingDone` | 📄 page | OnboardingStack/Done | "첫 약 등록" CTA |

### SENIOR MAIN · TAB · 오늘 (2 화면)
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_Today` | 📄 page | TodayStack/Home | props: `checked`, `focus` (3 상태 variant) |
| `S_StockCheck` | ⬆️ sheet | TodayStack/StockCheckSheet | 일요일 잔여 입력 |

### SENIOR MAIN · TAB · 내 약 (18 화면)
**Tab 메인 페이지 (2)**
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_Cabinet` | 📄 page | MyMedsStack/Cabinet | 종류별 그룹(처방약·일반의약품·영양제) + 목록↔달력 토글 + 등록 CTA. props: `empty`/`mode='list'\|'calendar'` |
| `S_IntakeCalendar` | 📄 page (legacy) | — | `S_Cabinet`의 `mode='calendar'`로 흡수 완료. export는 호환성 유지 |

**Flow 🌊 등록 (16 화면, modal·sheet·loading 혼재)**
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_AddType` | 🔲 modal | MyMedsStack/AddType (modal) | 영양제/복용의약품 분기 |
| `S_AddChoice` | 📄 page | MyMedsStack/AddChoice | 사진/검색/직접 |
| `S_Camera` | 📄 page | MyMedsStack/Camera | 사진 가지 |
| `S_Confirm` | 📄 page | MyMedsStack/Confirm | 사진 가지 + 직접 가지 재사용 |
| `S_Search` | 📄 page | MyMedsStack/Search | 최근 검색 + 결과 |
| `S_SearchConfirm` | 🔲 modal | MyMedsStack/SearchConfirm (modal) | "이 제품 맞나요?" |
| `S_SearchAdded` | 📄 page | MyMedsStack/SearchAdded | 체크 + CTA pill ("다 고르셨나요?") |
| `S_SelectedEmpty` | 📄 page | MyMedsStack/Selected (empty state) | 빈 상태 |
| `S_SelectedList` | 📄 page | MyMedsStack/Selected (list) | 같은 screen, prop 분기 |
| `S_SelectedEdit` | 📄 page | MyMedsStack/Selected (edit) | 같은 screen, edit toggle |
| `S_DoseSheet` | ⬆️ sheet | MyMedsStack/DoseSheet | 섭취량 입력 |
| `S_AnalyzeLoading` | ⏳ transient | MyMedsStack/Analyzing | 자동 진행 |
| `S_Result` | 📄 page | MyMedsStack/Result | 상호작용 경고 |
| `S_Schedule` | 📄 page | MyMedsStack/Schedule | 시간 정하기 |
| `S_AddNote` | 📄 page | MyMedsStack/AddNote | 권고사항 입력 |
| `S_DoseNotice` | 📄 page | MyMedsStack/NoticePreview | 알림 미리보기 |

### SENIOR MAIN · TAB · 내 정보 (3 화면)
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_MyPage` | 📄 page (stub) | MyInfoStack/Home | 프로필·알림·가족·설정 hub |
| `S_ShareSetup` | 📄 page | MyInfoStack/ShareSetup | 가족 공유 토글 |
| `S_Report` | 📄 page | MyInfoStack/Report | 4주치 미리보기 + 보내기 |

### CAREGIVER MAIN (1 화면)
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_CaregiverHome` | 📄 page | CaregiverStack/Home | 보호자 메인 (단일, 추후 확장) |

### SYSTEM (1 화면)
| Frame | Type | RN handler | 비고 |
|---|---|---|---|
| `S_DosePush` | 🔔 system | NotifeeForeground/Push | tap → SeniorTabs/Today deep link |

### EXPLORE · TabBar 데모 (7 화면, 채택 후 삭제 예정)
| Frame | Type | RN | 비고 |
|---|---|---|---|
| `S_TabBarB`, `S_TabBar3`, `S_TabBar3Active`, `S_TabBar3MeActive`, `S_TabBar3IconToday`, `S_TabBar3IconYak`, `S_TabBar3IconMe` | 📄 demo | (해당 없음) | 디자인 탐색용, 핸드오프 대상 아님 |

**총: 38 컴포넌트** (ENTRY 8 + 오늘 2 + 내 약 18 + 내 정보 3 + CAREGIVER 1 + SYSTEM 1 + EXPLORE 5)

> 위 표 발견 시 `EXPLORE`는 7개로 표기되었으나 별도 표는 5개만 — `S_TabBarB / 3 / 3Active / 3MeActive` 4개 + `S_TabBar3IconToday/Yak/Me` 3개 = 7개. 다음 plan 실행 시 정리.

---

## 5. Tab별 Stack 구성 (SENIOR MAIN 시각화)

```
SeniorTabs (Tab.Navigator)
│
├─ Tab "오늘" → TodayStack
│   ├─ TodayHome (📄 S_Today, props: checked/focus)
│   └─ StockCheckSheet (⬆️ S_StockCheck) — modal presentation
│
├─ Tab "내 약" → MyMedsStack
│   ├─ Cabinet (📄 S_Cabinet) ← Tab 진입 default
│   │   ├─ mode='list'      목록 view (default)
│   │   ├─ mode='calendar'  달력 view (S_IntakeCalendar 흡수)
│   │   └─ empty=true       빈 상태 (첫 사용)
│   └─ Flow "등록" (16 screens, sub-stack 또는 sequence)
│       ├─ AddType (🔲 modal)
│       ├─ AddChoice (📄)
│       ├─ [사진 가지] Camera → Confirm
│       ├─ [검색 가지] Search → SearchConfirm (🔲) → SearchAdded
│       ├─ [직접 가지] Confirm 재사용
│       ├─ [영양제 후속] Selected(empty/list/edit) → DoseSheet (⬆️) → AnalyzeLoading (⏳) → Result
│       └─ [공통 마무리] Schedule → AddNote → NoticePreview
│
└─ Tab "내 정보" → MyInfoStack
    ├─ MyPage (📄 hub)
    ├─ ShareSetup (📄)
    └─ Report (📄)
```

---

## 6. Phase 1 정리 작업 (이 모델 기준)

[핸드오프-지식정리2.md](핸드오프-지식정리2.md) Phase 1을 본 모델 기준 5개 작업으로 분해:

| # | 작업 | 모델 기준 |
|---|---|---|
| 1 | ~~`S_Cabinet` stub 채우기~~ ✅ | TAB 내 약의 메인 page. 종류별 그룹 + 목록↔달력 토글 + 등록 entry CTA. S_IntakeCalendar 흡수 완료 |
| 2 | `S_MyPage` stub 채우기 | TAB 내 정보의 hub page. ShareSetup·Report·설정·알림 entry |
| 3 | ~~`S_IntakeCalendar` 코드상 위치 이동~~ ✅ | Plan D에서 Cabinet의 calendar mode로 흡수 완료 |
| 4 | atom export 분리 | `Shell`·`TopBar`·`BigButton`·`Card`·`Pill`·`TabBar`·`DoseGroup`·`Capsule`·`Ic` 별도 그룹 |
| 5 | TC 토큰 → `design-system/tokens.ts` 흡수 | SEED 구조 활용, senior-tuned hex 보존 |

각각 별도 plan으로 분리 권장.

---

## 7. 후속 plan 트리

```
이 문서 (IA 모델 SOT)
│
├─ Plan A: index.html 화면 재배치 (이 모델 트리대로)  ← 다음 단계
│
├─ Plan B: senior-screens.jsx atom export 분리 (Phase 1 #4)
├─ Plan C: TC → tokens.ts 흡수 (Phase 1 #5)
├─ Plan D: ✅ S_Cabinet stub 채우기 (Phase 1 #1) — IntakeCalendar 흡수 포함 (Phase 1 #3)
├─ Plan E: S_MyPage stub 채우기 (Phase 1 #2)
│
└─ (Phase 2 시작) RN 이식 — atoms 273건 primitive 치환 등
```

---

## 8. 참조

- [핸드오프-지식정리.md](핸드오프-지식정리.md) — Stage 0~4 (Figma 핸드오프 절차, Phase 3 보류 시 참조)
- [핸드오프-지식정리2.md](핸드오프-지식정리2.md) — Path A vs B 분석, Phase 1·2·3 분기
- [docs/components/senior-screens.jsx](docs/components/senior-screens.jsx) — 38 컴포넌트 정의
- [docs/index.html](docs/index.html) — 현재 평면 8섹션 IA (Plan A에서 재배치)
- [design-system/tokens.ts](design-system/tokens.ts) — RN 토큰 SSOT (Phase 1 #5에서 통합)
