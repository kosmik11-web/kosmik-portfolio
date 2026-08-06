# Crypto Tracker & Pay

Мобильное приложение для портфолио frontend-разработчика на React Native + Expo.

## Что реализовано в MVP

- рынок криптовалют с данными CoinGecko и fallback-данными;
- поиск и сортировка активов;
- экран деталей монеты с ценой, статистикой и графиком;
- локальный портфель с расчётом стоимости и P&L;
- конвертер криптовалюты в USD/RUB;
- Demo Pay flow без реальных денег;
- light/dark theme;
- локальное сохранение настроек и портфеля;
- pull-to-refresh и skeleton loading;
- feature-based структура проекта.

## Запуск

```bash
npm install
npm start
```

Затем открой приложение через Expo Go или запусти Android/iOS simulator.

## Важно

Раздел Pay работает только в Demo Mode. Приватные ключи, реальные платежи и WalletConnect не используются. Для production-интеграции понадобятся провайдер, KYC/AML и отдельный backend.

## Следующие этапы

1. Авторизация и облачная синхронизация через Supabase.
2. Price alerts и push-уведомления.
3. Интеграция sandbox-провайдера или testnet-транзакций.
4. APK/TestFlight сборки и GIF-демо для GitHub.
