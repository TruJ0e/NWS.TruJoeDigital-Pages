// Cache lineage: nws-static-v2.7-20260919 (Money Pacing v1) -> nws-static-v3.0-20260923 (pro-course redesign) -> nws-static-v3.1-20260924 (course structure v3: module pages, lesson player) -> nws-static-v3.2-20260924 (dark-green module/lesson cards) -> nws-static-v3.3-20260924 (scenario practice rework, minimal module cards, outline closed on load, deeper question banks) -> nws-static-v3.4-20260926 (resume banner restores the stored lesson step) -> nws-static-v3.5-20260926 (resume position persistent in localStorage, survives any navigation path) -> nws-static-v3.6-20260926 (banner also resumes completed lessons at the end-of-lesson review) -> nws-static-v3.7-20260927 (variant engine: seeded question variants, misconception-driven feedback, skill evidence) -> nws-static-v3.8-20260927 (content depth: 7 lessons converted to generator variants, 3 new lessons: sales-tax, credit-cards, savings-apy). -> nws-static-v3.9-20260927 (content depth: 7 more lessons converted, Simple Mode variants, per-skill gating, v2.9 checks). -> nws-static-v3.10-20260927 (fix release: single resume surface, visited/completed semantics, 27 lessons terminology, Screen N of M, blocked-Next hints, 1-indexed URLs; SW cache bump so the fixes actually ship past the old cache). -> nws-static-v3.11-20260928 (professional rework: skill dots on module cards, tool steps on new modules, informational review with no hard gating, explicit tier labels, time estimates; SW cache bump so the new UI ships past the old cache) -> nws-static-v3.12-20260930 (course upgrades: instructor nav fix, adult-life practice depth (6 questions/topic + worked examples), module-structured practice hub, launchable Reviews, My Sim Bank simulation rebuild, TRSS-style TTS reader; SW cache bump so the upgrades ship past the old cache). -> nws-static-v3.13-20261001 (final touches: $ signs on life-simulation amounts and phone cost, distinct Adult-life practice titles, float-safe number fields in Pacing & Value, shorter Monthly stat label; SW cache bump so the fixes ship past the old cache).
const CACHE_NAME = 'nws-static-v3.13-20261001';
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
  './app/tts.js',
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
  './content/adult-life-variants.js',
  './content/adult-life-variants-1.js',
  './content/adult-life-variants-2.js',
  './content/adult-life-variants-3.js',
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
