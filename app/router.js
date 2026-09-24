// NWS hash router — every lesson, tool, and hub gets a shareable, refresh-safe URL.
// Hash-based so it works on static hosting (GitHub Pages) and file:// with no server support.
// Screens are still shown through window.app.show(); the router only maps hashes <-> screens.
(function(){
  'use strict';
  const HUB_HASHES={course:'#/modules','practice-hub':'#/practice',reviews:'#/reviews',references:'#/references',simulations:'#/simulations'};
  const HASH_HUBS={'#/':'course','#':'course','#/modules':'course','#/practice':'practice-hub','#/reviews':'reviews','#/references':'references','#/simulations':'simulations'};
  const INSTRUCTOR=new Set(['advisor-dashboard','setup','scenarios','evidence','evaluation']);
  const HUB_IDS=new Set(['course','practice-hub','reviews','references','simulations']);
  let lessons=null, modules=null, openLesson=null, openModulePage=null, showScreen=null, handling=false, initialized=false;

  function lessonHash(lesson){ return '#/modules/'+lesson.moduleId+'/'+lesson.id; }
  function toolHash(screen){ return (INSTRUCTOR.has(screen)?'#/instructor/':'#/tool/')+screen; }
  function hubHash(screen){ return HUB_HASHES[screen]||'#/modules'; }

  function currentContext(){
    try{ return JSON.parse(sessionStorage.getItem('nwsCourseShell.context')||'null'); }
    catch{ return null; }
  }
  function currentLessonId(){ return currentContext()?.lessonId||null; }
  function activeScreen(){ return document.querySelector('main .screen.active')?.id||null; }

  function openLessonById(id,step){
    const lesson=lessons?.get(id);
    if(!lesson) return false;
    const ctx=currentContext();
    const stepIdx=step||0;
    if(ctx?.lessonId===id && (ctx?.stepIdx||0)===stepIdx && activeScreen()==='lesson-player') return true; // already there
    handling=true;
    try{ openLesson(id,stepIdx); }finally{ handling=false; }
    return true;
  }

  function openModulePageById(id){
    if(!id||!modules?.some(entry=>entry.id===id)) return false;
    if(activeScreen()==='module-page'&&currentContext()?.moduleId===id) return true; // already there
    handling=true;
    try{ openModulePage(id); }finally{ handling=false; }
    return true;
  }

  function showViaRouter(screen,restoreScroll){
    // Hubs can no-op when already active, but tool screens must always run:
    // the same screen id serves both lesson views and standalone tool views,
    // and only showScreen resets the lesson context.
    if(activeScreen()===screen && !restoreScroll && HUB_IDS.has(screen)) return;
    showScreen(screen,{restoreScroll:!!restoreScroll});
  }

  function route(){
    if(handling||!initialized) return;
    const rawHash=location.hash||'';
    const hash=rawHash||'#/modules';
    let m=hash.match(/^#\/modules\/([a-z0-9-]+)\/([a-z0-9-]+)(?:\/(\d+))?$/);
    if(m){ if(!openLessonById(m[2],m[3]?parseInt(m[3],10):0)) history.replaceState(null,'','#/modules'); return; }
    m=hash.match(/^#\/modules\/([a-z0-9-]+)$/);
    if(m){ if(!openModulePageById(m[1])) history.replaceState(null,'','#/modules'); return; }
    m=hash.match(/^#\/(?:tool|instructor)\/([a-z0-9-]+)$/);
    if(m){ showViaRouter(m[1],false); return; }
    const hub=HASH_HUBS[hash.split('?')[0]];
    if(hub){ if(!rawHash) history.replaceState(null,'','#/modules'); showViaRouter(hub,true); return; }
    history.replaceState(null,'','#/modules');
  }

  // Called by window.app.show() after every screen change: keeps the URL bar in sync
  // without pushing history entries (navigation pushes via location.hash assignment).
  function synced(screen){
    if(handling) return;
    const ctx=currentContext();
    let hash;
    if(HUB_IDS.has(screen)) hash=hubHash(screen);
    else if(screen==='module-page'){
      hash=(ctx&&ctx.moduleId)?'#/modules/'+ctx.moduleId:'#/modules';
    }
    else if(screen==='lesson-player'){
      const lesson=ctx&&ctx.lessonId&&lessons?.get(ctx.lessonId);
      hash=lesson?('#/modules/'+lesson.moduleId+'/'+lesson.id+(ctx.stepIdx>0?'/'+ctx.stepIdx:'')):'#/modules';
    }
    else{
      const lesson=ctx&&ctx.lessonId&&lessons?.get(ctx.lessonId);
      hash=(lesson&&lesson.screen===screen)?lessonHash(lesson):toolHash(screen);
    }
    if((location.hash||'#/modules')!==hash) history.replaceState(null,'',hash);
  }

  function navigate(hash){
    if((location.hash||'')===hash) route();
    else location.hash=hash;
  }

  function init(opts){
    lessons=opts.lessons; modules=opts.modules; openLesson=opts.openLesson; openModulePage=opts.openModulePage; showScreen=opts.showScreen;
    initialized=true;
    window.addEventListener('hashchange',route);
    route();
  }

  window.NWSRouter={init,route,navigate,lessonHash,toolHash,hubHash,synced,
    get HUB_IDS(){return HUB_IDS;}};
})();
