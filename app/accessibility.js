export function applyAccessibilityPreferences(preferences,root=document.body){
  if(!root) return;
  root.dataset.theme=preferences.theme||'light';
  root.dataset.density=preferences.density||'low';
}
