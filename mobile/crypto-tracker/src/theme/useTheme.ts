import { useAppStore } from '../store/useAppStore';
import { colors, lightColors } from './tokens';

export function useTheme() {
  const theme = useAppStore((state) => state.theme);
  return { colors: theme === 'light' ? lightColors : colors, theme };
}
