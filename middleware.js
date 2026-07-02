// middleware.js
// Sadece /ilanlar.html ve /ilan-detay.html isteklerine bakar.
// AI crawler botlarını (JS çalıştırmayanlar) tespit edip, onlar için
// önceden render edilmiş, tam metinli bir HTML sürümüne yönlendirir.
// İnsan ziyaretçiler için hiçbir şey değişmez — mevcut hızlı JS akışı
// aynen çalışmaya devam eder.

import { next, rewrite } from '@vercel/edge';

const BOT_PATTERNS = [
  'gptbot', 'oai-searchbot', 'chatgpt-user',
  'perplexitybot', 'perplexity-user',
  'claudebot', 'claude-web', 'anthropic-ai',
  'google-extended', 'applebot-extended',
  'ccbot', 'cohere-ai', 'bytespider',
  'facebookexternalhit', 'meta-externalagent'
];

function isAiBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some(function (pattern) {
    return ua.indexOf(pattern) !== -1;
  });
}

export const config = {
  matcher: ['/ilanlar.html', '/ilan-detay.html'],
};

export default function middleware(request) {
  const userAgent = request.headers.get('user-agent') || '';

  if (!isAiBot(userAgent)) {
    return next(); // insan ziyaretçi: dokunma
  }

  const url = new URL(request.url);

  if (url.pathname === '/ilanlar.html') {
    return rewrite(new URL('/api/ilanlar-bot' + url.search, request.url));
  }

  if (url.pathname === '/ilan-detay.html') {
    return rewrite(new URL('/api/ilan-detay-bot' + url.search, request.url));
  }

  return next();
}
