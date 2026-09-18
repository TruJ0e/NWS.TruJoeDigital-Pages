function buttons(){ return [...document.querySelectorAll('.nav button[data-screen]')]; }

function describeScreen(section){
  const heading=section?.querySelector('h2,h1');
  if(!section || !heading) return;
  if(!heading.id) heading.id=`${section.id}-heading`;
  section.setAttribute('aria-labelledby',heading.id);
}

function syncNavigation(activeId){
  buttons().forEach(button=>{
    const active=button.dataset.screen===activeId;
    button.type='button';
    button.setAttribute('aria-controls',button.dataset.screen);
    if(active) button.setAttribute('aria-current','page');
    else button.removeAttribute('aria-current');
  });
}

function focusScreen(id){
  const section=document.getElementById(id);
  if(!section) return;
  describeScreen(section);
  section.tabIndex=-1;
  section.focus({preventScroll:true});
}

function afterNavigation(id,{focus=true}={}){
  queueMicrotask(()=>{
    syncNavigation(id);
    const section=document.getElementById(id);
    describeScreen(section);
    if(focus) focusScreen(id);
  });
}

function currentScreen(){ return document.querySelector('.screen.active')?.id || 'home'; }

function initialize(){
  document.querySelectorAll('.screen').forEach(section=>{
    section.tabIndex=-1;
    describeScreen(section);
  });
  syncNavigation(currentScreen());

  buttons().forEach(button=>button.addEventListener('click',()=>afterNavigation(button.dataset.screen),{passive:true}));

  if(window.app?.show && !window.app.show.__nwsAccessible){
    const original=window.app.show.bind(window.app);
    const wrapped=id=>{ original(id); afterNavigation(id); };
    wrapped.__nwsAccessible=true;
    window.app.show=wrapped;
  }

  const dialog=document.getElementById('reportDialog');
  if(dialog){
    dialog.setAttribute('aria-modal','true');
    dialog.addEventListener('close',()=>{
      const active=buttons().find(x=>x.getAttribute('aria-current')==='page');
      active?.focus();
    });
  }
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialize,{once:true});
else initialize();
