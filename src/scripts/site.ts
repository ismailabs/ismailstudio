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
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel()); });

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#primary-nav');
if (toggle && navigation) {
  document.documentElement.classList.add('js-nav');
  toggle.hidden = false;
  const backdrop = document.querySelector<HTMLButtonElement>('.menu-backdrop');
  const mobile = matchMedia('(max-width: 800px)');
  // Only elements outside the header become inert; preserve any existing state.
  const background = Array.from(document.body.children).filter((node): node is HTMLElement => node instanceof HTMLElement && node !== header && !node.matches('script'));
  const inertBefore = new Map<HTMLElement, boolean>();
  const closeMenu = (restoreFocus = true) => {
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    navigation.removeAttribute('data-open');
    document.documentElement.classList.remove('menu-open');
    if (backdrop) backdrop.hidden = true;
    for (const [node, inert] of inertBefore) node.inert = inert;
    inertBefore.clear();
    if (wasOpen && restoreFocus && mobile.matches) toggle.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); return; }
    if (!mobile.matches) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    navigation.setAttribute('data-open', '');
    document.documentElement.classList.add('menu-open');
    if (backdrop) backdrop.hidden = false;
    for (const node of background) { inertBefore.set(node, node.inert); node.inert = true; }
    navigation.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true });
  });
  backdrop?.addEventListener('click', () => closeMenu());
  navigation.addEventListener('click', event => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu(false);
      const target = document.getElementById(event.target.hash.slice(1));
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key === 'Tab') {
      const controls = [toggle, ...navigation.querySelectorAll<HTMLAnchorElement>('a[href]')];
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => closeMenu(false));
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

// Progressive, once-only entrance cues. Nothing is hidden before enhancement,
// and native transform animation avoids loading another initial JS dependency.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
      entry.target.dataset.revealed = 'true';
      entry.target.animate({ transform: ['translateY(14px)', 'translateY(0)'] }, { duration: 550, easing: 'cubic-bezier(.22,.7,.24,1)' });
      reveal.unobserve(entry.target);
    }
  }, { threshold: .12 });
  document.querySelectorAll<HTMLElement>('main h2, .section-intro>p, .project-preview, .about-copy>p, .manifesto>div>p:not(.eyebrow)').forEach(element => { element.dataset.reveal = ''; reveal.observe(element); });
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) reveal.disconnect(); });
}
