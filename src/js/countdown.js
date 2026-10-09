import { weddingConfig } from '../config.js';

export function initCountdown() {
  const targetDate = new Date(weddingConfig.dateISO);
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');
  const doneEl = document.getElementById('countdown-done');
  const timerEl = document.getElementById('countdown-timer');
  const dateEl = document.getElementById('countdown-date');

  if (dateEl) {
    dateEl.textContent = `${weddingConfig.dateLabel} · ${weddingConfig.timeLabel}`;
  }

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function update() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      if (timerEl) timerEl.hidden = true;
      if (doneEl) doneEl.hidden = false;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setPart(daysEl, String(days));
    setPart(hoursEl, pad(hours));
    setPart(minutesEl, pad(minutes));
    setPart(secondsEl, pad(seconds));
  }

  function setPart(el, value) {
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove('is-tick');
    void el.offsetWidth;
    el.classList.add('is-tick');
  }

  update();
  setInterval(update, 1000);
}
