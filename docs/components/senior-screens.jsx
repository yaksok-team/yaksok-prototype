/* YakSok — 박정숙(68) 시니어 친화 화면 세트
   - 본문 최소 20px, 주요 텍스트 24~32px
   - 버튼 64px+ 높이, 라벨 22px+
   - 한 화면 한 행동
   - 시간대별 채도 컬러: 아침 Amber, 점심 Mint, 저녁 Violet
*/

const TC = {
  primary: "#5f3add",
  primaryDim: "#7857f8",
  primaryFixed: "#ece6ff",
  primaryFixedDim: "#d8ccff",
  onPrimaryVar: "#311b92",
  surfaceLowest: "#ffffff",
  surface: "#fafafa",
  surfaceLow: "#f3f3f3",
  surfaceContainer: "#ededed",
  surfaceContainerHigh: "#e0e0e0",
  ink: "#111827",
  inkVariant: "#374151", // 더 진하게 (시니어 가독성)
  inkFaint: "#6b7280", // 더 진하게
  outline: "rgba(17,24,39,0.08)",
  // 시간대 채도 컬러
  morning: "#f59e0b",
  morningBg: "#fef3c7",
  morningInk: "#78350f",
  noon: "#10b981",
  noonBg: "#d1fae5",
  noonInk: "#064e3b",
  evening: "#5f3add",
  eveningBg: "#ece6ff",
  eveningInk: "#311b92",
  // semantic
  safe: "#10b981",
  safeBg: "#d1fae5",
  onSafe: "#064e3b",
  warning: "#f59e0b",
  warningBg: "#fef3c7",
  onWarning: "#78350f",
  danger: "#dc2626",
  dangerBg: "#fee2e2",
  onDanger: "#7f1d1d",
  shadow: "0 8px 24px rgba(95,58,221,0.10)",
  shadowLg: "0 16px 40px rgba(95,58,221,0.14)",
  gradientHero: "linear-gradient(135deg, #5f3add 0%, #7857f8 100%)",
};

// =============================================================
// Atoms — Senior tuned
// =============================================================

const Shell = ({ children, bg = TC.surfaceLow }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: bg,
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Pretendard', system-ui, sans-serif",
      color: TC.ink,
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </div>
);

const TopBar = ({ title, left = "←", right = null }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 20px 12px",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontSize: 28,
        color: TC.ink,
        width: 36,
        fontWeight: 500,
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {left}
    </span>
    <span
      style={{
        fontSize: 19,
        fontWeight: 700,
        color: TC.ink,
        whiteSpace: "nowrap",
      }}
    >
      {title}
    </span>
    <span
      style={{
        fontSize: 17,
        color: TC.primary,
        width: 36,
        textAlign: "right",
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {right}
    </span>
  </div>
);

const BigButton = ({
  children,
  full = true,
  style = {},
  variant = "solid",
}) => {
  const variants = {
    solid: {
      background: TC.gradientHero,
      color: "#fff",
      boxShadow: "0 8px 22px rgba(95,58,221,0.32)",
    },
    soft: { background: TC.primaryFixed, color: TC.onPrimaryVar },
    ghost: { background: "transparent", color: TC.primary },
    danger: {
      background: TC.danger,
      color: "#fff",
      boxShadow: "0 8px 22px rgba(220,38,38,0.32)",
    },
  };
  return (
    <button
      style={{
        width: full ? "100%" : "auto",
        minHeight: 68,
        padding: "20px 28px",
        borderRadius: 9999,
        border: "none",
        fontSize: 21,
        fontWeight: 700,
        fontFamily: "inherit",
        letterSpacing: -0.2,
        cursor: "pointer",
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, raised = true }) => (
  <div
    style={{
      background: TC.surfaceLowest,
      borderRadius: 20,
      padding: 22,
      boxShadow: raised ? TC.shadow : "none",
      ...style,
    }}
  >
    {children}
  </div>
);

const Pill = ({ children, tone = "neutral", big = false }) => {
  const tones = {
    neutral: { bg: TC.surfaceContainer, fg: TC.inkVariant },
    primary: { bg: TC.primaryFixed, fg: TC.onPrimaryVar },
    safe: { bg: TC.safeBg, fg: TC.onSafe },
    warning: { bg: TC.warningBg, fg: TC.onWarning },
    danger: { bg: TC.dangerBg, fg: TC.onDanger },
    morning: { bg: TC.morningBg, fg: TC.morningInk },
    noon: { bg: TC.noonBg, fg: TC.noonInk },
    evening: { bg: TC.eveningBg, fg: TC.eveningInk },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: t.bg,
        color: t.fg,
        borderRadius: 9999,
        padding: big ? "8px 16px" : "6px 12px",
        fontSize: big ? 16 : 14,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

const Capsule = ({ size = 28, tilt = -28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    style={{ display: "block" }}
  >
    <defs>
      <clipPath id={`cp-${size}-${tilt}`}>
        <rect
          x="6"
          y="14"
          width="28"
          height="12"
          rx="6"
          transform={`rotate(${tilt} 20 20)`}
        />
      </clipPath>
    </defs>
    <g clipPath={`url(#cp-${size}-${tilt})`}>
      <rect
        x="0"
        y="0"
        width="40"
        height="40"
        fill="#5f3add"
        transform={`rotate(${tilt} 20 20) translate(0 ${tilt < 0 ? -3 : 3})`}
      />
      <rect
        x="0"
        y="20"
        width="40"
        height="20"
        fill="#ece6ff"
        transform={`rotate(${tilt} 20 20)`}
      />
    </g>
  </svg>
);

const Ic = ({ name, size = 24, color = "currentColor", strokeWidth = 2 }) => {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { display: "block", flexShrink: 0 },
  };
  switch (name) {
    case "sun":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
        </svg>
      );
    case "noon":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="5" strokeWidth="2.4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );
    case "moon":
      return (
        <svg {...p}>
          <path d="M21 13a8 8 0 11-9-9 6 6 0 009 9z" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12l4 4 10-10" />
        </svg>
      );
    case "check-c":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "pill":
      return (
        <svg {...p}>
          <rect
            x="3"
            y="9"
            width="18"
            height="6"
            rx="3"
            transform="rotate(-30 12 12)"
          />
          <path d="M9 6.5l3 5.2" transform="rotate(-30 12 12)" />
        </svg>
      );
    case "camera":
      return (
        <svg {...p}>
          <path d="M3 8h4l1.5-2h7L17 8h4v11H3z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "search":
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "alert":
      return (
        <svg {...p}>
          <path d="M12 3l10 17H2z" />
          <path d="M12 10v5M12 18v.01" />
        </svg>
      );
    case "clock":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "bell":
      return (
        <svg {...p}>
          <path d="M6 16V11a6 6 0 0112 0v5l1.5 2H4.5z" />
          <path d="M10 20a2 2 0 004 0" />
        </svg>
      );
    case "home":
      return (
        <svg {...p}>
          <path d="M3 11l9-8 9 8" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "cal":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      );
    case "user":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1-4 4.5-6 8-6s7 2 8 6" />
        </svg>
      );
    case "users":
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15 20c.4-2.5 2-4 4-4s3.6 1 4 4" />
        </svg>
      );
    case "doc":
      return (
        <svg {...p}>
          <path d="M14 3H6v18h12V7z" />
          <path d="M14 3v4h4M9 13h6M9 17h4" />
        </svg>
      );
    case "flask":
      return (
        <svg {...p}>
          <path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
        </svg>
      );
    case "mic":
      return (
        <svg {...p}>
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0014 0M12 18v3" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...p}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "chev":
      return (
        <svg {...p}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...p}>
          <path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...p}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...p}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
        </svg>
      );
    case "eye":
      return (
        <svg {...p}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "msg":
      return (
        <svg {...p}>
          <path d="M4 5h16v11H10l-5 4V5z" />
        </svg>
      );
    case "share":
      return (
        <svg {...p}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <path d="M8 11l8-4M8 13l8 4" />
        </svg>
      );
    default:
      return null;
  }
};

// 3-tab stroke icon 채택안 (EXPLORE의 S_TabBar3IconToday/Yak/Me와 동일 마크업).
// _NavBar / _NavTab 헬퍼는 같은 파일 line 3291/3303 정의 — forward reference로 호출.
const TabBar = ({ active = "today" }) => (
  <_NavBar>
    <_NavTab icon="home" label="오늘"   active={active === "today"} bold />
    <_NavTab icon="pill" label="내 약"  active={active === "meds"}  bold />
    <_NavTab icon="user" label="내 정보" active={active === "me"}    bold />
  </_NavBar>
);

// =============================================================
// FLOW 1 — 첫 약 등록
// =============================================================

const S_Welcome = () => {
  const rows = [
    { name: "아스피린 + 오메가-3", tone: "warning", tag: "주의" },
    { name: "비타민 D — 두 군데에", tone: "danger", tag: "중복" },
    { name: "메트포르민 — 식후", tone: "evening", tag: "권고" },
  ];
  return (
    <Shell bg="#fbfaff">
      <div
        style={{
          flex: 1,
          padding: "40px 22px 0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            marginLeft: 22,
            marginBottom: -4,
            fontSize: 32,
            lineHeight: 1,
            zIndex: 2,
            position: "relative",
          }}
        >
          🚨
        </div>

        <Card style={{ padding: "38px 22px 12px", borderRadius: 26 }}>
          <h2
            style={{
              fontSize: 25,
              fontWeight: 700,
              lineHeight: 1.32,
              letterSpacing: -0.4,
              margin: "0 0 20px",
            }}
          >
            <span style={{ color: TC.primary }}>영양제와 약</span>,<br />
            함께 드셔도 괜찮을까요?
          </h2>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "16px 0",
                borderTop: `1px solid ${TC.outline}`,
              }}
            >
              <div
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: 600,
                  color: TC.ink,
                  lineHeight: 1.35,
                }}
              >
                {r.name}
              </div>
              <Pill tone={r.tone}>{r.tag}</Pill>
              <Ic name="chev" size={18} color={TC.inkFaint} />
            </div>
          ))}
        </Card>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginTop: 22,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 24,
              height: 8,
              borderRadius: 9999,
              background: TC.primary,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: TC.surfaceContainerHigh,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              background: TC.surfaceContainerHigh,
            }}
          />
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: -0.3,
            color: TC.ink,
          }}
        >
          함께 드시는 조합,
          <br />
          매일 확인해드릴게요
        </div>
      </div>

      <div
        style={{
          padding: "20px 22px 28px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <button
          style={{
            width: "100%",
            minHeight: 64,
            padding: "18px 24px",
            borderRadius: 9999,
            border: "none",
            cursor: "pointer",
            background: "#FEE500",
            color: "#191600",
            fontSize: 19,
            fontWeight: 700,
            fontFamily: "inherit",
            letterSpacing: -0.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <svg
            width="20"
            height="24"
            viewBox="0 0 27 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8.5 26.5C11.9219 23.7918 11.5332 26.4507 12.5376 26.3649C17.0762 25.9766 20.4444 23.1111 20.4444 19.8045C20.4444 16.2184 16.5025 13.2011 11.5 13.2011C6.4975 13.2011 2.55556 16.2195 2.55556 19.8045C2.55556 21.8868 4.05694 23.9482 6.45789 25.2572C7.45839 25.8017 8.02172 25.7729 8 26.5V26C8.02811 26.363 8.49872 25.5166 8.5 26.5ZM12.7893 28.5551C12.5533 28.5749 7.9422 28.4623 4.49816 31.2101C4.31516 31.3562 4.08647 31.453 3.8403 31.4885C3.59414 31.524 3.34129 31.4966 3.11298 31.4098C2.88466 31.323 2.69088 31.1805 2.55556 31C2.42023 30.8195 2.31033 30.2754 2.5 30C4.14851 27.6061 4.546 26.8645 4.5 26.5C4.477 26.3097 4.54089 26.522 4.5 26.5C1.5905 24.9171 0 22.8526 0 19.8056C0 14.9424 5.14944 11 11.5 11C17.8506 11 23 14.9424 23 19.8045C23 24.3332 18.5342 28.0644 12.7906 28.5551H12.7893Z"
              fill="#191600"
            />
            <ellipse cx="11" cy="19.5" rx="10" ry="7.5" fill="#191600" />
          </svg>
          카카오톡으로 시작하기
        </button>
        <button
          style={{
            width: "100%",
            minHeight: 64,
            padding: "18px 24px",
            borderRadius: 9999,
            border: "none",
            cursor: "pointer",
            background: TC.surfaceLowest,
            color: TC.primary,
            fontSize: 19,
            fontWeight: 700,
            fontFamily: "inherit",
            letterSpacing: -0.2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            boxShadow: TC.shadow,
          }}
        >
          <Ic name="phone" size={22} color={TC.primary} />
          휴대폰 번호로 시작하기
        </button>
      </div>
    </Shell>
  );
};

const S_AddType = () => (
  <Shell>
    <div style={{ position: 'absolute', inset: 0, background: TC.surfaceLow }} />
    <div style={{ position: 'absolute', inset: 0,
      background: 'rgba(13, 10, 26, 0.55)' }} />

    <div style={{ position: 'absolute', left: 16, right: 16,
      top: '50%', transform: 'translateY(-50%)',
      background: TC.surfaceLowest,
      borderRadius: 28, padding: '32px 24px 28px',
      boxShadow: '0 30px 80px rgba(13,10,26,0.32)',
    }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.4,
        textAlign: 'center', margin: '0 0 28px', color: TC.ink,
        lineHeight: 1.3 }}>
        무엇을 추가하시나요?
      </h2>

      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 14, padding: '12px 6px' }}>
          <div style={{ width: 100, height: 100, borderRadius: 9999,
            background: TC.primaryFixed,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Capsule size={56} />
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: TC.ink }}>
            영양제
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 14, padding: '12px 6px' }}>
          <div style={{ width: 100, height: 100, borderRadius: 9999,
            background: TC.primaryFixed,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18,
              background: TC.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 18px rgba(95,58,221,0.32)' }}>
              <Ic name="plus" size={36} color="#fff" />
            </div>
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: TC.ink }}>
            복용의약품
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const S_SearchConfirm = () => (
  <Shell>
    <div style={{ position: 'absolute', inset: 0, background: TC.surfaceLow }} />
    <div style={{ position: 'absolute', inset: 0,
      background: 'rgba(13, 10, 26, 0.55)' }} />

    <div style={{ position: 'absolute', left: 16, right: 16,
      top: '50%', transform: 'translateY(-50%)',
      background: TC.surfaceLowest,
      borderRadius: 28, padding: '32px 24px 28px',
      boxShadow: '0 30px 80px rgba(13,10,26,0.32)',
    }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.4,
        textAlign: 'center', margin: '0 0 24px', color: TC.ink,
        lineHeight: 1.3 }}>
        찾으시는 영양제가<br/>맞나요?
      </h2>

      <div style={{
        height: 180, borderRadius: 22,
        background: 'linear-gradient(135deg, #ffe7c2, #ffc888)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 4,
      }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#7a4a1a',
          letterSpacing: -0.4 }}>
          GNM
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#7a4a1a',
          opacity: 0.7 }}>
          오메가-3
        </div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, color: TC.ink,
        textAlign: 'center', marginTop: 24, lineHeight: 1.3 }}>
        오메가-3 알티지
      </div>
      <div style={{ fontSize: 17, color: TC.inkVariant,
        textAlign: 'center', marginTop: 6 }}>
        GNM
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
        <button style={{
          flex: 1, padding: '18px 22px', borderRadius: 9999,
          border: 'none', background: TC.surfaceContainer, color: TC.ink,
          fontSize: 18, fontWeight: 700, fontFamily: 'inherit',
          cursor: 'pointer',
        }}>아니오</button>
        <button style={{
          flex: 1.4, padding: '18px 22px', borderRadius: 9999,
          border: 'none', background: TC.primary, color: '#fff',
          fontSize: 18, fontWeight: 700, fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 8px 18px rgba(95,58,221,0.32)',
        }}>네, 맞아요</button>
      </div>
    </div>
  </Shell>
);

