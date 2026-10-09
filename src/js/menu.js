export function initMenu() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const panel = document.getElementById('nav-panel');
  if (!nav || !toggle || !panel) return;

  const mq = window.matchMedia('(max-width: 1119px)');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');

  function setOpen(open, moveFocus) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    const lock = open && mq.matches;
    document.body.classList.toggle('menu-open', lock);
    panel.inert = mq.matches && !open;
    if (main) main.inert = lock;
    if (footer) footer.inert = lock;
    if (!moveFocus) return;
    if (open) panel.querySelector('a')?.focus();
    else toggle.focus();
  }

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'), true);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false, false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false, true);
  });

  mq.addEventListener('change', () => setOpen(false, false));

  setOpen(false, false);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
