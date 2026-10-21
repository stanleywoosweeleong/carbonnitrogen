const icons={durian:'🌳',mango:'🥭',citrus:'🍊',longan:'🌿',pineapple:'🍍',lychee:'🌿',avocado:'🥑',apple:'🍎',grape:'🍇',olive:'🫒',strawberry:'🍓',dragonfruit:'🌵',tomato:'🍅',pepper:'🌶️'};
export function mountCropTiles({select,crops,language,esc}){
 const words={zh:['作物','选择作物'],en:['Crop','Choose a crop'],ms:['Tanaman','Pilih tanaman']}[language];
 const label=select.closest('label')||select.labels[0];
 const picker=document.createElement('details');picker.className='crop-tile-picker';
 picker.innerHTML=`<summary><span class="crop-tile-caption">${words[0]}</span><span class="crop-tile-current"></span><span class="crop-tile-chevron" aria-hidden="true">⌄</span></summary><div class="crop-tile-grid" role="group" aria-label="${words[1]}">${Object.entries(crops).map(([key,crop])=>`<button type="button" data-crop-tile="${key}" aria-pressed="false"><span class="crop-tile-check" aria-hidden="true">✓</span><span class="crop-tile-icon" aria-hidden="true">${icons[key]||'🌱'}</span><span>${esc(crop.name)}</span></button>`).join('')}</div>`;
 label.parentElement.insertBefore(picker,label);label.hidden=true;select.hidden=true;
 const summary=picker.querySelector('summary');
 function update(){const selected=crops[select.value];if(!selected)return;picker.querySelector('.crop-tile-current').textContent=selected.name;summary.setAttribute('aria-label',words[1]+': '+selected.name);picker.querySelectorAll('[data-crop-tile]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.cropTile===select.value)));}
 picker.addEventListener('click',event=>{const tile=event.target.closest('[data-crop-tile]');if(!tile)return;select.value=tile.dataset.cropTile;select.dispatchEvent(new Event('change',{bubbles:true}));update();picker.open=false;summary.focus({preventScroll:true});});
 select.addEventListener('change',update);update();
 return {update};
}
