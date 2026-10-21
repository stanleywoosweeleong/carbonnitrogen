import {mountCropTiles} from './crop-tiles.mjs';
import {mountDurian} from './durian-guide.mjs';
import {mountGuide} from './guide.mjs';
import {chooseLanguage,localize,translateDom,translateText,prepareLanguageSelect} from './i18n.mjs';
import {lessons as baseLessons,stages as baseStages,cases as baseCases,questions as baseQuestions,educationSources,exampleRatio,scoreAnswers} from './education.mjs';
import {sources as researchSources} from './sources.mjs';
import {cropProfiles as originalCrops} from './flower.mjs';
import {additionalCrops} from './catalog.mjs';
const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const baseCrops={...originalCrops,...additionalCrops};delete baseCrops.other;
const language=chooseLanguage();
const {lessons,stages,cases,questions,sources,crops}=localize({lessons:baseLessons,stages:baseStages,cases:baseCases,questions:baseQuestions,sources:[...educationSources,...researchSources],crops:baseCrops},language);
const pages=Object.fromEntries(Object.entries({home:'开始学习',explore:'动手看比例',stages:'跟着植物生长',crops:'不同作物，学什么',cases:'田间情境练习',quiz:'六题小测验',sources:'研究来源'}).map(([key,value])=>[key,translateText(value,language)]));
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}}
let toastTimer;function toast(text){$('toast').textContent=translateText(text,language);$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),4000);}
function persist(){try{localStorage.setItem('cn-learning-v1',JSON.stringify({done:[...done],answers}));}catch{toast('浏览器无法保存学习进度；本次仍可完成课程及下载小结。');}}
const saved=read('cn-learning-v1',{});let lesson=0,stage=0;
const done=new Set(Array.isArray(saved.done)?saved.done.filter(i=>Number.isInteger(i)&&i>=0&&i<lessons.length):[]);
let answers=Array.isArray(saved.answers)?questions.map((q,i)=>Number.isInteger(saved.answers[i])&&saved.answers[i]>=0&&saved.answers[i]<q.options.length?saved.answers[i]:null):questions.map(()=>null);
const view=read('cn-learning-view-v1',{});lesson=Number.isInteger(view.lesson)&&view.lesson>=0&&view.lesson<6?view.lesson:0;stage=Number.isInteger(view.stage)&&view.stage>=0&&view.stage<6?view.stage:0;
let referenceSequence=0;
const refs=ids=>ids.map(id=>`<button class="ref" data-source="${id}" aria-expanded="false" aria-controls="inline-ref-${++referenceSequence}" aria-label="查看来源 ${id}">${id} ▾</button>`).join(' ');
function sourceBody(s){return `<p class="hint">${esc(s.english)}<br>${esc(s.org)}</p><p>${esc(s.text)}</p><div class="scope"><b>${translateText('适用边界',language)}</b><p>${esc(s.scope)}</p></div><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${translateText('阅读原始来源 ↗',language)}</a>`;}
function toggleReference(button){
 const id=button.getAttribute('aria-controls');let panel=document.getElementById(id);
 if(!panel){const s=sources.find(s=>s.id===button.dataset.source);if(!s)return;panel=document.createElement('section');panel.id=id;panel.className='inline-reference';panel.setAttribute('aria-label',s.title);panel.innerHTML=`<h3>${esc(s.id)} · ${esc(s.title)}</h3>${sourceBody(s)}`;const host=button.closest('td,article,.feedback,.two-grid > div')||button.parentElement;host.append(panel);}
 const open=button.getAttribute('aria-expanded')!=='true';panel.hidden=!open;button.setAttribute('aria-expanded',String(open));button.textContent=button.dataset.source+(open?' ▴':' ▾');translateDom(language);
}
function go(page,ref){const hash=page+(ref?'/'+ref:'');if(location.hash.slice(1)===hash)route();else location.hash=hash;}
let sessionPage='guide';
function routeRaw(){let [page,ref]=location.hash.slice(1).split('/');if(!page)page='guide';if(page==='sources'){ $('sources-section').open=true;page=sessionPage;}if(!pages[page])page='guide';sessionPage=page;if(page==='crops')renderCrop();if(page==='guide'&&$('guide-crop')?.value==='durian')mountDurian({root:$('durian-workflow'),language,esc,sources});document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id==='page-'+page));document.querySelectorAll('nav a').forEach(a=>{a.classList.toggle('active',a.dataset.page===page);if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});document.title=pages[page]+' · 碳氮学习园';if(ref&&$('sources-section').open){$('source-search').value='';$('source-type').value='all';renderSources();requestAnimationFrame(()=>{const item=$('source-'+ref);if(item){item.scrollIntoView({block:'start'});}});}else window.scrollTo({top:0,behavior:'instant'});}
document.addEventListener('click',e=>{if(e.target.closest('.brand')){e.preventDefault();go('guide');return;}if(e.target.closest('.sidebar nav a'))$('learning-menu').open=false;const start=e.target.closest('[data-start-crop]');if(start){$('guide-crop').value=start.dataset.startCrop;$('guide-crop').dispatchEvent(new Event('change',{bubbles:true}));go('guide');return;}const source=e.target.closest('[data-source]');if(source){toggleReference(source);return;}const link=e.target.closest('[data-go]');if(link)go(link.dataset.go);});window.addEventListener('hashchange',route);
function progressRaw(){const n=done.size;$('progress-text').textContent=`已学 ${n} / 6 课`;$('course-progress').value=n;$('lesson-count').textContent=n===6?'六课已完成 ✓':`已学 ${n} / 6 课`;}
function renderLessonRaw(){const l=lessons[lesson];$('lesson-tabs').innerHTML=lessons.map((v,i)=>`<button data-lesson="${i}" ${lesson===i?'aria-current="step"':''} class="${lesson===i?'selected':''}"><span>${done.has(i)?'✓':String(i+1).padStart(2,'0')}</span>${esc(v.title)}</button>`).join('');$('lesson-card').innerHTML=`<span class="eyebrow">${l.tag}</span><h2>${l.title}</h2><p class="lead">${l.lead}</p><p>${l.body}</p><div class="example"><b>想一想</b><p>${l.example}</p></div><div class="takeaway"><b>记住这一句</b><p>${l.remember}</p></div><div class="actionrow"><button class="secondary" data-go="${l.page}">${l.cta} ↗</button><span>${refs(l.refs)}</span></div>`;$('previous-lesson').disabled=lesson===0;$('complete-lesson').textContent=lesson===5?'我学会了，去做小测验 →':'我明白了，下一课 →';progress();}
$('lesson-tabs').onclick=e=>{const b=e.target.closest('[data-lesson]');if(b){lesson=Number(b.dataset.lesson);renderLesson();}};$('previous-lesson').onclick=()=>{lesson=Math.max(0,lesson-1);renderLesson();};$('complete-lesson').onclick=()=>{done.add(lesson);persist();if(lesson<5){lesson++;renderLesson();$('lesson-card').scrollIntoView({block:'start'});}else{renderLesson();go('quiz');}};
$('start-learning').onclick=()=>{lesson=0;renderLesson();$('lesson-card').scrollIntoView({behavior:'smooth',block:'start'});};
function ratioDemoRaw(){const c=Number($('carbon-demo').value),n=Number($('nitrogen-demo').value);$('carbon-value').textContent=c+'%';$('nitrogen-value').textContent=n.toFixed(1)+'%';$('demo-ratio').textContent=exampleRatio(c,n).toFixed(1)+' : 1';$('demo-equation').textContent=`${c}% ÷ ${n.toFixed(1)}% = ${(c/n).toFixed(1)}（干基质量比）`;$('bar-c').style.width=c+'%';$('bar-n').style.width=n+'%';}
['carbon-demo','nitrogen-demo'].forEach(id=>$(id).oninput=ratioDemo);document.querySelectorAll('[data-preset]').forEach(b=>b.onclick=()=>{const [c,n]=b.dataset.preset.split(',');$('carbon-demo').value=c;$('nitrogen-demo').value=n;ratioDemo();});
function waterDemoRaw(){const w=Number($('water-demo').value);$('water-value').textContent=w+'%';$('wet-carbon').textContent=((100-w)*.4).toFixed(2)+'%';$('wet-nitrogen').textContent=((100-w)*.02).toFixed(2)+'%';}$('water-demo').oninput=waterDemo;
function renderStageRaw(){const s=stages[stage];$('stage-tabs').innerHTML=stages.map((v,i)=>`<button data-stage="${i}" class="${stage===i?'selected':''}" ${stage===i?'aria-current="step"':''}><span>${v.icon}</span>${v.name}</button>`).join('');$('stage-card').innerHTML=`<span class="eyebrow">STAGE ${String(stage+1).padStart(2,'0')} / ${s.name}</span><h2>${s.question}</h2><p class="lead">${s.explain}</p><div class="takeaway"><b>这一阶段学什么</b><p>${s.lesson}</p></div><div class="two-grid stage-notes"><div><h3>农友可以练习观察</h3><p>${s.observe}</p></div><div><h3>别从比值直接下这个结论</h3><p>${s.limit}</p></div></div><p>${refs(s.refs)}</p>`;}$('stage-tabs').onclick=e=>{const b=e.target.closest('[data-stage]');if(b){stage=Number(b.dataset.stage);renderStage();}};
$('crop-select').innerHTML=Object.entries(crops).map(([k,p])=>`<option value="${k}">${esc(p.name)}</option>`).join('');
const cropTiles=mountCropTiles({select:$('crop-select'),crops,language,esc});
function renderCropRaw(){cropTiles.update();const key=$('crop-select').value,p=crops[key],deep=['durian','mango'].includes(key);$('page-crops').querySelector('.pagehead').hidden=key==='durian';if(key==='durian'){mountDurian({root:$('crop-lesson'),language,esc,sources});return;}let takeaway=key==='mango'?'芒果研究让我们学会：同一作物的不同组织和砧穗组合，也不能共用一个比值。':key==='durian'?'榴莲资料让我们学会：品种、碳的检测方法，以及花前水分条件都要一起读。':'从这份资料可以学习花期背景与其他因素；它不是该作物 C:N 各阶段的标准表。';$('crop-lesson').innerHTML=`<button type="button" class="primary crop-action-start" data-start-crop="${key}">${language==='zh'?'帮我决定下一步':language==='ms'?'Bantu tentukan langkah seterusnya':'Help me decide my next step'} →</button><article class="card"><span class="pill">${deep?'含 C:N 观察研究':'主要为生理 / 栽培背景资料'}</span><h2>${p.name}：先记住这个结论</h2><p class="lead">${takeaway}</p><div class="takeaway"><b>C:N 的证据结论</b><p>${p.cn}</p></div><p>${p.cnDetail}</p><p>${refs(p.refs)}</p></article><details class="card"><summary>展开研究数字、方法和其他因素</summary>${p.numbers.length?'<div class="research-numbers">'+p.numbers.map(n=>`<div><b>${n[0]}</b><span>${n[1]}</span><small>${n[2]}</small></div>`).join('')+'</div>':''}<div class="two-grid">${p.factors.map(([t,d,id])=>`<div><h3>${t}</h3><p>${d}</p>${refs([id])}</div>`).join('')}</div><div class="tablewrap"><table><thead><tr><th>研究内容</th><th>背景与边界</th><th>来源</th></tr></thead><tbody>${p.studies.map(([t,d,id])=>`<tr><td>${t}</td><td>${d}</td><td>${refs([id])}</td></tr>`).join('')}</tbody></table></div></details>`;}$('crop-select').onchange=renderCrop;
const caseAnswers=cases.map((c,i)=>Number.isInteger(view.cases?.[i])&&view.cases[i]>=0&&view.cases[i]<c.options.length?view.cases[i]:null);
function renderCasesRaw(){ $('case-list').innerHTML=cases.map((c,i)=>`<article class="card question"><span class="eyebrow">FIELD CASE / 0${i+1}</span><h2>${c.title}</h2><div class="answer-options" role="group" aria-label="情境 ${i+1} 的答案">${c.options.map((v,j)=>`<button data-case="${i}" data-answer="${j}" aria-pressed="${caseAnswers[i]===j}" class="${caseAnswers[i]===j?'picked':''}">${esc(v)}</button>`).join('')}</div>${caseAnswers[i]!=null?`<div class="feedback ${caseAnswers[i]===c.answer?'correct':''}" role="status"><b>${caseAnswers[i]===c.answer?'答对了':'再想一步：'+c.options[c.answer]}</b><p>${c.why}</p><strong>${c.takeaway}</strong><p>${refs(c.refs)}</p></div>`:''}</article>`).join('');}
$('case-list').onclick=e=>{const b=e.target.closest('[data-case]');if(b){caseAnswers[Number(b.dataset.case)]=Number(b.dataset.answer);renderCases();}};
function renderQuizRaw(){const count=answers.filter(a=>a!=null).length,score=scoreAnswers(answers);$('quiz-status').textContent=`已回答 ${count} / 6 题 · 当前答对 ${score} 题`;$('quiz-list').innerHTML=questions.map((q,i)=>`<article class="card question"><span class="eyebrow">QUESTION / 0${i+1}</span><h2>${q.q}</h2><div class="answer-options" role="group" aria-label="第 ${i+1} 题答案">${q.options.map((v,j)=>`<button data-quiz="${i}" data-answer="${j}" aria-pressed="${answers[i]===j}" class="${answers[i]===j?'picked':''}">${esc(v)}</button>`).join('')}</div>${answers[i]!=null?`<div class="feedback ${answers[i]===q.answer?'correct':''}" role="status"><b>${answers[i]===q.answer?'答对了':'正确理解：'+q.options[q.answer]}</b><p>${q.why}</p></div>`:''}</article>`).join('');$('quiz-summary').hidden=count!==6;if(count===6)$('quiz-summary').innerHTML=`<span class="eyebrow">YOUR LEARNING SUMMARY</span><h2>${score===6?'六题都理解了。':'练习完成，再看一遍解释。'}</h2><p>本次答对 ${score} / 6 题。你可以修改答案再练习。</p><div class="takeaway"><b>带走这一句</b><p>C:N 要看碳、看氮，也要看组织、阶段和背景；它不是通用的施肥或开花开关。</p></div>`;}
$('quiz-list').onclick=e=>{const b=e.target.closest('[data-quiz]');if(b){answers[Number(b.dataset.quiz)]=Number(b.dataset.answer);persist();renderQuiz();}};$('retry-quiz').onclick=()=>{answers=questions.map(()=>null);persist();renderQuiz();toast('六题已重置；课程学习进度保留。');};
function renderSourcesRaw(){const q=$('source-search').value.trim().toLowerCase(),type=$('source-type').value;const result=sources.filter(s=>(type==='all'||s.type===type)&&Object.values(s).join(' ').toLowerCase().includes(q));$('sources-list').innerHTML=result.map(s=>`<article class="card source" id="source-${s.id}"><span class="source-tag">${s.type} · ${s.id}</span><span class="source-title">${esc(s.title)}</span>${sourceBody(s)}</article>`).join('');$('source-empty').hidden=result.length>0;}['source-search','source-type'].forEach(id=>$(id).oninput=renderSources);
$('export-learning').onclick=()=>{
 const t=s=>translateText(s,language),count=answers.filter(v=>v!=null).length,score=scoreAnswers(answers);
 const summary=language==='zh'?`已学 ${done.size} / 6 课；已答 ${count} / 6 题；当前答对 ${score} 题。`:language==='ms'?`${done.size} / 6 pelajaran selesai; ${count} / 6 soalan dijawab; ${score} betul.`:`${done.size} / 6 lessons completed; ${count} / 6 questions answered; ${score} correct.`;
 const content=[t('C:N 碳氮学习园 · 我的学习小结'),summary,'',...lessons.map((l,i)=>`[${t(done.has(i)?'已学':'待学')}] ${i+1}. ${l.title}\n${t('记住：')}${l.remember}`),'',t('小测验：'),...questions.map((q,i)=>`${i+1}. ${q.q}\n${t('我的答案：')}${answers[i]==null?t('未回答'):q.options[answers[i]]}\n${t('解释：')}${q.why}`),'',t('课程来源：'),...sources.filter(s=>['E1','E2','E3','E4','F1','F4','S4','S5','S1'].includes(s.id)).map(s=>s.title+'\n'+s.url),'',t('这是学习小结，不是园区 C:N 检测结果或农业处方。')].join('\n');
 const url=URL.createObjectURL(new Blob(['\uFEFF'+content],{type:'text/plain;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download=language==='zh'?'碳氮学习园_学习小结.txt':language==='ms'?'Ringkasan-pembelajaran-CN.txt':'CN-learning-summary.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
prepareLanguageSelect(language);
if(view.crop&&crops[view.crop])$('crop-select').value=view.crop;
for(const id of ['carbon-demo','nitrogen-demo','water-demo'])if(Number.isFinite(view[id]))$(id).value=String(view[id]);
$('language-menu').onclick=e=>{const pick=e.target.closest('[data-lang]');if(!pick)return;const lang=pick.dataset.lang;persist();try{localStorage.setItem('cn-language-v1',lang);localStorage.setItem('cn-learning-view-v1',JSON.stringify({lesson,stage,crop:$('crop-select').value,cases:caseAnswers,...Object.fromEntries(['carbon-demo','nitrogen-demo','water-demo'].map(id=>[id,Number($(id).value)]))}));}catch{}const url=new URL(location.href);url.searchParams.set('lang',lang);location.assign(url.href);};
const guideTitle=mountGuide({language,crops,refs,esc,sources,onCrop:key=>{$('crop-select').value=key;renderCrop();go('crops');}});
$('learning-menu-label').textContent=language==='zh'?'课程与工具':language==='ms'?'Pelajaran dan alat':'Lessons and tools';
pages.guide=guideTitle;$('guide-nav-label').textContent=guideTitle;
$('sources-section-title').textContent=translateText('研究来源',language);
$('sources-toggle').onclick=e=>{e.preventDefault();const section=$('sources-section');section.open=!section.open;if(section.open)section.scrollIntoView({behavior:'smooth',block:'start'});};
$('sources-section').ontoggle=()=>{$('sources-toggle').setAttribute('aria-expanded',String($('sources-section').open));};
renderLesson();ratioDemo();waterDemo();renderStage();renderCrop();renderCases();renderQuiz();renderSources();route();

function route(){routeRaw();translateDom(language);}

function progress(){progressRaw();translateDom(language);}

function renderLesson(){renderLessonRaw();translateDom(language);}

function ratioDemo(){ratioDemoRaw();translateDom(language);}

function waterDemo(){waterDemoRaw();translateDom(language);}

function renderStage(){renderStageRaw();translateDom(language);}

function renderCrop(){renderCropRaw();translateDom(language);}

function renderCases(){renderCasesRaw();translateDom(language);}

function renderQuiz(){renderQuizRaw();translateDom(language);}

function renderSources(){renderSourcesRaw();translateDom(language);}
