# YakSok IA 모델 — 핸드오프 매핑 (Zone × Tab × Type × Flow)

## Context

[핸드오프-지식정리2.md](핸드오프-지식정리2.md)의 결론(**Path B = RN 직접**, Phase 1 정리부터)을 따른다. 본 문서는 그 직전 단계 산출물 — **모든 43개 컴포넌트의 IA 위치를 단일 트리로 고정**해 두고, 각 위치가 RN navigation 패턴으로 어떻게 옮겨지는지(+ Figma 매핑 reference) 정리한다.

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

## 4. 43 컴포넌트 매핑 표 (단일 SOT)

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
| `S_Today` | 📄 page | TodayStack/Home | props: `empty`, `checked`, `collapsed` (4 상태 variant: 빈 / 진행 / Breathe / 접힘). 시간대별 row = **처방 봉투(rx-bag, 처방일·병원·내용물)** + **영양제 통(supp, 단품)**. 페르소나가 "약 이름"이 아닌 "봉투/통" 단위로 인지하기 때문. 체크 단위도 봉투/통 (개별 약 체크 X). 빈 상태(`empty=true`)는 등록 0개일 때 — Capsule + 약 등록 CTA. 헤더에 **주간 streak strip** + `이번 달 보기` 토글로 **월간 그리드 expand** (S_Cabinet의 달력 모드 흡수) |
| `S_StockCheck` | 📄 page | TodayStack/StockCheck | 잔여 점검 (요일 비종속, 누락 감지 등 내부 트리거 → 풀 페이지). **처방 그룹(처방일·병원, "N일치")** + **영양제 통(브랜드, "N정")** 단위 카드 — 페르소나가 봉투/통 단위로 인지하기 때문. 신뢰-우선 패턴: 추정 표시 → `맞아요` 1탭 또는 `다시 세어볼게요`로 정밀 입력. 처방 안 약 학술명은 보조 표시. ⚠️ 이 단위 모델은 S_Today/S_Cabinet/등록 flow와 일시적 불일치 — 추후 IA 전반 그룹화 마이그레이션 예정 |

