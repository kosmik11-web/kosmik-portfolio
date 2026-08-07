import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';

type IconProps = { className?: string };

const projects = [
  { id: 'market', title: 'Market', label: '01 / MARKET', image: './crypto-tracker/market.png', alt: 'Экран рынка Crypto Tracker' },
  { id: 'portfolio', title: 'Portfolio', label: '02 / PORTFOLIO', image: './crypto-tracker/portfolio.png', alt: 'Экран портфеля Crypto Tracker' },
  { id: 'pay', title: 'Demo Pay', label: '03 / DEMO PAY', image: './crypto-tracker/pay.png', alt: 'Экран Demo Pay Crypto Tracker' },
];

type FormErrors = Partial<Record<'name' | 'contact' | 'message', string>>;

function ArrowUpRight({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

function ArrowDown({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v15" /><path d="m6 13 6 6 6-6" /></svg>;
}

function CloseIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

function MailIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
}

function TelegramIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m21 4-3.1 15.6c-.23 1.1-.85 1.36-1.72.85l-4.72-3.48-2.28 2.2c-.25.25-.46.46-.94.46l.34-4.82L17.35 7c.36-.32-.08-.5-.56-.18L7.9 12.37l-4.7-1.47c-1.02-.32-1.04-1.02.21-1.52L21.8 2.92c.86-.32 1.61.2 1.2 1.08Z" /></svg>;
}

function GithubIcon({ className = '' }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.7c-2.65.58-3.2-1.13-3.2-1.13-.43-1.1-1.06-1.4-1.06-1.4-.86-.6.07-.59.07-.59.95.07 1.45.98 1.45.98.85 1.44 2.22 1.02 2.76.78.09-.61.33-1.02.6-1.25-2.11-.24-4.33-1.05-4.33-4.69 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.09-2.52 0 0 .8-.26 2.62.98a9.1 9.1 0 0 1 4.77 0c1.82-1.24 2.62-.98 2.62-.98.51 1.31.19 2.28.09 2.52.61.67.98 1.52.98 2.56 0 3.65-2.23 4.45-4.35 4.68.34.3.65.88.65 1.78v2.64c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" /></svg>;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Socials() {
  return <div className="section-socials" aria-label="Социальные ссылки"><a href="https://github.com/kosmik11-web" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a><a href="https://t.me/fr_code" target="_blank" rel="noreferrer" aria-label="Telegram"><TelegramIcon /></a><a href="mailto:hello@kosmik.dev" aria-label="Email"><MailIcon /></a></div>;
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState<{ image: string; alt: string } | null>(null);
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 48rem)').matches;
    const video = videoRef.current;
    if (!video) return undefined;

    let targetProgress = 0;
    const startProgress = 0.48;
    let currentTime = 0;
    let frame = 0;
    let stopped = false;

    const updateTarget = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      targetProgress = window.scrollY / maxScroll;
      document.documentElement.style.setProperty('--scroll-progress', String(targetProgress));
    };

    const render = () => {
      if (stopped) return;
      if (!reduceMotion && !mobile && video.readyState >= 1 && Number.isFinite(video.duration)) {
        if (currentTime === 0 && video.currentTime > 0) currentTime = video.currentTime;
        const targetTime = (startProgress + targetProgress * (1 - startProgress)) * video.duration;
        currentTime += (targetTime - currentTime) * 0.1;
        if (Math.abs(targetTime - currentTime) > 0.01) video.currentTime = currentTime;
      }
      frame = window.requestAnimationFrame(render);
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    if (mobile && !reduceMotion) {
      video.loop = true;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
    frame = window.requestAnimationFrame(render);
    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateTarget);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.16 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreview(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSent(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Введите имя';
    if (!form.contact.trim()) nextErrors.contact = 'Оставьте email или Telegram';
    if (form.message.trim().length < 8) nextErrors.message = 'Опишите задачу чуть подробнее';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      setForm({ name: '', contact: '', message: '' });
    }
  };

  return <div className="cinematic-site">
    <a className="skip-link" href="#main">Перейти к содержимому</a>
    <video ref={videoRef} className="cinematic-video" muted playsInline preload="auto" aria-hidden="true" onLoadedMetadata={(event) => { event.currentTarget.currentTime = event.currentTarget.duration * 0.48; }}><source src="./video/kling_20260807_VIDEO_Gentle__sl_5376_0.mp4" type="video/mp4" /></video>
    <div className="cinematic-overlay" aria-hidden="true" />
    <header className="cinematic-header"><a className="cinematic-logo" href="#hero" onClick={() => setMenuOpen(false)}>k<span>.</span></a><nav className={menuOpen ? 'is-open' : ''} aria-label="Основная навигация"><a href="#work" onClick={() => setMenuOpen(false)}>PROJECTS</a><a href="#contact" onClick={() => setMenuOpen(false)}>CONTACT</a></nav><button className="cinematic-menu" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button></header>
    <aside className="scroll-rail" aria-hidden="true"><span>SCROLL</span><i /></aside>

    <main id="main">
      <section id="hero" className="cinematic-section cinematic-hero" aria-labelledby="hero-title"><div className="section-inner cinematic-hero__inner"><Reveal><p className="micro-label">I AM / FRONTEND DEVELOPER</p><h1 id="hero-title">NIKITA</h1><p className="hero-role">interfaces / motion / digital craft</p></Reveal><Reveal className="hero-scroll-note"><span>SELECTED<br />WORK / 2026</span><ArrowDown /></Reveal></div><Socials /></section>

      <section id="work" className="cinematic-section cinematic-work" aria-labelledby="work-title"><div className="section-inner"><Reveal><p className="micro-label">01 / SELECTED WORK</p><div className="section-title-row"><h2 id="work-title">MY<br /><span>WORK</span></h2><p>Mobile product concept built around live data, clear states and a calm visual system.</p></div></Reveal><div className="project-grid">{projects.map((project, index) => <Reveal key={project.id} className="project-frame" ><article><button className="project-image-button" type="button" onClick={() => setPreview({ image: project.image, alt: project.alt })} aria-label={`Открыть ${project.title} крупно`}><img src={project.image} alt={project.alt} loading="lazy" /></button><div className="project-meta"><span>{project.label}</span><span>VIEW / 0{index + 1} ↗</span></div><h3>{project.title}</h3></article></Reveal>)}</div><Reveal className="work-footer"><a className="outline-button" href="https://github.com/kosmik11-web/kosmik-portfolio/tree/main/mobile/crypto-tracker" target="_blank" rel="noreferrer">VIEW PROJECT <ArrowUpRight /></a><span>REACT NATIVE / EXPO / TYPESCRIPT</span></Reveal></div><Socials /></section>

      <section id="contact" className="cinematic-section cinematic-contact" aria-labelledby="contact-title"><div className="section-inner contact-layout"><Reveal><p className="micro-label">02 / CONTACT</p><h2 id="contact-title">LET'S<br /><span>TALK</span></h2><p className="contact-lede">Have a problem worth solving? Tell me what you are building and where the interface should take people.</p><div className="contact-details"><a href="mailto:hello@kosmik.dev">hello@kosmik.dev <ArrowUpRight /></a><a href="https://t.me/fr_code" target="_blank" rel="noreferrer">@fr_code <ArrowUpRight /></a></div></Reveal><Reveal><form className="cinematic-form" onSubmit={submitForm} noValidate><p className="form-title">CONTACT FORM</p><label>YOUR NAME<input type="text" value={form.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label><label>EMAIL OR TELEGRAM<input type="text" value={form.contact} onChange={(event) => updateField('contact', event.target.value)} placeholder="Contact" aria-invalid={Boolean(errors.contact)} />{errors.contact && <small>{errors.contact}</small>}</label><label>MESSAGE<textarea value={form.message} onChange={(event) => updateField('message', event.target.value)} placeholder="Tell me about the task" rows={4} aria-invalid={Boolean(errors.message)} />{errors.message && <small>{errors.message}</small>}</label><button className="outline-button" type="submit">{sent ? 'MESSAGE READY' : 'SEND MESSAGE'} <ArrowUpRight /></button>{sent && <p className="form-status" role="status">Thanks. I will get back to you soon.</p>}</form></Reveal></div><p className="closing-line">THANKS FOR WATCHING</p><Socials /></section>
    </main>

    {preview && <div className="cinematic-lightbox" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreview(null); }}><div className="cinematic-lightbox__dialog" role="dialog" aria-modal="true" aria-label={preview.alt}><button type="button" onClick={() => setPreview(null)} aria-label="Закрыть изображение"><CloseIcon /></button><img src={preview.image} alt={preview.alt} /></div></div>}
  </div>;
}

export default App;
