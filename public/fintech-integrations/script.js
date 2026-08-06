const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Открыть меню');
  mobileNav?.classList.remove('is-open');
  mobileNav?.setAttribute('aria-hidden', 'true');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
  mobileNav?.classList.toggle('is-open', !isOpen);
  mobileNav?.setAttribute('aria-hidden', String(isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 20);
  if (!reducedMotion) {
    document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.07, 24)}px`);
  }
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const formatNumber = (value, decimals) => new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: decimals,
  maximumFractionDigits: decimals,
}).format(value);

const countUp = (element) => {
  const target = Number(element.dataset.number);
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || '';
  if (reducedMotion) {
    element.textContent = `${formatNumber(target, decimals)}${suffix}`;
    return;
  }

  const startedAt = performance.now();
  const duration = 1300;
  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = 1 - ((1 - progress) ** 3);
    element.textContent = `${formatNumber(target * eased, decimals)}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-number]').forEach(countUp);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const stats = document.querySelector('#stats');
if (stats) statsObserver.observe(stats);

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...contactForm.querySelectorAll('input, textarea')];
  const invalidFields = fields.filter((field) => !field.value.trim());
  fields.forEach((field) => field.setAttribute('aria-invalid', String(invalidFields.includes(field))));

  if (invalidFields.length > 0) {
    formStatus.textContent = 'Заполните все поля, чтобы описать задачу.';
    formStatus.style.color = 'var(--red-soft)';
    invalidFields[0].focus();
    return;
  }

  formStatus.textContent = 'Форма проверена. Для реальной отправки подключим почту или Telegram.';
  formStatus.style.color = 'var(--teal)';
  contactForm.reset();
});
