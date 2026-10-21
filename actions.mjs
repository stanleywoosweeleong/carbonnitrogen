export const cropTasks={
 durian:{question:'末次梢现在是什么样？',good:'叶片已展开成熟，暂未见新梢',issue:'仍有嫩叶或正在抽新梢',check:'找同一园区的代表树，拍末次梢近照，并查最近一次抽梢日期。',record:'品种、末次抽梢日期、近期降雨 / 灌水、是否已见花芽。',ask:'请按本园品种、土壤及供水条件，核对花前水分管理；见花芽后怎样转入花芽与花期供水？',refs:['F1','F2','P1']},
 mango:{question:'末次梢与修剪记录清楚吗？',good:'末次梢已成熟，知道上次修剪 / 抽梢时间',issue:'仍在抽嫩梢，或刚做过修剪',check:'查上次修剪及末次抽梢日期；拍梢端近照，不用叶色倒算 C:N。',record:'品种、砧木（若知道）、修剪日期、末次抽梢日期、近期肥料。',ask:'这个品种在本地需要怎样的梢龄与季节？本园是否适合诱导，依据是什么？',refs:['F3','F4']},
 citrus:{question:'花前梢叶状态清楚吗？',good:'已记录本轮梢叶成熟状态',issue:'正在抽嫩梢，需要进一步核对',check:'先写清是甜橙、蜜柑还是莱檬；记录本园正常花期及近期温度、降雨。',record:'具体品种、本轮梢叶、花芽出现日期、温度与供水。',ask:'这个具体柑橘品种在本地主要由低温还是水分过程诱导？现阶段如何管理供水？',refs:['F5']},
 longan:{question:'末次叶龄与叶片状态清楚吗？',good:'叶片成熟，知道本轮叶片展开日期',issue:'叶片仍嫩，或仍在抽梢',check:'先核对品种，再查本轮叶片展开日期；不同品种的叶龄不能互套。',record:'品种、叶片展开日期、近期低温过程、以往诱导与见花日期。',ask:'这个品种的自然花期与人工诱导条件分别是什么？本园叶龄是否匹配？',refs:['F6','F7']},
 pineapple:{question:'株龄和代表株大小有记录吗？',good:'已记录种植日期，并有株体大小资料',issue:'植株仍小，或刚定植不久',check:'查种植日期、种苗类型和品种；若需测整株鲜重，先与技术员确定代表株取样。',record:'品种、种植日期、种苗类型、代表株整株鲜重（若测过）。',ask:'本地这个品种的诱导前株龄 / 株体标准是什么？不能把 Hawaii 的数值直接当 MD2 标准。',refs:['F8']},
 lychee:{question:'末次梢是否已经成熟？',good:'本轮叶片成熟，暂未见新梢',issue:'持续抽嫩梢',check:'核对品种与当地较凉季节；拍梢端，并记下最近抽梢日期。',record:'品种、繁殖方式、末次梢、近期较凉天气及花芽。',ask:'此品种在本地低海拔 / 高海拔是否有稳定开花记录？营养生长是否影响花期？',refs:['P2']},
 avocado:{question:'品种和花型资料清楚吗？',good:'已知道品种及 A / B 花型（若适用）',issue:'只有商品名，花型 / 品种未核对',check:'从苗木标签核对品种；把无花与有花不坐果分别记录。',record:'品种、A / B 花型、开花时段、温度、上一季产量。',ask:'本地温度是否适合此品种花期？如已有花，花型开放时间与授粉条件是否匹配？',refs:['P3']},
 apple:{question:'去年结果与最近修剪情况如何？',good:'有去年负载和修剪记录',issue:'去年挂果很重，或近期重剪后猛长新梢',check:'查品种 / 砧木、去年挂果和修剪记录；拍短果枝及树冠受光情况。',record:'品种、树龄、去年负载、修剪时间、花芽 / 花量。',ask:'树龄、品种的当地适应性、上一季负载和修剪是否解释无花？',refs:['P4','P5']},
 grape:{question:'保留了合适的结果母枝吗？',good:'知道栽培与修剪方式，有上季枝条记录',issue:'不清楚结果枝位置，或已把上季枝全剪掉',check:'拍整株架面及上季枝条；查本次修剪时间和保留芽情况。',record:'品种、修剪方式与日期、上季枝、保留芽、新梢与花序。',ask:'此品种适合长梢还是短梢修剪？现有枝芽能否形成有效结果新梢？',refs:['P6']},
 olive:{question:'品种和上一季负载清楚吗？',good:'已记录品种、上一季负载及当地冬季情况',issue:'品种或当地冬季适应性未核对',check:'核对品种来源和本地冬季温度资料；查上一季负载及花序。',record:'品种、冬季温度过程、上一季负载、花序与开花期水分。',ask:'本品种在这里的冷量是否适合？花芽发育期的供水与授粉品种是否匹配？',refs:['P7']},
 strawberry:{question:'知道草莓的结果类型吗？',good:'已确认是季节型、四季型或日中性型',issue:'只知道是草莓，不知道品种 / 类型',check:'查苗木标签或向供应商确认品种与结果类型；不要仅按月份催花。',record:'品种 / 结果类型、定植日期、日照、温度、花与匍匐茎。',ask:'这个类型在本地温度和日照下的正常花期是什么？移栽建株管理是否已完成？',refs:['P8']},
 dragonfruit:{question:'品种和枝条 / 授粉情况清楚吗？',good:'已记录品种、枝条及以往授粉情况',issue:'品种或自交亲和性不清楚',check:'拍支架和枝条；查品种及开花记录；已有花时记下夜间开放情况。',record:'品种、枝条状态、遮阴、开花日期、花粉来源与坐果。',ask:'若有花不坐果，这个品种是否自交不亲和，是否需要匹配花粉？若无花，先查枝条与受光。',refs:['P9']},
 tomato:{question:'现在主要是什么表现？',good:'植株已建立，能区分花芽、开花和幼果',issue:'主要长茎叶，或开花后掉花',check:'拍植株和花序；记录白天 / 夜间温度，查最近氮肥用量。',record:'品种、定植日期、花序、掉花、昼夜温度、施肥和水分。',ask:'问题是未形成花，还是花后坐果失败？温度、营养生长与供水哪个更符合现场？',refs:['P10']},
 pepper:{question:'现在主要是什么表现？',good:'植株已建立，能区分花与幼果',issue:'仍在缓苗，或高温期间持续掉花',check:'拍新梢、花和掉花位置；记录昼夜温度及土壤干湿变化。',record:'品种、移栽日期、花 / 幼果、昼夜温度、灌水及施肥。',ask:'是否为温度和水分影响坐果，而不是需要催花？先核对植株建立与热胁迫。',refs:['P11']},
 other:{question:'你目前掌握生长记录吗？',good:'有品种、种植日期和照片',issue:'还没有完整记录',check:'先写具体作物与品种，拍整株及生长点 / 花芽照片。',record:'作物、品种、种植日期、地点、是否曾开花、近期天气及管理。',ask:'请先确认此作物的花芽形成与正常花期条件，再讨论 C:N；本工具尚无该作物资料。',refs:[]}
};

