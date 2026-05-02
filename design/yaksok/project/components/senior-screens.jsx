/* YakSok — 박정숙(68) 시니어 친화 화면 세트
   - 본문 최소 20px, 주요 텍스트 24~32px
   - 버튼 64px+ 높이, 라벨 22px+
   - 한 화면 한 행동
   - 시간대별 채도 컬러: 아침 Amber, 점심 Mint, 저녁 Violet
*/

const TC = {
  primary: '#5f3add',
  primaryDim: '#7857f8',
  primaryFixed: '#ece6ff',
  primaryFixedDim: '#d8ccff',
  onPrimaryVar: '#311b92',
  surfaceLowest: '#ffffff',
  surface: '#fafafa',
  surfaceLow: '#f3f3f3',
  surfaceContainer: '#ededed',
  surfaceContainerHigh: '#e0e0e0',
  ink: '#111827',
  inkVariant: '#374151',  // 더 진하게 (시니어 가독성)
  inkFaint: '#6b7280',    // 더 진하게
  outline: 'rgba(17,24,39,0.08)',
  // 시간대 채도 컬러
  morning: '#f59e0b',
  morningBg: '#fef3c7',
  morningInk: '#78350f',
  noon: '#10b981',
  noonBg: '#d1fae5',
  noonInk: '#064e3b',
  evening: '#5f3add',
  eveningBg: '#ece6ff',
  eveningInk: '#311b92',
  // semantic
  safe: '#10b981',
  safeBg: '#d1fae5',
  onSafe: '#064e3b',
  warning: '#f59e0b',
  warningBg: '#fef3c7',
  onWarning: '#78350f',
  danger: '#dc2626',
  dangerBg: '#fee2e2',
  onDanger: '#7f1d1d',
  shadow: '0 8px 24px rgba(95,58,221,0.10)',
  shadowLg: '0 16px 40px rgba(95,58,221,0.14)',
  gradientHero: 'linear-gradient(135deg, #5f3add 0%, #7857f8 100%)',
};

// =============================================================
// Atoms — Senior tuned
// =============================================================

const Shell = ({ children, bg = TC.surfaceLow }) => (
  <div style={{
    width: '100%', height: '100%',
    background: bg, position: 'relative', overflow: 'hidden',
    fontFamily: "'Pretendard', system-ui, sans-serif",
    color: TC.ink, display: 'flex', flexDirection: 'column',
  }}>{children}</div>
);

const TopBar = ({ title, left = '←', right = null }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 20px 12px', flexShrink: 0,
  }}>
    <span style={{ fontSize: 28, color: TC.ink, width: 36,
      fontWeight: 500, lineHeight: 1, flexShrink: 0 }}>{left}</span>
    <span style={{ fontSize: 19, fontWeight: 700, color: TC.ink,
      whiteSpace: 'nowrap' }}>{title}</span>
    <span style={{ fontSize: 17, color: TC.primary, width: 36,
      textAlign: 'right', fontWeight: 700, flexShrink: 0 }}>{right}</span>
  </div>
);

const BigButton = ({ children, full = true, style = {}, variant = 'solid' }) => {
  const variants = {
    solid: { background: TC.gradientHero, color: '#fff',
      boxShadow: '0 8px 22px rgba(95,58,221,0.32)' },
    soft: { background: TC.primaryFixed, color: TC.onPrimaryVar },
    ghost: { background: 'transparent', color: TC.primary },
    danger: { background: TC.danger, color: '#fff',
      boxShadow: '0 8px 22px rgba(220,38,38,0.32)' },
  };
  return (
    <button style={{
      width: full ? '100%' : 'auto',
      minHeight: 68,
      padding: '20px 28px',
      borderRadius: 9999,
      border: 'none',
      fontSize: 21, fontWeight: 700,
      fontFamily: 'inherit', letterSpacing: -0.2,
      cursor: 'pointer',
      ...variants[variant], ...style,
    }}>{children}</button>
  );
};

const Card = ({ children, style = {}, raised = true }) => (
  <div style={{
    background: TC.surfaceLowest,
    borderRadius: 20, padding: 22,
    boxShadow: raised ? TC.shadow : 'none',
    ...style,
  }}>{children}</div>
);

const Pill = ({ children, tone = 'neutral', big = false }) => {
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
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: t.bg, color: t.fg, borderRadius: 9999,
      padding: big ? '8px 16px' : '6px 12px',
      fontSize: big ? 16 : 14,
      fontWeight: 700, whiteSpace: 'nowrap',
    }}>{children}</span>
  );
};