const S_SelectedEmpty = () => (
  <Shell>
    <TopBar title="" left="←" />
    <div style={{ padding: '0 24px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.6,
        margin: '8px 0 0' }}>
        선택한 영양제
      </h1>
    </div>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '0 24px 80px' }}>
      <div style={{ fontSize: 96, lineHeight: 1, opacity: 0.32 }}>
        👻
      </div>
      <div style={{ fontSize: 56, lineHeight: 1, opacity: 0.32,
        marginTop: -14 }}>
        💊
      </div>
      <div style={{ fontSize: 17, color: TC.inkVariant, fontWeight: 500,
        textAlign: 'center', marginTop: 28 }}>
        아직 선택하신 영양제가 없어요
      </div>
    </div>
  </Shell>
);

const SelectedListCore = ({ editable = false }) => {
  const items = [
    { brand: '나우푸드',     name: '비타민D-3 3000IU', dose: '1캡슐',
      bg: 'linear-gradient(135deg, #ffe7c2, #ffc888)', initial: 'NOW',
      ink: '#7a4a1a' },
    { brand: '닥터스베스트', name: '킬레이트 마그네슘', dose: '4정',
      bg: 'linear-gradient(135deg, #d8e9ff, #a8c8f5)', initial: "Dr's",
      ink: '#1e3a6a' },
    { brand: 'GNC',         name: '멜라토닌',         dose: '1정',
      bg: 'linear-gradient(135deg, #fde2dc, #f8b3a3)', initial: 'GNC',
      ink: '#7a2620' },
  ];
  return (
    <Shell>
      <TopBar title="" left="←" />
      <div style={{ padding: '0 24px 16px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.6,
          margin: '8px 0 22px' }}>
          선택한 영양제
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 17, fontWeight: 600,
            color: editable ? TC.primary : TC.inkVariant }}>
            1일 섭취량을 바꾸고 싶어요
          </div>
          <div style={{ width: 44, height: 26, borderRadius: 9999,
            background: editable ? TC.primary : TC.surfaceContainerHigh,
            position: 'relative', flexShrink: 0,
            transition: 'background 200ms' }}>
            <div style={{ position: 'absolute', top: 3, bottom: 3,
              width: 20, borderRadius: 9999, background: '#fff',
              left: editable ? 'auto' : 3,
              right: editable ? 3 : 'auto',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '0 24px',
        display: 'flex', flexDirection: 'column', gap: 18, overflow: 'auto' }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            position: 'relative',
          }}>
            <div style={{ width: 84, height: 84, borderRadius: 18,
              background: it.bg, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 700, color: it.ink,
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              {it.initial}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingTop: 2,
              paddingRight: 28 }}>
              <div style={{ fontSize: 14, color: TC.inkVariant,
                fontWeight: 600, marginBottom: 4 }}>{it.brand}</div>
              <div style={{ fontSize: 21, fontWeight: 700,
                color: TC.ink, lineHeight: 1.2, marginBottom: 10 }}>
                {it.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 15, color: TC.inkVariant,
                  fontWeight: 500 }}>1일 섭취량:</div>
                {editable ? (
                  <div style={{
                    padding: '6px 14px', borderRadius: 9999,
                    background: TC.primaryFixed, color: TC.primary,
                    fontSize: 15, fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {it.dose}
                    <span style={{ fontSize: 9 }}>▼</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 15, fontWeight: 700, color: TC.ink }}>
                    {it.dose}
                  </div>
                )}
              </div>
            </div>
            <div style={{ position: 'absolute', top: 2, right: 0,
              width: 28, height: 28, color: TC.inkVariant,
              fontSize: 22, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              ×
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 24px 24px' }}>
        <BigButton>다음</BigButton>
      </div>
    </Shell>
  );
};

const S_SelectedList = () => <SelectedListCore editable={false} />;
const S_SelectedEdit = () => <SelectedListCore editable={true} />;

const S_DoseSheet = () => (
  <Shell>
    <div style={{ position: 'absolute', inset: 0, background: TC.surfaceLow }} />
    <div style={{ position: 'absolute', inset: 0,
      background: 'rgba(13, 10, 26, 0.35)' }} />

    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: TC.surfaceLowest,
      borderRadius: '28px 28px 0 0',
      padding: '14px 24px 28px',
      boxShadow: '0 -20px 56px rgba(13,10,26,0.18)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: 44, height: 5, borderRadius: 9999,
        background: TC.surfaceContainerHigh,
        margin: '0 auto 18px' }} />

      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4,
        textAlign: 'center', margin: '0 0 10px', color: TC.ink }}>
        하루에 총 몇 캡슐 드세요?
      </h2>
      <div style={{ fontSize: 16, color: TC.inkVariant, textAlign: 'center',
        marginBottom: 24 }}>
        (예시: 1일 2회 2캡슐 = 4캡슐)
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ padding: '14px 0', textAlign: 'center',
          fontSize: 22, color: TC.inkFaint, fontWeight: 600,
          opacity: 0.55 }}>
          0.5 (2일에 1캡슐)
        </div>
        <div style={{
          padding: '14px 24px',
          background: TC.primaryFixed, borderRadius: 24,
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: TC.ink }}>1</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TC.primary }}>
            제품 권장량
          </div>
        </div>
        <div style={{ padding: '14px 0', textAlign: 'center',
          fontSize: 22, color: TC.inkFaint, fontWeight: 600,
          opacity: 0.55 }}>
          1.5
        </div>
      </div>

      <div style={{ marginTop: 22 }}>
        <BigButton>확인</BigButton>
      </div>
    </div>
  </Shell>
);

const S_AnalyzeLoading = () => (
  <Shell>
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 40,
      padding: '0 24px' }}>
      <div style={{ position: 'relative', width: 200, height: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%',
          border: `4px solid ${TC.primary}`, opacity: 0.35 }} />
        <div style={{ position: 'absolute', top: 14, left: '54%',
          width: 10, height: 10, borderRadius: 9999,
          background: '#5fd4b3' }} />
        <Capsule size={130} tilt={-18} />
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.4,
        textAlign: 'center', color: TC.ink, lineHeight: 1.4 }}>
        박정숙님의 영양제를<br/>약과 궁합 확인중..
      </div>
    </div>
  </Shell>
);

