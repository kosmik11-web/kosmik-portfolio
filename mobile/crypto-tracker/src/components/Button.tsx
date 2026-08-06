import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../theme/useTheme';

export function Button({ children, onPress, secondary = false }: PropsWithChildren<{ onPress: () => void; secondary?: boolean }>) {
  const { colors } = useTheme();
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.button, { backgroundColor: secondary ? colors.surfaceRaised : colors.red, borderColor: secondary ? colors.line : colors.red }, pressed && styles.pressed]}><Text style={[styles.text, { color: secondary ? colors.text : colors.white }]}>{children}</Text></Pressable>;
}

const styles = StyleSheet.create({
  button: { minHeight: 48, paddingHorizontal: 18, borderWidth: 1, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] },
  text: { fontSize: 14, fontWeight: '700' },
});
