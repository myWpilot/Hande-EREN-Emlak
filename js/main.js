/* ===================================================================
   HANDE EREN GAYRİMENKUL DANIŞMANLIĞI — paylaşılan davranışlar
   Bu dosyayı düzenlemenize gerek yok; içerik için js/data.js dosyasını
   güncelleyin.
   =================================================================== */

/* ---------- ikon seti (basit, tek renkli çizgi ikonlar) ---------- */
const ICON_PATHS = {
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  pin: '<path d="M12 21s7-7.6 7-12.2A7 7 0 0 0 5 8.8C5 13.4 12 21 12 21z"/><circle cx="12" cy="9" r="2.4"/>',
  phone: '<path d="M6.6 10.8a16 16 0 0 0 6.6 6.6l2.2-2.2a1.6 1.6 0 0 1 1.6-.4 11 11 0 0 0 3.4.6 1.6 1.6 0 0 1 1.6 1.6V20a1.6 1.6 0 0 1-1.6 1.6A17.6 17.6 0 0 1 2.4 4 1.6 1.6 0 0 1 4 2.4h3.2A1.6 1.6 0 0 1 8.8 4a11 11 0 0 0 .6 3.4 1.6 1.6 0 0 1-.4 1.6z"/>',
  mail: '<path d="M3.5 6.5h17v11h-17z"/><path d="M3.5 6.5l8.5 7 8.5-7"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<path d="M4 12.5l5 5L20 7"/>',
  bed: '<path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 14h18"/><path d="M3 18v2M21 18v2"/>',
  area: '<path d="M9 3H3v6M15 21h6v-6M21 3h-6M3 21h6"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.2 13 13l-3.8 1.8L11 11l3.8-1.8z"/>',
  handshake: '<path d="M2.5 12.5 6 9l3 2.2L13 7l4.5 4.5L21.5 8"/><path d="M9 11.2 12 14l3-3"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2.2 2.2L15 10"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
  fileText: '<path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>'
};
function icon(name, cls){
  return '<svg class="' + (cls||'') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON_PATHS[name]||'') + '</svg>';
}

/* ---------- mülk çizimleri (gerçek fotoğraf yoksa kullanılır) ---------- */
const ART = {
  apart: '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="58" y="18" width="84" height="92" fill="rgba(255,255,255,0.14)"/>' + winGrid(70,32,3,3,18,16) + '</svg>',
  villa: '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><polygon points="38,56 100,16 162,56" fill="rgba(255,255,255,0.28)"/><rect x="46" y="56" width="108" height="54" fill="rgba(255,255,255,0.15)"/><rect x="90" y="76" width="22" height="34" fill="rgba(255,255,255,0.5)"/><rect x="58" y="68" width="16" height="16" fill="rgba(255,255,255,0.45)"/><rect x="126" y="68" width="16" height="16" fill="rgba(255,255,255,0.45)"/></svg>',
  office: '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="44" y="8" width="48" height="102" fill="rgba(255,255,255,0.16)"/><rect x="104" y="34" width="52" height="76" fill="rgba(255,255,255,0.12)"/>' + winGrid(50,16,2,5,14,12) + winGrid(110,42,2,4,16,12) + '</svg>',
  land: '<svg viewBox="0 0 200 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><line x1="22" y1="92" x2="178" y2="92" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><rect x="38" y="68" width="4" height="24" fill="rgba(255,255,255,0.4)"/><rect x="74" y="68" width="4" height="24" fill="rgba(255,255,255,0.4)"/><rect x="110" y="68" width="4" height="24" fill="rgba(255,255,255,0.4)"/><rect x="146" y="68" width="4" height="24" fill="rgba(255,255,255,0.4)"/><line x1="38" y1="76" x2="148" y2="76" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><line x1="100" y1="70" x2="100" y2="48" stroke="rgba(255,255,255,0.55)" stroke-width="2"/><circle cx="100" cy="42" r="11" fill="rgba(255,255,255,0.4)"/></svg>'
};
function winGrid(x,y,cols,rows,size,gap){
  let out='';
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const opacity = (r+c)%4===0 ? 0.3 : 0.55;
      out += '<rect x="'+(x+c*(size+gap))+'" y="'+(y+r*(size+gap))+'" width="'+size+'" height="'+size+'" fill="rgba(255,255,255,'+opacity+')"/>';
    }
  }
  return out;
}

