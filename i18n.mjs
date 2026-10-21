import en from './i18n-en.mjs';
import ms from './i18n-ms.mjs';
import {research} from './i18n-research.mjs';
import {cropNames,cnText,numberText,factors} from './i18n-crops.mjs';
import {translateText,ui} from './i18n-ui.mjs';
export {translateText};
export const languageOptions=['zh','en','ms'];
export function chooseLanguage(){let lang=new URLSearchParams(location.search).get('lang');if(!languageOptions.includes(lang)){try{lang=localStorage.getItem('cn-language-v1');}catch{lang=null;}}return languageOptions.includes(lang)?lang:'zh';}
export function localize(base,lang){if(lang==='zh')return base;const words=lang==='ms'?ms:en,index=lang==='ms'?1:0;
 const sources=base.sources.map(s=>{const row=research[s.id];if(!row)throw Error('Missing source translation: '+s.id);const a=index?row.slice(3):row.slice(0,3);return {...s,title:a[0],text:a[1],scope:a[2],org:s.org.replace('马来西亚农业局',index?'Jabatan Pertanian Malaysia':'Department of Agriculture Malaysia')};});
 const byId=Object.fromEntries(sources.map(s=>[s.id,s]));
 const crops=Object.fromEntries(Object.entries(base.crops).map(([key,p])=>{const c=cnText[key]?.[index]||[index?'Panduan yang dirujuk tidak menetapkan nilai C:N untuk keputusan aruhan':'The referenced guidance does not establish a C:N induction value',index?'Fokusnya ialah varieti, peringkat dan persekitaran. Sumber menyokong faktor ini, tetapi tidak memberikan kaedah disahkan yang menjamin pembungaan apabila C:N mencapai satu angka.':'The focus is variety, stage and environment. Sources support these factors but do not provide a validated method guaranteeing flowering at one C:N number.'];return [key,{...p,name:cropNames[key][index],cn:c[0],cnDetail:c[1],numbers:numberText[key]?.[index]||[],factors:factors[key].map(([ref,et,ed,mt,md])=>[index?mt:et,index?md:ed,ref]),studies:p.studies.map(([, ,ref])=>[byId[ref].title,byId[ref].text+' '+byId[ref].scope,ref]),focus:factors[key][0][index?4:2]}];}));
 return {lessons:base.lessons.map((l,i)=>({...l,...words.lessons[i]})),stages:base.stages.map((s,i)=>({...s,...words.stages[i]})),cases:base.cases.map((c,i)=>({...c,...words.cases[i]})),questions:base.questions.map((q,i)=>({...q,...words.questions[i]})),sources,crops};
}
export function translateDom(lang){
 document.documentElement.lang=lang==='zh'?'zh-CN':lang;
 document.getElementById('language-switch').setAttribute('aria-label',lang==='zh'?'选择语言':lang==='ms'?'Pilih bahasa':'Choose language');
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while((n=walker.nextNode())){if(n.parentElement?.closest('script,style,#language-switch'))continue;const raw=n.nodeValue,trim=raw.trim();if(!trim)continue;let changed=translateText(trim,lang);if(changed!==trim)n.nodeValue=raw.replace(trim,changed);}
 for(const el of document.querySelectorAll('[aria-label],[placeholder],[title]')){if(el.id==='language-switch')continue;for(const key of ['aria-label','placeholder','title'])if(el.hasAttribute(key))el.setAttribute(key,translateText(el.getAttribute(key),lang));}
 document.title=translateText(document.title,lang);
 document.querySelector('meta[name="description"]').content=lang==='zh'?'给农友的碳氮比学习园：通过互动示例、生长阶段、作物研究与小测验学习 C:N。不需要仪器或检测结果。':lang==='ms'?'Pelajaran C:N untuk pekebun: contoh interaktif, peringkat pertumbuhan, bukti tanaman dan kuiz. Tidak memerlukan alat atau keputusan ujian.':'C:N lessons for growers: interactive examples, growth stages, crop evidence and quizzes. No equipment or test results required.';
}
export function prepareLanguageSelect(lang){for(const option of document.querySelectorAll('#source-type option'))if(!option.hasAttribute('value'))option.value=option.textContent;document.getElementById('language-switch').value=lang;}
