import './contact';

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#primary-nav');
if (toggle && navigation) {
  document.documentElement.classList.add('js-nav');
  toggle.hidden = false;
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.removeAttribute('data-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.toggleAttribute('data-open', open);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });
  matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
}

const packageSelect = document.querySelector<HTMLSelectElement>('#package');
const choosePackage = (value: string) => {
  if (packageSelect && ['Starter', 'Business', 'Premium'].includes(value)) {
    packageSelect.value = value;
  }
};
document.querySelectorAll<HTMLAnchorElement>('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    choosePackage(link.dataset.package ?? '');
  });
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}
