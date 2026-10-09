import { weddingConfig } from '../config.js';

export function initMusic() {
  const audio = document.getElementById('bg-music');
  const toggle = document.getElementById('music-toggle');
  if (!audio || !toggle) return;

  const { music } = weddingConfig;
  audio.volume = music.volume;
  audio.loop = true;

  function setPlaying(playing) {
    toggle.classList.toggle('is-playing', playing);
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pausar música' : 'Reproducir música');
  }

  async function play() {
    try {
      await audio.play();
      setPlaying(true);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  }

  function pause() {
    audio.pause();
    setPlaying(false);
  }

  toggle.addEventListener('click', () => {
    if (audio.paused) play();
    else pause();
  });

  async function unlock() {
    if (!audio.paused) return;
    await play();
  }

  document.addEventListener('pointerdown', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });

  setPlaying(false);
  play();
}
