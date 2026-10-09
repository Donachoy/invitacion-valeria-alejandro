export const weddingConfig = {
  couple: {
    groom: 'Alejandro',
    bride: 'Valeria',
    monogram: 'V&A',
  },
  headline: '¡Nos casamos!',
  dateDisplay: '20 · 02 · 27',
  dateISO: '2027-02-20T16:00:00-06:00',
  dateLabel: 'Sábado 20 de febrero de 2027',
  timeLabel: '4:00 P.M.',
  venue: {
    name: 'Terraza La Pradera',
    address: 'Camino Antiguo a Tequila 1101, Jal.',
    mapsUrl: 'https://maps.app.goo.gl/jPJVQigDQn43yYXi7',
  },
  parents: {
    groom: ['Alejo Álvarez Álvarez', 'Angelina Castro Álvarez'],
    bride: ['Roberto Ayala Cabrera', 'Sulema Chávez Avelar'],
  },
  godparents: ['Luis Javier Fernández Mercado', 'Luisa Cazares Paz'],
  clabe: {
    raw: '012180015749298393',
    formatted: '012 180 01574929839 3',
  },
  whatsapp: {
    phone: '523334608535',
    message: 'Confirmo mi asistencia a la boda de Valeria y Alejandro',
  },
  gift: {
    text: 'Su presencia es nuestro mejor regalo. Si desean obsequiarnos algo, pueden hacerlo mediante transferencia:',
  },
  gallery: [
    '/assets/gallery/boda1.jpeg',
    '/assets/gallery/boda2.jpeg',
    '/assets/gallery/boda3.jpeg',
    '/assets/gallery/boda4.jpeg',
    '/assets/gallery/boda5.jpeg',
    '/assets/gallery/boda6.jpeg',
    '/assets/gallery/boda7.jpeg',
    '/assets/gallery/boda8.jpeg',
    '/assets/gallery/boda9.jpeg',
    '/assets/gallery/boda10.jpeg',
  ],
  og: {
    title: 'Valeria & Alejandro — Nos casamos',
    description: 'Te invitamos a celebrar nuestra boda el 20 de febrero de 2027.',
    image: '/assets/gallery/boda1.jpeg',
  },
  music: {
    src: '/assets/audio/a-thousand-years.mp3',
    title: 'A Thousand Years (Originally Performed by Christina Perri)',
    volume: 0.4,
  },
};

export function getWhatsAppUrl() {
  const { phone, message } = weddingConfig.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getMapsUrl() {
  const { mapsUrl, address } = weddingConfig.venue;
  if (mapsUrl) return mapsUrl;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
