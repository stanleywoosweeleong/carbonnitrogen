const icons={durian:'🌳',mango:'🥭',citrus:'🍊',longan:'🌿',pineapple:'🍍',lychee:'🌿',avocado:'🥑',apple:'🍎',grape:'🍇',olive:'🫒',strawberry:'🍓',dragonfruit:'🌵',tomato:'🍅',pepper:'🌶️'};
export function mountCropTiles({select,crops,language,esc}){
 // Always-visible tile grid (no dropdown): the hidden <select> keeps the chosen crop.
 const words={zh:'作物',en:'Crop',ms:'Tanaman'}[language];
 const label=select.closest('label')||select.labels[0];
 const picker=document.createElement('div');picker.className='crop-tile-picker';picker.setAttribute('role','group');picker.setAttribute('aria-label',words);
 picker.innerHTML=`<span class="crop-tile-caption">${words}</span><div class="crop-tile-grid">${Object.entries(crops).map(([key,crop])=>`<button type="button" data-crop-tile="${key}" aria-pressed="false"><span class="crop-tile-icon" aria-hidden="true">${icons[key]||'🌱'}</span><span>${esc(crop.name)}</span></button>`).join('')}</div>`;
 label.parentElement.insertBefore(picker,label);label.hidden=true;select.hidden=true;
 function update(){picker.querySelectorAll('[data-crop-tile]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.cropTile===select.value)));}
 picker.addEventListener('click',event=>{const tile=event.target.closest('[data-crop-tile]');if(!tile)return;select.value=tile.dataset.cropTile;select.dispatchEvent(new Event('change',{bubbles:true}));update();});
 select.addEventListener('change',update);update();
 return {update};
}