const Capsule = ({ size = 28, tilt = -28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
    <defs><clipPath id={`cp-${size}-${tilt}`}>
      <rect x="6" y="14" width="28" height="12" rx="6" transform={`rotate(${tilt} 20 20)`} />
    </clipPath></defs>
    <g clipPath={`url(#cp-${size}-${tilt})`}>
      <rect x="0" y="0" width="40" height="40" fill="#5f3add"
        transform={`rotate(${tilt} 20 20) translate(0 ${tilt < 0 ? -3 : 3})`} />
      <rect x="0" y="20" width="40" height="20" fill="#ece6ff"
        transform={`rotate(${tilt} 20 20)`} />
    </g>
  </svg>
);

const Ic = ({ name, size = 24, color = 'currentColor' }) => {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth: 2,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'block', flexShrink: 0 },
  };
  switch (name) {
    case 'sun': return <svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>;
    case 'noon': return <svg {...p}><circle cx="12" cy="12" r="5" strokeWidth="2.4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>;
    case 'moon': return <svg {...p}><path d="M21 13a8 8 0 11-9-9 6 6 0 009 9z"/></svg>;
    case 'check': return <svg {...p}><path d="M5 12l4 4 10-10"/></svg>;
    case 'check-c': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>;
    case 'plus': return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'pill': return <svg {...p}><rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-30 12 12)"/><path d="M9 6.5l3 5.2" transform="rotate(-30 12 12)"/></svg>;
    case 'camera': return <svg {...p}><path d="M3 8h4l1.5-2h7L17 8h4v11H3z"/><circle cx="12" cy="13" r="3.5"/></svg>;
    case 'search': return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>;
    case 'alert': return <svg {...p}><path d="M12 3l10 17H2z"/><path d="M12 10v5M12 18v.01"/></svg>;
    case 'clock': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'bell': return <svg {...p}><path d="M6 16V11a6 6 0 0112 0v5l1.5 2H4.5z"/><path d="M10 20a2 2 0 004 0"/></svg>;
    case 'home': return <svg {...p}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'cal': return <svg {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>;
    case 'user': return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>;
    case 'users': return <svg {...p}><circle cx="9" cy="8" r="3.5"/><path d="M3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5"/><circle cx="17" cy="9" r="2.5"/><path d="M15 20c.4-2.5 2-4 4-4s3.6 1 4 4"/></svg>;
    case 'doc': return <svg {...p}><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h4"/></svg>;
    case 'flask': return <svg {...p}><path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/></svg>;
    case 'mic': return <svg {...p}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg>;
    case 'arrow': return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'chev': return <svg {...p}><path d="M9 6l6 6-6 6"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></svg>;
    case 'heart': return <svg {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 10c0 5.5-7 10-7 10z"/></svg>;
    case 'phone': return <svg {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>;
    case 'eye': return <svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'msg': return <svg {...p}><path d="M4 5h16v11H10l-5 4V5z"/></svg>;
    case 'share': return <svg {...p}><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 11l8-4M8 13l8 4"/></svg>;
    default: return null;
  }
};

const TabBar = ({ active = 'home' }) => {
  const tabs = [
    { id: 'home', icon: 'home', label: '오늘' },
    { id: 'cabinet', icon: 'pill', label: '약통' },
    { id: 'add', icon: 'plus', primary: true },
    { id: 'cal', icon: 'cal', label: '캘린더' },
    { id: 'me', icon: 'user', label: '내 정보' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 16, left: 12, right: 12,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 9999, padding: '14px 14px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      boxShadow: '0 6px 28px rgba(17,24,39,0.10)', zIndex: 5,
    }}>
      {tabs.map(t => {
        if (t.primary) return (
          <div key={t.id} style={{
            width: 56, height: 56, borderRadius: 9999,
            background: TC.gradientHero,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 8px 18px rgba(95,58,221,0.42)',
          }}><Ic name={t.icon} size={28} color="#fff" /></div>
        );
        const a = t.id === active;
        return (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 4, minWidth: 56,
            color: a ? TC.primary : TC.inkFaint,
          }}>
            <Ic name={t.icon} size={26} color={a ? TC.primary : TC.inkFaint} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// =============================================================
// FLOW 1 — 첫 약 등록
// =============================================================

const S_Welcome = () => (
  <Shell bg="#fbfaff">
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 0%, rgba(120,87,248,0.20) 0%, transparent 60%)',
      pointerEvents: 'none' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '0 32px',
      position: 'relative', zIndex: 1 }}>
      <div style={{
        width: 120, height: 120, borderRadius: 32,
        background: TC.gradientHero,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 24px 56px rgba(95,58,221,0.32)',
        marginBottom: 32,
      }}><Capsule size={68} /></div>
      <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.8,
        marginBottom: 18, textAlign: 'center', lineHeight: 1.2,
        margin: '0 0 18px' }}>
        매일의 약속,<br/>함께 지켜요
      </h1>
      <p style={{ fontSize: 21, color: TC.inkVariant, textAlign: 'center',
        lineHeight: 1.5, margin: 0, maxWidth: 320 }}>
        약과 영양제를<br/>한 번에 챙겨드릴게요
      </p>
    </div>
    <div style={{ padding: '0 24px 56px',
      display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BigButton>시작하기</BigButton>
      <BigButton variant="ghost" style={{ minHeight: 56 }}>
        이미 가입했어요
      </BigButton>
    </div>
  </Shell>
);

const S_AddChoice = () => (
  <Shell>
    <TopBar title="" left="" right="" />
    <div style={{ padding: '8px 24px 28px' }}>
      <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5,
        margin: '0 0 12px', lineHeight: 1.2 }}>
        지금 드시는 약을<br/>알려주세요
      </h2>
      <p style={{ fontSize: 19, color: TC.inkVariant,
        lineHeight: 1.5, margin: 0 }}>
        사진 한 장이면 충분해요
      </p>
    </div>
    <div style={{ padding: '0 24px',
      display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { icon: 'camera', title: '사진으로 추가', desc: '약봉투·라벨을 찍으면 자동으로',
          primary: true },
        { icon: 'search', title: '이름으로 찾기', desc: '약 이름·영양제 이름 검색' },
        { icon: 'mic', title: '말로 알려주기', desc: '음성으로 약 이름 말하기' },
      ].map((opt, i) => (
        <button key={i} style={{
          display: 'flex', alignItems: 'center', gap: 16,
          padding: 22, borderRadius: 22,
          background: opt.primary ? TC.gradientHero : TC.surfaceLowest,
          color: opt.primary ? '#fff' : TC.ink,
          boxShadow: opt.primary
            ? '0 14px 32px rgba(95,58,221,0.32)' : TC.shadow,
          border: 'none', textAlign: 'left',
          fontFamily: 'inherit', cursor: 'pointer', width: '100%',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 18,
            background: opt.primary ? 'rgba(255,255,255,0.22)' : TC.primaryFixed,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ic name={opt.icon} size={28}
              color={opt.primary ? '#fff' : TC.primary} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 4 }}>
              {opt.title}
            </div>
            <div style={{ fontSize: 16,
              color: opt.primary ? 'rgba(255,255,255,0.9)' : TC.inkVariant,
              lineHeight: 1.4 }}>
              {opt.desc}
            </div>
          </div>
          <Ic name="chev" size={26}
            color={opt.primary ? '#fff' : TC.inkFaint} />
        </button>
      ))}
    </div>
  </Shell>
);

