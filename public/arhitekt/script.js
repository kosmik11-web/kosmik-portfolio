const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('section, .feature-card, .advantage-list article, .steps article').forEach((element) => {
  element.classList.add('reveal');
  revealObserver.observe(element);
});

const form = document.querySelector('.contact-form');
const status = document.querySelector('.form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const invalid = fields.filter((field) => !field.value.trim());
  fields.forEach((field) => field.setAttribute('aria-invalid', String(invalid.includes(field))));
  if (invalid.length) {
    status.textContent = 'Заполните имя, контакт и описание задачи.';
    status.style.color = '#fca5a5';
    invalid[0].focus();
    return;
  }
  status.textContent = 'Заявка проверена. Мы свяжемся с вами в ближайшее время.';
  status.style.color = '#6ee7b7';
  form.reset();
});