// These are transparent triage / recordkeeping rules, not a flowering prediction model.
export function actionPlan(p){
 const t=cropTasks[p.crop]||cropTasks.other;
 let title,reason,first,review;
 if(p.stage==='bud'){title='已经有花芽：转入花芽观察';reason='本轮已见花芽，继续追一个催花 C:N 数字解决不了花芽发育问题。';first='给已见花芽的枝位做标记，记首次见芽日期并拍近照。';review='花芽状态、供水或天气发生变化时，更新同一枝位的照片和记录。';}
 else if(p.stage==='bloom'){title='已经开花：先查授粉与坐果';reason='现在要分清花是否正常开放、能否完成授粉以及是否掉花。';first=p.crop==='dragonfruit'?'记今晚 / 清晨开放的花、花粉来源和授粉情况；核对品种自交亲和性。':'标记一组花，分别记录开放、掉花和出现幼果的日期；不要把掉花直接诊断为 C:N 不合适。';review='这组花结束开放或出现幼果时，回填实际结果。';}
 else if(p.stage==='fruit'){title='已经有果：记录负载与花果存活';reason='已有幼果时，本轮诱导已经过去；需要另行评估落果、负载和树体状态。';first='记下挂果位置和落果情况，把本轮管理与下一轮花芽准备分开。';review='负载、落果或树体状态变化时，带记录核对花果期管理。';}
 else if(p.health==='poor'){title='今天先查健康与根区';reason='你报告有萎蔫、根病或明显衰弱。仅凭表单不能区分缺水、积水或病害。';first='拍整株和异常部位；检查根区是干、湿还是积水，记录异常从何时开始。';review='先获得健康 / 水分问题的明确判断，再回来讨论诱导。';}
 else if(p.adult==='no'){title='先核对是否达到正常开花年龄';reason='幼龄植株不能靠把 C:N 调到一个数字来保证进入生殖阶段。';first='查种植日期、种苗来源和繁殖方式，向供应商确认本地正常初花 / 初果期。';review='达到该品种在本地的正常成熟条件后，重新核对花前状态。';}
 else if(p.crop==='other'){title='先确认作物，暂不能给诱导方案';reason='本工具没有这个作物的专属依据，不把其他作物的规则套过来。';first=t.check;review='拿到作物专属资料后再比较；这份记录可直接交给推广员。';}
 else if(p.flush==='young'){title='先核对'+({strawberry:'品种类型',apple:'负载与修剪',grape:'结果枝',avocado:'品种与花型',olive:'品种与冬季适应性',dragonfruit:'枝条与品种',tomato:'花序与掉花',pepper:'建株与掉花',pineapple:'株龄与株体'}[p.crop]||'末次梢');reason='你选择的现场情况需要先查清，不能据此推算 C:N 或直接决定催花。';first=t.check;review='查清这项现场情况后，更新答案，再核对当地诱导方案。';}
 else if(p.health==='unknown'||p.adult==='unknown'||p.flush==='unknown'||!p.cultivar?.trim()||!p.location?.trim()){title='今天先补一份现场记录';reason='缺少的现场信息会直接影响下一步；先做以下三件事就能继续。';first=t.check;review='补齐品种、地点、成熟 / 建株状态与健康观察后，重新生成行动单。';}
 else {title=p.season==='no'?'先核对当地花期窗口':'准备核对本地诱导方案';reason=p.season==='no'?'当地花期记录不匹配；先核对品种与环境，不用施肥去追一个未经验证的比值。':'基础观察已记录，但这些信息还不能证明植株一定会响应诱导。';first=t.check;review='确认本地品种和环境匹配的方案后，再决定诱导方式与时间。';}
 const nutrition=p.nitrogen==='unknown'?'把最近用过的肥料袋和施肥记录找出来，记产品、N 含量、实际重量与日期。':'';
 const actions=[first,nutrition+'写在同一张记录里：'+t.record,'把本页行动单带给当地推广员 / 农艺师，明确问：'+t.ask];
 const missing=[];
 if(!p.cultivar?.trim())missing.push('具体品种');if(!p.location?.trim())missing.push('地点 / 海拔');if(p.adult==='unknown')missing.push('正常开花年龄 / 建株状态');if(p.health==='unknown')missing.push('植株健康与根区');if(p.flush==='unknown')missing.push(t.question.replace('？',''));if(p.season==='unknown')missing.push('本园正常花期记录');if(p.nitrogen==='unknown')missing.push('最近肥料的产品、重量和日期');
 return {title,reason,actions,review,missing,refs:t.refs,cn:p.cn==null?'没有 C:N 检测也能完成这份行动单。':'C:N '+p.cn+':1 已作为记录保留；当前资料不能把它判为催花达标。',boundary:'现场核对清单；优先级来自透明的整理规则，不是已验证的开花预测或诱导处方。'};
}