const S_Camera = () => (
  <Shell bg="#0d0a1a">
    <div style={{ position: 'relative', zIndex: 1, display: 'flex',
      flexDirection: 'column', height: '100%', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        padding: '14px 22px', alignItems: 'center' }}>
        <span style={{ fontSize: 28, lineHeight: 1 }}>×</span>
        <span style={{ fontSize: 19, fontWeight: 700 }}>약봉투 촬영</span>
        <span style={{ fontSize: 17, color: '#fff', fontWeight: 700 }}>도움</span>
      </div>
      <div style={{ flex: 1, padding: '12px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: '100%', aspectRatio: '3/4',
          borderRadius: 24,
          background: 'linear-gradient(160deg, #2a1f4d 0%, #1a1331 100%)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '16%', left: '12%', right: '12%', bottom: '16%',
            background: 'linear-gradient(180deg, #f5efe1, #e9dfc7)',
            borderRadius: 8, padding: 18,
            transform: 'rotate(-2deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }}>
            <div style={{ fontSize: 12, color: '#5a4b2e', fontWeight: 700,
              marginBottom: 8 }}>OO약국 처방</div>
            <div style={{ fontSize: 15, color: '#3a2f1f', fontWeight: 700,
              marginBottom: 12 }}>박정숙 님 · 5/2</div>
            <div style={{ fontSize: 12, color: '#3a2f1f', lineHeight: 1.6,
              fontWeight: 600 }}>
              메트포르민 500mg<br/>아토르바스타틴 10mg<br/>아스피린 100mg
            </div>
          </div>
          {['tl','tr','bl','br'].map(c => {
            const pos = {
              tl: { top: '10%', left: '10%' },
              tr: { top: '10%', right: '10%' },
              bl: { bottom: '10%', left: '10%' },
              br: { bottom: '10%', right: '10%' },
            }[c];
            return <div key={c} style={{
              position: 'absolute', width: 36, height: 36,
              border: `4px solid ${TC.primary}`, borderRadius: 8, ...pos,
            }} />;
          })}
        </div>
      </div>
      <div style={{ padding: '12px 24px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 18, color: '#fff', marginBottom: 24,
          lineHeight: 1.5, fontWeight: 600 }}>
          약봉투를 사각형 안에<br/>맞춰주세요
        </div>
        <div style={{ display: 'flex', justifyContent: 'center',
          paddingBottom: 24 }}>
          <div style={{
            width: 92, height: 92, borderRadius: 9999,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 6px rgba(255,255,255,0.25)',
          }}>
            <div style={{ width: 72, height: 72, borderRadius: 9999,
              background: TC.gradientHero }} />
          </div>
        </div>
      </div>
    </div>
  </Shell>
);

const S_Confirm = () => (
  <Shell>
    <TopBar title="확인" left="←" />
    <div style={{ padding: '0 24px 16px' }}>
      <Pill tone="primary" big>
        <Ic name="sparkle" size={16} /> 약 3개를 찾았어요
      </Pill>
      <p style={{ fontSize: 18, color: TC.inkVariant, marginTop: 14,
        lineHeight: 1.5, margin: '14px 0 0' }}>
        잘못된 부분이 있으면<br/>눌러서 고쳐주세요
      </p>
    </div>
    <div style={{ padding: '8px 24px', display: 'flex',
      flexDirection: 'column', gap: 12, flex: 1, overflow: 'auto' }}>
      {[
        { name: '메트포르민', dose: '500 mg' },
        { name: '아토르바스타틴', dose: '10 mg' },
        { name: '아스피린', dose: '100 mg' },
      ].map((m, i) => (
        <Card key={i} style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14,
              background: TC.primaryFixed, display: 'flex',
              alignItems: 'center', justifyContent: 'center' }}>
              <Ic name="pill" size={26} color={TC.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>
                {m.name}
              </div>
              <div style={{ fontSize: 17, color: TC.inkVariant }}>
                {m.dose}
              </div>
            </div>
            <Ic name="chev" size={24} color={TC.inkFaint} />
          </div>
        </Card>
      ))}
    </div>
    <div style={{ padding: '14px 24px 24px' }}>
      <BigButton>3개 모두 추가하기</BigButton>
    </div>
  </Shell>
);

const S_Schedule = () => (
  <Shell>
    <TopBar title="시간 정하기" left="←" />
    <div style={{ padding: '0 24px 18px' }}>
      <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.4,
        margin: '0 0 8px', lineHeight: 1.25 }}>
        언제 드세요?
      </h2>
      <p style={{ fontSize: 17, color: TC.inkVariant, margin: 0 }}>
        시간을 눌러 켜거나 꺼주세요
      </p>
    </div>
    <div style={{ padding: '0 24px', display: 'flex',
      flexDirection: 'column', gap: 14, flex: 1 }}>
      {[
        { lbl: '아침', icon: 'sun', time: '오전 8:30', on: true,
          tone: 'morning', items: ['메트포르민'] },
        { lbl: '점심', icon: 'noon', time: '오후 12:30', on: true,
          tone: 'noon', items: ['메트포르민'] },
        { lbl: '저녁', icon: 'moon', time: '오후 7:00', on: true,
          tone: 'evening',
          items: ['메트포르민','아토르바스타틴','아스피린'] },
      ].map((t, i) => {
        const colorMap = {
          morning: { bg: TC.morningBg, ink: TC.morningInk, dot: TC.morning },
          noon: { bg: TC.noonBg, ink: TC.noonInk, dot: TC.noon },
          evening: { bg: TC.eveningBg, ink: TC.eveningInk, dot: TC.evening },
        };
        const col = colorMap[t.tone];
        return (
          <Card key={i} style={{ padding: '18px 20px',
            background: t.on ? TC.surfaceLowest : TC.surfaceContainer,
            boxShadow: t.on ? TC.shadow : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14,
              marginBottom: t.items.length ? 12 : 0 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16,
                background: col.bg, color: col.dot,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic name={t.icon} size={28} color={col.dot} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700,
                  color: t.on ? TC.ink : TC.inkFaint }}>{t.lbl}</div>
                <div style={{ fontSize: 22, fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                  color: t.on ? col.ink : TC.inkFaint, marginTop: 2 }}>
                  {t.time}
                </div>
              </div>
              <div style={{ width: 60, height: 36, borderRadius: 9999,
                background: t.on ? col.dot : TC.surfaceContainerHigh,
                position: 'relative', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 3,
                  left: t.on ? 27 : 3,
                  width: 30, height: 30, borderRadius: 9999, background: '#fff',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }} />
              </div>
            </div>
            {t.items.length > 0 && (
              <div style={{ paddingLeft: 66, fontSize: 16,
                color: TC.inkVariant, lineHeight: 1.5 }}>
                {t.items.join(' · ')}
              </div>
            )}
          </Card>
        );
      })}
    </div>
    <div style={{ padding: '14px 24px 24px' }}>
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
    <div style={{ padding: '0 22px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12,
        background: TC.surfaceContainer, borderRadius: 18,
        padding: '18px 20px' }}>
        <Ic name="search" size={24} color={TC.inkVariant} />
        <span style={{ fontSize: 22, color: TC.ink, flex: 1, fontWeight: 600 }}>
          오메가-3
        </span>
      </div>
    </div>
    <div style={{ padding: '0 22px', flex: 1, overflow: 'auto',
      display: 'flex', flexDirection: 'column', gap: 12 }}>
      {[
        { brand: 'GNM', name: '오메가-3 알티지', dose: 'EPA+DHA 600mg', tag: '많이 등록' },
        { brand: '센트룸', name: '오메가-3', dose: 'EPA+DHA 500mg' },
        { brand: '뉴트리원', name: 'rTG 오메가-3', dose: 'EPA+DHA 800mg' },
        { brand: '솔가', name: 'Omega-3 950', dose: 'EPA+DHA 950mg' },
      ].map((o, i) => (
        <Card key={i} style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(135deg, #ffe7c2, #ffc888)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#7a4a1a' }}>
              {o.brand}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4,
                lineHeight: 1.2 }}>
                {o.name}
              </div>
              <div style={{ fontSize: 16, color: TC.inkVariant, marginBottom: o.tag ? 6 : 0 }}>
                {o.dose}
              </div>
              {o.tag && <Pill tone="primary">{o.tag}</Pill>}
            </div>
            <Ic name="plus" size={28} color={TC.primary} />
          </div>
        </Card>
      ))}
    </div>
  </Shell>
);

