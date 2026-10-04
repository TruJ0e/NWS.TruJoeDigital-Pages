// Cache lineage: nws-static-v2.7-20260919 -> nws-static-v3.8-20260927 -> nws-static-v3.18-20261004 -> nws-static-v3.19-20261004 (perf: resized PNGs, font preload) -> nws-static-v3.21-20261004 (accessibility: contrast fixes, dark-theme course cards, input labels, dialog table scope) -> nws-static-v3.24-20261004 (trust/GEO: og/twitter meta, Organization JSON-LD, home "What is NWS" about card + last-updated line, llms.txt refresh; cache-first SW bump so changed asset bytes ship) -> nws-static-v3.25-20261004 (conversion: outcome hero headline, progress-aware CTAs, module completion milestone, reviews keep-going nudge; cache-first SW bump so changed asset bytes ship) -> nws-static-v3.26-20261004 (engineering hardening: storage write/read guards, pacing input null-safety, state schema-version guard, dead CSS removal; cache-first SW bump so changed asset bytes ship) -> nws-static-v3.27-20261004 (adult-life no-repeat: per-learner served sets, persisted shuffled practice sequences, transfer/retention unfreeze, exact-dupe guard; cache-first SW bump so changed asset bytes ship). -> nws-static-v3.29-20261004 (scaffolding: 8-verb variation banks, 50/lesson, build/explain renderers, served-set draws; cache-first SW bump so changed asset bytes ship).
const CACHE_NAME = 'nws-static-v3.30-20261004';
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
  './app/variants.js',
  './app/ad-rotation.js',
  './app/simple-ui.js',
  './app/simple-tools.js',
  './app/simple-settings.js',
  './content/lessons.js',
  './content/adult-life-lesson-extra.js',
  './app/pwa.js',
  './app/pacing-value.js',
  './app/pacing-value-ui.js',
  './app/adult-life-ui.js',
  './app/adult-served.js',
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
  './content/adult-life-variants-4.js',
  './content/adult-life-variants-5.js',
  './content/adult-life-variants-gen.js',
  './content/adult-life-variants-gen2.js',
  './content/adult-life-variants-gen3.js',
  './content/adult-life-variants-gen4.js',
  './content/rwms-modules.js',
  './content/rwms-variants.js',
  './content/rwms-assessment.js',
  './app/lesson-banks.js',
  './content/banks/index.js',
  './content/banks/foundations.js',
  './content/banks/pacing.js',
  './content/banks/value.js',
  './content/banks/adult-money.js',
  './content/banks/living-costs.js',
  './content/banks/support.js',
  './content/simple-lessons.js',
  './content/recovery-followup.js',
  './content/benefits.js',
  './content/evaluation.js',
  './content/scenario-schema.js',
  './simple.html',
  './simple.css'
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