const S_AddChoice = () => (
  <Shell>
    <TopBar title="" left="" right="" />
    <div style={{ padding: "8px 24px 28px" }}>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -0.5,
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        지금 드시는 약을
        <br />
        알려주세요
      </h2>
      <p
        style={{
          fontSize: 19,
          color: TC.inkVariant,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        사진 한 장이면 충분해요
      </p>
    </div>
    <div
      style={{
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {[
        {
          icon: "camera",
          title: "사진으로 추가",
          desc: "약봉투·라벨을 찍으면 자동으로",
          primary: true,
        },
        {
          icon: "search",
          title: "이름으로 찾기",
          desc: "약 이름·영양제 이름 검색",
        },
        {
          icon: "mic",
          title: "말로 알려주기",
          desc: "음성으로 약 이름 말하기",
        },
      ].map((opt, i) => (
        <button
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: 22,
            borderRadius: 22,
            background: opt.primary ? TC.gradientHero : TC.surfaceLowest,
            color: opt.primary ? "#fff" : TC.ink,
            boxShadow: opt.primary
              ? "0 14px 32px rgba(95,58,221,0.32)"
              : TC.shadow,
            border: "none",
            textAlign: "left",
            fontFamily: "inherit",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 18,
              background: opt.primary
                ? "rgba(255,255,255,0.22)"
                : TC.primaryFixed,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic
              name={opt.icon}
              size={28}
              color={opt.primary ? "#fff" : TC.primary}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 4 }}>
              {opt.title}
            </div>
            <div
              style={{
                fontSize: 16,
                color: opt.primary ? "rgba(255,255,255,0.9)" : TC.inkVariant,
                lineHeight: 1.4,
              }}
            >
              {opt.desc}
            </div>
          </div>
          <Ic
            name="chev"
            size={26}
            color={opt.primary ? "#fff" : TC.inkFaint}
          />
        </button>
      ))}
    </div>
  </Shell>
);

const S_Camera = () => (
  <Shell bg="#0d0a1a">
    <div
      style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "14px 22px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 28, lineHeight: 1 }}>×</span>
        <span style={{ fontSize: 19, fontWeight: 700 }}>약봉투 촬영</span>
        <span style={{ fontSize: 17, color: "#fff", fontWeight: 700 }}>
          도움
        </span>
      </div>
      <div
        style={{
          flex: 1,
          padding: "12px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: "3/4",
            borderRadius: 24,
            background: "linear-gradient(160deg, #2a1f4d 0%, #1a1331 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16%",
              left: "12%",
              right: "12%",
              bottom: "16%",
              background: "linear-gradient(180deg, #f5efe1, #e9dfc7)",
              borderRadius: 8,
              padding: 18,
              transform: "rotate(-2deg)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "#5a4b2e",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              OO약국 처방
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#3a2f1f",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              박정숙 님 · 5/2
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#3a2f1f",
                lineHeight: 1.6,
                fontWeight: 600,
              }}
            >
              메트포르민 500mg
              <br />
              아토르바스타틴 10mg
              <br />
              아스피린 100mg
            </div>
          </div>
          {["tl", "tr", "bl", "br"].map((c) => {
            const pos = {
              tl: { top: "10%", left: "10%" },
              tr: { top: "10%", right: "10%" },
              bl: { bottom: "10%", left: "10%" },
              br: { bottom: "10%", right: "10%" },
            }[c];
            return (
              <div
                key={c}
                style={{
                  position: "absolute",
                  width: 36,
                  height: 36,
                  border: `4px solid ${TC.primary}`,
                  borderRadius: 8,
                  ...pos,
                }}
              />
            );
          })}
        </div>
      </div>
      <div style={{ padding: "12px 24px 20px", textAlign: "center" }}>
        <div
          style={{
            fontSize: 24,
            color: "#fff",
            marginBottom: 24,
            lineHeight: 1.4,
            fontWeight: 700,
            letterSpacing: -0.3,
          }}
        >
          약봉투를 사각형 안에
          <br />
          맞춰주세요
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 9999,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 6px rgba(255,255,255,0.25)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 9999,
                background: TC.gradientHero,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const S_Confirm = () => (
  <Shell>
    <TopBar title="확인" left="←" />
    <div style={{ padding: "0 24px 16px" }}>
      <Pill tone="primary" big>
        <Ic name="sparkle" size={16} /> 약 3개를 찾았어요
      </Pill>
      <p
        style={{
          fontSize: 18,
          color: TC.inkVariant,
          marginTop: 14,
          lineHeight: 1.5,
          margin: "14px 0 0",
        }}
      >
        잘못된 부분이 있으면
        <br />
        눌러서 고쳐주세요
      </p>
    </div>
    <div
      style={{
        padding: "8px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
        overflow: "auto",
      }}
    >
      {[
        { name: "메트포르민", dose: "500 mg" },
        { name: "아토르바스타틴", dose: "10 mg" },
        { name: "아스피린", dose: "100 mg" },
      ].map((m, i) => (
        <Card key={i} style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: TC.primaryFixed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic name="pill" size={26} color={TC.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>
                {m.name}
              </div>
              <div style={{ fontSize: 17, color: TC.inkVariant }}>{m.dose}</div>
            </div>
            <Ic name="chev" size={24} color={TC.inkFaint} />
          </div>
        </Card>
      ))}
    </div>
    <div style={{ padding: "14px 24px 24px" }}>
      <BigButton>3개 모두 추가하기</BigButton>
    </div>
  </Shell>
);

const S_Schedule = () => (
  <Shell>
    <TopBar title="시간 정하기" left="←" />
    <div style={{ padding: "0 24px 18px" }}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.4,
          margin: "0 0 8px",
          lineHeight: 1.25,
        }}
      >
        언제 드세요?
      </h2>
      <p style={{ fontSize: 17, color: TC.inkVariant, margin: 0 }}>
        시간을 눌러 켜거나 꺼주세요
      </p>
    </div>
    <div
      style={{
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        flex: 1,
      }}
    >
      {[
        {
          lbl: "아침",
          icon: "sun",
          time: "오전 8:30",
          on: true,
          tone: "morning",
          items: ["메트포르민"],
        },
        {
          lbl: "점심",
          icon: "noon",
          time: "오후 12:30",
          on: true,
          tone: "noon",
          items: ["메트포르민"],
        },
        {
          lbl: "저녁",
          icon: "moon",
          time: "오후 7:00",
          on: true,
          tone: "evening",
          items: ["메트포르민", "아토르바스타틴", "아스피린"],
        },
      ].map((t, i) => {
        const colorMap = {
          morning: { bg: TC.morningBg, ink: TC.morningInk, dot: TC.morning },
          noon: { bg: TC.noonBg, ink: TC.noonInk, dot: TC.noon },
          evening: { bg: TC.eveningBg, ink: TC.eveningInk, dot: TC.evening },
        };
        const col = colorMap[t.tone];
        return (
          <Card
            key={i}
            style={{
              padding: "18px 20px",
              background: t.on ? TC.surfaceLowest : TC.surfaceContainer,
              boxShadow: t.on ? TC.shadow : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: t.items.length ? 12 : 0,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: col.bg,
                  color: col.dot,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic name={t.icon} size={28} color={col.dot} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: t.on ? TC.ink : TC.inkFaint,
                  }}
                >
                  {t.lbl}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    fontVariantNumeric: "tabular-nums",
                    color: t.on ? col.ink : TC.inkFaint,
                    marginTop: 2,
                  }}
                >
                  {t.time}
                </div>
              </div>
              <div
                style={{
                  width: 60,
                  height: 36,
                  borderRadius: 9999,
                  background: t.on ? col.dot : TC.surfaceContainerHigh,
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: t.on ? 27 : 3,
                    width: 30,
                    height: 30,
                    borderRadius: 9999,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                />
              </div>
            </div>
            {t.items.length > 0 && (
              <div
                style={{
                  paddingLeft: 66,
                  fontSize: 16,
                  color: TC.inkVariant,
                  lineHeight: 1.5,
                }}
              >
                {t.items.join(" · ")}
              </div>
            )}
          </Card>
        );
      })}
    </div>
    <div style={{ padding: "14px 24px 24px" }}>
      <BigButton>완료</BigButton>
    </div>
  </Shell>
);

// =============================================================
// FLOW 2 — 영양제 추가 (조합 확인)
// =============================================================

const S_Search = () => (
  <Shell>
    <TopBar title="영양제 찾기" left="←" />
    <div style={{ padding: "0 22px 14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: TC.surfaceContainer,
          borderRadius: 18,
          padding: "18px 20px",
        }}
      >
        <Ic name="search" size={24} color={TC.inkVariant} />
        <span style={{ fontSize: 22, color: TC.ink, flex: 1, fontWeight: 600 }}>
          오메가-3
        </span>
      </div>
    </div>
    <div style={{ padding: "0 22px 16px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.05,
        color: TC.inkVariant, textTransform: "uppercase",
        marginBottom: 10 }}>
        최근 검색
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["오메가-3", "비타민D", "밀크씨슬", "마그네슘"].map((q, i) => (
          <div key={i} style={{
            padding: "10px 16px", borderRadius: 9999,
            background: TC.surfaceContainer, color: TC.ink,
            fontSize: 16, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ color: TC.primary }}>#</span>{q}
          </div>
        ))}
      </div>
    </div>
    <div
      style={{
        padding: "0 22px 100px",
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {[
        {
          brand: "GNM",
          name: "오메가-3 알티지",
          dose: "EPA+DHA 600mg",
          tag: "많이 등록",
        },
        { brand: "센트룸", name: "오메가-3", dose: "EPA+DHA 500mg" },
        { brand: "뉴트리원", name: "rTG 오메가-3", dose: "EPA+DHA 800mg" },
        { brand: "솔가", name: "Omega-3 950", dose: "EPA+DHA 950mg" },
      ].map((o, i) => (
        <Card key={i} style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #ffe7c2, #ffc888)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#7a4a1a",
              }}
            >
              {o.brand}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 4,
                  lineHeight: 1.2,
                }}
              >
                {o.name}
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: TC.inkVariant,
                  marginBottom: o.tag ? 6 : 0,
                }}
              >
                {o.dose}
              </div>
              {o.tag && <Pill tone="primary">{o.tag}</Pill>}
            </div>
            <Ic name="plus" size={28} color={TC.primary} />
          </div>
        </Card>
      ))}
    </div>

    <div style={{
      position: 'absolute', right: 22, bottom: 24,
      padding: '18px 26px', borderRadius: 9999,
      background: TC.surfaceContainer,
      display: 'flex', alignItems: 'center',
      fontSize: 17, fontWeight: 700, color: TC.inkVariant,
      letterSpacing: -0.2,
    }}>
      아직 고르지 않았어요
    </div>
  </Shell>
);

const S_SearchAdded = () => (
  <Shell>
    <TopBar title="영양제 찾기" left="←" />
    <div style={{ padding: "0 22px 14px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: TC.surfaceContainer,
          borderRadius: 18,
          padding: "18px 20px",
        }}
      >
        <Ic name="search" size={24} color={TC.inkVariant} />
        <span style={{ fontSize: 22, color: TC.ink, flex: 1, fontWeight: 600 }}>
          오메가-3
        </span>
      </div>
    </div>
    <div style={{ padding: "0 22px 16px" }}>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.05,
        color: TC.inkVariant, textTransform: "uppercase",
        marginBottom: 10 }}>
        최근 검색
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["오메가-3", "비타민D", "밀크씨슬", "마그네슘"].map((q, i) => (
          <div key={i} style={{
            padding: "10px 16px", borderRadius: 9999,
            background: TC.surfaceContainer, color: TC.ink,
            fontSize: 16, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ color: TC.primary }}>#</span>{q}
          </div>
        ))}
      </div>
    </div>
    <div
      style={{
        padding: "0 22px 100px",
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {[
        { brand: "GNM", name: "오메가-3 알티지", dose: "EPA+DHA 600mg",
          tag: "많이 등록", added: true },
        { brand: "센트룸", name: "오메가-3", dose: "EPA+DHA 500mg" },
        { brand: "뉴트리원", name: "rTG 오메가-3", dose: "EPA+DHA 800mg" },
        { brand: "솔가", name: "Omega-3 950", dose: "EPA+DHA 950mg" },
      ].map((o, i) => (
        <Card key={i} style={{
          padding: "18px 20px",
          outline: o.added ? `2px solid ${TC.primary}` : 'none',
          outlineOffset: -2,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "linear-gradient(135deg, #ffe7c2, #ffc888)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#7a4a1a",
              }}
            >
              {o.brand}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4,
                lineHeight: 1.2 }}>
                {o.name}
              </div>
              <div style={{ fontSize: 16, color: TC.inkVariant,
                marginBottom: o.tag ? 6 : 0 }}>
                {o.dose}
              </div>
              {o.tag && <Pill tone="primary">{o.tag}</Pill>}
            </div>
            {o.added ? (
              <div style={{ width: 32, height: 32, borderRadius: 9999,
                background: TC.primary, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic name="check" size={20} color="#fff" />
              </div>
            ) : (
              <Ic name="plus" size={28} color={TC.primary} />
            )}
          </div>
        </Card>
      ))}
    </div>

    <div style={{
      position: 'absolute', right: 22, bottom: 24,
      padding: '18px 26px', borderRadius: 9999,
      background: TC.primaryFixed,
      display: 'flex', alignItems: 'center',
      boxShadow: '0 10px 24px rgba(95,58,221,0.32)',
      fontSize: 17, fontWeight: 700, color: TC.primary,
      letterSpacing: -0.2,
    }}>
      다 고르셨나요?
      <div style={{ position: 'absolute', top: -6, right: -6,
        minWidth: 24, height: 24, borderRadius: 9999,
        padding: '0 6px',
        background: TC.primary, color: '#fff',
        fontSize: 14, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '2px solid #fff' }}>
        1
      </div>
    </div>
  </Shell>
);

const S_Result = () => (
  <Shell>
    <TopBar title="확인 결과" left="←" />
    <div style={{ padding: "0 22px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "linear-gradient(135deg, #ffe7c2, #ffc888)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 700,
            color: "#7a4a1a",
          }}
        >
          GNM
        </div>
        <div>
          <div style={{ fontSize: 21, fontWeight: 700 }}>오메가-3 알티지</div>
          <div style={{ fontSize: 16, color: TC.inkVariant, marginTop: 2 }}>
            EPA+DHA 600mg · 1일 1회
          </div>
        </div>
      </div>
    </div>
    <div
      style={{
        padding: "0 22px",
        flex: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          padding: 22,
          borderRadius: 22,
          background: TC.warningBg,
          color: TC.onWarning,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Ic name="alert" size={26} color={TC.onWarning} />
          <span style={{ fontSize: 18, fontWeight: 700, whiteSpace: "nowrap" }}>
            확인이 필요해요
          </span>
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            marginBottom: 8,
            letterSpacing: -0.3,
          }}
        >
          아스피린 + 오메가-3
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.92, margin: 0 }}>
          함께 드시면 출혈이
          <br />
          늘어날 수 있어요.
          <br />
          <b>약사님과 한 번 상의해 주세요.</b>
        </p>
      </div>

      <div
        style={{
          padding: 22,
          borderRadius: 22,
          background: "#dbeafe",
          color: "#1e3a8a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <Ic name="flask" size={24} color="#1e3a8a" />
          <span style={{ fontSize: 18, fontWeight: 700 }}>
            비타민 D — 두 번 들어 있어요
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 16 }}>하루 합계</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            1,200 IU
          </span>
        </div>
        <div
          style={{
            height: 12,
            background: "rgba(59,130,246,0.18)",
            borderRadius: 9999,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: "60%",
              height: "100%",
              background: "#3b82f6",
              borderRadius: 9999,
            }}
          />
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>
          하루 권장 한도(2,000 IU) 안이에요
        </div>
      </div>

      <div
        style={{
          fontSize: 14,
          color: TC.inkFaint,
          textAlign: "center",
          padding: "6px 16px",
          lineHeight: 1.5,
        }}
      >
        ※ 의료 판단이 아니에요.
        <br />
        복용 변경은 약사·의사와 상담하세요.
      </div>
    </div>
    <div
      style={{
        padding: "14px 22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <BigButton>약통에 추가하기</BigButton>
      <BigButton variant="ghost" style={{ minHeight: 56 }}>
        나중에 결정할게요
      </BigButton>
    </div>
  </Shell>
);

// =============================================================
// FLOW 3 — 권고사항 등록
// =============================================================

const S_AddNote = () => (
  <Shell>
    <div style={{ height: 80, background: TC.surfaceLow }} />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: TC.surfaceLowest,
        borderRadius: "28px 28px 0 0",
        boxShadow: "0 -20px 56px rgba(95,58,221,0.18)",
        padding: "16px 24px 28px",
        maxHeight: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 44,
          height: 5,
          borderRadius: 9999,
          background: TC.surfaceContainerHigh,
          margin: "0 auto 18px",
        }}
      />
      <h3
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.4,
          margin: "0 0 8px",
          lineHeight: 1.25,
        }}
      >
        약사님이 뭐라고
        <br />
        하셨나요?
      </h3>
      <p
        style={{
          fontSize: 17,
          color: TC.inkVariant,
          margin: "0 0 22px",
          lineHeight: 1.5,
        }}
      >
        복용 시간에 다시 보여드릴게요
      </p>

      <div
        style={{
          padding: "20px 22px",
          borderRadius: 18,
          background: TC.surfaceLow,
          fontSize: 21,
          color: TC.ink,
          marginBottom: 22,
          minHeight: 110,
          lineHeight: 1.5,
          border: `2px solid ${TC.primary}`,
          boxShadow: "0 0 0 5px rgba(95,58,221,0.14)",
          fontWeight: 500,
        }}
      >
        어지러우면 약사에게 알려달라고 하셨어요|
      </div>

      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          padding: "16px",
          borderRadius: 9999,
          background: TC.primaryFixed,
          color: TC.primary,
          border: "none",
          fontFamily: "inherit",
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 22,
          cursor: "pointer",
        }}
      >
        <Ic name="mic" size={22} color={TC.primary} />
        말로 입력하기
      </button>

      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: 0.05,
          color: TC.inkVariant,
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        누가 하신 말씀
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {["약사", "의사", "직접"].map((t, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 9999,
              background: i === 0 ? TC.primary : TC.surfaceContainer,
              color: i === 0 ? "#fff" : TC.ink,
              fontSize: 18,
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {t}
          </div>
        ))}
      </div>

      <BigButton>저장</BigButton>
    </div>
  </Shell>
);