const S_Result = () => (
  <Shell>
    <TopBar title="확인 결과" left="←" />
    <div style={{ padding: '0 22px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16,
          background: 'linear-gradient(135deg, #ffe7c2, #ffc888)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: '#7a4a1a' }}>GNM</div>
        <div>
          <div style={{ fontSize: 21, fontWeight: 700 }}>오메가-3 알티지</div>
          <div style={{ fontSize: 16, color: TC.inkVariant, marginTop: 2 }}>
            EPA+DHA 600mg · 1일 1회
          </div>
        </div>
      </div>
    </div>
    <div style={{ padding: '0 22px', flex: 1, overflow: 'auto',
      display: 'flex', flexDirection: 'column', gap: 14 }}>

      <div style={{ padding: 22, borderRadius: 22,
        background: TC.warningBg, color: TC.onWarning }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 12 }}>
          <Ic name="alert" size={26} color={TC.onWarning} />
          <span style={{ fontSize: 18, fontWeight: 700, whiteSpace: 'nowrap' }}>
            확인이 필요해요
          </span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8,
          letterSpacing: -0.3 }}>
          아스피린 + 오메가-3
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.92,
          margin: 0 }}>
          함께 드시면 출혈이<br/>늘어날 수 있어요.<br/>
          <b>약사님과 한 번 상의해 주세요.</b>
        </p>
      </div>

      <div style={{ padding: 22, borderRadius: 22,
        background: '#dbeafe', color: '#1e3a8a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 12 }}>
          <Ic name="flask" size={24} color="#1e3a8a" />
          <span style={{ fontSize: 18, fontWeight: 700 }}>
            비타민 D — 두 번 들어 있어요
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline',
          justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 16 }}>하루 합계</span>
          <span style={{ fontSize: 28, fontWeight: 700,
            fontVariantNumeric: 'tabular-nums' }}>1,200 IU</span>
        </div>
        <div style={{ height: 12, background: 'rgba(59,130,246,0.18)',
          borderRadius: 9999, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: '60%', height: '100%',
            background: '#3b82f6', borderRadius: 9999 }} />
        </div>
        <div style={{ fontSize: 15, lineHeight: 1.5 }}>
          하루 권장 한도(2,000 IU) 안이에요
        </div>
      </div>

      <div style={{ fontSize: 14, color: TC.inkFaint, textAlign: 'center',
        padding: '6px 16px', lineHeight: 1.5 }}>
        ※ 의료 판단이 아니에요.<br/>
        복용 변경은 약사·의사와 상담하세요.
      </div>
    </div>
    <div style={{ padding: '14px 22px 24px',
      display: 'flex', flexDirection: 'column', gap: 10 }}>
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
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: TC.surfaceLowest,
      borderRadius: '28px 28px 0 0',
      boxShadow: '0 -20px 56px rgba(95,58,221,0.18)',
      padding: '16px 24px 28px',
      maxHeight: '90%',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: 44, height: 5, borderRadius: 9999,
        background: TC.surfaceContainerHigh,
        margin: '0 auto 18px' }} />
      <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.4,
        margin: '0 0 8px', lineHeight: 1.25 }}>
        약사님이 뭐라고<br/>하셨나요?
      </h3>
      <p style={{ fontSize: 17, color: TC.inkVariant, margin: '0 0 22px',
        lineHeight: 1.5 }}>
        복용 시간에 다시 보여드릴게요
      </p>

      <div style={{
        padding: '20px 22px', borderRadius: 18,
        background: TC.surfaceLow,
        fontSize: 21, color: TC.ink, marginBottom: 22,
        minHeight: 110, lineHeight: 1.5,
        border: `2px solid ${TC.primary}`,
        boxShadow: '0 0 0 5px rgba(95,58,221,0.14)',
        fontWeight: 500,
      }}>
        어지러우면 약사에게 알려달라고 하셨어요|
      </div>

      <button style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, width: '100%',
        padding: '16px', borderRadius: 9999,
        background: TC.primaryFixed, color: TC.primary,
        border: 'none', fontFamily: 'inherit',
        fontSize: 17, fontWeight: 700, marginBottom: 22, cursor: 'pointer',
      }}>
        <Ic name="mic" size={22} color={TC.primary} />
        말로 입력하기
      </button>

      <div style={{ fontSize: 14, fontWeight: 700,
        letterSpacing: 0.05, color: TC.inkVariant, marginBottom: 10,
        textTransform: 'uppercase' }}>누가 하신 말씀</div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
        {['약사', '의사', '직접'].map((t, i) => (
          <div key={i} style={{ flex: 1,
            padding: '14px', borderRadius: 9999,
            background: i === 0 ? TC.primary : TC.surfaceContainer,
            color: i === 0 ? '#fff' : TC.ink,
            fontSize: 18, fontWeight: 700, textAlign: 'center',
          }}>{t}</div>
        ))}
      </div>

      <BigButton>저장</BigButton>
    </div>
  </Shell>
);

