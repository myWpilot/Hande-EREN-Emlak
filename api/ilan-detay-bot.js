// api/ilan-detay-bot.js
// Sadece middleware.js tarafından bot isteklerinde çağrılır.
// URL'deki ?id= parametresine göre tek bir ilanı Firestore'dan çeker
// ve tam metinli, hazır bir HTML sayfası döndürür.

import { fetchListings, escapeHtml, formatTRY } from './_firestore.js';

export const config = { runtime: 'edge' };

export default async function handler(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  let listing = null;
  try {
    const listings = await fetchListings();
    listing = listings.find(function (l) {
      return String(l.id) === String(id);
    });
  } catch (e) {
    listing = null;
  }

  if (!listing) {
    return new Response(
      '<!doctype html><html lang="tr"><head><meta charset="UTF-8"><title>İlan bulunamadı</title></head>' +
        '<body><h1>İlan bulunamadı</h1><p>Bu ilan kaldırılmış olabilir.</p></body></html>',
      { status: 404, headers: { 'content-type': 'text/html; charset=utf-8' } }
    );
  }

  const specs =
    '<li>Oda: ' + escapeHtml(listing.rooms || '\u2014') + '</li>' +
    (listing.netArea ? '<li>Net Alan: ' + listing.netArea + ' m\u00b2</li>' : '') +
    (listing.grossArea ? '<li>Brüt Alan: ' + listing.grossArea + ' m\u00b2</li>' : '') +
    (listing.buildingAge !== null && listing.buildingAge !== undefined
      ? '<li>Bina Yaşı: ' + listing.buildingAge + '</li>'
      : '') +
    (listing.floor !== null && listing.floor !== undefined
      ? '<li>Bulunduğu Kat: ' + listing.floor + '</li>'
      : '') +
    (listing.totalFloors ? '<li>Toplam Kat: ' + listing.totalFloors + '</li>' : '') +
    (listing.tapuDurumu ? '<li>Tapu Durumu: ' + escapeHtml(listing.tapuDurumu) + '</li>' : '');

  const html =
    '<!doctype html><html lang="tr"><head><meta charset="UTF-8">' +
    '<title>' + escapeHtml(listing.title) + ' | Hande Eren Gayrimenkul Danışmanlığı</title>' +
    '<meta name="description" content="' + escapeHtml(String(listing.desc || '').slice(0, 155)) + '">' +
    '</head><body>' +
    '<h1>' + escapeHtml(listing.title) + '</h1>' +
    '<p>' + escapeHtml(listing.district) + (listing.neighborhood ? ' / ' + escapeHtml(listing.neighborhood) : '') + '</p>' +
    '<p><strong>' + formatTRY(listing.price) + '</strong></p>' +
    '<ul>' + specs + '</ul>' +
    '<p>' + escapeHtml(listing.desc || '') + '</p>' +
    '<p>İletişim: Hande Eren — 0532 628 08 98 — hande.eren@kww.com.tr</p>' +
    '</body></html>';

  return new Response(html, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 's-maxage=300, stale-while-revalidate=600',
    },
  });
}
