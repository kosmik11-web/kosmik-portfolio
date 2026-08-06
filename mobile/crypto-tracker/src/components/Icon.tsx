import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

export type IconName = 'chart' | 'wallet' | 'scan' | 'settings' | 'back' | 'star' | 'plus' | 'refresh';

export function Icon({ name, color, size = 22 }: { name: IconName; color: string; size?: number }) {
  const common = { fill: 'none', stroke: color, strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
    {name === 'chart' && <><Polyline points="3,17 8,12 12,15 20,6" {...common} /><Line x1="3" y1="20" x2="21" y2="20" {...common} /></>}
    {name === 'wallet' && <><Path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v10A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5Z" {...common} /><Path d="M4 8h13.5A2.5 2.5 0 0 1 20 10.5v1.5h-4a2 2 0 0 0 0 4h4" {...common} /><Circle cx="16" cy="14" r="0.7" fill={color} /></>}
    {name === 'scan' && <><Path d="M8 4H5a1 1 0 0 0-1 1v3M16 4h3a1 1 0 0 1 1 1v3M8 20H5a1 1 0 0 1-1-1v-3M16 20h3a1 1 0 0 0 1-1v-3" {...common} /><Rect x="8" y="8" width="8" height="8" rx="1" {...common} /></>}
    {name === 'settings' && <><Circle cx="12" cy="12" r="3" {...common} /><Path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.5v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.5v-2.5h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5.5H15v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1V15h-.1a1.7 1.7 0 0 0-1.5 0Z" {...common} /></>}
    {name === 'back' && <><Path d="M19 12H5" {...common} /><Path d="m11 18-6-6 6-6" {...common} /></>}
    {name === 'star' && <Path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" {...common} />}
    {name === 'plus' && <><Line x1="12" y1="5" x2="12" y2="19" {...common} /><Line x1="5" y1="12" x2="19" y2="12" {...common} /></>}
    {name === 'refresh' && <><Path d="M20 11a8 8 0 0 0-14-4L4 9" {...common} /><Path d="M4 5v4h4M4 13a8 8 0 0 0 14 4l2-2" {...common} /><Path d="M20 19v-4h-4" {...common} /></>}
  </Svg>;
}