const S_DoseNotice = () => (
  <Shell>
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 0%, rgba(120,87,248,0.18) 0%, transparent 60%)',
      pointerEvents: 'none' }} />
    <TopBar title="" left="" />
    <div style={{ padding: '0 24px 12px', position: 'relative', zIndex: 1 }}>
      <Pill tone="evening" big>
        <Ic name="moon" size={16} /> 저녁 약 시간
      </Pill>
      <h2 style={{ fontSize: 38, fontWeight: 700, letterSpacing: -0.6,
        margin: '14px 0 8px', lineHeight: 1.15,
        fontVariantNumeric: 'tabular-nums' }}>
        오후 7:00
      </h2>
      <p style={{ fontSize: 19, color: TC.inkVariant,
        margin: 0, lineHeight: 1.5 }}>
        세 가지 약을<br/>드실 시간이에요
      </p>
    </div>
    <div style={{ padding: '18px 24px', flex: 1,
      display: 'flex', flexDirection: 'column', gap: 14,
      position: 'relative', zIndex: 1 }}>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '20px 22px',
          display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { name: '아스피린', dose: '100mg · 1정' },
            { name: '아토르바스타틴', dose: '10mg · 1정' },
            { name: '메트포르민', dose: '500mg · 1정' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 9999,
                background: TC.eveningBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ic name="pill" size={22} color={TC.evening} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: 16, color: TC.inkVariant }}>{m.dose}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 22px', background: TC.warningBg,
          color: TC.onWarning,
          display: 'flex', gap: 12, alignItems: 'flex-start' }}>
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
    <div style={{ padding: '6px 24px 24px',
      display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', zIndex: 1 }}>
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

const S_Today = ({ checked = false }) => (
  <Shell>
    <div style={{ position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 0%, rgba(120,87,248,0.16) 0%, transparent 55%)',
      pointerEvents: 'none' }} />
    <div style={{ padding: '20px 24px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: TC.inkVariant,
        marginBottom: 4 }}>5월 2일 금요일</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.6,
        margin: '0 0 4px' }}>
        오늘의 약속
      </h1>
      <div style={{ fontSize: 19, color: TC.inkVariant, marginTop: 2 }}>
        {checked ? '오늘 약속 모두 지켰어요 🌱' : '저녁 약이 남았어요'}
      </div>
    </div>

    <div style={{ padding: '22px 24px 110px', flex: 1,
      display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto',
      position: 'relative', zIndex: 1 }}>
      <DoseGroup tone="morning" icon="sun" label="아침"
        time="오전 8:30" status="taken"
        items={['메트포르민 500mg']} />
      <DoseGroup tone="noon" icon="noon" label="점심"
        time="오후 12:30" status="taken"
        items={['메트포르민 500mg']} />
      <DoseGroup tone="evening" icon="moon" label="저녁"
        time="오후 7:00" status={checked ? 'taken' : 'now'}
        items={['아스피린 100mg','아토르바스타틴 10mg','메트포르민 500mg']}
        notice={checked ? null : '어지러우시면 약사님께 말씀해 주세요'}
        breathe={checked} />

      {!checked && (
        <Card style={{ padding: '18px 20px',
          background: TC.dangerBg, boxShadow: 'none' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <Ic name="alert" size={24} color={TC.onDanger} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700, color: TC.onDanger,
                marginBottom: 4 }}>
                아스피린이 3일 남았어요
              </div>
              <div style={{ fontSize: 16, color: TC.onDanger, opacity: 0.85,
                lineHeight: 1.5 }}>
                주말 전에 약국에 들러 보세요
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
    <TabBar active="home" />
  </Shell>
);

const DoseGroup = ({ tone, icon, label, time, status, items, notice, breathe }) => {
  const colorMap = {
    morning: { bg: TC.morningBg, ink: TC.morningInk, dot: TC.morning },
    noon: { bg: TC.noonBg, ink: TC.noonInk, dot: TC.noon },
    evening: { bg: TC.eveningBg, ink: TC.eveningInk, dot: TC.evening },
  };
  const col = colorMap[tone];
  const isNow = status === 'now';
  const isTaken = status === 'taken';

  return (
    <div style={{
      background: breathe ? TC.safeBg
        : isNow ? TC.surfaceLowest
        : TC.surface,
      borderRadius: 22,
      padding: '20px 22px',
      boxShadow: isNow ? TC.shadowLg : 'none',
      transition: 'all 480ms cubic-bezier(0.32, 0.72, 0, 1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14,
        marginBottom: items.length ? 14 : 0 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18,
          background: breathe ? TC.safe : col.bg,
          color: breathe ? '#fff' : col.dot,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0 }}>
          {breathe || isTaken
            ? <Ic name="check" size={28} color={breathe ? '#fff' : col.dot} />
            : <Ic name={icon} size={28} color={col.dot} />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 24, fontWeight: 700,
              color: isTaken && !breathe ? TC.inkVariant : TC.ink }}>
              {label}
            </div>
            {isNow && (
              <span style={{
                padding: '4px 12px', borderRadius: 9999,
                background: TC.gradientHero, color: '#fff',
                fontSize: 14, fontWeight: 700,
              }}>지금</span>
            )}
            {breathe && (
              <span style={{
                padding: '4px 12px', borderRadius: 9999,
                background: TC.safe, color: '#fff',
                fontSize: 14, fontWeight: 700,
              }}>완료</span>
            )}
          </div>
          <div style={{ fontSize: 22, fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
            color: isTaken && !breathe ? TC.inkFaint : col.ink,
            marginTop: 2 }}>
            {time}
          </div>
        </div>
      </div>
      {items.length > 0 && (
        <div style={{ paddingLeft: 70, fontSize: 18,
          color: isTaken && !breathe ? TC.inkFaint : TC.ink,
          fontWeight: 500,
          lineHeight: 1.55,
          opacity: isTaken && !breathe ? 0.6 : 1 }}>
          {items.join(' · ')}
        </div>
      )}
      {notice && !isTaken && (
        <div style={{ marginTop: 14, padding: '14px 16px',
          background: TC.warningBg, color: TC.onWarning,
          borderRadius: 14, fontSize: 16, fontWeight: 600,
          display: 'flex', gap: 10, alignItems: 'flex-start',
          lineHeight: 1.5 }}>
          <Ic name="alert" size={20} color={TC.onWarning} />
          {notice}
        </div>
      )}
      {isNow && (
        <button style={{
          marginTop: 16, width: '100%',
          padding: '18px', borderRadius: 9999, border: 'none',
          background: TC.gradientHero, color: '#fff',
          fontSize: 20, fontWeight: 700, fontFamily: 'inherit',
          cursor: 'pointer',
          boxShadow: '0 8px 22px rgba(95,58,221,0.32)',
        }}>모두 먹었어요</button>
      )}
    </div>
  );
};