const S_DoseNotice = () => (
  <Shell>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 0%, rgba(120,87,248,0.18) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
    />
    <TopBar title="" left="" />
    <div style={{ padding: "0 24px 12px", position: "relative", zIndex: 1 }}>
      <Pill tone="evening" big>
        <Ic name="moon" size={16} /> 저녁 약 시간
      </Pill>
      <h2
        style={{
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: -0.6,
          margin: "14px 0 8px",
          lineHeight: 1.15,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        오후 7:00
      </h2>
      <p
        style={{
          fontSize: 19,
          color: TC.inkVariant,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        세 가지 약을
        <br />
        드실 시간이에요
      </p>
    </div>
    <div
      style={{
        padding: "18px 24px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {[
            { name: "아스피린", dose: "100mg · 1정" },
            { name: "아토르바스타틴", dose: "10mg · 1정" },
            { name: "메트포르민", dose: "500mg · 1정" },
          ].map((m, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 14 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 9999,
                  background: TC.eveningBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic name="pill" size={22} color={TC.evening} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: 16, color: TC.inkVariant }}>
                  {m.dose}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "16px 22px",
            background: TC.warningBg,
            color: TC.onWarning,
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <Ic name="alert" size={24} color={TC.onWarning} />
          <div style={{ fontSize: 17, lineHeight: 1.5 }}>
            <b style={{ fontSize: 18 }}>어지러우시면 약사님께 말씀해 주세요</b>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>
              약사 권고
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div
      style={{
        padding: "6px 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        position: "relative",
        zIndex: 1,
      }}
    >
      <BigButton>지금 모두 먹었어요</BigButton>
      <BigButton variant="ghost" style={{ minHeight: 56 }}>
        15분 뒤에 알려주세요
      </BigButton>
    </div>
  </Shell>
);

// =============================================================
// FLOW 4 — 오늘의 약속 + 잔여 확인
// =============================================================

const S_Today = ({ checked = false, collapsed = false, empty = false }) => {
  const [monthExpanded, setMonthExpanded] = React.useState(false);

  const renderMonthGrid = (todayState) => {
    const blanks = 3; // 5/1 = 목, Mon-start week → 3 leading blanks
    const totalDays = 31;
    const today = 2;
    const labels = ["월", "화", "수", "목", "금", "토", "일"];

    const cells = [];
    for (let i = 0; i < blanks; i++) cells.push({ blank: true });
    for (let d = 1; d <= totalDays; d++) {
      let status;
      if (d < today) status = todayState === "empty" ? "future" : "done";
      else if (d === today) status = todayState;
      else status = "future";
      cells.push({ d, status, isToday: d === today });
    }

    return (
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
            marginBottom: 6,
          }}
        >
          {labels.map((d) => (
            <div
              key={d}
              style={{
                textAlign: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 4,
          }}
        >
          {cells.map((c, i) => {
            if (c.blank) return <div key={i} />;
            const { d, status, isToday } = c;
            const isDone = status === "done";
            const isToday2 = isToday;
            const isFuture = status === "future";
            return (
              <div
                key={i}
                style={{
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9999,
                  background: isDone
                    ? TC.safe
                    : isToday2
                    ? "#fff"
                    : "transparent",
                  border: isFuture
                    ? "1px dashed rgba(255,255,255,0.28)"
                    : "none",
                  color: isDone
                    ? "#fff"
                    : isToday2
                    ? TC.primary
                    : "rgba(255,255,255,0.55)",
                  fontSize: 13,
                  fontWeight: isToday2 ? 700 : 600,
                  boxShadow: isToday2
                    ? "0 0 0 3px rgba(255,255,255,0.22)"
                    : "none",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {d}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthToggle = (todayState) => (
    <>
      <button
        onClick={() => setMonthExpanded((v) => !v)}
        style={{
          width: "100%",
          marginTop: 12,
          padding: "6px 0",
          background: "transparent",
          border: "none",
          color: "rgba(255,255,255,0.85)",
          fontSize: 13,
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {monthExpanded ? "주간만 보기" : "이번 달 보기"}
        <span
          style={{
            display: "inline-flex",
            transform: monthExpanded ? "rotate(-90deg)" : "rotate(90deg)",
            transition: "transform 240ms cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        >
          <Ic
            name="chev"
            size={12}
            color="rgba(255,255,255,0.85)"
            strokeWidth={3}
          />
        </span>
      </button>
      {monthExpanded && renderMonthGrid(todayState)}
    </>
  );

  const renderWeekStrip = (todayState, dark = false) => {
    const past = todayState === "empty" ? "future" : "done";
    const week = [
      { day: "월", status: past },
      { day: "화", status: past },
      { day: "수", status: past },
      { day: "목", status: past },
      { day: "금", status: todayState, isToday: true },
      { day: "토", status: "future" },
      { day: "일", status: "future" },
    ];

    const todayRing = dark ? "#fff" : TC.primary;
    const todayHalo = dark
      ? "0 0 0 4px rgba(255,255,255,0.22)"
      : `0 0 0 4px ${TC.primaryFixed}`;
    const futureBorder = dark
      ? "2px dashed rgba(255,255,255,0.4)"
      : `2px dashed ${TC.surfaceContainerHigh}`;
    const labelToday = dark ? "#fff" : TC.primary;
    const labelDone = dark ? "rgba(255,255,255,0.85)" : TC.inkVariant;
    const labelFuture = dark ? "rgba(255,255,255,0.45)" : TC.inkFaint;

    const renderCircle = (status, isToday) => {
      const baseSize = isToday ? 32 : 26;
      const halo = isToday ? todayHalo : "none";
      if (status === "done") {
        return (
          <div
            style={{
              width: baseSize,
              height: baseSize,
              borderRadius: 9999,
              background: TC.safe,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: halo,
            }}
          >
            <Ic
              name="check"
              size={isToday ? 18 : 14}
              color="#fff"
              strokeWidth={3.5}
            />
          </div>
        );
      }
      if (status === "in-progress" || status === "empty") {
        return (
          <div
            style={{
              width: baseSize,
              height: baseSize,
              borderRadius: 9999,
              border: `2.5px solid ${todayRing}`,
              background: "transparent",
              boxShadow: halo,
            }}
          />
        );
      }
      return (
        <div
          style={{
            width: baseSize,
            height: baseSize,
            borderRadius: 9999,
            border: futureBorder,
            background: "transparent",
          }}
        />
      );
    };

    return (
      <div
        style={{
          display: "flex",
          gap: 4,
          marginTop: 16,
          paddingRight: 4,
        }}
      >
        {week.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: d.isToday
                  ? labelToday
                  : d.status === "future"
                  ? labelFuture
                  : labelDone,
              }}
            >
              {d.day}
            </div>
            {renderCircle(d.status, d.isToday)}
          </div>
        ))}
      </div>
    );
  };

  if (empty) {
    return (
      <Shell>
        <div
          style={{
            background: TC.gradientHero,
            padding: "22px 24px 56px",
            color: "#fff",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <h1
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: -0.6,
                margin: 0,
                color: "#fff",
              }}
            >
              오늘의 약속
            </h1>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                flexShrink: 0,
              }}
            >
              5월 2일 금요일
            </div>
          </div>
          {renderWeekStrip("empty", true)}
          {renderMonthToggle("empty")}
        </div>

        <div
          style={{
            flex: 1,
            background: TC.surfaceLow,
            borderRadius: "28px 28px 0 0",
            marginTop: -28,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 28px 130px",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 9999,
              background: TC.surfaceContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 22,
            }}
          >
            <Capsule size={60} tilt={-28} />
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: TC.ink,
              marginBottom: 12,
              letterSpacing: -0.3,
            }}
          >
            오늘 챙길 약을 등록해 보세요
          </div>
          <div
            style={{
              fontSize: 18,
              color: TC.inkVariant,
              lineHeight: 1.55,
              marginBottom: 28,
            }}
          >
            처방약이나 영양제를 등록해 두시면
            <br />
            매일 잊지 않고 챙겨드려요
          </div>
          <div style={{ width: "100%" }}>
            <BigButton variant="solid">약 등록하기</BigButton>
          </div>
        </div>

        <TabBar active="today" />
      </Shell>
    );
  }

  const active = "evening"; // 현재 시간 (18:55)
  const statuses = {
    morning: "taken",
    noon: "taken",
    evening: checked ? "taken" : "now",
  };
  const tabData = {
    morning: {
      label: "아침",
      time: "오전 8:30",
      icon: "sun",
      tone: "morning",
      items: [
        {
          type: "rx-bag",
          rxDate: "5월 10일",
          clinic: "사랑내과",
          contents: ["메트포르민"],
        },
      ],
    },
    noon: {
      label: "점심",
      time: "오후 12:30",
      icon: "noon",
      tone: "noon",
      items: [
        {
          type: "rx-bag",
          rxDate: "5월 10일",
          clinic: "사랑내과",
          contents: ["메트포르민"],
        },
      ],
    },
    evening: {
      label: "저녁",
      time: "오후 7:00",
      icon: "moon",
      tone: "evening",
      items: [
        {
          type: "rx-bag",
          rxDate: "5월 10일",
          clinic: "사랑내과",
          contents: ["아스피린", "아토르바스타틴", "메트포르민"],
        },
        {
          type: "supp",
          name: "오메가3",
          dose: "1정",
        },
      ],
      breathe: checked,
      collapsed,
    },
  };
  const cur = tabData[active];
  const order = ["morning", "noon", "evening"];

  return (
    <Shell>
      <div
        style={{
          background: TC.gradientHero,
          padding: "22px 24px 56px",
          color: "#fff",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: -0.6,
              margin: 0,
              color: "#fff",
            }}
          >
            오늘의 약속
          </h1>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "rgba(255,255,255,0.85)",
              flexShrink: 0,
            }}
          >
            5월 2일 금요일
          </div>
        </div>
        {renderWeekStrip(checked ? "done" : "in-progress", true)}
        {renderMonthToggle(checked ? "done" : "in-progress")}
      </div>

      <div
        style={{
          flex: 1,
          background: TC.surfaceLow,
          borderRadius: "28px 28px 0 0",
          marginTop: -28,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            padding: "24px 24px 0",
            display: "flex",
            gap: 10,
          }}
        >
          {order.map((k) => {
            const t = tabData[k];
            const isActive = k === active;
            const s = statuses[k];
            return (
              <div
                key={k}
                style={{
                  flex: 1,
                  padding: "14px 6px",
                  borderRadius: 18,
                  background: isActive ? TC.gradientHero : TC.surfaceLowest,
                  color: isActive ? "#fff" : TC.ink,
                  textAlign: "center",
                  boxShadow: isActive
                    ? "0 10px 24px rgba(95,58,221,0.32)"
                    : "none",
                  transition: "all 240ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.1 }}>
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginTop: 5,
                    opacity: isActive ? 0.95 : 0.6,
                  }}
                >
                  {s === "taken" ? "✓ 완료" : s === "now" ? "지금" : "예정"}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            padding: "16px 24px 110px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            overflow: "auto",
          }}
        >
          <DoseGroup
            tone={cur.tone}
            icon={cur.icon}
            label={cur.label}
            time={cur.time}
            status={statuses[active]}
            items={cur.items}
            breathe={cur.breathe}
            collapsed={cur.collapsed}
          />
        </div>
      </div>
      <TabBar active="today" />
    </Shell>
  );
};

const DoseGroup = ({
  tone,
  icon,
  label,
  time,
  status,
  items,
  notice,
  breathe: initialBreathe,
  collapsed: initialCollapsed = false,
}) => {
  const colorMap = {
    morning: { bg: TC.morningBg, ink: TC.morningInk, dot: TC.morning },
    noon: { bg: TC.noonBg, ink: TC.noonInk, dot: TC.noon },
    evening: { bg: TC.eveningBg, ink: TC.eveningInk, dot: TC.evening },
  };
  const col = colorMap[tone];
  const isNow = status === "now";

  const [taken, setTaken] = React.useState(
    items.map(() => Boolean(initialBreathe))
  );
  const [expanded, setExpanded] = React.useState(!initialCollapsed);
  const allChecked = taken.length > 0 && taken.every(Boolean);
  const breathe = allChecked || Boolean(initialBreathe);
  const isTaken = status === "taken" || breathe;
  const showItems = !breathe || expanded;

  const toggleItem = (i) =>
    setTaken((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const markAll = () => setTaken(items.map(() => true));

  return (
    <div
      style={{
        background: breathe ? TC.primaryFixed : isNow ? TC.surfaceLowest : TC.surface,
        borderRadius: 22,
        padding: "20px 22px",
        boxShadow: isNow && !breathe ? TC.shadowLg : "none",
        transition: "all 480ms cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: items.length && showItems ? 14 : 0,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 18,
            background: breathe ? TC.primary : col.bg,
            color: breathe ? "#fff" : col.dot,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {breathe || isTaken ? (
            <Ic name="check" size={28} color={breathe ? "#fff" : col.dot} />
          ) : (
            <Ic name={icon} size={28} color={col.dot} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: breathe
                  ? TC.onPrimaryVar
                  : isTaken
                  ? TC.inkFaint
                  : col.ink,
              }}
            >
              {time}
            </div>
            {isNow && !breathe && (
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 9999,
                  background: TC.gradientHero,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                지금
              </span>
            )}
          </div>
        </div>
        {breathe && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              alignSelf: "stretch",
              minHeight: 44,
              padding: "0 10px",
              background: "transparent",
              border: "none",
              borderRadius: 12,
              cursor: "pointer",
              fontFamily: "inherit",
              color: TC.onPrimaryVar,
              fontSize: 15,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
            }}
          >
            {expanded ? "접기" : "상세보기"}
            <span
              style={{
                display: "inline-flex",
                transform: expanded ? "rotate(-90deg)" : "rotate(90deg)",
                transition: "transform 240ms cubic-bezier(0.32, 0.72, 0, 1)",
              }}
            >
              <Ic name="chev" size={16} color={TC.onPrimaryVar} strokeWidth={3} />
            </span>
          </button>
        )}
      </div>
      {items.length > 0 && showItems && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {items.map((it, i) => {
            const isBag = typeof it === "object" && it.type === "rx-bag";
            const isSupp =
              typeof it === "object" &&
              (it.type === "supp" || it.kind === "supp");
            const isDrug = typeof it === "object" && it.kind === "drug";
            const itName = isBag
              ? it.clinic
              : typeof it === "string"
              ? it
              : it.name;
            const itDose = isBag
              ? ""
              : typeof it === "string"
              ? ""
              : it.dose;
            const checkedItem = taken[i];
            const tagStyle = isBag
              ? { bg: TC.primary, fg: "#fff", label: "처방약" }
              : isSupp
              ? { bg: TC.surfaceContainer, fg: TC.inkVariant, label: "영양제" }
              : isDrug
              ? { bg: TC.primary, fg: "#fff", label: "약" }
              : null;
            return (
              <button
                key={i}
                onClick={() => toggleItem(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  minHeight: 64,
                  width: "100%",
                  background: breathe ? TC.surfaceLowest : TC.surfaceLow,
                  border: "none",
                  borderRadius: 16,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                  transition: "all 240ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: checkedItem ? TC.inkFaint : TC.ink,
                        lineHeight: 1.3,
                      }}
                    >
                      {itName}
                    </div>
                    {tagStyle && (
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: 8,
                          background: tagStyle.bg,
                          color: tagStyle.fg,
                          flexShrink: 0,
                          opacity: checkedItem ? 0.6 : 1,
                        }}
                      >
                        {tagStyle.label}
                      </span>
                    )}
                  </div>
                  {isBag ? (
                    <div
                      style={{
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                        marginTop: 8,
                      }}
                    >
                      {it.contents.map((medName, mi) => (
                        <span
                          key={mi}
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            padding: "4px 10px",
                            borderRadius: 9999,
                            background: col.bg,
                            color: col.ink,
                            opacity: checkedItem ? 0.55 : 1,
                          }}
                        >
                          {medName}
                        </span>
                      ))}
                    </div>
                  ) : itDose ? (
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: TC.inkFaint,
                        marginTop: 2,
                      }}
                    >
                      {itDose}
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 9999,
                    background: checkedItem ? TC.primary : "transparent",
                    border: checkedItem
                      ? "none"
                      : `2.5px dashed ${TC.primaryFixedDim}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 240ms cubic-bezier(0.32, 0.72, 0, 1)",
                  }}
                >
                  <Ic
                    name="check"
                    size={22}
                    color={checkedItem ? "#fff" : TC.primaryDim}
                    strokeWidth={3.5}
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
      {notice && !isTaken && (
        <div
          style={{
            marginTop: 14,
            padding: "14px 16px",
            background: TC.warningBg,
            color: TC.onWarning,
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 600,
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            lineHeight: 1.5,
          }}
        >
          <Ic name="alert" size={20} color={TC.onWarning} />
          {notice}
        </div>
      )}
      {isNow && !allChecked && showItems && (
        <button
          onClick={markAll}
          style={{
            marginTop: 14,
            width: "100%",
            minHeight: 64,
            padding: "18px",
            borderRadius: 9999,
            border: "none",
            background: TC.primaryFixed,
            color: TC.primary,
            fontSize: 20,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          모두 먹었어요
        </button>
      )}
    </div>
  );
};

const S_StockCheck = () => {
  const groups = [
    {
      type: "rx",
      date: "5월 10일",
      clinic: "사랑내과",
      daysEst: 4,
      meds: ["아스피린", "아토르바스타틴", "메트포르민"],
      unit: "일치",
    },
    {
      type: "supp",
      name: "오메가3",
      countEst: 25,
      bottleSize: 60,
      unit: "정",
    },
  ];
  const [statuses, setStatuses] = React.useState(groups.map(() => "pending"));
  const [values, setValues] = React.useState(
    groups.map((g) => (g.type === "rx" ? g.daysEst : g.countEst))
  );

  const setStatus = (i, s) =>
    setStatuses((prev) => prev.map((v, idx) => (idx === i ? s : v)));
  const adjust = (i, delta) =>
    setValues((prev) =>
      prev.map((v, idx) => (idx === i ? Math.max(0, v + delta) : v))
    );

  return (
    <Shell bg={TC.surfaceLowest}>
      <TopBar title="잔여 점검" />
      <div
        style={{
          flex: 1,
          padding: "8px 24px 28px",
          display: "flex",
          flexDirection: "column",
        }}
      >

        <h3
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: -0.4,
            margin: "0 0 6px",
            lineHeight: 1.3,
          }}
        >
          지금까지 드신 약,
          <br />중간 점검해 볼게요
        </h3>
        <p
          style={{
            fontSize: 17,
            color: TC.inkVariant,
            margin: "0 0 18px",
            lineHeight: 1.5,
          }}
        >
          약통을 한 번 보시고 맞는지 확인해 주세요
        </p>

        <div
          style={{
            flex: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {groups.map((g, i) => {
            const status = statuses[i];
            const value = values[i];
            const isOk = status === "ok";
            const isEdit = status === "edit";
            const isRx = g.type === "rx";

            const title = isRx ? `${g.date} · ${g.clinic}` : g.name;
            const summary = isRx
              ? `${value}일치 남았어요`
              : `한 통에 ${value}정 남았어요`;
            const editPrompt = isRx
              ? "약봉지 남은 일수를 알려주세요"
              : "통 안 알약을 세어 알려주세요";
            const editSubject = isRx ? "일치" : "정";
            const tagLabel = isRx ? "처방약" : "영양제";
            const tagBg = isRx ? TC.primaryFixed : TC.surfaceContainer;
            const tagFg = isRx ? TC.primary : TC.inkVariant;

            return (
              <Card
                key={i}
                style={{
                  padding: "16px 18px",
                  boxShadow: isOk ? "none" : TC.shadow,
                  background: isOk ? TC.primaryFixed : TC.surfaceLowest,
                  transition: "all 240ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: isOk ? TC.primary : TC.primaryFixed,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isOk ? (
                      <Ic name="check" size={22} color="#fff" strokeWidth={3} />
                    ) : (
                      <Ic
                        name={isRx ? "doc" : "pill"}
                        size={22}
                        color={TC.primary}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ fontSize: 19, fontWeight: 700 }}>
                        {title}
                      </div>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 6,
                          background: tagBg,
                          color: tagFg,
                          flexShrink: 0,
                        }}
                      >
                        {tagLabel}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: isOk ? TC.onPrimaryVar : TC.primary,
                        marginTop: 4,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {summary}
                    </div>
                    {isRx && !isOk && (
                      <div
                        style={{
                          fontSize: 14,
                          color: TC.inkFaint,
                          marginTop: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        {g.meds.join(" · ")}
                      </div>
                    )}
                  </div>
                  {isOk && (
                    <button
                      onClick={() => setStatus(i, "pending")}
                      style={{
                        minHeight: 44,
                        padding: "0 14px",
                        background: "transparent",
                        border: "none",
                        color: TC.onPrimaryVar,
                        fontSize: 16,
                        fontWeight: 700,
                        fontFamily: "inherit",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      수정
                    </button>
                  )}
                </div>

                {!isOk && !isEdit && (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 14,
                    }}
                  >
                    <button
                      onClick={() => setStatus(i, "ok")}
                      style={{
                        flex: 2,
                        minHeight: 56,
                        background: TC.primary,
                        color: "#fff",
                        border: "none",
                        borderRadius: 9999,
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      맞아요
                    </button>
                    <button
                      onClick={() => setStatus(i, "edit")}
                      style={{
                        flex: 3,
                        minHeight: 56,
                        background: TC.primaryFixed,
                        color: TC.primary,
                        border: "none",
                        borderRadius: 9999,
                        fontSize: 17,
                        fontWeight: 700,
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      다시 세어볼게요
                    </button>
                  </div>
                )}

                {isEdit && (
                  <div style={{ marginTop: 14 }}>
                    <div
                      style={{
                        fontSize: 15,
                        color: TC.inkVariant,
                        marginBottom: 10,
                      }}
                    >
                      {editPrompt}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        background: TC.surfaceLow,
                        borderRadius: 16,
                        padding: "10px 14px",
                      }}
                    >
                      <button
                        onClick={() => adjust(i, -1)}
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 9999,
                          background: TC.surfaceLowest,
                          color: TC.ink,
                          border: "none",
                          fontSize: 28,
                          fontWeight: 700,
                          fontFamily: "inherit",
                          cursor: "pointer",
                          boxShadow: TC.shadow,
                        }}
                      >
                        −
                      </button>
                      <div
                        style={{
                          flex: 1,
                          textAlign: "center",
                          fontSize: 32,
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                          color: TC.ink,
                        }}
                      >
                        {value}
                        <span
                          style={{
                            fontSize: 17,
                            color: TC.inkVariant,
                            fontWeight: 600,
                            marginLeft: 4,
                          }}
                        >
                          {editSubject}
                        </span>
                      </div>
                      <button
                        onClick={() => adjust(i, 1)}
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 9999,
                          background: TC.primary,
                          color: "#fff",
                          border: "none",
                          fontSize: 28,
                          fontWeight: 700,
                          fontFamily: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => setStatus(i, "ok")}
                      style={{
                        marginTop: 10,
                        width: "100%",
                        minHeight: 56,
                        background: TC.primary,
                        color: "#fff",
                        border: "none",
                        borderRadius: 9999,
                        fontSize: 18,
                        fontWeight: 700,
                        fontFamily: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      확인
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </Shell>
  );
};

const S_DosePush = () => (
  <div style={{ width: '100%', height: '100%', position: 'relative',
    background: 'linear-gradient(180deg, #1a1530 0%, #0d0a1a 100%)',
    overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: 80, left: 0, right: 0,
      textAlign: 'center', color: '#fff', opacity: 0.95 }}>
      <div style={{ fontSize: 18, fontWeight: 600, opacity: 0.7,
        marginBottom: 8 }}>
        5월 2일 금요일
      </div>
      <div style={{ fontSize: 86, fontWeight: 300, letterSpacing: -2,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        lineHeight: 1 }}>
        7:00
      </div>
    </div>

    <div style={{ position: 'absolute', left: 16, right: 16, top: 260,
      borderRadius: 18,
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '14px 16px 16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8,
          background: TC.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Capsule size={20} tilt={-30} />
        </div>
        <div style={{ flex: 1, fontSize: 13, fontWeight: 700,
          color: '#fff', letterSpacing: 0.3 }}>
          YAKSOK
        </div>
        <div style={{ fontSize: 13, color: '#fff', opacity: 0.7 }}>
          지금
        </div>
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#fff',
        marginBottom: 6, letterSpacing: -0.3 }}>
        저녁 약 드실 시간이에요
      </div>
      <div style={{ fontSize: 16, fontWeight: 500, color: '#fff',
        opacity: 0.85, lineHeight: 1.5 }}>
        어지러우시면 약사님께 말씀해 주세요
      </div>
    </div>

    <div style={{ position: 'absolute', bottom: 14, left: 0, right: 0,
      display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: 134, height: 5, borderRadius: 9999,
        background: '#fff', opacity: 0.85 }} />
    </div>
  </div>
);

const S_IntakeCalendar = () => {
  // 5월 1~14일 일별 상태 (1일=수, 14일=수)
  // 1~3 완료, 4~5 일부, 6~7 완료, 8 일부, 9~14 완료, 15(오늘=금)는 진행중, 16~ 미래
  const days = [
    { d: 1,  st: 'done' }, { d: 2,  st: 'done' }, { d: 3,  st: 'done' },
    { d: 4,  st: 'partial' }, { d: 5,  st: 'partial' },
    { d: 6,  st: 'done' }, { d: 7,  st: 'done' }, { d: 8, st: 'partial' },
    { d: 9,  st: 'done' }, { d: 10, st: 'done' }, { d: 11, st: 'done' },
    { d: 12, st: 'done' }, { d: 13, st: 'done' }, { d: 14, st: 'done' },
  ];
  // 5월 1일은 목요일 (placeholder) — 월=0, 화=1 ... 일=6
  // 단순화: 5월 1일=목, 그래서 앞에 빈 셀 3개 (월·화·수)
  const blanks = 3;

  const stColor = {
    done:    { bg: TC.safeBg,    emoji: '😊', text: TC.safe },
    partial: { bg: TC.warningBg, emoji: '😐', text: TC.onWarning },
    today:   { bg: '#fff',       emoji: '🙂', text: TC.primary },
    future:  { bg: TC.surfaceContainer, emoji: '·', text: TC.inkFaint },
  };

  return (
    <Shell>
      <TopBar title="복용 기록" left="←" />
      <div style={{ padding: '4px 24px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 22, fontWeight: 700, color: TC.ink }}>
          5월 <span style={{ fontSize: 14, color: TC.inkVariant }}>▾</span>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 6, marginBottom: 6 }}>
          {['월','화','수','목','금','토','일'].map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 14,
              fontWeight: 700, color: TC.inkVariant, padding: '4px 0' }}>
              {d}
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 6 }}>
          {Array.from({ length: blanks }).map((_, i) => (
            <div key={`b${i}`} style={{ aspectRatio: '1' }} />
          ))}
          {days.map(({ d, st }) => {
            const c = stColor[st];
            return (
              <div key={d} style={{ aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 36, height: 36, borderRadius: 9999,
                  background: c.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, lineHeight: 1 }}>
                  {c.emoji}
                </div>
              </div>
            );
          })}
          <div style={{ aspectRatio: '1',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 9999,
              background: '#fff',
              border: `2.5px solid ${TC.primary}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 700, color: TC.primary }}>
              15
            </div>
          </div>
          {[16,17,18].map(d => (
            <div key={d} style={{ aspectRatio: '1',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 36, height: 36, borderRadius: 9999,
                background: TC.surfaceContainer,
                fontSize: 16, fontWeight: 600, color: TC.inkFaint,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {d}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '20px 24px 0', padding: '16px 20px',
        background: TC.primaryFixed, borderRadius: 22,
        display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24 }}>🔥</span>
        <div style={{ fontSize: 18, fontWeight: 700, color: TC.primary }}>
          5일째 연속 섭취중
        </div>
      </div>

      <div style={{ padding: '20px 24px 110px', flex: 1, overflow: 'auto' }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: TC.ink,
          marginBottom: 14 }}>
          5월 2일 금요일 <span style={{ color: TC.inkVariant, fontWeight: 500,
            fontSize: 17 }}>(오늘)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { tone: 'morning', label: '아침', time: '오전 8:30',  st: 'taken' },
            { tone: 'noon',    label: '점심', time: '오후 12:30', st: 'taken' },
            { tone: 'evening', label: '저녁', time: '오후 7:00',  st: 'now' },
          ].map((r, i) => {
            const cmap = {
              morning: { bg: TC.morningBg, dot: TC.morning, ink: TC.morningInk },
              noon:    { bg: TC.noonBg,    dot: TC.noon,    ink: TC.noonInk },
              evening: { bg: TC.eveningBg, dot: TC.evening, ink: TC.eveningInk },
            }[r.tone];
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center',
                gap: 12, padding: '12px 14px',
                background: cmap.bg, borderRadius: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: 9999,
                  background: cmap.dot, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 17, fontWeight: 700,
                  color: cmap.ink }}>
                  {r.label}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: cmap.ink,
                  fontVariantNumeric: 'tabular-nums' }}>
                  {r.time}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700,
                  padding: '4px 10px', borderRadius: 9999,
                  background: r.st === 'taken' ? TC.safe : TC.primary,
                  color: '#fff' }}>
                  {r.st === 'taken' ? '✓' : '진행'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TabBar active="meds" />
    </Shell>
  );
};

// =============================================================
// S_Cabinet — '내 약' 탭 메인 page
// props:
//   empty: true → 빈 상태
// 달력 모드는 S_Today 헤더의 월간 expand로 이전됨 (mode prop 폐지)
// =============================================================

const S_Cabinet = ({ empty = false }) => {
  if (empty) {
    return (
      <Shell>
        <TopBar title="내 약" left="" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 32px 120px' }}>
          <div style={{ width: 120, height: 120, borderRadius: 9999,
            background: TC.surfaceContainer,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 28 }}>
            <Capsule size={64} />
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: TC.ink,
            marginBottom: 14, textAlign: 'center', letterSpacing: -0.3 }}>
            아직 등록한 약이 없어요
          </div>
          <div style={{ fontSize: 18, color: TC.inkVariant,
            lineHeight: 1.6, textAlign: 'center', marginBottom: 40 }}>
            처방약·영양제를 한 곳에 모아<br />
            복용 시간과 성분 중복을 챙겨드려요
          </div>
          <div style={{ width: '100%' }}>
            <BigButton variant="solid">처음 약을 등록해 보세요</BigButton>
          </div>
        </div>
        <TabBar active="meds" />
      </Shell>
    );
  }

  const PlusBtn = (
    <div style={{ width: 36, height: 36, borderRadius: 9999,
      background: TC.primaryFixed,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      marginLeft: 'auto' }}>
      <Ic name="plus" size={22} color={TC.primary} strokeWidth={2.6} />
    </div>
  );

  // ---------- 약 목록 (단일 모드 — 달력은 S_Today 헤더로 이전) ----------
  const MEDS = {
    prescription: {
      label: '처방약', emoji: '💊', isRxGroup: true,
      groups: [
        {
          date: '5월 10일',
          clinic: '사랑내과',
          items: [
            { name: '아스피린 100mg',      dose: '1정 · 식후', time: ['아침'] },
            { name: '아토르바스타틴 10mg', dose: '1정',         time: ['저녁'] },
            { name: '메트포르민 500mg',    dose: '1정',         time: ['아침','저녁'] },
          ],
        },
      ],
    },
    otc: {
      label: '일반의약품', emoji: '💛',
      items: [
        { name: '비타민B 콤플렉스', dose: '1정', time: ['식후'] },
      ],
    },
    supplement: {
      label: '영양제', emoji: '🌿',
      items: [
        { name: '비타민D 1000IU', dose: '1정',   time: ['식후'], dupe: '비타민B와 중복 가능' },
        { name: '오메가-3',        dose: '1캡슐', time: ['저녁'] },
      ],
    },
  };
  const timeToTone = (t) => (
    { '아침': 'morning', '점심': 'noon', '저녁': 'evening' }[t] || 'neutral'
  );

  const renderCard = (m, i) => (
    <Card key={i} raised={true} style={{ padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {m.time.map((t, j) => (
              <Pill key={j} tone={timeToTone(t)}>{t}</Pill>
            ))}
            {m.dupe && <Pill tone="warning">⚠ 중복</Pill>}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: TC.ink,
            marginBottom: 4, letterSpacing: -0.2 }}>
            {m.name}
          </div>
          <div style={{ fontSize: 15, color: TC.inkVariant, lineHeight: 1.4 }}>
            {m.dose}{m.dupe ? ` · ${m.dupe}` : ''}
          </div>
        </div>
        <Ic name="chev" size={22} color={TC.inkFaint} />
      </div>
    </Card>
  );

  const renderRxSupercard = (rx, i) => (
    <Card key={i} raised={true} style={{ padding: 0, overflow: 'hidden' }}>
      <button
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '16px 18px',
          background: 'transparent',
          border: 'none',
          fontFamily: 'inherit',
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10,
          background: TC.primaryFixed,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0 }}>
          <Ic name="doc" size={20} color={TC.primary} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: TC.ink,
            letterSpacing: -0.2 }}>
            {rx.date} · {rx.clinic}
          </div>
          <div style={{ fontSize: 13, color: TC.inkFaint, marginTop: 2 }}>
            약 {rx.items.length}가지 · 상세 보기
          </div>
        </div>
        <span style={{ fontSize: 12, fontWeight: 700,
          padding: '3px 9px', borderRadius: 8,
          background: TC.primary, color: '#fff', flexShrink: 0 }}>
          처방약
        </span>
        <Ic name="chev" size={18} color={TC.inkFaint} strokeWidth={2.5} />
      </button>
    </Card>
  );

  const renderGroup = (key, g) => {
    const totalCount = g.isRxGroup
      ? g.groups.reduce((n, rx) => n + rx.items.length, 0)
      : g.items.length;
    return (
      <div key={key} style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 10, padding: '0 4px' }}>
          <span style={{ fontSize: 18 }}>{g.emoji}</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: TC.inkVariant }}>
            {g.label}
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, color: TC.inkFaint }}>
            ({totalCount})
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {g.isRxGroup
            ? g.groups.map(renderRxSupercard)
            : g.items.map(renderCard)}
        </div>
      </div>
    );
  };

  return (
    <Shell>
      <div style={{ display: 'flex', alignItems: 'center',
        padding: '14px 20px 12px' }}>
        <span style={{ fontSize: 19, fontWeight: 700, color: TC.ink }}>
          내 약
        </span>
        {PlusBtn}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 110px' }}>
        {Object.entries(MEDS).map(([k, g]) => renderGroup(k, g))}
      </div>
      <TabBar active="meds" />
    </Shell>
  );
};

