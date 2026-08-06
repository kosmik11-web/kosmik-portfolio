# DESIGN_RULES.md — Web Frontend Edition

## Core Mission

Создавать веб-сайты и интерфейсы уровня premium product — такие, которые выглядят как работа опытной дизайн-команды из топового стартапа.

Каждый сайт должен быть:

* Современным — использовать актуальные паттерны 2024–2025
* Чистым — без визуального шума
* Полированным — внимание к деталям на каждом уровне
* Быстрым — Core Web Vitals в зелёной зоне
* Адаптивным — mobile-first, затем desktop
* Доступным — WCAG 2.1 AA минимум
* Production-ready — можно деплоить сразу

Избегать любых признаков шаблонного или любительского дизайна.

---

# Visual Style

Вдохновение берётся из:

* Linear — минимализм, тёмный фон, чёткие линии
* Vercel — developer-focused, монохромная основа с акцентами
* Stripe — доверие, precision, детализация
* Loom — дружелюбный, с живыми градиентами
* Framer — смелые анимации, editorial-стиль
* Resend — чистота, типографика как главный элемент
* Craft — богатые визуальные детали, depth
* Apple — пространство, качество, emotion

Цель: сайт должен выглядеть как продукт, за который платят деньги.

---

# Современные веб-паттерны

## Обязательные фичи для 2024–2025

### Scroll-driven animations

Анимации, привязанные к скроллу страницы:

```css
@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-on-scroll {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
```

Использовать для: hero-секций, карточек, feature-блоков.

### View Transitions API

Плавные переходы между страницами без SPA-оверхеда:

```javascript
document.startViewTransition(() => {
  updateTheDOMSomehow();
});
```

Поддержка через progressive enhancement — работает в Chrome, деградирует в других браузерах без поломки.

### CSS Grid subgrid

Выравнивание вложенных элементов по родительской сетке:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

### Container Queries

Компоненты, адаптирующиеся к своему контейнеру, а не viewport:

```css
.card-wrapper {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### :has() selector

Стилизация родителя на основе дочерних элементов:

```css
.form-group:has(input:invalid) { border-color: var(--danger); }
nav:has(.dropdown:hover) .overlay { display: block; }
```

### CSS Layers (@layer)

Управление специфичностью без !important:

```css
@layer reset, base, components, utilities;
@layer components {
  .btn { /* ... */ }
}
```

---

# Typography

## Шрифты

Приоритет для веб:

* **Inter** — универсальный, отличная читаемость
* **Geist** — технический, современный, от Vercel
* **Cal Sans** — заголовки, editorial-feel
* **Plus Jakarta Sans** — дружелюбный, humanist
* **Bricolage Grotesque** — выразительный, для hero

Загрузка через `font-display: swap` или variable fonts.

## Типографическая шкала (clamp-based, fluid)

```css
:root {
  --text-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
  --text-sm:   clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --text-base: clamp(1rem, 0.925rem + 0.375vw, 1.125rem);
  --text-lg:   clamp(1.125rem, 1rem + 0.625vw, 1.375rem);
  --text-xl:   clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem);
  --text-2xl:  clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
  --text-3xl:  clamp(1.875rem, 1.5rem + 1.875vw, 2.625rem);
  --text-4xl:  clamp(2.25rem, 1.75rem + 2.5vw, 3.25rem);
  --text-5xl:  clamp(3rem, 2.25rem + 3.75vw, 4.5rem);
}
```

Fluid typography адаптируется плавно — без точек перелома.

## Правила

* Максимум 3–4 размера в одной секции
* Line-height для заголовков: 1.1–1.2
* Line-height для body: 1.5–1.7
* Letter-spacing для больших заголовков: -0.02em — -0.04em
* Никогда не выравнивать текст по ширине (justify) на мобильных

---

# Color System

## Принцип

```
70% — нейтральные (фон, поверхности, текст)
20% — вторичные (границы, muted-тексты, subtle-элементы)
10% — акцентные (CTA, highlights, interactive)
```

## CSS Custom Properties (обязательно)

```css
:root {
  /* Backgrounds */
  --bg-base:       #0A0A0B;
  --bg-subtle:     #111114;
  --bg-muted:      #18181C;
  --bg-emphasis:   #222228;

  /* Surfaces */
  --surface-1:     #1C1C21;
  --surface-2:     #242429;
  --surface-3:     #2C2C33;

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);
  --border-muted:  rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.18);

  /* Text */
  --text-primary:   #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-tertiary:  #71717A;
  --text-disabled:  #52525B;

  /* Accent */
  --accent:         #6366F1;
  --accent-hover:   #4F52E8;
  --accent-subtle:  rgba(99,102,241,0.12);
  --accent-border:  rgba(99,102,241,0.25);

  /* Semantic */
  --success: #22C55E;
  --warning: #F59E0B;
  --danger:  #EF4444;
  --info:    #3B82F6;
}
```

## Темная и светлая темы

Всегда поддерживать обе темы через CSS variables + `prefers-color-scheme`:

```css
@media (prefers-color-scheme: light) {
  :root {
    --bg-base: #FFFFFF;
    --text-primary: #09090B;
    /* ... */
  }
}
```

---

# Layout

## Сетка

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 5vw, 4rem);
}
```