const S_StockCheck = () => (
  <Shell>
    <div style={{ height: 60, background: TC.surfaceLow }} />
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: TC.surfaceLowest,
      borderRadius: '28px 28px 0 0',
      boxShadow: '0 -20px 56px rgba(95,58,221,0.18)',
      padding: '18px 24px 28px',
      maxHeight: '92%',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ width: 44, height: 5, borderRadius: 9999,
        background: TC.surfaceContainerHigh,
        margin: '0 auto 20px' }} />

      <Pill tone="primary" big>
        <Ic name="pill" size={16} /> 일요일마다 확인해요
      </Pill>
      <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.4,
        margin: '14px 0 8px', lineHeight: 1.25 }}>
        지금 약이<br/>몇 정 남았나요?
      </h3>
      <p style={{ fontSize: 17, color: TC.inkVariant, margin: '0 0 22px',
        lineHeight: 1.5 }}>
        약통을 한 번 보시고 알려주세요
      </p>

      <div style={{ flex: 1, overflow: 'auto',
        display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { name: '아스피린', est: 3, val: 8, low: false },
          { name: '아토르바스타틴', est: 18, val: 18 },
          { name: '메트포르민', est: 24, val: 24 },
        ].map((m, i) => (
          <Card key={i} style={{ padding: '18px 20px',
            boxShadow: m.low ? '0 0 0 2px ' + TC.danger : TC.shadow }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14,
              marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12,
                background: TC.primaryFixed, display: 'flex',
                alignItems: 'center', justifyContent: 'center' }}>
                <Ic name="pill" size={22} color={TC.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{m.name}</div>
                <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 2 }}>
                  앱 기록: {m.est}정
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button style={{ width: 48, height: 48, borderRadius: 9999,
                background: TC.surfaceContainer, color: TC.ink,
                border: 'none', fontSize: 24, fontWeight: 700,
                fontFamily: 'inherit', cursor: 'pointer' }}>−</button>
              <div style={{ flex: 1, textAlign: 'center',
                fontSize: 36, fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
                color: TC.ink }}>
                {m.val}<span style={{ fontSize: 18, color: TC.inkVariant,
                  fontWeight: 600, marginLeft: 4 }}>정</span>
              </div>
              <button style={{ width: 48, height: 48, borderRadius: 9999,
                background: TC.primary, color: '#fff',
                border: 'none', fontSize: 24, fontWeight: 700,
                fontFamily: 'inherit', cursor: 'pointer' }}>+</button>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 14 }}>
        <BigButton>저장</BigButton>
      </div>
    </div>
  </Shell>
);

