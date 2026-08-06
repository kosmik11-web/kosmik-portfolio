import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Screen, SectionHeader } from '../components/Screen';
import { useAppStore } from '../store/useAppStore';
import { useTheme } from '../theme/useTheme';

export function SettingsScreen() {
  const { colors, theme } = useTheme();
  const currency = useAppStore((state) => state.currency);
  const setTheme = useAppStore((state) => state.setTheme);
  const setCurrency = useAppStore((state) => state.setCurrency);
  return <Screen><SectionHeader eyebrow="Settings / preferences" title="Настройки" /><View style={[styles.profile, { backgroundColor: colors.surface, borderColor: colors.line }]}><View style={[styles.avatar, { backgroundColor: colors.red }]}><Text style={{ color: colors.white, fontSize: 20, fontWeight: '700' }}>K</Text></View><View><Text style={[styles.profileName, { color: colors.text }]}>Guest account</Text><Text style={[styles.muted, { color: colors.muted }]}>Данные хранятся локально</Text></View><Text style={[styles.demo, { color: colors.teal }]}>DEMO</Text></View><Text style={[styles.groupLabel, { color: colors.muted }]}>APPEARANCE</Text><View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.line }]}><SettingRow label="Тёмная тема" description="Рекомендуется для графиков"><Switch value={theme === 'dark'} onValueChange={(value) => setTheme(value ? 'dark' : 'light')} trackColor={{ false: colors.surfaceRaised, true: `${colors.red}88` }} thumbColor={theme === 'dark' ? colors.redBright : colors.muted} /></SettingRow><SettingRow label="Базовая валюта" description="Цены и портфель"><View style={styles.currencySwitch}>{(['USD', 'RUB'] as const).map((item) => <Pressable key={item} onPress={() => setCurrency(item)} style={[styles.currencyButton, { backgroundColor: currency === item ? colors.red : colors.surfaceRaised }]}><Text style={{ color: currency === item ? colors.white : colors.muted, fontSize: 11, fontWeight: '700' }}>{item}</Text></Pressable>)}</View></SettingRow></View><Text style={[styles.groupLabel, { color: colors.muted }]}>SECURITY & DATA</Text><View style={[styles.group, { backgroundColor: colors.surface, borderColor: colors.line }]}><SettingRow label="Биометрия" description="Защита портфеля"><Switch value={false} onValueChange={() => {}} trackColor={{ false: colors.surfaceRaised, true: `${colors.red}88` }} thumbColor={colors.muted} /></SettingRow><SettingRow label="Price alerts" description="Push-уведомления о цене"><Switch value={false} onValueChange={() => {}} trackColor={{ false: colors.surfaceRaised, true: `${colors.red}88` }} thumbColor={colors.muted} /></SettingRow></View><Text style={[styles.version, { color: colors.faint }]}>CRYPTO TRACKER &amp; PAY / MVP 0.1.0</Text></Screen>;
}

function SettingRow({ label, description, children }: { label: string; description: string; children: ReactNode }) {
  const { colors } = useTheme();
  return <View style={[styles.row, { borderBottomColor: colors.line }]}><View style={styles.rowCopy}><Text style={[styles.label, { color: colors.text }]}>{label}</Text><Text style={[styles.muted, { color: colors.muted }]}>{description}</Text></View>{children}</View>;
}

const styles = StyleSheet.create({
  profile: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderWidth: 1, borderRadius: 18 },
  avatar: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', borderRadius: 14 },
  profileName: { fontSize: 14, fontWeight: '700' },
  muted: { marginTop: 4, fontSize: 11 },
  demo: { marginLeft: 'auto', fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  groupLabel: { marginTop: 28, marginBottom: 9, fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 },
  group: { paddingHorizontal: 14, borderWidth: 1, borderRadius: 18 },
  row: { minHeight: 70, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
  rowCopy: { flex: 1 },
  label: { fontSize: 14, fontWeight: '600' },
  currencySwitch: { flexDirection: 'row', gap: 5 },
  currencyButton: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 9 },
  version: { marginTop: 28, textAlign: 'center', fontFamily: 'monospace', fontSize: 9, letterSpacing: 1 },
});
