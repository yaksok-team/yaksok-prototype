/**
 * YakSok Design Tokens
 *
 * Forked from Karrot SEED Design System (https://seed-design.io).
 * Structure (property × role × variant × state, layer system, t1–t10 scale,
 * spacing & radius scale) is preserved verbatim.
 *
 * Brand hue replaced: carrot → Gentle Violet (#7C5CFC).
 * #7C5CFC fails WCAG AA on white text (4.38:1), so brand-solid resolves to
 * violet-700 (6.60:1). The carrot mark identity at violet-600 is reserved
 * for stroke/non-text use where AA is 3:1.
 *
 * Same rule applied to every other -solid role: all map to step 700 + white
 * text, except warning which keeps step 500 with dark text (yellow at 700
 * reads as brown and loses the "caution" affordance).
 */

// ─────────────────────────────────────────────────────────────────────────
// 1. Palette — raw scales
// ─────────────────────────────────────────────────────────────────────────

export const palette = {
  /**
   * YakSok brand: Gentle Violet.
   * Anchor: violet-600 = #7C5CFC (brand mark identity).
   * Solid surfaces with white text resolve to violet-700.
   */
  violet: {
    100: '#F1ECFE',
    200: '#E3D9FE',
    300: '#C9B8FD',
    400: '#A88EFD',
    500: '#8E70FD',
    600: '#7C5CFC', // signature
    700: '#5E40D6', // AA solid surface
    800: '#4429A0',
    900: '#2D1A6B',
    1000: '#1B0F47',
  },

  // SEED gray — unchanged
  gray: {
    0: '#FFFFFF',
    100: '#F7F8F9',
    200: '#F3F4F5',
    300: '#EEEFF1',
    400: '#DCDEE3',
    500: '#D1D3D8',
    600: '#B0B3BA',
    700: '#868B94',
    800: '#555D6D',
    900: '#2A3038',
    1000: '#1A1C20',
  },

  // SEED red — used for critical (금기)
  red: {
    100: '#FDF0F0',
    200: '#FBE0DF',
    300: '#F8C7C5',
    400: '#F2A29F',
    500: '#EA6963',
    600: '#E0463F',
    700: '#C7372F',
    800: '#9C2A24',
    900: '#5E1A16',
    1000: '#4A1209',
  },

  // SEED green — used for positive (안전)
  green: {
    100: '#EDFAF6',
    200: '#D7F3EA',
    300: '#A6E3CB',
    400: '#5EC9A1',
    500: '#1FAB7C',
    600: '#0D9268',
    700: '#0A7556',
    800: '#075A43',
    900: '#053C2D',
    1000: '#0A2B24',
  },

  // SEED yellow — used for warning (주의)
  yellow: {
    100: '#FFF7DE',
    200: '#FFEFB3',
    300: '#FFE082',
    400: '#FFCC4D',
    500: '#F5B400',
    600: '#D89400',
    700: '#A87100',
    800: '#7A5200',
    900: '#4D3300',
    1000: '#2C2512',
  },

  // SEED blue — used for informative (정보)
  blue: {
    100: '#EFF6FF',
    200: '#DBEAFE',
    300: '#BFD7FE',
    400: '#7DAEFA',
    500: '#3F87F5',
    600: '#1F6FEB',
    700: '#0F58CC',
    800: '#0C4395',
    900: '#082E69',
    1000: '#032451',
  },

  static: {
    white: '#FFFFFF',
    black: '#000000',
    blackAlpha: {
      50: 'rgba(0,0,0,0.04)',
      100: 'rgba(0,0,0,0.08)',
      200: 'rgba(0,0,0,0.16)',
      300: 'rgba(0,0,0,0.32)',
      400: 'rgba(0,0,0,0.48)',
      500: 'rgba(0,0,0,0.64)',
    },
    whiteAlpha: {
      50: 'rgba(255,255,255,0.04)',
      100: 'rgba(255,255,255,0.08)',
      200: 'rgba(255,255,255,0.16)',
      300: 'rgba(255,255,255,0.32)',
      400: 'rgba(255,255,255,0.48)',
      500: 'rgba(255,255,255,0.64)',
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 2. Semantic color (light theme) — property × role × variant × state
// ─────────────────────────────────────────────────────────────────────────

const lightColor = {
  bg: {
    // Brand
    'brand-solid': palette.violet[700],
    'brand-solid-pressed': palette.violet[800],
    'brand-solid-disabled': palette.violet[300],
    'brand-weak': palette.violet[100],
    'brand-weak-pressed': palette.violet[200],
    'brand-weak-disabled': palette.gray[200],

    // Critical (금기)
    'critical-solid': palette.red[700],
    'critical-solid-pressed': palette.red[800],
    'critical-solid-disabled': palette.red[300],
    'critical-weak': palette.red[100],
    'critical-weak-pressed': palette.red[200],

    // Warning (주의) — solid uses 500 with dark text, not 700
    'warning-solid': palette.yellow[500],
    'warning-solid-pressed': palette.yellow[600],
    'warning-solid-disabled': palette.yellow[300],
    'warning-weak': palette.yellow[100],
    'warning-weak-pressed': palette.yellow[200],

    // Positive (안전)
    'positive-solid': palette.green[700],
    'positive-solid-pressed': palette.green[800],
    'positive-solid-disabled': palette.green[300],
    'positive-weak': palette.green[100],
    'positive-weak-pressed': palette.green[200],

    // Informative (정보)
    'informative-solid': palette.blue[700],
    'informative-solid-pressed': palette.blue[800],
    'informative-solid-disabled': palette.blue[300],
    'informative-weak': palette.blue[100],
    'informative-weak-pressed': palette.blue[200],

    // Neutral
    'neutral': palette.gray[100],
    'neutral-pressed': palette.gray[200],
    'neutral-weak': palette.gray[200],
    'neutral-weak-pressed': palette.gray[300],
    'neutral-muted': palette.gray[400],

    // Layer (UI depth)
    'layer-basement': palette.gray[200],
    'layer-default': palette.gray[0],
    'layer-floating': palette.gray[0],

    // Overlay
    'overlay-dim': palette.static.blackAlpha[400],
    'overlay-scrim': palette.static.blackAlpha[300],

    transparent: 'transparent',
  },

  fg: {
    'brand': palette.violet[700],
    'brand-contrast': palette.gray[0], // text on bg.*-solid

    'critical': palette.red[700],
    'critical-contrast': palette.gray[0],

    'warning': palette.yellow[800], // 700 fails AA on white (4.18:1)
    'warning-contrast': palette.gray[1000], // dark text on yellow-500

    'positive': palette.green[700],
    'positive-contrast': palette.gray[0],

    'informative': palette.blue[700],
    'informative-contrast': palette.gray[0],

    'neutral': palette.gray[1000],
    'neutral-muted': palette.gray[800],
    'neutral-subtle': palette.gray[700],
    'neutral-inverted': palette.gray[0],

    'placeholder': palette.gray[600],
    'disabled': palette.gray[500],
  },

  stroke: {
    'brand': palette.violet[600], // brand-mark identity is OK on stroke (non-text 3:1)
    'critical': palette.red[600],
    'warning': palette.yellow[500],
    'positive': palette.green[600],
    'informative': palette.blue[600],

    'neutral': palette.gray[400],
    'neutral-weak': palette.gray[300],
    'neutral-subtle': palette.gray[200],
    'neutral-muted': palette.gray[300],
    'neutral-contrast': palette.gray[1000],

    'focus-ring': palette.violet[500],
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 3. Typography
// ─────────────────────────────────────────────────────────────────────────
// Pretendard for Hangul, Inter for Latin/numeric.
//
// React Native binds one fontFamily per <Text>. Pretendard already covers
// Latin glyphs adequately, so most components should consume the `korean`
// family for mixed text. Use `latin` only when wrapping a Latin/numeric
// run in its own <Text> for tighter metrics (e.g. dosage "500mg").

export const fontFamily = {
  korean: 'Pretendard-Regular',
  koreanMedium: 'Pretendard-Medium',
  koreanBold: 'Pretendard-Bold',
  latin: 'Inter-Regular',
  latinMedium: 'Inter-Medium',
  latinBold: 'Inter-Bold',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  bold: '700',
} as const;

// SEED t1..t10 (px — RN does not honour rem)
const fontSizePx = {
  t1: 11, t2: 12, t3: 13, t4: 14, t5: 16,
  t6: 17, t7: 18, t8: 20, t9: 22, t10: 26,
} as const;

const lineHeightPx = {
  t1: 15, t2: 16, t3: 18, t4: 20, t5: 22,
  t6: 24, t7: 26, t8: 28, t9: 30, t10: 35,
} as const;

type ScaleKey = keyof typeof fontSizePx;

const buildScale = (n: ScaleKey) => ({
  Regular: {
    fontFamily: fontFamily.korean,
    fontWeight: fontWeight.regular,
    fontSize: fontSizePx[n],
    lineHeight: lineHeightPx[n],
  },
  Medium: {
    fontFamily: fontFamily.koreanMedium,
    fontWeight: fontWeight.medium,
    fontSize: fontSizePx[n],
    lineHeight: lineHeightPx[n],
  },
  Bold: {
    fontFamily: fontFamily.koreanBold,
    fontWeight: fontWeight.bold,
    fontSize: fontSizePx[n],
    lineHeight: lineHeightPx[n],
  },
});

export const typography = {
  t1: buildScale('t1'),
  t2: buildScale('t2'),
  t3: buildScale('t3'),
  t4: buildScale('t4'),
  t5: buildScale('t5'),
  t6: buildScale('t6'),
  t7: buildScale('t7'),
  t8: buildScale('t8'),
  t9: buildScale('t9'),
  t10: buildScale('t10'),

  // SEED semantic aliases
  screenTitle: buildScale('t10').Bold,
  articleBody: buildScale('t5').Regular,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 4. Spacing — SEED scale (4px base)
// ─────────────────────────────────────────────────────────────────────────

export const spacing = {
  x0_5: 2,
  x1: 4,
  x1_5: 6,
  x2: 8,
  x2_5: 10,
  x3: 12,
  x3_5: 14,
  x4: 16,
  x4_5: 18,
  x5: 20,
  x6: 24,
  x7: 28,
  x8: 32,
  x9: 36,
  x10: 40,
  x12: 48,
  x13: 52,
  x14: 56,
  x16: 64,

  // Semantic
  globalGutter: 16,
  betweenChips: 8,
  navToTitle: 20,
  componentDefault: 12,
  betweenText: 6,
  screenBottom: 56,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 5. Radius — SEED
// ─────────────────────────────────────────────────────────────────────────

export const radius = {
  r0_5: 2,
  r1: 4,
  r1_5: 6,
  r2: 8,
  r2_5: 10,
  r3: 12,
  r3_5: 14,
  r4: 16,
  r5: 20,
  r6: 24,
  full: 9999,
} as const;

// ─────────────────────────────────────────────────────────────────────────
// 6. Theme aggregate
// ─────────────────────────────────────────────────────────────────────────

export const lightTheme = {
  color: lightColor,
  typography,
  spacing,
  radius,
  fontFamily,
  fontWeight,
  palette,
} as const;

export type Theme = typeof lightTheme;
export type BgToken = keyof Theme['color']['bg'];
export type FgToken = keyof Theme['color']['fg'];
export type StrokeToken = keyof Theme['color']['stroke'];

export type SeverityRole = 'critical' | 'warning' | 'positive' | 'informative';

export default lightTheme;
