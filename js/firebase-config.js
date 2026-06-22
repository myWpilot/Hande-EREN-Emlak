/* ===================================================================
   FIREBASE + CLOUDINARY BAĞLANTI AYARLARI
   Bu dosyayı, FIREBASE-PANEL-KURULUMU.md kılavuzundaki adımları
   tamamladıktan sonra kendi bilgilerinizle doldurun.

   Bu dosya boşken (apiKey "" ise) site eski yöntemlere döner:
   önce Google E-Tablosu (varsa), yoksa örnek ilanlar gösterilir.
   Doldurduğunuzda, hem yönetim paneli hem de herkese açık site
   buradan okumaya başlar.
   =================================================================== */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC_RYpquo2-_DEfKXGIwVyUVxWJrsnX-Os",
  authDomain: "fener-emlak.firebaseapp.com",
  projectId: "fener-emlak",
  storageBucket: "fener-emlak.firebasestorage.app",
  messagingSenderId: "708859280755",
  appId: "1:708859280755:web:5da457ec6c5c74574dd906"
};

/* Cloudinary — fotoğraf yükleme için. FIREBASE-PANEL-KURULUMU.md'deki
   "Cloudinary Kurulumu" bölümünde bu iki değeri nasıl alacağınız anlatılıyor. */
const CLOUDINARY_CONFIG = {
  cloudName: "dnplph2oj",
  uploadPreset: "fnme9eqw"
};

const FIREBASE_ENABLED = !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