// =============================================================
// S_RxDetail — 처방 상세 모달
// 내 약 탭의 처방 supercard 탭 시 노출. 처방일·병원 + 약별 시간대·dose 풀 정보
// =============================================================

const S_RxDetail = () => {
  const rx = {
    date: '5월 10일',
    clinic: '사랑내과',
    items: [
      { name: '아스피린 100mg',      dose: '1정 · 식후', time: ['아침'] },
      { name: '아토르바스타틴 10mg', dose: '1정',         time: ['저녁'] },
      { name: '메트포르민 500mg',    dose: '1정',         time: ['아침','저녁'] },
    ],
  };
  const timeToTone = (t) => (
    { '아침': 'morning', '점심': 'noon', '저녁': 'evening' }[t] || 'neutral'
  );

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(17,24,39,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
    }}>
      <div style={{
        width: '100%',
        maxHeight: '90%',
        background: TC.surfaceLowest,
        borderRadius: 28,
        boxShadow: '0 20px 60px rgba(17,24,39,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 22px 16px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          borderBottom: `1px solid ${TC.outline}`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: TC.primaryFixed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Ic name="doc" size={24} color={TC.primary} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 12, fontWeight: 700,
              padding: '3px 9px', borderRadius: 8,
              background: TC.primary, color: '#fff',
              marginBottom: 6,
            }}>처방약</span>
            <div style={{ fontSize: 20, fontWeight: 700, color: TC.ink, letterSpacing: -0.3 }}>
              {rx.date} · {rx.clinic}
            </div>
            <div style={{ fontSize: 14, color: TC.inkFaint, marginTop: 2 }}>
              약 {rx.items.length}가지
            </div>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: 9999,
            background: TC.surfaceContainer, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            fontSize: 18, fontWeight: 700, fontFamily: 'inherit',
            color: TC.ink, lineHeight: 1,
          }}>
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '14px 22px 22px' }}>
          {rx.items.map((m, i) => (
            <div key={i} style={{
              paddingTop: i > 0 ? 14 : 4,
              paddingBottom: 14,
              borderTop: i > 0 ? `1px solid ${TC.outline}` : 'none',
            }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
                {m.time.map((t, k) => (
                  <Pill key={k} tone={timeToTone(t)}>{t}</Pill>
                ))}
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, color: TC.ink, letterSpacing: -0.2 }}>
                {m.name}
              </div>
              <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 4 }}>
                {m.dose}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// =============================================================