## Spacing Scale

Использовать логическую шкалу 4px:

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

## Section Rhythm

Секции сайта дышат:

```css
section {
  padding-block: clamp(4rem, 10vw, 8rem);
}
```

---

# Components

## Navigation

Требования к современному навбару:

* Sticky с `backdrop-filter: blur(12px)` и прозрачным фоном
* Transition от прозрачного к заполненному при скролле
* Mobile: hamburger → full-screen overlay или drawer
* Активный элемент обозначен визуально
* Keyboard navigation (Tab, Enter, Escape)

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10, 10, 11, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  border-bottom: 1px solid var(--border-subtle);
  transition: background 200ms ease;
}
```

## Hero Section

Обязательные элементы:

* Announcement badge / pill сверху
* Главный заголовок с gradient text или highlight
* Подзаголовок (16–18px, secondary color)
* CTA кнопки (primary + secondary)
* Social proof (аватары, рейтинг, счётчик)
* Визуальный anchor (скриншот продукта, 3D элемент, абстракция)

Gradient text:

```css
.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Cards

```css
.card {
  background: var(--surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease;
}

.card:hover {
  border-color: var(--border-muted);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}
```

## Buttons

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding-inline: 20px;
  background: var(--accent);
  color: #fff;
  border-radius: 10px;
  font-weight: 500;
  font-size: 15px;
  transition: background 150ms ease, transform 150ms ease, box-shadow 150ms ease;
}

.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: 0 0 0 4px var(--accent-subtle);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

Состояния обязательны: default, hover, active, focus-visible, disabled, loading.

