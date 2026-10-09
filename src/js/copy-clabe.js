import { weddingConfig } from '../config.js';

export function initCopyClabe() {
  const btn = document.getElementById('copy-clabe');
  const clabeEl = document.getElementById('gift-clabe');

  if (clabeEl) {
    clabeEl.textContent = weddingConfig.clabe.formatted;
  }

  if (!btn) return;

  const originalText = btn.textContent;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(weddingConfig.clabe.raw);
      btn.textContent = 'Copiado';
      btn.classList.add('is-copied');
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('is-copied');
        btn.disabled = false;
      }, 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = weddingConfig.clabe.raw;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      btn.textContent = 'Copiado';
      btn.classList.add('is-copied');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('is-copied');
      }, 2000);
    }
  });
}