// TabBar 디자인 후보 (탐색용 — 본 IA에 영향 없음)
// =============================================================

const _NavTab = ({ icon, label, active = false, bold = false }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
    minWidth: 64, color: active ? TC.primary : TC.inkFaint,
  }}>
    <Ic name={icon} size={30} color={active ? TC.primary : TC.inkFaint}
      strokeWidth={bold ? 3.0 : 2} />
    <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
  </div>
);

// 01 step2 TabBar(line 462)의 토큰을 그대로 가져오되 padding·간격만 살짝 키움
const _NavBar = ({ children }) => (
  <div style={{
    position: "absolute", bottom: 16, left: 12, right: 12,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: 9999, padding: "18px 16px",
    display: "flex", alignItems: "center", justifyContent: "space-around",
    boxShadow: "0 6px 28px rgba(17,24,39,0.10)",
    zIndex: 5,
  }}>
    {children}
  </div>
);

const _DemoBody = ({ tag, title, sub }) => (
  <div style={{ padding: "32px 24px 0", flex: 1, position: "relative" }}>
    <div style={{ display: "inline-block",
      padding: "5px 12px", borderRadius: 9999,
      background: TC.primaryFixed, color: TC.primary,
      fontSize: 12, fontWeight: 700, letterSpacing: 0.06,
      textTransform: "uppercase", marginBottom: 14 }}>
      {tag}
    </div>
    <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0,
      letterSpacing: -0.4, color: TC.ink, lineHeight: 1.25 }}>
      {title}
    </h1>
    <p style={{ fontSize: 16, color: TC.inkVariant, marginTop: 10,
      lineHeight: 1.55 }}>
      {sub}
    </p>
    <div style={{ marginTop: 32, padding: "20px 18px",
      background: TC.surfaceLow, borderRadius: 18,
      fontSize: 14, color: TC.inkVariant, lineHeight: 1.5 }}>
      <span style={{ fontWeight: 700, color: TC.ink }}>가운데 영역만</span> 다르고,
      양쪽 4탭(오늘 · 캘린더 · 약통 · 내 정보)은 동일.
    </div>
  </div>
);