## Badges / Pills

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid var(--border-muted);
  background: var(--surface-2);
  color: var(--text-secondary);
}
```

---

# Modern Visual Techniques

## Glassmorphism (умеренно)

```css
.glass {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

## Noise texture (subtle)

Добавляет глубину тёмным фонам:

```css
.noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.03;
  pointer-events: none;
}
```

## Gradient meshes / Aurora backgrounds

```css
.aurora {
  background:
    radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(99,102,241,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(16,185,129,0.08) 0%, transparent 50%);
}
```

## Spotlight / radial glow

```css
.spotlight {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(99,102,241,0.08),
    transparent 40%
  );
}
```

Интерактивный spotlight через JavaScript:

```javascript
document.addEventListener('mousemove', (e) => {
  el.style.setProperty('--mouse-x', `${e.clientX}px`);
  el.style.setProperty('--mouse-y', `${e.clientY}px`);
});
```

## Bento Grid

Современный layout для feature-секций:

```css
.bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
}
.bento-item-wide  { grid-column: span 4; }
.bento-item-tall  { grid-row: span 2; }
.bento-item-small { grid-column: span 2; }
```

---

# Animation System

## Принципы

* Анимации должны иметь смысл — они коммуницируют состояние
* `prefers-reduced-motion` всегда уважать
* Easing: prefer `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo)
* Duration: 150ms (микро) / 250ms (стандарт) / 400ms (крупные переходы)

## Базовые переменные

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo:  cubic-bezier(0.7, 0, 0.84, 0);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);

  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-slower: 600ms;
}
```

## Intersection Observer для reveal-анимаций

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

## Stagger animations

```css
[data-animate-child]:nth-child(1) { animation-delay: 0ms; }
[data-animate-child]:nth-child(2) { animation-delay: 80ms; }
[data-animate-child]:nth-child(3) { animation-delay: 160ms; }
[data-animate-child]:nth-child(4) { animation-delay: 240ms; }
```

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# Performance

## Core Web Vitals цели

* LCP (Largest Contentful Paint): < 2.5s
* FID / INP (Interaction to Next Paint): < 200ms
* CLS (Cumulative Layout Shift): < 0.1

## Обязательные практики

### Images

```html
<img
  src="hero.webp"
  srcset="hero-480.webp 480w, hero-960.webp 960w, hero-1440.webp 1440w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Описание"
  loading="lazy"
  decoding="async"
  width="960"
  height="540"
>
```

Форматы: AVIF → WebP → JPG/PNG (fallback).

### Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" as="font" href="/fonts/Inter.woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900; /* Variable font */
}
```

### Critical CSS

Инлайнить критический CSS в `<head>`, остальное загружать асинхронно.

### Preload ключевых ресурсов

```html
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">
```

---

# Accessibility (A11y)

## Обязательно

* Контраст текста: минимум 4.5:1 (body), 3:1 (large text)
* Все интерактивные элементы доступны с клавиатуры
* `focus-visible` стиль всегда виден и красив
* ARIA-атрибуты для сложных компонентов
* Skip-to-content ссылка в начале страницы
* Alt-текст для всех изображений
* Семантический HTML: `<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

---

# SEO & Meta

Каждая страница должна иметь:

```html
<meta name="description" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://...">
<script type="application/ld+json">{ "@context": "..." }</script>
```

OG-изображение: 1200×630px.

---

# Sections Checklist

Стандартные секции современного лендинга:

* **Hero** — headline + subline + CTA + visual
* **Social proof** — logos, badges, статистика
* **Features / Bento** — ключевые возможности
* **How it works** — шаги, процесс
* **Testimonials** — отзывы с аватарами и компаниями
* **Pricing** — тарифы с выделенным popular
* **FAQ** — accordion с частыми вопросами
* **CTA Banner** — финальный призыв к действию
* **Footer** — ссылки, соцсети, legal

---

# Webpage Quality Benchmark

Каждый сайт должен выглядеть так, как будто его создала дизайн-команда YC-стартапа:

* Появление на Product Hunt в топе
* Featured на Awwwards / Godly
* Используется как референс другими дизайнерами

Никогда не генерировать страницы уровня Bootstrap-шаблона.

Целевое качество: 9.5/10 и выше.

Если сайт выглядит средне — переосмыслить и переделать.

---

# Premium Web Checklist

Перед сдачей:

✓ Fluid typography (clamp-based)
✓ CSS custom properties для всех токенов
✓ Dark/light mode
✓ Mobile-first responsive
✓ Scroll-driven или Intersection Observer анимации
✓ Hover/focus/active состояния
✓ Loading / skeleton states
✓ Empty states
✓ Error states
✓ Core Web Vitals оптимизированы
✓ Images: WebP/AVIF + lazy loading
✓ Accessibility: keyboard nav + ARIA + contrast
✓ OG meta tags
✓ Семантический HTML
✓ prefers-reduced-motion поддержка
✓ prefers-color-scheme поддержка