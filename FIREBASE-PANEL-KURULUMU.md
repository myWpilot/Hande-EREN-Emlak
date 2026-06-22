# Özel Yönetim Paneli Kurulumu (Firebase + Cloudinary)

Bu kurulum tamamlandığında Evren (veya ilgili danışman), `yonetim-giris.html`
adresinden e-posta/şifre ile giriş yapar, açılan panelde gerçek bir "Yeni
İlan Ekle" formu görür: İl seçince İlçe otomatik filtrelenir, fiyat
yazarken otomatik noktalanır, fotoğrafları sürükle-bırak ile yükler.
İlanlar otomatik olarak sitede görünür.

Tamamen ücretsizdir. İki servis kullanıyoruz: **Firebase** (Google —
giriş ve veritabanı için) ve **Cloudinary** (fotoğraf yükleme için).

Bu kurulumu **danışmanın kendi hesabında** yapın (bkz. ana konuşmadaki
"hesap kimin olmalı" açıklaması) — veri onun olsun istiyorsanız.

---

## Bölüm 1 — Firebase Projesi Oluşturma

1. [console.firebase.google.com](https://console.firebase.google.com) adresine, danışmanın Google hesabıyla giriş yapın.
2. **"Proje Ekle"** (Add project) → proje adını yazın (örn. `evren-emlak`) → ilerleyin → Google Analytics'i isterseniz kapatabilirsiniz (gerekli değil) → **"Proje Oluştur"**.

## Bölüm 2 — Giriş (Authentication) Açma

1. Sol menüden **Build → Authentication** → **"Get started"**.
2. **Sign-in method** sekmesinde **"E-posta/Şifre" (Email/Password)** sağlayıcısını etkinleştirin.
3. **"Users"** sekmesine geçin → **"Add user"** → danışmanın giriş yapacağı e-posta ve bir şifre belirleyin. Bu, panelde kullanılacak giriş bilgisi olacak.

## Bölüm 3 — Veritabanı (Firestore) Açma

1. Sol menüden **Build → Firestore Database** → **"Create database"**.
2. Konum olarak Avrupa'ya yakın bir bölge seçin (örn. `eur3` / Frankfurt), **"Production mode"** ile devam edin.
3. Veritabanı oluşunca, üstteki **"Rules"** sekmesine geçin ve içeriği şununla değiştirin:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /listings/{listingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Bu kural: **herkes ilanları okuyabilir** (site bunun için), ama **yalnızca
giriş yapmış kullanıcı ilan ekleyebilir/düzenleyebilir/silebilir**.
"Publish" ile kaydedin.

## Bölüm 4 — Web Uygulaması Kaydı ve Bağlantı Bilgileri

1. Proje ana sayfasında, sol üstteki dişli simgesi → **"Project settings"**.
2. Aşağı kaydırın, **"Your apps"** bölümünde **`</>`** (Web) simgesine tıklayın.
3. Bir takma ad girin (örn. "Kıyı Site"), **"Register app"**.
4. Karşınıza çıkan `firebaseConfig` nesnesindeki değerleri kopyalayın — şuna benzer:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "evren-emlak.firebaseapp.com",
  projectId: "evren-emlak",
  storageBucket: "evren-emlak.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

5. Bu değerleri `js/firebase-config.js` dosyasındaki `FIREBASE_CONFIG`
   nesnesine birebir yapıştırın.

## Bölüm 5 — Cloudinary Kurulumu (Fotoğraflar İçin)

1. [cloudinary.com](https://cloudinary.com) adresinde ücretsiz bir hesap açın.
2. Giriş yaptıktan sonra Dashboard'da üstte **"Cloud name"** yazısını göreceksiniz — bunu kopyalayın.
3. Sol menüden **Settings (dişli) → Upload** sekmesine gidin.
4. **"Upload presets"** bölümünde **"Add upload preset"**:
   - **Signing Mode**: **Unsigned** olarak ayarlayın (bu önemli — tarayıcıdan doğrudan yükleme için gerekli).
   - İsterseniz **"Folder"** alanına `ilanlar` yazarak fotoğrafları ayrı bir klasörde toplayabilirsiniz.
   - Kaydedin, oluşan preset adını (örn. `ilan_fotograflari`) kopyalayın.
5. `js/firebase-config.js` dosyasındaki `CLOUDINARY_CONFIG` nesnesine
   `cloudName` ve `uploadPreset` değerlerini yapıştırın.

## Bölüm 6 — Test Etme

1. Siteyi yeniden yükleyin (deploy).
2. `yonetim-giris.html` adresini açın, Bölüm 2'de oluşturduğunuz
   e-posta/şifre ile giriş yapın.
3. "+ Yeni İlan Ekle" ile bir test ilanı oluşturun, fotoğraf ekleyin, kaydedin.
4. Anasayfayı ve `ilanlar.html`'i açıp ilanın göründüğünü doğrulayın.

## Panelin adresi

`yonetim-giris.html` herkese açık menüde yer almaz. Bunu danışmanınıza
nasıl ulaştıracağınız konusunda (yer imi, ana ekran kısayolu vb.) ana
konuşmadaki açıklamaya bakabilirsiniz — aynı mantık burada da geçerli.

## Önemli not — eski yöntemler hâlâ çalışır

`js/firebase-config.js` dosyasını boş bırakırsanız, site otomatik olarak
eski davranışına döner: önce Google E-Tablosu (varsa), o da yoksa
`js/data.js` içindeki örnek ilanlar gösterilir. Yani bu kurulumu hemen
yapmak zorunda değilsiniz, istediğiniz zaman geçiş yapabilirsiniz.