### SENIOR MAIN · TAB · 내 약 (21 화면)
**Tab 메인 페이지 (2)**
| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_Cabinet` | 📄 page | MyMedsStack/Cabinet | 종류별 그룹(처방약·일반의약품·영양제) + 등록 CTA. props: `empty` (단일 모드 — 달력은 S_Today 헤더의 월간 expand로 이전됨). **처방약은 처방일·병원 단위 supercard 헤더만** (count + chev). 탭 시 S_RxDetail 모달로 풀 정보 — 페르소나가 봉투 단위로 인지하는 것과 일관 |
| `S_RxDetail` | ⬆️ sheet | MyMedsStack/RxDetail (presentation: pageSheet) | 처방 상세 (처방일·병원 단위). **iOS 바텀시트 패턴** — 화면 하단에서 lift, 상단 모서리만 28px 라운드(하단 flush), grabber bar(40×5), maxHeight 92%. 헤더(doc 아이콘 + 처방약 tag + close ✕) + 약별 시간대 Pill·이름·dose 풀 list + 하단 footer [수정 / 삭제]. supercard 탭 시 노출 |
| `S_RxEdit` | ⬆️ sheet | MyMedsStack/RxEdit (presentation: pageSheet) | 처방 수정. **iOS 바텀시트 패턴** (S_RxDetail과 시각 일관). 헤더 pencil 아이콘 + "처방 수정" 라벨, grabber bar. 처방일·병원 input + 약별 카드(이름·dose 입력 + 시간대 toggle pill) + "약 추가하기" dashed 버튼. 하단 [취소 / 저장]. S_RxDetail [수정] 탭 시 |
| `S_RxDelete` | 🔲 modal | MyMedsStack/RxDelete | 처방 삭제 확인. **중앙 alert (sheet 아님 — destructive 컨벤션)**, maxWidth 340, trash 아이콘 + "이 처방을 삭제할까요?" + 처방일·병원·약 N가지 + warning("되돌릴 수 없어요") + [취소 / 삭제(danger)]. S_RxDetail [삭제] 탭 시 |
| `S_IntakeCalendar` | 📄 page (legacy) | — | export는 호환성 유지. 월간 캘린더 자체는 S_Today 헤더의 expandable 월간 그리드로 이전 |

**Flow 🌊 등록 (16 화면, 시나리오 2개로 재구조 — 약 등록 / 영양제 등록. 일부 화면 겹침 허용)**

> 시나리오 분할 원칙: 분기(사진/검색/직접) 단위 sub-flow는 시니어가 따라가기 어려워 **사용 의도 단위(약 vs 영양제) 직선 흐름**으로 재배치. 같은 컴포넌트(S_AddType/S_AddChoice/S_DoseNotice)가 양쪽 시나리오에 등장.

**시나리오 ① 약 등록 (처방약·일반의약품)** — 11 entries: AddType → AddChoice → Camera → Confirm → AnalyzeLoading → Result → Schedule(`kind="med"`) → **TimeSheet** → **DaySheet** → AddNote(`kind="recommendation"`) → **RegDone**
**시나리오 ② 영양제 등록** — 17 entries: AddType → AddChoice → Camera → Search → SearchConfirm → SearchAdded → SelectedEmpty → SelectedList → SelectedEdit → DoseSheet → AnalyzeLoading → Result → Schedule(`kind="supp"`) → **TimeSheet** → **DaySheet** → AddNote(`kind="memo"`) → **RegDone** (사진 가지는 영양제 라벨 촬영용 — Confirm 분기 없이 검색 흐름과 합류)

> 양 시나리오 공통: AnalyzeLoading + Result는 약 간/약↔영양제 상호작용 분석으로 둘 다 등장. AddNote는 **prop variant**: 약 등록 = 의료인 권고사항(약사/의사/직접 출처 chips), 영양제 = 개인 메모(출처 chips 없음). 마지막 단계는 RegDone(등록 완료) — 알림 미리보기는 폐기 (S_DoseNotice는 컴포넌트로만 보존).

| Frame | Type | RN screen | 비고 |
|---|---|---|---|
| `S_AddType` | 🔲 modal | MyMedsStack/AddType (modal) | 영양제/복용의약품 분기. 양 시나리오 진입 |
| `S_AddChoice` | 📄 page | MyMedsStack/AddChoice | **공통 화면 — 양 시나리오 동일**. 헤드라인 "지금 드시는 약과 영양제를 / 알려주세요" + 서브 "사진이나 이름으로 빠르게 찾을 수 있어요". 카드 옵션 3개(사진/검색/직접) |
| `S_Camera` | 📄 page | MyMedsStack/Camera | 약 등록 시나리오 — 가이드 사각형 + 샘플 약봉투(병원·약국·환자) |
| `S_Confirm` | 📄 page | MyMedsStack/Confirm | 약 등록 OCR 확인 — **하나의 Card 안에 처방 헤더(병원·약국·조제일·환자·약 N가지) + 약 row 리스트(이름·용량·총일수·복용시점) 통합**. 처방-약 동일 그룹 시각 인지. 직접 입력 시 빈 상태 재사용 |
| `S_Search` | 📄 page | MyMedsStack/Search | 영양제 검색. 최근 검색 + 결과 |
| `S_SearchConfirm` | 🔲 modal | MyMedsStack/SearchConfirm (modal) | "이 제품 맞나요?" |
| `S_SearchAdded` | 📄 page | MyMedsStack/SearchAdded | 체크 + CTA pill ("다 고르셨나요?") |
| `S_SelectedEmpty` | 📄 page | MyMedsStack/Selected (empty state) | 빈 상태 |
| `S_SelectedList` | 📄 page | MyMedsStack/Selected (list) | 같은 screen, prop 분기 |
| `S_SelectedEdit` | 📄 page | MyMedsStack/Selected (edit) | 같은 screen, edit toggle |
| `S_DoseSheet` | ⬆️ sheet | MyMedsStack/DoseSheet | 섭취량 입력 |
| `S_AnalyzeLoading` | ⏳ transient | MyMedsStack/Analyzing | **prop**: `kind?: 'supp'\|'med'` (default `supp`). 양쪽 모두 **상호작용 확인** 의미. supp = "박정숙님의 영양제를 / 약과 궁합 확인중..", med = "기존에 드시는 약·영양제와 / 궁합을 확인 중이에요..". 자동 진행 |
| `S_Result` | 📄 page | MyMedsStack/Result | **prop**: `kind?: 'supp'\|'med'` (default `supp`). supp = 영양제 product 헤더 + 출혈 경고 + 비타민 D 중복 카드. med = 처방 헤더(사랑내과 3가지) + 복용 시점 경고(메트포르민+식사) + safe 카드("큰 충돌 없음"). 양쪽 동일 footer ([약통에 추가하기 / 나중에]) |
| `S_Schedule` | 📄 page | MyMedsStack/Schedule | **prop**: `kind?: 'med'\|'supp'` (default `med`). 양 시나리오 공통 step. 상단 컨텍스트 chip(처방 N가지 / 영양제 N가지) + **섭취 요일 row card** (탭 → S_DaySheet) + 3 시간대 카드 (각 카드 탭 → S_TimeSheet, 시간 옆 chev로 tap 힌트). med = 3 시간대 모두 ON·약 list, 요일 = "매일 (5/2 ~ 5/30 · 30일분)" 약봉지 기준 pre-set; supp = 저녁만 ON 예시, 요일 = "매일" default |
| `S_TimeSheet` | ⬆️ sheet | MyMedsStack/TimeSheet | **prop**: `kind?`, `slot?: '아침'\|'점심'\|'저녁'`. 시간대 wheel picker 바텀시트. backdrop = S_Schedule. 상단 추천 섭취 시간 chip(시간대 컬러) + 3-column wheel(시 / 분 / 오전·오후 — 중앙 선택 행 violet 하이라이트, 위·아래 행 opacity fade) + [취소 / 확인]. RN: native iOS pageSheet + DateTimePicker |
| `S_DaySheet` | ⬆️ sheet | MyMedsStack/DaySheet | **prop**: `kind?`. 섭취 요일 바텀시트. backdrop = S_Schedule. 헤드라인 + 자주 쓰는 설정 chip 4개(매일/평일/격일/주말) + 요일 직접 선택 chips(월~일) + [취소 / 확인]. 격일 복용 케이스 지원. med은 약봉지 기간 안내 톤, supp는 자유 선택 톤 |
| `S_AddNote` | 📄 page | MyMedsStack/AddNote | **prop**: `kind?: 'recommendation'\|'memo'` (default `recommendation`). recommendation = 약 등록 — "약사님이 뭐라고 하셨나요?" + 음성 입력 + 출처 chips(약사/의사/직접). memo = 영양제 등록 — "이 영양제에 대해 메모하실래요?" + 음성 입력 + "본인만 열람" 안내 (출처 chips 없음) |
| `S_DoseNotice` | 📄 page (legacy) | MyMedsStack/NoticePreview | 알림 미리보기 — 등록 flow에서 RegDone으로 교체. 컴포넌트 정의·export 보존 (System zone push 미리보기로 재사용 가능) |
| `S_RegDone` | 📄 page | MyMedsStack/RegDone | **등록 완료** — 양 시나리오 공통 마지막 step. 큰 violet check 아이콘 + "저장이 완료됐어요" + "오늘 약속에서 바로 / 드시면 돼요" + [오늘 약속 보러 가기 / 약통 둘러보기] |

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

### EXPLORE · TabBar 데모 (6 화면, 채택 후 삭제 예정)
| Frame | Type | RN | 비고 |
|---|---|---|---|
| `S_TabBar3`, `S_TabBar3Active`, `S_TabBar3MeActive`, `S_TabBar3IconToday`, `S_TabBar3IconYak`, `S_TabBar3IconMe` | 📄 demo | (해당 없음) | 디자인 탐색용, 핸드오프 대상 아님. 워드마크 변형(3) + stroke icon 채택안(3). 5-tab + FAB B안은 시니어 터치 영역 충돌로 탈락·삭제됨 |

---

## 5. Tab별 Stack 구성 (SENIOR MAIN 시각화)

```
SeniorTabs (Tab.Navigator)
│
├─ Tab "오늘" → TodayStack
│   ├─ TodayHome (📄 S_Today, props: empty/checked/collapsed)
│   └─ StockCheck (📄 S_StockCheck) — full page
│
├─ Tab "내 약" → MyMedsStack
│   ├─ Cabinet (📄 S_Cabinet) ← Tab 진입 default
│   │   ├─ default          종류별 그룹 목록 view (처방 supercard 포함)
│   │   └─ empty=true       빈 상태 (첫 사용)
│   ├─ RxDetail (⬆️ S_RxDetail) — supercard 탭 시 바텀시트
│   │   ├─ RxEdit (⬆️ S_RxEdit) — [수정] 탭 시 (시트)
│   │   └─ RxDelete (🔲 S_RxDelete) — [삭제] 탭 시 (확인 alert, destructive)
│   └─ Flow "등록" (16 컴포넌트, 시나리오 2개로 재구조 — 화면 일부 겹침)
│       ├─ ① 약 등록 (처방약·일반의약품)
│       │     AddType (🔲) → AddChoice → Camera → Confirm → Schedule → DoseNotice
│       └─ ② 영양제 등록
│             AddType (🔲) → AddChoice → Search → SearchConfirm (🔲) → SearchAdded
│             → SelectedEmpty / List / Edit → DoseSheet (⬆️) → AnalyzeLoading (⏳)
│             → Result → AddNote → DoseNotice
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
