import Svg, { Polyline } from 'react-native-svg';

export function Sparkline({ values, color, width = 90, height = 38 }: { values?: number[]; color: string; width?: number; height?: number }) {
  const points = values?.length ? values : [1, 2, 1.5, 3, 2.7, 4, 3.8];
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coordinates = points.map((value, index) => `${(index / Math.max(points.length - 1, 1)) * width},${height - ((value - min) / range) * (height - 5) - 2}`).join(' ');
  return <Svg width={width} height={height}><Polyline points={coordinates} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