// =============================================================
// FLOW 5 — 보호자 공유
// =============================================================

const S_ShareSetup = () => (
  <Shell>
    <TopBar title="가족 공유" left="←" />
    <div style={{ padding: '0 24px 22px' }}>
      <div style={{
        width: 76, height: 76, borderRadius: 22,
        background: TC.primaryFixed,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 18,
      }}>
        <Ic name="users" size={38} color={TC.primary} />
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5,
        margin: '0 0 12px', lineHeight: 1.25 }}>
        가족에게<br/>안심을 보내요
      </h2>
      <p style={{ fontSize: 18, color: TC.inkVariant, lineHeight: 1.55,
        margin: 0 }}>
        무엇을 보여줄지 직접 정하세요
      </p>
    </div>
    <div style={{ padding: '0 24px',
      display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
      <Card style={{ padding: '18px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 9999,
            background: 'linear-gradient(135deg, #d8ccff, #7857f8)',
            color: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 700 }}>김</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 700 }}>김민재 (아들)</div>
            <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 2 }}>
              초대 수락됨
            </div>
          </div>
          <Pill tone="safe">활성</Pill>
        </div>
      </Card>

      <div style={{ fontSize: 15, fontWeight: 700,
        color: TC.inkVariant, marginTop: 14, marginBottom: 4 }}>
        보여드릴 내용
      </div>
      {[
        { l: '오늘 약을 드셨는지', desc: '복용 완료 / 남음', on: true },
        { l: '약이 부족한지', desc: '3일 이하 남았을 때', on: true },
        { l: '약사·의사 권고사항', desc: '주 1회 정리해서', on: true },
      ].map((s, i) => (
        <Card key={i} style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 19, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontSize: 15, color: TC.inkVariant, marginTop: 2 }}>
                {s.desc}
              </div>
            </div>
            <div style={{ width: 60, height: 36, borderRadius: 9999,
              background: s.on ? TC.primary : TC.surfaceContainerHigh,
              position: 'relative' }}>
              <div style={{ position: 'absolute', top: 3,
                left: s.on ? 27 : 3,
                width: 30, height: 30, borderRadius: 9999, background: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }} />
            </div>
          </div>
        </Card>
      ))}
    </div>
    <div style={{ padding: '18px 24px 24px' }}>
      <BigButton>저장</BigButton>
    </div>
  </Shell>
);

