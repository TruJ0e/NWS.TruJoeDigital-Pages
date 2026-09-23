let installPrompt=null;

function ensureStatusControls(){
  const host=document.querySelector('.mode');
  if(!host) return null;

  let status=document.getElementById('connectionPill');
  if(!status){
    status=document.createElement('span');
    status.id='connectionPill';
    status.className='pill';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    status.setAttribute('title','Connection status — NWS works offline; practice saved on this device is still available.');
    host.appendChild(status);
  }

  let install=document.getElementById('installNwsButton');
  if(!install){
    install=document.createElement('button');
    install.id='installNwsButton';
    install.className='btn secondary hidden';
    install.type='button';
    install.textContent='Install NWS';
    install.addEventListener('click',async()=>{
      if(!installPrompt) return;
      installPrompt.prompt();
      await installPrompt.userChoice.catch(()=>null);
      installPrompt=null;
      install.classList.add('hidden');
    });
    host.appendChild(install);
  }
  return {status,install};
}

function updateConnectionStatus(){
  const controls=ensureStatusControls();
  if(!controls) return;
  const online=navigator.onLine;
  controls.status.textContent=online?'Online':'Offline — saved NWS practice is still available';
  controls.status.setAttribute('aria-label','Connection status: '+(online?'online':'offline')+'. NWS works offline; practice saved on this device is still available.');
  controls.status.dataset.online=String(online);
}

window.addEventListener('online',updateConnectionStatus);
window.addEventListener('offline',updateConnectionStatus);
window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  installPrompt=event;
  const controls=ensureStatusControls();
  controls?.install.classList.remove('hidden');
});
window.addEventListener('appinstalled',()=>{
  installPrompt=null;
  document.getElementById('installNwsButton')?.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded',updateConnectionStatus,{once:true});
if(document.readyState!=='loading') updateConnectionStatus();

if('caches' in window){
  caches.keys().then(keys => {
    for(const key of keys){
      if(!key.includes('hotfix')){
        caches.delete(key);
      }
    }
  });
}
if('serviceWorker' in navigator && ['http:','https:'].includes(location.protocol)){
  navigator.serviceWorker.register('./service-worker.js',{scope:'./'}).then(reg=>{
    reg.update();
  }).catch(error=>{
    console.warn('NWS offline support could not register.',error);
  });
}