const _CenterFAB = ({ children, label }) => (
  <div style={{ display: "flex", flexDirection: "column",
    alignItems: "center", gap: 5 }}>
    <div style={{ width: 64, height: 64, borderRadius: 9999,
      background: TC.gradientHero,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 18px rgba(95,58,221,0.42)" }}>
      {children}
    </div>
    <span style={{ fontSize: 14, fontWeight: 700, color: TC.primary }}>
      {label}
    </span>
  </div>
);

const S_TabBarB = () => (
  <Shell>
    <_DemoBody
      tag="B안"
      title="‘약’ 로고 + ‘등록’ 라벨"
      sub="브랜드 워드마크(약) 재사용. ‘약을 등록한다’는 의미를 한글 자체로 전달."
    />
    <_NavBar>
      <_NavTab icon="home" label="오늘" active />
      <_NavTab icon="cal" label="캘린더" />
      <_CenterFAB label="등록">
        <img
          src="assets/logo-yaksok-yak.png"
          alt="약"
          style={{ width: 42, height: 'auto', display: 'block' }}
        />
      </_CenterFAB>
      <_NavTab icon="pill" label="약통" />
      <_NavTab icon="user" label="내 정보" />
    </_NavBar>
  </Shell>
);

const _WordmarkTab = ({ src, label, active = false }) => {
  const color = active ? TC.primary : TC.inkFaint;
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
      minWidth: 64, color,
    }}>
      <div style={{
        width: 32, height: 32,
        background: color,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        mask: `url(${src}) no-repeat center / contain`,
      }} />
      <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
    </div>
  );
};

const S_TabBar3 = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안 · 오늘 active"
      title="오늘 탭 active 상태"
      sub="‘늘’ 워드마크가 violet으로 켜지고 라벨도 violet. 가운데(약)·우측(나)는 회색."
    />
    <_NavBar>
      <_WordmarkTab src="assets/logo-yaksok-neul-rmbg.png" label="오늘" active />
      <_WordmarkTab src="assets/logo-yaksok-yak.png" label="내 약" />
      <_WordmarkTab src="assets/logo-yaksok-na-rmbg.png" label="내 정보" />
    </_NavBar>
  </Shell>
);

const S_TabBar3Active = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안 · 내 약 active"
      title="내 약 탭 active 상태"
      sub="‘약’ 워드마크가 violet으로 켜진 모습. 좌측(늘)·우측(나)는 회색."
    />
    <_NavBar>
      <_WordmarkTab src="assets/logo-yaksok-neul-rmbg.png" label="오늘" />
      <_WordmarkTab src="assets/logo-yaksok-yak.png" label="내 약" active />
      <_WordmarkTab src="assets/logo-yaksok-na-rmbg.png" label="내 정보" />
    </_NavBar>
  </Shell>
);

const S_TabBar3MeActive = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안 · 내 정보 active"
      title="내 정보 탭 active 상태"
      sub="‘나’ 워드마크가 violet으로 켜진 모습. 좌측(늘)·가운데(약)는 회색."
    />
    <_NavBar>
      <_WordmarkTab src="assets/logo-yaksok-neul-rmbg.png" label="오늘" />
      <_WordmarkTab src="assets/logo-yaksok-yak.png" label="내 약" />
      <_WordmarkTab src="assets/logo-yaksok-na-rmbg.png" label="내 정보" active />
    </_NavBar>
  </Shell>
);

// 아이콘 변형 — 워드마크 대신 stroke 아이콘 (home / pill / user, 굵은 stroke)
const S_TabBar3IconToday = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안(아이콘) · 오늘 active"
      title="오늘 탭 active — 아이콘 변형"
      sub="워드마크 대신 home/pill/user stroke 아이콘(굵게). 오늘(home)이 violet으로 켜진 모습."
    />
    <_NavBar>
      <_NavTab icon="home" label="오늘" active bold />
      <_NavTab icon="pill" label="내 약" bold />
      <_NavTab icon="user" label="내 정보" bold />
    </_NavBar>
  </Shell>
);

const S_TabBar3IconYak = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안(아이콘) · 내 약 active"
      title="내 약 탭 active — 아이콘 변형"
      sub="가운데 pill 아이콘이 violet으로 켜진 모습. 좌측(home)·우측(user)은 회색."
    />
    <_NavBar>
      <_NavTab icon="home" label="오늘" bold />
      <_NavTab icon="pill" label="내 약" active bold />
      <_NavTab icon="user" label="내 정보" bold />
    </_NavBar>
  </Shell>
);

const S_TabBar3IconMe = () => (
  <Shell>
    <_DemoBody
      tag="3-tab안(아이콘) · 내 정보 active"
      title="내 정보 탭 active — 아이콘 변형"
      sub="우측 user 아이콘이 violet으로 켜진 모습. 좌측(home)·가운데(pill)는 회색."
    />
    <_NavBar>
      <_NavTab icon="home" label="오늘" bold />
      <_NavTab icon="pill" label="내 약" bold />
      <_NavTab icon="user" label="내 정보" active bold />
    </_NavBar>
  </Shell>
);

// =============================================================
// FLOW 5 — 보호자 공유
// =============================================================

const S_ShareSetup = () => (
  <Shell>
    <TopBar title="가족 공유" left="←" />
    <div style={{ padding: "0 24px 22px" }}>
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 22,
          background: TC.primaryFixed,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 18,
        }}
      >
        <Ic name="users" size={38} color={TC.primary} />
      </div>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -0.5,
          margin: "0 0 12px",
          lineHeight: 1.25,
        }}
      >
        가족에게
        <br />
        안심을 보내요
      </h2>
      <p
        style={{
          fontSize: 18,
          color: TC.inkVariant,
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        무엇을 보여줄지 직접 정하세요
      </p>
    </div>
    <div
      style={{
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
      }}
    >
      <Card style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #d8ccff, #7857f8)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            김
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 700 }}>김민재 (아들)</div>
            <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 2 }}>
              초대 수락됨
            </div>
          </div>
          <Pill tone="safe">활성</Pill>
        </div>
      </Card>

      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: TC.inkVariant,
          marginTop: 14,
          marginBottom: 4,
        }}
      >
        보여드릴 내용
      </div>
      {[
        { l: "오늘 약을 드셨는지", desc: "복용 완료 / 남음", on: true },
        { l: "약이 부족한지", desc: "3일 이하 남았을 때", on: true },
        { l: "약사·의사 권고사항", desc: "주 1회 정리해서", on: true },
      ].map((s, i) => (
        <Card key={i} style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 2 }}>
                {s.desc}
              </div>
            </div>
            <div
              style={{
                width: 60,
                height: 36,
                borderRadius: 9999,
                background: s.on ? TC.primary : TC.surfaceContainerHigh,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: s.on ? 27 : 3,
                  width: 30,
                  height: 30,
                  borderRadius: 9999,
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                }}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
    <div style={{ padding: "18px 24px 24px" }}>
      <BigButton>저장</BigButton>
    </div>
  </Shell>
);

// =============================================================
// FLOW 5b — 보호자 홈 (PRD MVP #7)
// =============================================================

const S_CaregiverHome = () => {
  const mom = { initial: "박", name: "박정숙 어머니", sub: "68세 · 5월 2일 금요일" };
  const doses = [
    { tone: "morning", icon: "sun",  label: "아침", taken: true,  time: "8:12"  },
    { tone: "noon",    icon: "noon", label: "점심", taken: true,  time: "12:35" },
    { tone: "evening", icon: "moon", label: "저녁", taken: false, time: "오후 7:00" },
  ];
  const stock = {
    drug: "메트포르민",
    dose: "500mg · 하루 2회",
    daysLeft: 5,
    runOut: "5월 6일 소진 예상",
  };
  const advisory = {
    title: "아스피린 + 오메가-3 출혈 위험 주의",
    body: "두 성분 모두 혈액 응고를 늦춥니다. 다음 진료 때 의사와 상의를 권합니다.",
    source: "4월 28일 · 약국 김약사",
  };

  const tileStyle = {
    flex: 1, borderRadius: 18, padding: "14px 10px",
    textAlign: "center",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
  };

  return (
    <Shell bg={TC.surfaceLow}>
      <div
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, rgba(120,87,248,0.16) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "flex",
        flexDirection: "column", flex: 1 }}>
        <TopBar
          title="어머니 약속"
          left="←"
          right={<Ic name="bell" size={22} color={TC.primary} />}
        />

        <div style={{ padding: "0 24px 14px" }}>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 56, height: 56, borderRadius: 9999,
                  background: "linear-gradient(135deg, #d8ccff, #7857f8)",
                  color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 700,
                }}
              >
                {mom.initial}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 20, fontWeight: 700,
                  letterSpacing: -0.3 }}>
                  {mom.name}
                </div>
                <div style={{ fontSize: 14, color: TC.inkFaint, marginTop: 2 }}>
                  {mom.sub}
                </div>
              </div>
              <Pill tone="safe">오늘 양호</Pill>
            </div>
          </Card>
        </div>

        <div style={{ padding: "0 24px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TC.inkFaint,
            letterSpacing: "0.04em", marginBottom: 10 }}>
            오늘 복용 현황
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {doses.map((d, i) => {
              const taken = d.taken;
              const tones = {
                morning: { bg: TC.morningBg, ink: TC.morningInk, accent: TC.morning },
                noon:    { bg: TC.noonBg,    ink: TC.noonInk,    accent: TC.noon },
                evening: { bg: TC.eveningBg, ink: TC.eveningInk, accent: TC.evening },
              };
              const t = tones[d.tone];
              return (
                <div
                  key={i}
                  style={{
                    ...tileStyle,
                    background: taken ? t.bg : TC.surface,
                    color: taken ? t.ink : TC.inkVariant,
                  }}
                >
                  <Ic name={d.icon} size={20}
                    color={taken ? t.ink : t.accent} />
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{d.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700,
                    fontVariantNumeric: "tabular-nums" }}>
                    {taken ? `✓ ${d.time}` : d.time}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 12,
            lineHeight: 1.5 }}>
            어머니, 오늘 아침약 <b>8:12</b>에 드셨어요
          </div>
        </div>

        <div style={{ padding: "0 24px 16px" }}>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px 8px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TC.inkFaint,
                letterSpacing: "0.04em", marginBottom: 4 }}>
                약 재고
              </div>
              <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.3 }}>
                {stock.drug} {stock.daysLeft}일분 남음
              </div>
            </div>
            <div style={{ padding: "12px 18px 16px",
              display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 9999,
                  background: TC.warningBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Ic name="pill" size={22} color={TC.warning} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, color: TC.inkVariant,
                  marginBottom: 6 }}>
                  {stock.dose}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8,
                  flexWrap: "wrap" }}>
                  <Pill tone="warning">{stock.daysLeft}일 남음</Pill>
                  <span style={{ fontSize: 13, color: TC.inkFaint }}>
                    {stock.runOut}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                background: TC.warningBg, color: TC.onWarning,
                padding: "14px 18px",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}
            >
              <Ic name="alert" size={22} color={TC.onWarning} />
              <div>
                <b style={{ fontSize: 16 }}>약국 미리 들러주세요</b>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 3 }}>
                  처방전 재발급 필요
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ padding: "0 24px 16px" }}>
          <Card style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Ic name="flask" size={16} color={TC.danger} />
              <span style={{ fontSize: 13, fontWeight: 700, color: TC.danger,
                letterSpacing: "0.04em" }}>
                의료인 권고
              </span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.35,
              marginTop: 8 }}>
              {advisory.title}
            </div>
            <div style={{ fontSize: 15, color: TC.inkVariant,
              lineHeight: 1.55, marginTop: 6 }}>
              {advisory.body}
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center",
              gap: 8 }}>
              <Pill tone="danger">주의</Pill>
              <span style={{ fontSize: 13, color: TC.inkFaint }}>
                {advisory.source}
              </span>
            </div>
          </Card>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ padding: "12px 24px 10px",
          display: "flex", gap: 10 }}>
          <BigButton
            full={false}
            variant="soft"
            style={{ flex: 1, minHeight: 60, padding: "14px 16px",
              fontSize: 17,
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8 }}
          >
            <Ic name="msg" size={20} color={TC.onPrimaryVar} />
            메시지
          </BigButton>
          <BigButton
            full={false}
            style={{ flex: 1, minHeight: 60, padding: "14px 16px",
              fontSize: 17,
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8 }}
          >
            <Ic name="phone" size={20} color="#fff" />
            어머니께 전화
          </BigButton>
        </div>

        <div style={{ padding: "0 24px 18px",
          fontSize: 12, color: TC.inkFaint, textAlign: "center",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6 }}>
          <Ic name="users" size={13} color={TC.inkFaint} />
          어머니가 공유하기로 한 정보만 보여드려요
        </div>
      </div>
    </Shell>
  );
};

// =============================================================
// FLOW 6 — 상담 리포트
// =============================================================

