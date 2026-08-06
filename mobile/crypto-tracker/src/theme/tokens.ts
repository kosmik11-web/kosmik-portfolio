export const colors = {
  ink: '#0b0b0d',
  surface: '#151419',
  surfaceRaised: '#1d1a20',
  line: 'rgba(232, 230, 230, 0.12)',
  lineStrong: 'rgba(225, 68, 88, 0.42)',
  text: '#f1eeee',
  muted: '#929096',
  faint: '#5f5d65',
  red: '#c22b3b',
  redBright: '#e14458',
  green: '#68c9b6',
  teal: '#68c9b6',
  amber: '#e1aa73',
  violet: '#a995e8',
  white: '#ffffff',
};

export const lightColors = {
  ...colors,
  ink: '#f4f2f3',
  surface: '#ffffff',
  surfaceRaised: '#ebe8eb',
  line: 'rgba(31, 27, 31, 0.12)',
  lineStrong: 'rgba(176, 31, 51, 0.42)',
  text: '#211d22',
  muted: '#6f6970',
  faint: '#99939a',
  teal: '#208b7b',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 32,
  xxl: 46,
};

export type ThemeColors = typeof colors;
