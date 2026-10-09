import { weddingConfig } from '../config.js';

export function initCalendar() {
  const link = document.getElementById('calendar-link');
  if (!link) return;

  const { venue } = weddingConfig;
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Valeria y Alejandro//Boda//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:boda-alejandro-valeria-20270220@invitacion',
    'DTSTAMP:20261001T000000Z',
    'DTSTART:20270220T220000Z',
    'DTEND:20270221T040000Z',
    'SUMMARY:Boda de Valeria y Alejandro',
    `LOCATION:${venue.name}, ${venue.address}`,
    'DESCRIPTION:Ceremonia y recepción a partir de las 4:00 p.m.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const file = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  link.href = URL.createObjectURL(file);
  link.setAttribute('download', 'boda-valeria-alejandro.ics');
}
