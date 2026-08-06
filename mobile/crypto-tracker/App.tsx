import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './src/theme/useTheme';
import { MarketScreen } from './src/screens/MarketScreen';
import { CoinDetailScreen } from './src/screens/CoinDetailScreen';
import { PortfolioScreen } from './src/screens/PortfolioScreen';
import { PayScreen } from './src/screens/PayScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { Icon, type IconName } from './src/components/Icon';
import type { RootStackParamList, TabParamList } from './src/types';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const { colors } = useTheme();
  const iconFor: Record<keyof TabParamList, IconName> = { Market: 'chart', Portfolio: 'wallet', Pay: 'scan', Settings: 'settings' };
  return <Tabs.Navigator screenOptions={({ route }) => ({ headerShown: false, tabBarActiveTintColor: colors.redBright, tabBarInactiveTintColor: colors.faint, tabBarStyle: { backgroundColor: colors.ink, borderTopColor: colors.line, height: 72, paddingBottom: 14, paddingTop: 10 }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' }, tabBarIcon: ({ color }) => <Icon name={iconFor[route.name]} color={color} size={20} /> })}><Tabs.Screen name="Market" component={MarketScreen} options={{ title: 'Рынок', tabBarLabel: 'Рынок' }} /><Tabs.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Портфель', tabBarLabel: 'Портфель' }} /><Tabs.Screen name="Pay" component={PayScreen} options={{ title: 'Pay', tabBarLabel: 'Pay' }} /><Tabs.Screen name="Settings" component={SettingsScreen} options={{ title: 'Настройки', tabBarLabel: 'Ещё' }} /></Tabs.Navigator>;
}

function AppNavigation() {
  const { colors, theme } = useTheme();
  const navigationTheme = theme === 'dark' ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.ink, card: colors.ink, text: colors.text, border: colors.line, primary: colors.red } } : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.ink, card: colors.ink, text: colors.text, border: colors.line, primary: colors.red } };
  return <NavigationContainer theme={navigationTheme}><StatusBar style={theme === 'dark' ? 'light' : 'dark'} /><Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.ink } }}><Stack.Screen name="Tabs" component={TabNavigator} /><Stack.Screen name="CoinDetail" component={CoinDetailScreen} /></Stack.Navigator></NavigationContainer>;
}

export default function App() {
  return <QueryClientProvider client={queryClient}><AppNavigation /></QueryClientProvider>;
}
