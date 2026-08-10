import { useEffect, useState, type FormEvent, type ReactNode } from 'react';

type IconProps = { className?: string };

type FormErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const skills = [
  ['HTML / CSS', 'Семантика, responsive layout, accessibility', '92%'],
  ['JavaScript / TypeScript', 'Логика интерфейсов и аккуратный frontend-код', '84%'],
  ['React', 'Компоненты, состояния, интерактивные сценарии', '80%'],
  ['Figma', 'Сетка, прототипы и визуальная система', '72%'],
];

const experience = [
  ['2025 — сейчас', 'Frontend / product practice', 'Проектирую и собираю работающие интерфейсы: от структуры и визуального направления до адаптивной реализации.'],
  ['2024 — 2025', 'Web foundation', 'Собрал фундамент в HTML, CSS, JavaScript и UX, чтобы понимать не только как выглядит экран, но и зачем он нужен.'],
  ['Сейчас', 'Готов к сотрудничеству', 'Подключаюсь к небольшим продуктам, лендингам и задачам, где важны аккуратный интерфейс и понятный результат.'],
];

function ArrowUpRight({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

function ArrowDown({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v15" /><path d="m6 13 6 6 6-6" /></svg>;
}

function MenuIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>;
}

function CloseIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function SunIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></svg>;
}

function MoonIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 15.3A8.5 8.5 0 0 1 8.7 4a8.5 8.5 0 1 0 11.3 11.3Z" /></svg>;
}

function GithubIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.7c-2.65.58-3.2-1.13-3.2-1.13-.43-1.1-1.06-1.4-1.06-1.4-.86-.6.07-.59.07-.59.95.07 1.45.98 1.45.98.85 1.44 2.22 1.02 2.76.78.09-.61.33-1.02.6-1.25-2.11-.24-4.33-1.05-4.33-4.69 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.1 9.1 0 0 1 4.77 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.65-2.23 4.45-4.35 4.68.34.3.65.88.65 1.78v2.64c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>;
}

function TelegramIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 4-3.1 15.6c-.23 1.1-.85 1.36-1.72.85l-4.72-3.48-2.28 2.2c-.25.25-.46.46-.94.46l.34-4.82L17.35 7c.36-.32-.08-.5-.56-.18L7.9 12.37l-4.7-1.47c-1.02-.32-1.04-1.02.21-1.52L21.8 2.92c.86-.32 1.61.2 1.2 1.08Z" /></svg>;
}

function MailIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('kosmik-theme') as 'dark' | 'light') || 'dark');
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  const [roleText, setRoleText] = useState('frontend-разработчик');
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('kosmik-theme', theme);
  }, [theme]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    const revealItems = document.querySelectorAll('.reveal');
    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 600);
      document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.08, 30)}px`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setPreviewImage(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const roles = ['frontend-разработчик', 'создатель интерфейсов', 'внимательный к деталям'];
    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;
    const interval = window.setInterval(() => {
      const currentRole = roles[roleIndex];
      if (deleting) {
        characterIndex -= 1;
        setRoleText(currentRole.slice(0, characterIndex));
        if (characterIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      } else {
        const nextRole = roles[roleIndex];
        characterIndex += 1;
        setRoleText(nextRole.slice(0, characterIndex));
        if (characterIndex === nextRole.length) deleting = true;
      }
    }, 105);
    return () => window.clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFormErrors((current) => ({ ...current, [field]: undefined }));
    setFormSent(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Напиши, как к тебе обращаться';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Проверь адрес электронной почты';
    if (form.message.trim().length < 12) nextErrors.message = 'Расскажи о задаче чуть подробнее';
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setFormSent(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <header className="site-header">
        <nav className="header-inner" aria-label="Основная навигация">
          <a className="brand" href="#hero" onClick={closeMenu} aria-label="kosmik, на главную"><span className="brand-mark">k</span><span>kosmik<span className="brand-dot">.</span></span></a>
          <div className="desktop-nav">
            <a href="#about">Обо мне</a>
            <a href="#skills">Навыки</a>
            <a href="#work">Работа</a>
            <a href="#experience">Путь</a>
            <a href="#contact">Контакты</a>
          </div>
          <div className="header-actions">
            <button className="theme-toggle" type="button" aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
            <a className="header-cta" href="#contact">Обсудить задачу <ArrowUpRight /></a>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <CloseIcon /> : <MenuIcon />}</button>
          </div>
        </nav>
        <div id="mobile-nav" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
          <a href="#about" onClick={closeMenu}>Обо мне</a>
          <a href="#skills" onClick={closeMenu}>Навыки</a>
          <a href="#work" onClick={closeMenu}>Работа</a>
          <a href="#experience" onClick={closeMenu}>Путь</a>
          <a className="mobile-nav__cta" href="#contact" onClick={closeMenu}>Обсудить задачу <ArrowUpRight /></a>
        </div>
      </header>

      <main id="main">
        <section id="hero" className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow--one" />
          <div className="hero-glow hero-glow--two" />
          <div className="hero-grid container">
            <div className="hero-copy">
              <Reveal><p className="eyebrow"><span className="status-dot" /> Никита / frontend-разработчик</p></Reveal>
              <Reveal><h1 id="hero-title">Сайты, которые<br /><span>помогают расти.</span></h1></Reveal>
              <Reveal><p className="hero-lede">Я <strong>{roleText}</strong><span className="typing-cursor" aria-hidden="true">|</span>. Проектирую выразительные сайты и интерфейсы с ясной структурой, аккуратной версткой и фокусом на задаче бизнеса.</p></Reveal>
              <Reveal className="hero-actions"><a className="button button--primary" href="#work">Смотреть лендинг <ArrowDown /></a><a className="button button--ghost" href="#about">Узнать обо мне <ArrowUpRight /></a></Reveal>
              <Reveal><div className="hero-meta"><span>01 / 05</span><span>React · TypeScript · CSS</span></div></Reveal>
            </div>
            <Reveal className="hero-visual-wrap"><div className="hero-visual" aria-label="Декоративная визуализация портфолио" role="img"><div className="hero-visual__ring hero-visual__ring--one" /><div className="hero-visual__ring hero-visual__ring--two" /><div className="hero-window"><div className="window-bar"><span /><span /><span /><small>kosmik / portfolio</small></div><div className="window-body"><div className="window-copy"><small>digital craft / 2026</small><strong>Ideas<br /><em>in motion.</em></strong><span className="window-line" /></div><div className="window-shape"><span>k</span></div></div><div className="window-footer"><span>STRATEGY</span><span>DESIGN</span><span>FRONTEND</span></div></div><span className="hero-note hero-note--top">Scroll to explore ↘</span><span className="hero-note hero-note--bottom">48° 12' N / 16° 22' E</span></div></Reveal>
          </div>
        </section>

        <div className="signal-bar"><div className="container signal-bar__inner"><span>Портфолио / 2026</span><span className="signal-hide-mobile">Дизайн · разработка · внимание к деталям</span><span><i /> открыт к сотрудничеству</span></div></div>

        <section id="about" className="section-pad section-about" aria-labelledby="about-title">
          <div className="container about-grid">
            <Reveal><p className="eyebrow">01 / обо мне</p><h2 id="about-title">Технологии —<br /><span>инструмент.</span><br />Человек —<br />фокус.</h2></Reveal>
            <Reveal className="about-content"><div className="portrait-card"><div className="portrait-card__grid" /><div className="portrait-card__avatar">К</div><span className="portrait-card__caption">Никита<br />frontend / 2026</span><span className="portrait-card__orb" /></div><div className="about-copy"><p className="lead">Помогаю превращать идеи в ясные цифровые продукты, которыми приятно пользоваться.</p><p>Мне важны не только аккуратные пиксели, но и то, что за ними: сценарий пользователя, ритм страницы, понятная логика и ощущение, что всё находится на своём месте.</p><div className="about-facts"><div><strong>01</strong><span>лендинг<br />уже опубликован</span></div><div><strong>∞</strong><span>внимания<br />к деталям</span></div><div><strong>01</strong><span>понятный путь<br />от идеи до кода</span></div></div></div></Reveal>
          </div>
        </section>

        <section id="skills" className="section-pad section-muted" aria-labelledby="skills-title">
          <div className="container"><Reveal><p className="eyebrow">02 / инструменты</p><div className="section-heading"><h2 id="skills-title">Умею делать<br /><span>понятно.</span></h2><p>Собираю интерфейс от структуры до последнего состояния. Люблю, когда визуальная идея поддерживает задачу, а код остаётся читаемым.</p></div></Reveal><div className="skills-layout"><Reveal className="skills-list">{skills.map(([name, description, value], index) => <div className="skill-row" key={name}><div className="skill-row__top"><span>0{index + 1}</span><strong>{name}</strong><em>{value}</em></div><p>{description}</p><div className="skill-row__track"><span style={{ '--skill-width': value } as React.CSSProperties} /></div></div>)}</Reveal><Reveal className="tools-card"><p className="eyebrow">stack / everyday</p><div className="tools-cloud"><span className="tool tool--large">React</span><span className="tool tool--accent">TypeScript</span><span className="tool">CSS</span><span className="tool">Vite</span><span className="tool tool--large">Figma</span><span className="tool tool--soft">Git</span><span className="tool">HTML</span><span className="tool tool--accent">Motion</span></div><p className="tools-note">Не коллекционирую технологии. Выбираю те, которые помогают решить задачу проще.</p></Reveal></div></div>
        </section>

        <section id="work" className="section-pad section-muted featured-work" aria-labelledby="work-title">
          <div className="container"><Reveal><p className="eyebrow">03 / избранные работы</p><div className="section-heading"><h2 id="work-title">Собираю идеи<br /><span>в продукты.</span></h2><p>Первый лендинг уже опубликован. Мобильное приложение — следующий pet-проект в работе.</p></div></Reveal><Reveal className="featured-work-card"><div className="featured-work-art" role="img" aria-label="Превью лендинга Fintegrate"><span>FINTEGRATE / 01</span><strong>DATA<br /><em>IN MOTION.</em></strong><i></i><b>PAYMENTS / API / CRM</b></div><div className="featured-work-copy"><p className="eyebrow">Concept landing / fintech</p><h3>Fintegrate</h3><p>Тёмный data-dashboard лендинг с акцентом на метрики, интеграции и понятный путь от аудита до запуска.</p><div className="featured-work-tags"><span>HTML / CSS / JS</span><span>GitHub Pages</span><span>Responsive</span></div><a className="button button--primary" href="./fintech-integrations/" target="_blank" rel="noreferrer">Открыть лендинг <ArrowUpRight /></a></div></Reveal><Reveal className="featured-work-card featured-work-card--mobile"><div className="featured-work-screens" aria-label="Скриншоты мобильного приложения"><figure className="screenshot-figure"><button type="button" className="screenshot-button" onClick={() => setPreviewImage({ src: './crypto-tracker/market.png', alt: 'Экран рынка Crypto Tracker' })} aria-label="Открыть экран рынка крупно"><img src="./crypto-tracker/market.png" alt="Экран рынка Crypto Tracker" /></button><figcaption>01 / MARKET</figcaption></figure><figure className="screenshot-figure"><button type="button" className="screenshot-button" onClick={() => setPreviewImage({ src: './crypto-tracker/portfolio.png', alt: 'Экран портфеля Crypto Tracker' })} aria-label="Открыть экран портфеля крупно"><img src="./crypto-tracker/portfolio.png" alt="Экран портфеля Crypto Tracker" /></button><figcaption>02 / PORTFOLIO</figcaption></figure><figure className="screenshot-figure"><button type="button" className="screenshot-button" onClick={() => setPreviewImage({ src: './crypto-tracker/pay.png', alt: 'Экран Demo Pay Crypto Tracker' })} aria-label="Открыть экран Demo Pay крупно"><img src="./crypto-tracker/pay.png" alt="Экран Demo Pay Crypto Tracker" /></button><figcaption>03 / DEMO PAY</figcaption></figure></div><div className="featured-work-copy"><p className="eyebrow">Mobile app / MVP</p><h3>Crypto Tracker &amp; Pay</h3><p>Кроссплатформенное приложение с рынком, графиками, локальным портфелем, конвертером и Demo Pay-сценарием.</p><div className="featured-work-tags"><span>React Native</span><span>Expo</span><span>TypeScript</span></div><a className="button button--ghost" href="https://github.com/kosmik11-web/kosmik-portfolio/tree/main/mobile/crypto-tracker" target="_blank" rel="noreferrer">Смотреть код <ArrowUpRight /></a></div></Reveal></div>
        </section>

        <section className="section-pad section-muted featured-work"><div className="container"><Reveal className="featured-work-card featured-work-card--architecture"><div className="featured-work-art featured-work-art--architecture" role="img" aria-label="Превью сайта архитектурного бюро"><span>АРХИТЕКТ / 03</span><strong>SPACE<br /><em>TO LIVE.</em></strong><i></i><b>ARCHITECTURE / BUILD / SERVICE</b></div><div className="featured-work-copy"><p className="eyebrow">Client website / architecture</p><h3>АРХИТЕКТ</h3><p>Сайт архитектурно-строительной организации: полный цикл, понятная подача преимуществ и заявка на консультацию.</p><div className="featured-work-tags"><span>HTML / CSS / JS</span><span>Landing</span><span>Responsive</span></div><a className="button button--primary" href="./arhitekt/" target="_blank" rel="noreferrer">Открыть сайт <ArrowUpRight /></a></div></Reveal></div></section>

        <section id="experience" className="section-pad section-muted" aria-labelledby="experience-title">
          <div className="container experience-grid"><Reveal><p className="eyebrow">04 / путь</p><h2 id="experience-title">Расту через<br /><span>практику.</span></h2><p className="section-intro">Сейчас я ищу первые реальные задачи и людей, рядом с которыми смогу стать сильнее.</p></Reveal><Reveal><ol className="timeline">{experience.map(([date, title, text], index) => <li key={title}><span className="timeline__number">0{index + 1}</span><div><time>{date}</time><h3>{title}</h3><p>{text}</p></div></li>)}</ol></Reveal></div>
        </section>

        <section className="section-pad quote-section" aria-label="Подход к работе"><div className="container"><Reveal className="quote-card"><span className="quote-mark">“</span><blockquote>Сначала разбираюсь в задаче, потом собираю интерфейс. Так дизайн начинает работать на бизнес, а не просто занимать место на экране.</blockquote><footer><span className="quote-avatar">K</span><span><strong>MY APPROACH</strong><small>structure / clarity / frontend</small></span></footer></Reveal></div></section>

        <section id="contact" className="section-pad contact-section" aria-labelledby="contact-title"><div className="container contact-grid"><Reveal><p className="eyebrow">05 / контакт</p><h2 id="contact-title">Есть задача?<br /><span>Давайте обсудим.</span></h2><p className="contact-intro">Расскажи, что нужно сделать. Даже если идея пока сырая — разложим её на понятные шаги и определим следующий шаг.</p><div className="contact-links"><a href="mailto:hello@kosmik.dev"><MailIcon />hello@kosmik.dev</a><a href="https://t.me/fr_code" target="_blank" rel="noreferrer"><TelegramIcon />@fr_code</a><a href="https://github.com/kosmik11-web" target="_blank" rel="noreferrer"><GithubIcon />GitHub</a></div></Reveal><Reveal><form className="contact-form" onSubmit={handleSubmit} noValidate><div className="form-row"><label>Имя<input type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Как к тебе обращаться?" aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? 'name-error' : undefined} />{formErrors.name && <small id="name-error" className="form-error">{formErrors.name}</small>}</label><label>Email<input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? 'email-error' : undefined} />{formErrors.email && <small id="email-error" className="form-error">{formErrors.email}</small>}</label></div><label>О задаче<textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Коротко о проекте, сроках и том, что важно" rows={5} aria-invalid={Boolean(formErrors.message)} aria-describedby={formErrors.message ? 'message-error' : undefined} />{formErrors.message && <small id="message-error" className="form-error">{formErrors.message}</small>}</label><div className="form-submit"><button className="button button--primary" type="submit">{formSent ? 'Сообщение проверено' : 'Отправить сообщение'} <ArrowUpRight /></button>{formSent && <p className="form-success" role="status">Спасибо. Я свяжусь с тобой в ближайшее время.</p>}</div></form></Reveal></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand" href="#hero"><span className="brand-mark">k</span><span>kosmik<span className="brand-dot">.</span></span></a><span>Сделано с вниманием / 2026</span><span>© {new Date().getFullYear()} Никита</span></div></footer>
      {showTop && <button className="back-to-top" type="button" aria-label="Вернуться наверх" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowDown /></button>}

      {previewImage && <div className="image-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreviewImage(null); }}><div className="image-lightbox__dialog" role="dialog" aria-modal="true" aria-label={previewImage.alt}><button type="button" className="image-lightbox__close" onClick={() => setPreviewImage(null)} aria-label="Закрыть изображение"><CloseIcon /></button><img src={previewImage.src} alt={previewImage.alt} /></div></div>}

    </div>
  );
}

export default App;
