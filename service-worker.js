// Cache lineage: nws-static-v2.7-20260919 (Money Pacing v1) -> nws-static-v3.0-20260923 (pro-course redesign) -> nws-static-v3.1-20260924 (course structure v3: module pages, lesson player).
const CACHE_NAME = 'nws-static-v3.1-20260924';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './course.css',
  './accessibility-v13.css',
  './manifest.webmanifest',
  './icon.svg',
  './fonts/inter-latin.woff2',
  './fonts/fraunces-latin.woff2',
  './app/my-numbers.js',
  './app/router.js',
  './app/main-v11.js',
  './app/main-v11-fixes.js',
  './app/course-ui.js',
  './content/lessons.js',
  './app/pwa.js',
  './app/pacing-value.js',
  './app/pacing-value-ui.js',
  './app/adult-life-ui.js',
  './app/adult-life-simulation.js',
  './app/adult-life-recovery.js',
  './app/adult-life-simulation-ui.js',
  './app/recovery-followup.js',
  './app/recovery-followup-ui.js',
  './app/benefits-ui.js',
  './app/evaluation-ui.js',
  './app/evaluation-export.js',
  './app/evaluation-provenance.js',
  './app/scenario-builder.js',
  './app/scenario-library.js',
  './app/advisor-dashboard.js',
  './app/advisor-dashboard-ui.js',
  './app/accessibility-runtime.js',
  './app/state.js',
  './app/money.js',
  './app/scenarios.js',
  './app/scaffolding.js',
  './app/mastery.js',
  './app/accessibility.js',
  './app/retrieval.js',
  './app/paycheck.js',
  './app/reporting.js',
  './content/curriculum.js',
  './content/research-basis.js',
  './content/sources.js',
  './content/adult-life.js',
  './content/adult-life-assessment.js',
  './content/recovery-followup.js',
  './content/benefits.js',
  './content/evaluation.js',
  './content/scenario-schema.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async cache => {
        await Promise.all(CORE_ASSETS.map(async url => {
          try {
            const res = await fetch(url, { cache: 'reload' });
            if (res.ok) await cache.put(url, res);
          } catch {}
        }));
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('nws-static-') && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirstNavigation(request){
  const cache = await caches.open(CACHE_NAME);
  try{
    const response = await fetch(request);
    if(response.ok) await cache.put('./index.html', response.clone());
    return response;
  }catch{
    return (await cache.match('./index.html')) || Response.error();
  }
}

async function cacheFirstAsset(request){
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if(cached) return cached;
  const response = await fetch(request);
  if(response.ok){
    await cache.put(request,response.clone());
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if(request.method !== 'GET') return;
  const url = new URL(request.url);
  if(url.origin !== self.location.origin) return;
  if(request.mode === 'navigate'){
    event.respondWith(networkFirstNavigation(request));
    return;
  }
  event.respondWith(cacheFirstAsset(request));
});
