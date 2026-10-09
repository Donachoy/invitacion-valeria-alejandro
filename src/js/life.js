export function initLife() {
  const bar = document.getElementById('nav-progress');
  const scroller = document.getElementById('film');

  if (bar) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (!scroller) return;

  const cards = [...scroller.querySelectorAll('[data-film]')];
  let dragging = false;
  let moved = false;
  let startX = 0;
  let startScroll = 0;

  scroller.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') return;
    dragging = true;
    moved = false;
    startX = event.clientX;
    startScroll = scroller.scrollLeft;
    scroller.classList.add('is-dragging');
    scroller.setPointerCapture(event.pointerId);
  });

  scroller.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 6) moved = true;
    scroller.scrollLeft = startScroll - delta;
  });

  const endDrag = () => {
    dragging = false;
    scroller.classList.remove('is-dragging');
  };

  scroller.addEventListener('pointerup', endDrag);
  scroller.addEventListener('pointercancel', endDrag);

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (moved) {
        moved = false;
        return;
      }
      const index = Number(card.dataset.film);
      const target = document.querySelectorAll('[data-gallery]')[index];
      target?.click();
    });
  });

  document.querySelectorAll('.film__arrow').forEach((button) => {
    button.addEventListener('click', () => {
      const card = cards[0];
      const width = card ? card.getBoundingClientRect().width + 12 : 280;
      scroller.scrollBy({
        left: width * Number(button.dataset.dir),
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  });
}
