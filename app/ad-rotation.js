// NWS ad rotation — footer slot manager.
// Priority: direct-sold spots → AdSense → house ad.
// Quiet "Advertisement" label; footer only; never inside lessons/practice/simulations.
//
// To add a direct-sold spot, push to DIRECT_SPOTS:
//   { id:'chime-2026q4', html:'<a href="...">...</a>', weight:1, until:'2026-12-31' }
// Spots with an `until` date auto-expire. Weight controls rotation frequency.
// Set ADSENSE_ENABLED=true after Google approves the site AND youth-safety
// settings are configured (see docs/ADS.md). Until then the house ad shows.

export const ADSENSE_ENABLED = false;
export const ADSENSE_CLIENT = 'ca-pub-1942036847459762';

const DIRECT_SPOTS = [
  // Example (inactive until a buyer is signed):
  // { id:'example-bank', weight:1, until:'2026-12-31',
  //   html:'<span class="spot-tag">Local Bank</span><span>Free teen checking — <a href="https://example.com" target="_blank" rel="noopener sponsored">learn more →</a></span>' },
];

function activeSpots(){
  const now = new Date().toISOString().slice(0,10);
  return DIRECT_SPOTS.filter(s => !s.until || s.until >= now);
}

function pickSpot(spots){
  const total = spots.reduce((n,s)=>n+(s.weight||1),0);
  let r = Math.random()*total;
  for(const s of spots){
    r -= (s.weight||1);
    if(r<=0) return s;
  }
  return spots[0];
}

function houseAdHTML(){
  return `<div class="house-ad"><span class="house-ad-tag">NWS</span><span>NWS is free forever — no ads inside your lessons. <a href="https://trujoedigital.com" target="_blank" rel="noopener">More from TruJoe Digital →</a></span></div>`;
}

function adsenseHTML(){
  // Responsive AdSense unit; loads only when enabled.
  return `<ins class="adsbygoogle" style="display:block" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="NWS_FOOTER_SLOT_ID" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});<\/script>`;
}

export function renderAdSlot(){
  const slot = document.getElementById('nwsAdSlot');
  if(!slot) return;
  const spots = activeSpots();
  let inner;
  if(spots.length){
    const spot = pickSpot(spots);
    inner = `<div class="direct-ad" data-spot="${spot.id}">${spot.html}</div>`;
  } else if(ADSENSE_ENABLED){
    inner = adsenseHTML();
  } else {
    inner = houseAdHTML();
  }
  // Label only for paid ads (direct spots, AdSense). House ad gets its own quiet tag.
  const isPaid = spots.length > 0 || ADSENSE_ENABLED;
  const label = isPaid ? `<div class="ad-label" aria-hidden="true">Advertisement</div>` : `<div class="ad-label house-label" aria-hidden="true">From TruJoe Digital</div>`;
  slot.innerHTML = `${label}${inner}`;
}

// Auto-render on load.
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', renderAdSlot);
} else {
  renderAdSlot();
}
