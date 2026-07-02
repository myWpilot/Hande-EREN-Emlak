// api/ilanlar-bot.js
// Sadece middleware.js tarafından bot isteklerinde çağrılır.
// Firestore'daki güncel ilanları o an çeker ve tam metinli, hazır bir
// HTML sayfası döndürür — insan ziyaretçiler bu dosyayı hiç görmez.

import { fetchListings, escapeHtml, formatTRY } from './_firestore.js';

export const config = { runtime: 'edge' };

export default async function handler() {
  let listings = [];
  try {
    listings = await fetchListings();
  } catch (e) {
    listings = [];
  }

  listings.sort(function (a, b) {
    const ah = a.hot ? 0 : 1;
    const bh = b.hot ? 0 : 1;
    if (ah !== bh) return ah - bh;
    const as = typeof a.sortOrder === 'number' ? a.sortOrder : 0;
    const bs = typeof b.sortOrder === 'number' ? b.sortOrder : 0;
    return as - bs;
  });

  const items = listings
    .map(function (l) {
      return (
        '<article>' +
        '<h2><a href="/ilan-detay.html?id=' + encodeURIComponent(l.id) + '">' + escapeHtml(l.title) + '</a></h2>' +
        '<p>' + escapeHtml(l.district) + (l.neighborhood ? ' / ' + escapeHtml(l.neighborhood) : '') + '</p>' +
        '<p>' + formatTRY(l.price) + ' &middot; ' + escapeHtml(l.rooms || '') +
          (l.netArea ? ' &middot; ' + l.netArea + ' m\u00b2' : '') + '</p>' +
        '<p>' + escapeHtml(l.desc || '') + '</p>' +
        '</article>'
      );
    })
    .join('\n');

  const html =
    '<!doctype html><html lang="tr"><head><meta charset="UTF-8">' +
    '<title>İlanlar | Hande Eren Gayrimenkul Danışmanlığı</title>' +
    '<meta name="description" content="Hande Eren\u2019in İstanbul genelindeki satılık ve kiralık daire, villa, ofis ve arsa ilanları.">' +
    '</head><body>' +
    '<h1>Satılık ve Kiralık İlanlar — Hande Eren Gayrimenkul Danışmanlığı</h1>' +
    (items || '<p>Şu anda listelenecek ilan bulunamadı.</p>') +
    '</body></html>';

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 's-maxage=300, stale-while-revalidate=600',
    },
  });
}
