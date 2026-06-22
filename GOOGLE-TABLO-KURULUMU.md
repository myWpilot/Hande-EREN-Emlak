# Google Form + E-Tablo Kurulumu (İlan Yönetimi)

Bu kurulum tamamlandığında, danışman yeni bir ilan eklemek için bir Google
Form doldurur; site otomatik olarak bu veriyi gösterir. Kod yazmaya veya
siteyi yeniden yüklemeye (deploy) gerek kalmaz.

Nasıl çalışır: Form → cevaplar otomatik bir E-Tabloya satır olarak düşer →
o tablo "web'de yayınla" ile herkese açık bir .csv bağlantısı olarak
yayınlanır → site bu bağlantıyı okuyup ilan kartlarını oluşturur.

## Adım 1 — Google Form oluşturun

forms.google.com adresinde yeni bir form açın, aşağıdaki soruları **tam
olarak bu sırayla ve bu metinlerle** ekleyin (büyük/küçük harf ve Türkçe
karakterler dahil — site bu başlıkları arıyor):

1. **İlan No** — Kısa yanıt
2. **İlan Başlığı** — Kısa yanıt
3. **İlan Başlığı (İngilizce)** — Kısa yanıt (isteğe bağlı)
4. **İlçe** — Kısa yanıt
5. **Semt** — Kısa yanıt (isteğe bağlı)
6. **Kategori** — Çoğul seçim: Konut / Ticari / Arsa
7. **Tür** — Çoğul seçim: Daire / Villa / Ofis / Dükkan / Arsa
8. **İşlem** — Çoğul seçim: Satılık / Kiralık
9. **Tapu Durumu** — Çoğul seçim: Kat Mülkiyetli / Kat İrtifaklı / Müstakil Tapu / Arsa Tapulu / Hisseli Tapu / Tapu Kaydı Yok
10. **Fiyat (TL)** — Kısa yanıt
11. **İndirimli Fiyat (TL)** — Kısa yanıt (isteğe bağlı, indirim yoksa boş bırakılır)
12. **Brüt m2** — Kısa yanıt
13. **Net m2** — Kısa yanıt
14. **Oda Sayısı** — Açılır liste: 1+0 (Stüdyo), 1+1, 2+1, 2+2, 3+1, 3+2, 4+1, 4+2, 5+1, 5+2, Dubleks, Triplex, Villa, Diğer
15. **Bina Yaşı** — Kısa yanıt (isteğe bağlı, 0 = sıfır bina)
16. **Bulunduğu Kat** — Kısa yanıt (isteğe bağlı)
17. **Toplam Kat** — Kısa yanıt (isteğe bağlı)
18. **Durum** — Çoğul seçim: Aktif / Satıldı / Kiralandı
19. **Öne Çıkarılsın mı** — Çoğul seçim: Evet / Hayır
20. **Açıklama** — Paragraf
21. **Açıklama (İngilizce)** — Paragraf (isteğe bağlı)
22. **Fotoğraflar** — Dosya Yükleme (birden fazla dosyaya izin verin; kabul edilen türler: jpg, jpeg, png, gif, bmp, tiff, webp, heif)

İpucu: "Fiyat", "m2", "Kat" gibi sayısal sorularda yanıt doğrulamasını
(response validation) sayı olarak ayarlarsanız, danışmanın yanlışlıkla
harf yazması önlenir.

## Adım 2 — Formu bir E-Tabloya bağlayın

Formun "Yanıtlar" (Responses) sekmesinde sağ üstteki yeşil E-Tablo
simgesine tıklayın, "Yeni e-tablo oluştur" seçeneğini onaylayın. Form
her doldurulduğunda bu tabloya otomatik bir satır eklenecek.

## Adım 3 — Tabloyu yayınlayın

Oluşan E-Tabloda: **Dosya → Paylaş → Web'de Yayınla**. Açılan pencerede
sayfa olarak formun bağlı olduğu sayfayı, biçim olarak **.csv** seçin ve
"Yayınla"ya tıklayın. Size verilen bağlantıyı kopyalayın (şuna benzer:
`https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv`).

## Adım 4 — Bağlantıyı siteye tanıtın

`js/data.js` dosyasını açın, en üstteki `BRAND` içinde şu satırı bulun:

```
listingsSheetUrl: ""
```

Tırnak içine Adım 3'te kopyaladığınız bağlantıyı yapıştırın, dosyayı
kaydedin ve siteyi yeniden yükleyin (deploy). Bundan sonra danışman
formu her doldurduğunda site otomatik güncellenir — sizin hiçbir şey
yapmanıza gerek kalmaz.

## Fotoğraflar hakkında önemli not

Form'daki dosya yükleme sorusu, fotoğrafları danışmanın Google Drive'ına
kaydeder. Bu fotoğrafların sitede görünmesi için Drive'daki paylaşım
izninin **"Bağlantıya sahip olan herkes görüntüleyebilir"** olması
gerekir. Formun oluşturduğu Drive klasörünü (Form ayarlarından
bulabilirsiniz) açıp paylaşım ayarını bu şekilde güncelleyin. Bu, tek
seferlik bir ayardır.

## Test etme

Değişiklikten sonra siteyi açtığınızda hâlâ örnek ilanları (Boğaz
manzaralı villa, vb.) görüyorsanız, tablo henüz okunamıyor demektir —
genelde bağlantının yanlış kopyalanmış olmasından kaynaklanır. Tarayıcı
adres çubuğuna doğrudan o .csv bağlantısını yapıştırıp açtığınızda
düz metin halinde tablo verisini görmelisiniz; görmüyorsanız Adım 3'ü
tekrar edin.