const TYPE_TO_ART = {Daire:'apart', Villa:'villa', Ofis:'office', Dükkan:'office', Arsa:'land'};
const STATUS_LABEL = {aktif:'Aktif', satildi:'Satıldı', kiralandi:'Kiralandı'};

/* ---------- yardımcılar ---------- */
function formatTRY(n){ return Math.round(n).toLocaleString('tr-TR') + ' ₺'; }
function dealLabel(deal){ return deal === 'kiralik' ? 'Kiralık' : 'Satılık'; }
function priceBlockHTML(l){
  var unit = l.deal === 'kiralik' ? ' <small>/ ay</small>' : '';
  if(l.discountedPrice && l.discountedPrice < l.price){
    return '<span class="price-original">' + formatTRY(l.price) + '</span> ' +
           '<span class="price-current">' + formatTRY(l.discountedPrice) + unit + '</span>';
  }
  return '<span class="price-current">' + formatTRY(l.price) + unit + '</span>';
}

/* ---------- marka bilgisini sayfaya işle ---------- */
function initBrand(){
  document.querySelectorAll('[data-brand-text]').forEach(function(el){
    const key = el.getAttribute('data-brand-text');
    if(key === 'addressLines'){
      el.innerHTML = BRAND.addressLines.join('<br>');
    } else if (BRAND[key] !== undefined){
      el.textContent = BRAND[key];
    }
  });
  document.querySelectorAll('[data-brand-href]').forEach(function(el){
    const kind = el.getAttribute('data-brand-href');
    if(kind === 'tel') el.setAttribute('href','tel:+'+BRAND.whatsapp);
    if(kind === 'mail') el.setAttribute('href','mailto:'+BRAND.email);
    if(kind === 'whatsapp') el.setAttribute('href','https://wa.me/'+BRAND.whatsapp);
  });
  const mapFrame = document.getElementById('map-frame');
  if(mapFrame){
    mapFrame.src = 'https://www.google.com/maps?q=' + encodeURIComponent(BRAND.mapQuery) + '&output=embed';
  }
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ===================================================================
   GOOGLE E-TABLOSU ENTEGRASYONU
   BRAND.listingsSheetUrl boşsa js/data.js'teki örnek LISTINGS kullanılır.
   Doluysa, yayınlanan CSV okunur ve aşağıdaki başlıklarla eşleştirilir.
   Bu başlıkları Google Form sorularınızda BİREBİR kullanın.
   =================================================================== */
const FORM_QUESTIONS = {
  id: "İlan No",
  title: "İlan Başlığı",
  titleEn: "İlan Başlığı (İngilizce)",
  district: "İlçe",
  neighborhood: "Semt",
  category: "Kategori",
  type: "Tür",
  deal: "İşlem",
  tapuDurumu: "Tapu Durumu",
  price: "Fiyat (TL)",
  discountedPrice: "İndirimli Fiyat (TL)",
  grossArea: "Brüt m2",
  netArea: "Net m2",
  rooms: "Oda Sayısı",
  buildingAge: "Bina Yaşı",
  floor: "Bulunduğu Kat",
  totalFloors: "Toplam Kat",
  status: "Durum",
  featured: "Öne Çıkarılsın mı",
  desc: "Açıklama",
  descEn: "Açıklama (İngilizce)",
  images: "Fotoğraflar"
};

function foldTr(s){
  return String(s===undefined||s===null?'':s).trim().toLowerCase()
    .replace(/ı/g,'i').replace(/İ/g,'i')
    .replace(/ğ/g,'g').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c');
}
function normalizeHeader(h){ return foldTr(h).replace(/[^a-z0-9]/g,''); }

const HEADER_MAP = {};
Object.keys(FORM_QUESTIONS).forEach(function(key){
  HEADER_MAP[normalizeHeader(FORM_QUESTIONS[key])] = key;
});

function parseCSV(text){
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for(let i=0;i<text.length;i++){
    const c = text[i];
    if(inQuotes){
      if(c === '"'){ if(text[i+1] === '"'){ field += '"'; i++; } else { inQuotes = false; } }
      else { field += c; }
    } else {
      if(c === '"'){ inQuotes = true; }
      else if(c === ','){ row.push(field); field=''; }
      else if(c === '\r'){ /* skip */ }
      else if(c === '\n'){ row.push(field); rows.push(row); row=[]; field=''; }
      else { field += c; }
    }
  }
  if(field.length || row.length){ row.push(field); rows.push(row); }
  if(!rows.length) return [];
  const headers = rows[0];
  const out = [];
  for(let r=1;r<rows.length;r++){
    if(rows[r].length === 1 && rows[r][0].trim() === '') continue;
    const obj = {};
    for(let c=0;c<headers.length;c++){ obj[headers[c]] = rows[r][c] !== undefined ? rows[r][c] : ''; }
    out.push(obj);
  }
  return out;
}

function driveUrlToImageUrl(url){
  if(!url) return null;
  const m = String(url).match(/[-\w]{25,}/);
  if(m) return 'https://drive.google.com/uc?export=view&id=' + m[0];
  return /^https?:\/\//.test(url) ? url : null;
}

function num(v){
  if(v===undefined||v===null||v==='') return null;
  const n = parseFloat(String(v).replace(/[^0-9.\-]/g,''));
  return isNaN(n) ? null : n;
}
function boolEvet(v){
  const s = foldTr(v);
  return s === 'evet' || s === 'true' || s === '1' || s === 'yes';
}

function csvRowToListing(row, idx){
  const mapped = {};
  Object.keys(row).forEach(function(h){
    const key = HEADER_MAP[normalizeHeader(h)];
    if(key) mapped[key] = row[h];
  });
  if(!mapped.title) return null;

  const type = (mapped.type || 'Daire').trim();
  let images = [];
  if(mapped.images){
    images = String(mapped.images).split(/[,\n]/).map(function(s){ return driveUrlToImageUrl(s.trim()); }).filter(Boolean);
  }
  const dealFolded = foldTr(mapped.deal);
  const statusFolded = foldTr(mapped.status);

  return {
    id: num(mapped.id) || (1000 + idx),
    title: mapped.title.trim(),
    titleEn: (mapped.titleEn || '').trim(),
    district: (mapped.district || '').trim(),
    neighborhood: (mapped.neighborhood || '').trim(),
    category: (mapped.category || '').trim(),
    type: type,
    deal: dealFolded.indexOf('kira') === 0 ? 'kiralik' : 'satilik',
    tapuDurumu: (mapped.tapuDurumu || '').trim(),
    price: num(mapped.price) || 0,
    discountedPrice: num(mapped.discountedPrice),
    grossArea: num(mapped.grossArea),
    netArea: num(mapped.netArea),
    rooms: (mapped.rooms || '—').trim(),
    buildingAge: num(mapped.buildingAge),
    floor: num(mapped.floor),
    totalFloors: num(mapped.totalFloors),
    status: statusFolded.indexOf('satil') === 0 ? 'satildi' : (statusFolded.indexOf('kira') === 0 ? 'kiralandi' : 'aktif'),
    featured: boolEvet(mapped.featured),
    art: TYPE_TO_ART[type] || 'apart',
    images: images,
    desc: (mapped.desc || '').trim(),
    descEn: (mapped.descEn || '').trim()
  };
}

/* ---------- Firestore'dan ilan okuma (herkese açık site için) ----------
   Firebase yapılandırıldıysa (js/firebase-config.js), site Firestore
   REST API'sini doğrudan fetch ile okur — ağır Firebase SDK'sını
   herkese açık sayfalara eklememek için. Yazma işlemleri (ekleme/
   düzenleme/silme) yalnızca yonetim-panel.html'de, Firebase SDK ile
   ve giriş yapmış kullanıcı olarak yapılır. */
function unwrapFirestoreValue(v){
  if(v === undefined || v === null) return null;
  if('stringValue' in v) return v.stringValue;
  if('integerValue' in v) return parseInt(v.integerValue, 10);
  if('doubleValue' in v) return v.doubleValue;
  if('booleanValue' in v) return v.booleanValue;
  if('nullValue' in v) return null;
  if('arrayValue' in v) return (v.arrayValue.values || []).map(unwrapFirestoreValue);
  if('mapValue' in v) return firestoreFieldsToObject(v.mapValue.fields || {});
  return null;
}
function firestoreFieldsToObject(fields){
  const obj = {};
  Object.keys(fields || {}).forEach(function(k){ obj[k] = unwrapFirestoreValue(fields[k]); });
  return obj;
}
function firestoreDocToListing(doc){
  const obj = firestoreFieldsToObject(doc.fields || {});
  const parts = (doc.name || '').split('/');
  obj.id = parts[parts.length - 1];
  if(!obj.art) obj.art = TYPE_TO_ART[obj.type] || 'apart';
  if(!obj.images) obj.images = [];
  if(!obj.status) obj.status = 'aktif';
  if(!obj.rooms) obj.rooms = '—';
  return obj;
}
async function loadListingsFromFirestore(){
  const url = 'https://firestore.googleapis.com/v1/projects/' + FIREBASE_CONFIG.projectId + '/databases/(default)/documents/listings?pageSize=300';
  const res = await fetch(url, {cache:'no-store'});
  if(!res.ok) throw new Error('Firestore fetch failed: ' + res.status);
  const data = await res.json();
  if(!data.documents || !data.documents.length) throw new Error('no documents in listings collection');
  return data.documents.map(firestoreDocToListing).filter(function(l){ return l.title; });
}

let ACTIVE_LISTINGS = LISTINGS;

async function loadListings(){
  if(typeof FIREBASE_ENABLED !== 'undefined' && FIREBASE_ENABLED){
    try{
      return await loadListingsFromFirestore();
    }catch(e){
      console.warn('Firestore okunamadı, diğer kaynaklara geçiliyor:', e);
    }
  }
  if(!BRAND.listingsSheetUrl) return LISTINGS;
  try{
    const res = await fetch(BRAND.listingsSheetUrl, {cache:'no-store'});
    if(!res.ok) throw new Error('sheet fetch failed: ' + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    const mapped = rows.map(csvRowToListing).filter(Boolean);
    if(!mapped.length) throw new Error('no valid rows parsed from sheet');
    return mapped;
  }catch(e){
    console.warn('E-Tablo okunamadı, örnek ilanlar gösteriliyor:', e);
    return LISTINGS;
  }
}

/* ---------- kart şablonları ---------- */
function listingCardHTML(l){
  const showStatusBadge = l.status && l.status !== 'aktif';
  const badge = showStatusBadge
    ? '<span class="listing-card__badge listing-card__badge--status">' + STATUS_LABEL[l.status] + '</span>'
    : '<span class="listing-card__badge' + (l.deal==='kiralik' ? ' listing-card__badge--rent' : '') + '">' + dealLabel(l.deal) + '</span>';

  const visual = (l.images && l.images.length)
    ? '<img src="' + l.images[0] + '" alt="' + l.title + '" loading="lazy">'
    : (ART[l.art] || ART.apart);

  const area = l.netArea || l.grossArea;

  return (
    '<article class="listing-card reveal' + (showStatusBadge ? ' listing-card--inactive' : '') + '">' +
      '<a class="listing-card__art" href="ilan-detay.html?id=' + l.id + '">' +
        badge +
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

function teamCardHTML(m){
  const initials = m.name.split(' ').map(function(p){return p[0];}).join('');
  const avatar = m.photo
    ? '<img src="' + m.photo + '" alt="' + m.name + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">'
    : initials;
  return (
    '<article class="team-card reveal">' +
      '<div class="team-card__avatar">' + avatar + '</div>' +
      '<h3>' + m.name + '</h3>' +
      '<span class="team-card__role">' + m.role + '</span>' +
      '<p class="team-card__bio">' + m.bio + '</p>' +
      '<div class="team-card__contact">' +
        '<a href="tel:+90' + m.phoneDisplay.replace(/\D/g,'').slice(1) + '">' + icon('phone') + ' ' + m.phoneDisplay + '</a>' +
        '<a href="mailto:' + m.email + '">' + icon('mail') + ' ' + m.email + '</a>' +
      '</div>' +
    '</article>'
  );
}

/* ---------- mobil menü ---------- */
function initNav(){
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-nav');
  if(!toggle || !menu) return;
  toggle.addEventListener('click', function(){
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

/* ---------- görünür olunca belirme efekti ---------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  items.forEach(function(el){ obs.observe(el); });
}

/* ---------- ana sayfa: öne çıkan ilanlar ---------- */
function renderFeatured(){
  const el = document.getElementById('featured-listings');
  if(!el) return;
  let picks = ACTIVE_LISTINGS.filter(function(l){ return l.featured; });
  if(!picks.length) picks = ACTIVE_LISTINGS.filter(function(l){ return l.status === 'aktif'; });
  picks = picks.slice(0,3);
  el.innerHTML = picks.map(listingCardHTML).join('');
  initReveal();
}

/* ---------- ekibimiz sayfası ---------- */
function renderTeam(){
  const el = document.getElementById('team-grid');
  if(!el) return;
  el.innerHTML = TEAM.map(teamCardHTML).join('');
  initReveal();
}

/* ---------- ilanlar sayfası: filtreleme ---------- */
function initListingsPage(){
  const results = document.getElementById('listing-results');
  if(!results) return;
  const form = document.getElementById('filter-form');
  const countEl = document.getElementById('filter-result-count');

  function applyFilters(){
    const deal = form.deal.value;
    const type = form.type.value;
    const district = form.district.value;
    const maxPrice = form.maxPrice.value ? parseInt(form.maxPrice.value,10) : null;

    const filtered = ACTIVE_LISTINGS.filter(function(l){
      if(deal !== 'hepsi' && l.deal !== deal) return false;
      if(type !== 'hepsi' && l.type !== type) return false;
      if(district !== 'hepsi' && l.district !== district) return false;
      if(maxPrice && l.price > maxPrice) return false;
      return true;
    });

    countEl.textContent = filtered.length + ' ilan bulundu';
    results.innerHTML = filtered.length
      ? filtered.map(listingCardHTML).join('')
      : '<div class="empty-state"><h3>Bu kriterlere uygun ilan yok</h3><p>Filtreleri genişletip yeniden deneyin.</p></div>';
    initReveal();
  }

  form.addEventListener('change', applyFilters);
  form.addEventListener('submit', function(e){ e.preventDefault(); applyFilters(); });

  const params = new URLSearchParams(window.location.search);
  ['deal','type','district','maxPrice'].forEach(function(key){
    if(params.has(key) && form[key]) form[key].value = params.get(key);
  });

  applyFilters();
}

/* ---------- ilan detay sayfası ---------- */
function specRow(label, value){
  if(value === null || value === undefined || value === '' ) return '';
  return '<div class="spec-item"><span class="spec-item__label">' + label + '</span><span class="spec-item__value">' + value + '</span></div>';
}

function initListingDetailPage(){
  const root = document.getElementById('listing-detail');
  if(!root) return;
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get('id');
  const l = ACTIVE_LISTINGS.find(function(x){ return String(x.id) === String(idParam); });

  if(!l){
    root.innerHTML = '<div class="empty-state"><h3>İlan bulunamadı</h3><p>Bu ilan kaldırılmış veya bağlantı hatalı olabilir.</p>' +
      '<p style="margin-top:18px;"><a class="btn btn--outline" href="ilanlar.html">Tüm İlanlara Dön</a></p></div>';
    return;
  }

  document.title = l.title + ' | ' + BRAND.fullName;

  const gallery = (l.images && l.images.length) ? l.images : null;
  const mainVisual = gallery
    ? '<img id="gallery-main-img" src="' + gallery[0] + '" alt="' + l.title + '">'
    : '<div class="gallery-main gallery-main--art">' + (ART[l.art] || ART.apart) + '</div>';

  const thumbs = (gallery && gallery.length > 1)
    ? '<div class="gallery-thumbs">' + gallery.map(function(src, i){
        return '<button type="button" class="gallery-thumb' + (i===0?' is-active':'') + '" data-src="' + src + '"><img src="' + src + '" alt=""></button>';
      }).join('') + '</div>'
    : '';

  const statusBadge = l.status !== 'aktif'
    ? '<span class="listing-card__badge listing-card__badge--status">' + STATUS_LABEL[l.status] + '</span>'
    : '<span class="listing-card__badge' + (l.deal==='kiralik' ? ' listing-card__badge--rent' : '') + '">' + dealLabel(l.deal) + '</span>';

  const specs = [
    specRow('İl', l.province),
    specRow('Kategori', l.category),
    specRow('Tür', l.type),
    specRow('Tapu Durumu', l.tapuDurumu),
    specRow('Brüt m²', l.grossArea),
    specRow('Net m²', l.netArea),
    specRow('Oda Sayısı', l.rooms),
    specRow('Bina Yaşı', l.buildingAge === 0 ? 'Sıfır Bina' : l.buildingAge),
    specRow('Bulunduğu Kat', l.floor),
    specRow('Toplam Kat', l.totalFloors)
  ].join('');

  root.innerHTML =
    '<a class="back-link" href="ilanlar.html">' + icon('arrowLeft') + ' Tüm İlanlara Dön</a>' +
    '<div class="detail-grid">' +
      '<div>' +
        (gallery ? '<div class="gallery-main">' + mainVisual + '</div>' : mainVisual) +
        thumbs +
      '</div>' +
      '<div>' +
        statusBadge +
        '<h1 class="detail-title">' + l.title + '</h1>' +
        '<span class="listing-card__district">' + l.district + (l.neighborhood ? ' · ' + l.neighborhood : '') + '</span>' +
        '<div class="detail-price">' + priceBlockHTML(l) + '</div>' +
        '<div class="spec-grid">' + specs + '</div>' +
        '<p class="detail-desc">' + l.desc + '</p>' +
        (l.descEn ? '<p class="detail-desc detail-desc--en"><strong>EN —</strong> ' + l.descEn + '</p>' : '') +
        '<a class="btn btn--primary btn--block" href="iletisim.html?ilan=' + encodeURIComponent(l.title + ' (' + l.district + ')') + '">İletişime Geç</a>' +
      '</div>' +
    '</div>';

  document.querySelectorAll('.gallery-thumb').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.getElementById('gallery-main-img').src = btn.getAttribute('data-src');
      document.querySelectorAll('.gallery-thumb').forEach(function(b){ b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });
}

/* ---------- iletişim formu ---------- */
function initContactPage(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const success = document.getElementById('form-success');

  const params = new URLSearchParams(window.location.search);
  if(params.has('ilan')){
    form.message.value = 'İlgilendiğim ilan: "' + params.get('ilan') + '". Daha fazla bilgi almak istiyorum.';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    form.classList.add('is-hidden');
    success.classList.add('is-visible');
    success.setAttribute('tabindex','-1');
    success.focus();
  });
}

document.addEventListener('DOMContentLoaded', async function(){
  initBrand();
  initNav();
  ACTIVE_LISTINGS = await loadListings();
  renderFeatured();
  renderTeam();
  initListingsPage();
  initListingDetailPage();
  initContactPage();
  initReveal();
});
