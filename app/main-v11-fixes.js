// Temporary compatibility shim for the v1.1 UI coordinator.
// Keep this small and fold it into main-v11.js when that coordinator is next rewritten.

const STORAGE_KEY = 'nwsFinancialSkills.v2';

function savedState(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
  catch { return null; }
}

function install(){
  if(!globalThis.app){
    setTimeout(install,0);
    return;
  }

  const originalStartWeek = app.startWeek.bind(app);
  app.startWeek = function(){
    const current=savedState();
    if(current?.transferMode && app.toggleTransfer) app.toggleTransfer();
    return originalStartWeek();
  };

  const originalSaveSetup = app.saveSetup.bind(app);
  app.saveSetup = function(){
    const current=savedState();
    if(current?.transferMode && app.toggleTransfer) app.toggleTransfer();
    return originalSaveSetup();
  };

  const originalReviewEvent = app.reviewEvent.bind(app);
  app.reviewEvent = function(id,skill='weekly'){
    const correctedSkill=String(id).startsWith('period-') ? 'weekly' : skill;
    return originalReviewEvent(id,correctedSkill);
  };
}

install();
