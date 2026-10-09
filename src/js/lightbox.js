export function initLightbox() {
  const dialog = document.getElementById('lightbox');
  const image = document.getElementById('lightbox-img');
  const count = document.getElementById('lightbox-count');
  const caption = document.getElementById('lightbox-caption');
  const buttons = [...document.querySelectorAll('[data-gallery]')];
  if (!dialog || !image || !buttons.length) return;

  let index = 0;
  let touchX = 0;
  let touchY = 0;

  function show(next) {
    index = (next + buttons.length) % buttons.length;
    const source = buttons[index].querySelector('img');
    const label = buttons[index].querySelector('.gallery__cap');
    image.classList.remove('is-in');
    image.src = source.currentSrc || source.src;
    image.alt = source.alt || '';
    if (count) count.textContent = `${index + 1} / ${buttons.length}`;
    if (caption) caption.textContent = label ? label.textContent : '';
    requestAnimationFrame(() => image.classList.add('is-in'));
  }

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      show(i);
      dialog.showModal();
    });
  });

  dialog.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('pointerdown', (event) => {
    touchX = event.clientX;
    touchY = event.clientY;
  });

  dialog.addEventListener('pointerup', (event) => {
    const dx = event.clientX - touchX;
    const dy = event.clientY - touchY;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    show(index + (dx < 0 ? 1 : -1));
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1);
    }
  });
}
