import { weddingConfig, getWhatsAppUrl, getMapsUrl } from './config.js';
import { initCountdown } from './js/countdown.js';
import { initCopyClabe } from './js/copy-clabe.js';
import { initMenu } from './js/menu.js';
import { initLightbox } from './js/lightbox.js';
import { initCalendar } from './js/calendar.js';
import { initMotion } from './js/motion.js';
import { initLife } from './js/life.js';
import { initMusic } from './js/music.js';

import './styles/variables.css';
import './styles/base.css';
import './styles/editorial.css';
import './styles/life.css';

function fillList(id, names) {
  const list = document.getElementById(id);
  if (!list) return;
  names.forEach((name) => {
    const li = document.createElement('li');
    li.textContent = name;
    list.appendChild(li);
  });
}

function populateInfo() {
  const { venue, timeLabel, parents, godparents, gift } = weddingConfig;

  const title = document.getElementById('ceremonia-title');
  const address = document.getElementById('venue-address');
  const ceremony = document.getElementById('ceremony-time');
  const reception = document.getElementById('reception-time');
  const maps = document.getElementById('maps-link');
  const giftText = document.getElementById('gift-text');
  const whatsapp = document.getElementById('whatsapp-link');

  if (title) title.textContent = venue.name;
  if (address) address.textContent = venue.address;
  if (ceremony) ceremony.textContent = timeLabel;
  if (reception) reception.textContent = timeLabel;
  if (maps) maps.href = getMapsUrl();
  if (giftText) giftText.textContent = gift.text;
  if (whatsapp) whatsapp.href = getWhatsAppUrl();

  fillList('parents-groom', parents.groom);
  fillList('parents-bride', parents.bride);
  fillList('godparents', godparents);
}

function init() {
  populateInfo();
  initCopyClabe();
  initCountdown();
  initMenu();
  initLightbox();
  initCalendar();
  initMotion();
  initLife();
  initMusic();
}

document.addEventListener('DOMContentLoaded', init);
