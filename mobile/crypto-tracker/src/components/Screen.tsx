import type { PropsWithChildren } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';

type Props = PropsWithChildren<{ scroll?: boolean }>;

export function Screen({ children, scroll = true }: Props) {
  const { colors: themeColors } = useTheme();
  const content = scroll ? <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{children}</ScrollView> : children;
  return <SafeAreaView style={[styles.safe, { backgroundColor: themeColors.ink }]}>{content}</SafeAreaView>;
}

export function Card({ children, style }: Props & { style?: object }) {
  const { colors: themeColors } = useTheme();
  return <View style={[styles.card, { backgroundColor: themeColors.surface, borderColor: themeColors.line }, style]}>{children}</View>;
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  const { colors: themeColors } = useTheme();
  return <View style={styles.header}><View><View style={styles.eyebrowRow}><View style={[styles.dot, { backgroundColor: themeColors.red }]} /><TextLabel color={themeColors.muted}>{eyebrow}</TextLabel></View><TextTitle color={themeColors.text}>{title}</TextTitle></View></View>;
}

export function TextLabel({ children, color }: Props & { color: string }) {
  return <View><Text style={[styles.label, { color }]}>{children}</Text></View>;
}

export function TextTitle({ children, color }: Props & { color: string }) {
  return <Text style={[styles.title, { color }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
  card: { borderWidth: 1, borderRadius: 18, padding: spacing.md },
  header: { marginBottom: spacing.lg },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase' },
  title: { fontSize: 34, fontWeight: '600', letterSpacing: -1.5 },
});
