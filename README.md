# Hande Eren Gayrimenkul Danışmanlığı — Web Sitesi

Bu klasör, doğrudan yayına alınabilecek, tamamen hazır bir gayrimenkul danışmanlığı
web sitesi içerir. Sade HTML/CSS/JS ile yazıldı; React, Node.js gibi bir altyapıya
veya kuruluma ihtiyaç duymaz. Herhangi bir ücretsiz statik site barındırma
hizmetine doğrudan yüklenebilir.

## İçindekiler

```
index.html                      → Anasayfa (arama/filtre + öne çıkan ilanlar)
ilanlar.html                    → Tüm ilanlar + filtreleme
ilan-detay.html                  → Tek bir ilanın tüm bilgilerini gösteren sayfa
blog.html                        → Emlak Pusulası (blog) listesi
sss.html                          → Sıkça sorulan sorular
bana-mulk-bul.html                → Mülk arama talebi formu
hakkimda.html                     → Hande Eren hakkında sayfası
ekibimiz.html                     → Danışman/ekip sayfası
iletisim.html                    → İletişim formu + harita
ilan-ekle.html                    → Tek seferlik manuel ilan ekleme aracı
yonetim-giris.html                → Özel panel giriş ekranı (Firebase)
yonetim-panel.html                → Özel panel: ilan listesi + ekleme/düzenleme
css/styles.css                    → Tüm görsel tasarım
js/data.js                        → Firma bilgisi, ilanlar ve ekip verisi
js/firebase-config.js              → Özel panel bağlantı ayarları (boş = panel pasif)
js/il-ilce-data.js                  → Türkiye İl/İlçe verisi (panelin cascading dropdown'u için)
js/main.js                          → Site mantığı — dokunmanıza gerek yok
FIREBASE-PANEL-KURULUMU.md          → Özel panel adım adım kurulum kılavuzu
GOOGLE-TABLO-KURULUMU.md            → Google Form alternatifi adım adım kurulum kılavuzu
```

## Firma bilgileri

Firma adı, telefon, e-posta, adres ve ilan bilgileri `js/data.js` dosyasında
tutulur. Bu dosyada kod bilgisi gerekmez; güncelleme yapmak isterseniz sadece
tırnak içindeki metinleri değiştirmeniz yeterlidir. Marka adını değiştirirseniz,
her sayfanın header/footer kısmındaki "HE" harflerini (logo işareti) de elle
güncellemeniz gerekir.

## Bilgisayarınızda önizleme

`index.html` dosyasına çift tıklayıp tarayıcıda açmanız yeterli. Tüm sayfalar
ve filtreleme tarayıcıda çalışır, sunucuya ihtiyaç yoktur.

## Ücretsiz olarak yayına alma

Barındırma (hosting) için aşağıdaki servislerin tamamı ücretsizdir ve bu tür
statik siteler için tasarlanmıştır:

- **Netlify** (netlify.com) — Bu klasörü "Deploy manually" alanına sürükleyip
  bırakmanız yeterli, saniyeler içinde bir adres alırsınız.
- **Cloudflare Pages** (pages.cloudflare.com) — Benzer şekilde klasörü
  yükleyerek yayına alabilirsiniz.
- **GitHub Pages** (pages.github.com) — Dosyaları bir GitHub deposuna
  yükleyip Pages özelliğini açmanız yeterli.

Bu üçü de barındırma için ücret almaz. Tek gerçek ve kaçınılmaz maliyet, kendi
alan adınızı (örneğin `handeeren.com`) bir alan adı sağlayıcısından satın
almaktır; bu hizmetler kendi adreslerini (örn. `siteniz.netlify.app`) ücretsiz
verir, isterseniz onunla da yayında kalabilirsiniz.
