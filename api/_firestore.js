// api/_firestore.js
// Bu dosya kendisi bir API rotası DEĞİLDİR (adı "_" ile başlıyor,
// Vercel bu tür dosyaları fonksiyon olarak yayınlamaz). Diğer api/
// fonksiyonları tarafından import edilir.
//
// js/main.js içindeki loadListingsFromFirestore ile aynı mantığı
// sunucu tarafında (bot istekleri için) tekrar uygular.

const PROJECT_ID = 'fener-emlak'; // js/firebase-config.js ile aynı olmalı

function unwrapValue(v) {
  if (v === undefined || v === null) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return parseInt(v.integerValue, 10);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(unwrapValue);
  if ('mapValue' in v) return fieldsToObject(v.mapValue.fields || {});
  if ('timestampValue' in v) return v.timestampValue;
  return null;
}

function fieldsToObject(fields) {
  const obj = {};
  Object.keys(fields).forEach(function (key) {
    obj[key] = unwrapValue(fields[key]);
  });
  return obj;
}

export async function fetchListings() {
  const url =
    'https://firestore.googleapis.com/v1/projects/' + PROJECT_ID +
    '/databases/(default)/documents/listings?pageSize=300';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Firestore fetch failed: ' + res.status);
  const data = await res.json();
  if (!data.documents) return [];
  return data.documents
    .map(function (doc) {
      const obj = fieldsToObject(doc.fields || {});
      const parts = (doc.name || '').split('/');
      obj.id = parts[parts.length - 1];
      if (!obj.status) obj.status = 'aktif';
      if (!obj.hot) obj.hot = false;
      return obj;
    })
    .filter(function (l) {
      return l.title;
    });
}

export function escapeHtml(str) {
  return String(str === null || str === undefined ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatTRY(n) {
  if (n === null || n === undefined) return '';
  return Number(n).toLocaleString('tr-TR') + ' \u20BA';
}
