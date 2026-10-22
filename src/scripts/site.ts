import './contact';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector<HTMLElement>('.site-header');
let motion: Promise<typeof import('motion/mini')> | undefined;
const animateNavigation = async (element: HTMLElement) => {
  if (reducedMotion.matches) return;
  try {
    const { animate } = await (motion ??= import('motion/mini'));
    if (!reducedMotion.matches) animate(element, { transform: ['translateY(-5px)', 'translateY(0px)'] }, { duration: .25, ease: 'easeOut' });
  } catch (error) {
    console.warn('Navigation motion unavailable; the static navigation remains usable.', error);
  }
};
const navigationLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('#primary-nav a[href^="#"]'));
const sections = navigationLinks.flatMap(link => {
  const section = document.getElementById(link.hash.slice(1));
  return section ? [{ link, section }] : [];
});
let navigationFrame = 0;
const updateNavigation = () => {
  navigationFrame = 0;
  if (!header) return;
  const floated = scrollY > 120;
  if (header.hasAttribute('data-floating') !== floated) {
    header.toggleAttribute('data-floating', floated);
    void animateNavigation(header);
  }
  let current: HTMLAnchorElement | undefined;
  for (const { link, section } of sections) if (section.getBoundingClientRect().top <= 180) current = link;
  for (const link of navigationLinks) {
    if (link === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
};
window.addEventListener('scroll', () => { if (!navigationFrame) navigationFrame = requestAnimationFrame(updateNavigation); }, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.finish()); });

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#primary-nav');
if (toggle && navigation) {
  document.documentElement.classList.add('js-nav');
  toggle.hidden = false;
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); navigation.removeAttribute('data-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.toggleAttribute('data-open', open);
  });
  navigation.addEventListener('click', event => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
      const target = document.getElementById(event.target.hash.slice(1));
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
    }
  });
  document.addEventListener('click', event => { if (event.target instanceof Node && !navigation.contains(event.target) && !toggle.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
  matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
}
const packageSelect = document.querySelector<HTMLSelectElement>('#package');
document.querySelectorAll<HTMLAnchorElement>('[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    if (packageSelect && ['Starter', 'Business', 'Premium'].includes(link.dataset.package ?? '') && !document.querySelector('#quote-form[aria-busy]')) {
      packageSelect.value = link.dataset.package ?? 'Not sure yet';
      document.querySelector('#quote-form')?.dispatchEvent(new Event('package-chosen'));
    }
  });
});
document.querySelectorAll<HTMLAnchorElement>('a[href="#privacy-note"]').forEach(link => link.addEventListener('click', () => { document.querySelector<HTMLDetailsElement>('#privacy-note')?.setAttribute('open', ''); }));

let activeDialog: HTMLDialogElement | null = null;
let dialogTrigger: HTMLElement | null = null;
const syncCase = () => {
  const slug = new URL(location.href).searchParams.get('case');
  const candidate = slug && /^[a-z]+$/.test(slug) ? document.querySelector<HTMLDialogElement>(`#case-${slug}`) : null;
  if (activeDialog && activeDialog !== candidate) { activeDialog.close(); activeDialog = null; }
  if (candidate && !candidate.open) { candidate.showModal(); activeDialog = candidate; }
  document.body.classList.toggle('dialog-open', Boolean(activeDialog));
};
const closeCase = () => {
  if (history.state?.studioCase) history.back();
  else { const url = new URL(location.href); url.searchParams.delete('case'); history.replaceState(null, '', url); syncCase(); }
};
document.querySelectorAll<HTMLAnchorElement>('[data-case]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !('showModal' in HTMLDialogElement.prototype)) return;
  event.preventDefault(); dialogTrigger = link;
  const url = new URL(location.href); url.searchParams.set('case', link.dataset.case ?? '');
  history.pushState({ studioCase: true }, '', url); syncCase();
}));
document.querySelectorAll<HTMLDialogElement>('.case-dialog').forEach(dialog => {
  dialog.querySelector('.case-close')?.addEventListener('click', closeCase);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeCase(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeCase(); } });
  dialog.addEventListener('close', () => { dialogTrigger?.focus({ preventScroll: true }); });
});
window.addEventListener('popstate', syncCase);
syncCase();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting)), { threshold: .8 });
  document.querySelectorAll('[data-process]').forEach(element => observer.observe(element));
}
