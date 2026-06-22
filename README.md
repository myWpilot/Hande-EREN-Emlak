# Kıyı Gayrimenkul — Web Sitesi

Bu klasör, doğrudan yayına alınabilecek, tamamen hazır bir gayrimenkul danışmanlığı
web sitesi içerir. Sade HTML/CSS/JS ile yazıldı; React, Node.js gibi bir altyapıya
veya kuruluma ihtiyaç duymaz. Herhangi bir ücretsiz statik site barındırma
hizmetine doğrudan yüklenebilir.

## İçindekiler

```
index.html                      → Anasayfa (arama/filtre + öne çıkan ilanlar)
ilanlar.html                    → Tüm ilanlar + filtreleme
ilan-detay.html                  → Tek bir ilanın tüm bilgilerini gösteren sayfa
ekibimiz.html                    → Danışman/ekip sayfası
iletisim.html                    → İletişim formu + harita
ilan-ekle.html                    → Tek seferlik manuel ilan ekleme aracı
yonetim-giris.html                → Özel panel giriş ekranı (Firebase)
yonetim-panel.html                → Özel panel: ilan listesi + ekleme/düzenleme
css/styles.css                    → Tüm görsel tasarım
js/data.js                        → DÜZENLEMENİZ GEREKEN tek dosya: firma bilgisi, ilanlar, ekip
js/firebase-config.js              → Özel panel bağlantı ayarları (boş = panel pasif)
js/il-ilce-data.js                  → Türkiye İl/İlçe verisi (panelin cascading dropdown'u için)
js/main.js                          → Site mantığı — dokunmanıza gerek yok
FIREBASE-PANEL-KURULUMU.md          → Özel panel adım adım kurulum kılavuzu
GOOGLE-TABLO-KURULUMU.md            → Google Form alternatifi adım adım kurulum kılavuzu
```

## Önemli: Bu içerik örnektir

Firma adı ("Kıyı Gayrimenkul Danışmanlığı"), telefon, e-posta, adres, ilanlar ve
danışman bilgileri **gerçek değildir** — siz bilgi vermediğiniz için örnek olarak
oluşturuldu. Sayfaların üst kısmındaki sarı bant bunu hatırlatır. Yayına almadan
önce mutlaka `js/data.js` dosyasını kendi bilgilerinizle güncelleyin. Bu dosyada
kod bilgisi gerekmez; sadece tırnak içindeki metinleri değiştirmeniz yeterli.
Marka adını değiştirirseniz, her sayfanın header/footer kısmındaki "K" harfini
(logo işareti) de elle güncellemeniz gerekir.

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
alan adınızı (örneğin `kiyigayrimenkul.com.tr`) bir alan adı sağlayıcısından
satın almaktır; bu hizmetler kendi adreslerini (örn. `siteniz.netlify.app`)
ücretsiz verir, isterseniz onunla da yayında kalabilirsiniz.

## İletişim formunu gerçekten çalışır hale getirme

Şu anda `iletisim.html` formu, gönderildiğinde sadece tarayıcıda bir onay mesajı
gösterir; **e-posta göndermez**. Bu, statik bir sitenin kendi başına e-posta
gönderememesinden kaynaklanır. Ücretsiz çözüm için:

1. **Formspree** (formspree.io) veya **Web3Forms** (web3forms.com) üzerinde
   ücretsiz bir hesap açın ve size verilen formu alıp e-posta adresinizi
   doğrulayın.
2. `iletisim.html` içinde `<form id="contact-form" ...>` etiketine
   `action="https://size-verilen-adres"` ve `method="POST"` ekleyin.
3. `js/main.js` içindeki `initContactPage` fonksiyonunda `e.preventDefault();`
   satırını kaldırmanız ya da formu doğrudan o servise göndermeniz gerekir —
   bu adımda takılırsanız bu konuşmaya dönüp "formu Formspree'ye bağla"
   diyebilirsiniz, birlikte tamamlarız.

Alternatif olarak Netlify'da barındırırsanız, "Netlify Forms" özelliği ek kod
yazmadan formu otomatik olarak yakalar.

## İlanları güncelleme — üç yöntem

**Yöntem A — Özel Yönetim Paneli (önerilen, en profesyonel):** Gerçek bir
giriş ekranı, İl→İlçe otomatik filtreleme, fiyat formatlama ve fotoğraf
sürükle-bırak yükleme içeren tam bir panel. Kurulum için
`FIREBASE-PANEL-KURULUMU.md` dosyasındaki adımları izleyin. Tamamen
ücretsiz (Firebase + Cloudinary), bir kerelik kurulum gerektirir.
Panel adresi: `yonetim-giris.html` (herkese açık menüde yer almaz).

**Yöntem B — Google Form (kod gerektirmez ama daha sade):**
`GOOGLE-TABLO-KURULUMU.md` dosyasındaki adımları izleyin. Cascading
İl/İlçe veya fiyat formatlama gibi gelişmiş özellikler yoktur, ama
kurulumu daha hızlıdır.

**Yöntem C — Tek seferlik manuel ekleme:** `ilan-ekle.html` sayfasını açın,
formu doldurun, oluşan kodu `js/data.js` içindeki `LISTINGS` dizisine
yapıştırın.

Hiçbiri kurulmadıysa site otomatik olarak `js/data.js` içindeki örnek
ilanları gösterir — yani aceleniz yok, istediğiniz yöntemi istediğiniz
zaman kurabilirsiniz.

Ekip üyesi eklemek için `js/data.js` içindeki `TEAM` dizisine mevcut bir
kaydı kopyalayıp bilgilerini değiştirmeniz yeterlidir.

## Harita

`iletisim.html` sayfasındaki harita, `js/data.js` içindeki `BRAND.mapQuery`
değerine göre otomatik yüklenir. Gerçek ofis adresinizi yazmanız yeterlidir
(örn. `"Bağdat Caddesi No:1, Kadıköy, İstanbul"`).

## KVKK / çerez hatırlatması

Site, iletişim formu üzerinden ad, e-posta, telefon gibi kişisel veri topluyor.
Türkiye'de yayına alınan sitelerde KVKK kapsamında bir Aydınlatma Metni ve
gerekiyorsa çerez bildirimi bulunması beklenir. Bu site şu an bu metinleri
içermiyor; gerçek yayın öncesi bir KVKK metni eklemek isterseniz bu konuşmaya
dönüp isteyebilirsiniz.

## Sonraki adım önerileri

- Çoklu dil desteği (TR/EN) — başlık ve açıklama alanları zaten İngilizce
  destekliyor, kalan adım menü/buton metinlerinin de çevrilmesi.
- SEO temelleri: sitemap.xml, robots.txt, Google Arama Konsolu kaydı.
- Tek danışmanlı (solo) kullanım için "Ekibimiz" sayfasının "Hakkımda"
  şeklinde sadeleştirilmesi (birden fazla danışmanınız yoksa).