// =============================================================
// FLOW 6 — 상담 리포트
// =============================================================

const S_Report = () => (
  <Shell>
    <TopBar title="상담 리포트" left="←" />
    <div style={{ padding: '0 24px 22px' }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5,
        margin: '0 0 12px', lineHeight: 1.25 }}>
        병원 가실 때<br/>이렇게 보여드리세요
      </h2>
      <p style={{ fontSize: 18, color: TC.inkVariant, lineHeight: 1.55,
        margin: 0 }}>
        지난 4주 기록을<br/>한 장으로 정리했어요
      </p>
    </div>
    <div style={{ padding: '0 24px', flex: 1,
      display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card style={{ padding: '20px 22px',
        background: TC.gradientHero, color: '#fff',
        boxShadow: TC.shadowLg }}>
        <div style={{ display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: 14, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700,
              opacity: 0.85, marginBottom: 8, letterSpacing: 0.05 }}>
              4주치 · 5월 2일 작성
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8,
              letterSpacing: -0.3, lineHeight: 1.25 }}>
              지난달<br/>복용 리포트
            </div>
            <div style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.5 }}>
              7개 약 · 84% 약속<br/>권고사항 5건
            </div>
          </div>
          <div style={{ width: 60, height: 60, borderRadius: 16,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ic name="doc" size={28} color="#fff" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, padding: '16px',
            background: 'rgba(255,255,255,0.2)', color: '#fff',
            border: 'none', borderRadius: 9999,
            fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, cursor: 'pointer' }}>
            <Ic name="eye" size={18} color="#fff" />미리보기
          </button>
          <button style={{ flex: 1, padding: '16px',
            background: '#fff', color: TC.primary,
            border: 'none', borderRadius: 9999,
            fontSize: 16, fontWeight: 700, fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, cursor: 'pointer' }}>
            <Ic name="share" size={18} color={TC.primary} />보내기
          </button>
        </div>
      </Card>

      <div style={{ fontSize: 15, fontWeight: 700, color: TC.inkVariant,
        marginTop: 8 }}>리포트에 들어가는 내용</div>
      {[
        { icon: 'pill', l: '드시는 약 7개', sub: '이름·성분·함량' },
        { icon: 'cal', l: '4주 복용 기록', sub: '시간대별 캘린더' },
        { icon: 'msg', l: '권고사항 5건', sub: '약사·의사 메모' },
      ].map((s, i) => (
        <Card key={i} style={{ padding: '16px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12,
              background: TC.primaryFixed, display: 'flex',
              alignItems: 'center', justifyContent: 'center' }}>
              <Ic name={s.icon} size={22} color={TC.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.l}</div>
              <div style={{ fontSize: 15, color: TC.inkVariant }}>{s.sub}</div>
            </div>
            <div style={{ width: 26, height: 26, borderRadius: 7,
              background: TC.primary, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Ic name="check" size={16} color="#fff" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Shell>
);

// =============================================================
window.YS = {
  S_Welcome, S_AddChoice, S_Camera, S_Confirm, S_Schedule,
  S_Search, S_Result,
  S_AddNote, S_DoseNotice,
  S_Today, S_StockCheck,
  S_ShareSetup,
  S_Report,
};