const S_Report = () => (
  <Shell>
    <TopBar title="상담 리포트" left="←" />
    <div style={{ padding: "0 24px 22px" }}>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -0.5,
          margin: "0 0 12px",
          lineHeight: 1.25,
        }}
      >
        병원 가실 때<br />
        이렇게 보여드리세요
      </h2>
      <p
        style={{
          fontSize: 18,
          color: TC.inkVariant,
          lineHeight: 1.55,
          margin: 0,
        }}
      >
        지난 4주 기록을
        <br />한 장으로 정리했어요
      </p>
    </div>
    <div
      style={{
        padding: "0 24px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <Card
        style={{
          padding: "20px 22px",
          background: TC.gradientHero,
          color: "#fff",
          boxShadow: TC.shadowLg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 14,
            marginBottom: 16,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                opacity: 0.85,
                marginBottom: 8,
                letterSpacing: 0.05,
              }}
            >
              4주치 · 5월 2일 작성
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: -0.3,
                lineHeight: 1.25,
              }}
            >
              지난달
              <br />
              복용 리포트
            </div>
            <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.5 }}>
              7개 약 · 84% 약속
              <br />
              권고사항 5건
            </div>
          </div>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic name="doc" size={28} color="#fff" />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            style={{
              flex: 1,
              padding: "16px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "none",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <Ic name="eye" size={18} color="#fff" />
            미리보기
          </button>
          <button
            style={{
              flex: 1,
              padding: "16px",
              background: "#fff",
              color: TC.primary,
              border: "none",
              borderRadius: 9999,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            <Ic name="share" size={18} color={TC.primary} />
            보내기
          </button>
        </div>
      </Card>

      <div
        style={{
          fontSize: 15,
          fontWeight: 700,
          color: TC.inkVariant,
          marginTop: 8,
        }}
      >
        리포트에 들어가는 내용
      </div>
      {[
        { icon: "pill", l: "드시는 약 7개", sub: "이름·성분·함량" },
        { icon: "cal", l: "4주 복용 기록", sub: "시간대별 캘린더" },
        { icon: "msg", l: "권고사항 5건", sub: "약사·의사 메모" },
      ].map((s, i) => (
        <Card key={i} style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: TC.primaryFixed,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic name={s.icon} size={22} color={TC.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontSize: 15, color: TC.inkVariant }}>{s.sub}</div>
            </div>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: TC.primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic name="check" size={16} color="#fff" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Shell>
);

// =============================================================
// FLOW 0 — 온보딩 (pillye 패턴, 시니어 압축)
// =============================================================

const S_Splash = () => (
  <Shell bg="#5f3add">
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="assets/logo-yaksok.png"
        alt="약속"
        style={{
          width: "55%",
          maxWidth: 360,
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  </Shell>
);

const S_Terms = () => (
  <Shell bg="rgba(17,24,39,0.42)">
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        background: TC.surfaceLowest,
        borderRadius: "28px 28px 0 0",
        boxShadow: "0 -20px 56px rgba(95,58,221,0.18)",
        padding: "16px 24px 28px",
        maxHeight: "88%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: 44,
          height: 5,
          borderRadius: 9999,
          background: TC.surfaceContainerHigh,
          margin: "0 auto 18px",
        }}
      />
      <h3
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.4,
          margin: "0 0 8px",
          lineHeight: 1.25,
        }}
      >
        약관에 동의해주세요
      </h3>
      <p
        style={{
          fontSize: 17,
          color: TC.inkVariant,
          margin: "0 0 20px",
          lineHeight: 1.5,
        }}
      >
        건강정보를 안전하게 지켜드릴게요
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 0",
          borderBottom: `1px solid ${TC.outline}`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9999,
            background: TC.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic name="check" size={20} color="#fff" />
        </div>
        <div style={{ flex: 1, fontSize: 21, fontWeight: 700 }}>모두 동의</div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "14px 0",
        }}
      >
        {[
          { req: true, lbl: "(필수) 만 14세 이상입니다" },
          { req: true, lbl: "(필수) 서비스 이용약관" },
          { req: true, lbl: "(필수) 개인정보 처리방침" },
          { req: true, lbl: "(필수) 민감정보 수집·이용", accent: true },
          { req: false, lbl: "(선택) 마케팅 수신" },
        ].map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9999,
                background: t.req ? TC.primary : TC.surfaceContainer,
                color: t.req ? "#fff" : TC.inkFaint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic name="check" size={18} color={t.req ? "#fff" : TC.inkFaint} />
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 18,
                fontWeight: t.accent ? 700 : 500,
                color: t.accent ? TC.primary : TC.ink,
                lineHeight: 1.4,
              }}
            >
              {t.lbl}
            </div>
            <span style={{ fontSize: 16, color: TC.inkFaint, fontWeight: 600 }}>
              보기
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <BigButton>동의하고 시작하기</BigButton>
      </div>
    </div>
  </Shell>
);

const StepProgress = ({ n, total }) => (
  <span
    style={{
      fontSize: 17,
      fontWeight: 700,
      color: TC.inkVariant,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {n}
    <span style={{ color: TC.inkFaint, fontWeight: 500 }}> / {total}</span>
  </span>
);

const S_ProfileName = () => (
  <Shell>
    <TopBar title="" left="←" right={<StepProgress n={1} total={3} />} />
    <div style={{ padding: "8px 24px 24px" }}>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -0.5,
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        어떻게
        <br />
        불러드릴까요?
      </h2>
      <p
        style={{
          fontSize: 19,
          color: TC.inkVariant,
          lineHeight: 1.5,
          margin: 0,
        }}
      >
        약을 챙겨드릴 때 사용해요
      </p>
    </div>
    <div style={{ padding: "0 24px", flex: 1 }}>
      <div
        style={{
          padding: "20px 22px",
          borderRadius: 18,
          background: TC.surfaceLow,
          fontSize: 26,
          fontWeight: 700,
          color: TC.ink,
          lineHeight: 1.3,
          border: `2px solid ${TC.primary}`,
          boxShadow: "0 0 0 5px rgba(95,58,221,0.14)",
        }}
      >
        박정숙<span style={{ color: TC.primary }}>|</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          padding: "0 4px",
        }}
      >
        <span style={{ fontSize: 15, color: TC.inkFaint }}>
          5글자 이내로 입력해주세요
        </span>
        <span
          style={{
            fontSize: 15,
            color: TC.inkVariant,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          3 / 5
        </span>
      </div>
    </div>
    <div style={{ padding: "14px 24px 24px" }}>
      <BigButton>다음</BigButton>
    </div>
  </Shell>
);

const S_ProfileChronic = () => {
  const items = [
    { icon: "heart", lbl: "고혈압", selected: true },
    { icon: "flask", lbl: "당뇨", selected: true },
    { icon: "pill", lbl: "고지혈증", selected: false },
    { icon: "check-c", lbl: "골다공증", selected: false },
    { icon: "sparkle", lbl: "갑상선", selected: false },
    { icon: "plus", lbl: "기타", selected: false },
  ];
  return (
    <Shell>
      <TopBar title="" left="←" right={<StepProgress n={2} total={3} />} />
      <div style={{ padding: "8px 24px 18px" }}>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            margin: "0 0 10px",
            lineHeight: 1.2,
          }}
        >
          관리 중이신
          <br />
          질환이 있나요?
        </h2>
        <p
          style={{
            fontSize: 17,
            color: TC.inkVariant,
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          여러 개 선택할 수 있어요
        </p>
      </div>
      <div
        style={{
          padding: "0 22px",
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          alignContent: "start",
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              background: TC.surfaceLowest,
              borderRadius: 22,
              padding: "28px 8px 24px",
              boxShadow: TC.shadow,
              outline: it.selected ? `2px solid ${TC.primary}` : "none",
              outlineOffset: -2,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
              minHeight: 148,
            }}
          >
            {it.selected && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 26,
                  height: 26,
                  borderRadius: 9999,
                  background: TC.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic name="check" size={16} color="#fff" />
              </div>
            )}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: it.selected ? TC.primaryFixed : TC.surfaceContainer,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ic
                name={it.icon}
                size={32}
                color={it.selected ? TC.primary : TC.inkVariant}
              />
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                color: TC.ink,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {it.lbl}
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "14px 24px 24px" }}>
        <BigButton>확인 (2 / 6)</BigButton>
      </div>
    </Shell>
  );
};

const S_PermissionsCare = () => (
  <Shell>
    <TopBar title="" left="←" right={<StepProgress n={3} total={3} />} />
    <div style={{ padding: "8px 24px 22px" }}>
      <h2
        style={{
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -0.5,
          margin: "0 0 12px",
          lineHeight: 1.2,
        }}
      >
        두 가지 권한을
        <br />
        부탁드려요
      </h2>
      <p
        style={{
          fontSize: 19,
          color: TC.inkVariant,
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        약속을 더 잘 도와드리려면 필요해요
      </p>
    </div>
    <div
      style={{
        padding: "0 24px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {[
        {
          icon: "bell",
          lbl: "알림",
          sub: "복용 시간을 알려드려요\n저녁 7시, 저녁 약 시간이에요",
          tone: "evening",
          on: true,
        },
        {
          icon: "camera",
          lbl: "카메라",
          sub: "약봉투 사진으로 자동 등록\n글자를 읽어드려요",
          tone: "morning",
          on: true,
        },
      ].map((p, i) => {
        const colorMap = {
          evening: { bg: TC.eveningBg, fg: TC.evening },
          morning: { bg: TC.morningBg, fg: TC.morning },
        };
        const col = colorMap[p.tone];
        return (
          <Card key={i} style={{ padding: "20px 22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: col.bg,
                  color: col.fg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ic name={p.icon} size={28} color={col.fg} />
              </div>
              <div style={{ flex: 1, fontSize: 22, fontWeight: 700 }}>
                {p.lbl}
              </div>
              <div
                style={{
                  width: 60,
                  height: 36,
                  borderRadius: 9999,
                  background: p.on ? TC.primary : TC.surfaceContainerHigh,
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: p.on ? 27 : 3,
                    width: 30,
                    height: 30,
                    borderRadius: 9999,
                    background: "#fff",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.18)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                paddingLeft: 70,
                fontSize: 17,
                color: TC.inkVariant,
                lineHeight: 1.55,
                whiteSpace: "pre-line",
              }}
            >
              {p.sub}
            </div>
          </Card>
        );
      })}
    </div>
    <div style={{ padding: "14px 24px 24px" }}>
      <BigButton>허용하고 시작</BigButton>
    </div>
  </Shell>
);

const S_OnboardingLoading = () => (
  <Shell>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 35%, rgba(120,87,248,0.18) 0%, transparent 55%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: 156,
          height: 156,
          borderRadius: 44,
          background: TC.gradientHero,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 28px 64px rgba(95,58,221,0.32)",
          marginBottom: 36,
          position: "relative",
        }}
      >
        <Capsule size={92} />
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            width: 38,
            height: 38,
            borderRadius: 9999,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 18px rgba(95,58,221,0.32)",
          }}
        >
          <Ic name="sparkle" size={22} color={TC.primary} />
        </div>
      </div>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.4,
          margin: "0 0 12px",
          textAlign: "center",
          lineHeight: 1.3,
          maxWidth: 300,
        }}
      >
        박정숙님의 약통을
        <br />
        준비하고 있어요
      </h2>
      <p
        style={{
          fontSize: 18,
          color: TC.inkVariant,
          margin: 0,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        잠시만 기다려주세요
      </p>

      <div
        style={{
          marginTop: 36,
          width: 200,
          height: 8,
          borderRadius: 9999,
          background: TC.surfaceContainer,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "64%",
            height: "100%",
            background: TC.gradientHero,
            borderRadius: 9999,
          }}
        />
      </div>
    </div>
  </Shell>
);

const S_OnboardingDone = () => (
  <Shell>
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 30%, rgba(120,87,248,0.18) 0%, transparent 60%)",
        pointerEvents: "none",
      }}
    />
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          width: 112,
          height: 112,
          borderRadius: 9999,
          background: TC.safeBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 28,
          boxShadow: "0 18px 40px rgba(16,185,129,0.20)",
        }}
      >
        <Ic name="check" size={56} color={TC.safe} />
      </div>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: -0.7,
          margin: "0 0 14px",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        준비가
        <br />
        끝났어요
      </h1>
      <p
        style={{
          fontSize: 21,
          color: TC.inkVariant,
          textAlign: "center",
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 280,
        }}
      >
        첫 약을 사진 한 장으로
        <br />
        등록해볼까요?
      </p>
    </div>
    <div
      style={{
        padding: "0 24px 56px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <BigButton>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <Ic name="camera" size={24} color="#fff" />첫 약 등록하기
        </span>
      </BigButton>
      <BigButton variant="ghost" style={{ minHeight: 56 }}>
        나중에 할게요
      </BigButton>
    </div>
  </Shell>
);

// =============================================================
window.YS = {
  S_Splash,
  S_Welcome,
  S_Terms,
  S_ProfileName,
  S_ProfileChronic,
  S_PermissionsCare,
  S_OnboardingLoading,
  S_OnboardingDone,
  S_AddType,
  S_AddChoice,
  S_Camera,
  S_Confirm,
  S_Schedule,
  S_Search,
  S_SearchAdded,
  S_SearchConfirm,
  S_SelectedEmpty,
  S_SelectedList,
  S_SelectedEdit,
  S_DoseSheet,
  S_AnalyzeLoading,
  S_Result,
  S_AddNote,
  S_DoseNotice,
  S_DosePush,
  S_Today,
  S_Cabinet,
  S_RxDetail,
  S_IntakeCalendar,
  S_StockCheck,
  S_ShareSetup,
  S_CaregiverHome,
  S_Report,
  S_TabBarB,
  S_TabBar3,
  S_TabBar3Active,
  S_TabBar3MeActive,
  S_TabBar3IconToday,
  S_TabBar3IconYak,
  S_TabBar3IconMe,
};
