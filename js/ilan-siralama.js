/* ===================================================================
   İLAN SIRALAMA + TALEP GÖREN ROZETİ EKLENTİSİ
   Bu dosya js/main.js'ten SONRA yüklenir ve orada tanımlı 4 fonksiyonu
   (unwrapFirestoreValue, firestoreDocToListing, loadListingsFromFirestore,
   listingCardHTML) kendi güncellenmiş halleriyle değiştirir.
   main.js dosyasının kendisi hiç değiştirilmemiştir.

   Sıralama mantığı:
   - "Talep Gören" (hot) ilanlar her zaman en üstte.
   - Onun dışında sortOrder küçükten büyüğe sıralanır (daha negatif =
     daha yeni = daha üstte). Yönetim panelinde yeni eklenen her ilana
     otomatik olarak çok negatif bir sortOrder atanır, bu yüzden varsayılan
     olarak en yeni ilan en üstte, en eski en altta görünür.
   - Panelden sürükle-bırak ile sıra değiştirilirse, o yeni sıra kalıcı
     olarak kaydedilir ve site bunu yansıtır.
   =================================================================== */

/* ---------- Cloudinary görsel optimizasyonu ----------
   Yüklenen fotoğraflar telefon kamerasının orijinal çözünürlüğünde
   (ör. 4000x3000px) geliyor ama kartlarda çok küçük gösteriliyor.
   Bu fonksiyon, Cloudinary URL'sine "w_800,c_limit,q_auto,f_auto"
   dönüşümünü ekleyerek görseli indirme anında küçültüp optimize eder
   — yeniden yükleme gerekmez, mevcut fotoğraflar için de çalışır. */
function cloudinaryOptimize(url, width) {
  if (!url || url.indexOf('res.cloudinary.com') === -1) return url;
  var marker = '/upload/';
  var idx = url.indexOf(marker);
  if (idx === -1) return url;
  var insertAt = idx + marker.length;
  return url.slice(0, insertAt) + 'w_' + width + ',c_limit,q_auto,f_auto/' + url.slice(insertAt);
}

/* ---------- Firestore değer okuma: timestamp desteği eklendi ---------- */
function unwrapFirestoreValue(v){
  if(v === undefined || v === null) return null;
  if('stringValue' in v) return v.stringValue;
  if('integerValue' in v) return parseInt(v.integerValue, 10);
  if('doubleValue' in v) return v.doubleValue;
  if('booleanValue' in v) return v.booleanValue;
  if('nullValue' in v) return null;
  if('arrayValue' in v) return (v.arrayValue.values || []).map(unwrapFirestoreValue);
  if('mapValue' in v) return firestoreFieldsToObject(v.mapValue.fields || {});
  if('timestampValue' in v) return v.timestampValue;
  return null;
}

/* ---------- Firestore dokümanını ilana çevir: hot alanı eklendi ---------- */
function firestoreDocToListing(doc){
  const obj = firestoreFieldsToObject(doc.fields || {});
  const parts = (doc.name || '').split('/');
  obj.id = parts[parts.length - 1];
  if(!obj.art) obj.art = TYPE_TO_ART[obj.type] || 'apart';
  if(!obj.images) obj.images = [];
  if(!obj.status) obj.status = 'aktif';
  if(!obj.rooms) obj.rooms = '—';
  if(!obj.hot) obj.hot = false;
  return obj;
}

/* ---------- Sıralama yardımcıları ---------- */
function sortOrderOf(l){ return (typeof l.sortOrder === 'number') ? l.sortOrder : 0; }
function sortListingsByPriority(list){
  return list.slice().sort(function(a, b){
    const ah = a.hot ? 0 : 1, bh = b.hot ? 0 : 1;
    if (ah !== bh) return ah - bh;
    return sortOrderOf(a) - sortOrderOf(b);
  });
}

/* ---------- Firestore'dan ilan okuma: artık sıralanmış dönüyor ---------- */
async function loadListingsFromFirestore(){
  const url = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_CONFIG.projectId + '/databases/(default)/documents/listings?pageSize=300';
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error('Firestore fetch failed: ' + res.status);
  const data = await res.json();
  if(!data.documents || !data.documents.length) throw new Error('no documents in listings collection');
  const listings = data.documents.map(firestoreDocToListing).filter(function(l){ return l.title; });
  return sortListingsByPriority(listings);
}

/* ---------- İlan kartı: Talep Gören rozeti eklendi ---------- */
function listingCardHTML(l){
  const showStatusBadge = l.status && l.status !== 'aktif';
  const badge = showStatusBadge
    ? '<span class="listing-card__badge listing-card__badge--status">' + STATUS_LABEL[l.status] + '</span>'
    : '<span class="listing-card__badge' + (l.deal==='kiralik' ? ' listing-card__badge--rent' : '') + '">' + dealLabel(l.deal) + '</span>';

  const hotBadge = l.hot
    ? '<span class="listing-card__badge listing-card__badge--hot"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3-1 4.5-2.5 6C8 9.5 7 11 7 13.5A5 5 0 0012 18.5a5 5 0 005-5c0-1.8-1-3-2-4 .3 1.5-.3 2.5-1 3-.2-2-1-3-2-4.5C11.5 6.5 11.5 4 12 2z"/></svg>Talep Gören</span>'
    : '';

  const visual = (l.images && l.images.length)
    ? '<img src="' + cloudinaryOptimize(l.images[0], 800) + '" alt="' + l.title + '" loading="lazy" width="400" height="280" style="width:100%;height:100%;object-fit:cover;">'
    : (ART[l.art] || ART.apart);

  const area = l.netArea || l.grossArea;

  return (
    '<article class="listing-card reveal' + (showStatusBadge ? ' listing-card--inactive' : '') + '">' +
      '<a class="listing-card__art" href="ilan-detay.html?id=' + l.id + '">' +
        badge +
        hotBadge +
        visual +
      '</a>' +
      '<div class="listing-card__body">' +
        '<span class="listing-card__district">' + l.district + (l.neighborhood ? ' · ' + l.neighborhood : '') + '</span>' +
        '<h3 class="listing-card__title"><a href="ilan-detay.html?id=' + l.id + '">' + l.title + '</a></h3>' +
        '<div class="listing-card__specs">' +
          '<span>' + icon('bed') + ' ' + l.rooms + '</span>' +
          (area ? '<span>' + icon('area') + ' ' + area + ' m²</span>' : '') +
        '</div>' +
        '<div class="listing-card__footer">' +
          '<span class="listing-card__price">' + priceBlockHTML(l) + '</span>' +
          '<a class="btn btn--outline btn--sm" href="ilan-detay.html?id=' + l.id + '">İncele</a>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}
