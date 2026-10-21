const rows=[
 ['P1','官方推广','马来西亚农业局 DOA · 2012','榴莲：生长阶段与供水','Pakej Teknologi Durian','https://www.doa.gov.my/doa/resources/aktiviti_sumber/sumber_awam/penerbitan/pakej_teknologi/buah/pt_durian_2012.pdf','资料区分营养生长期、花前较干条件与见花芽后花果发展的供水需求。','马来西亚推广背景；资料中的季节描述不是连续断水指令，未建立组织 C:N 催花阈值。'],
 ['P2','大学推广','University of Florida · UF/IFAS','荔枝：气候、抽梢与品种','Lychee Growing in the Florida Home Landscape','https://ask.ifas.ufl.edu/publication/MG051','讨论较凉气候、品种和营养生长对花果表现的影响；实生苗与压条 / 嫁接苗的初果时间不同。','Florida 背景；不把该地月份或管理时间直接搬到热带低海拔。未提供可用于判定催花的 C:N 数字。'],
 ['P3','大学推广','University of California · Cooperative Extension · 2016','牛油果：温度与花型','Avocado Flowering and Pollination','https://ucanr.edu/sites/default/files/2018-09/291781.pdf','介绍温度与花芽诱导，以及 A / B 花型和授粉过程。','区分形成花芽与开花后的授粉；具体品种与当地温度仍需核对，不能用统一 C:N 判定。'],
 ['P4','大学推广','University of Minnesota Extension · reviewed 2025','苹果：过度修剪与营养生长','Pruning and training apple trees','https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/pruning-and-training-apple-trees','过度修剪可能增加枝叶生长并延迟或降低结果；树形和受光也影响生产。','温带苹果栽培背景；不是催花药剂或 C:N 阈值试验。'],
 ['P5','大学推广','University of Maryland Extension','果树负载、氮和下一季花芽','Fruit Plant Care','https://www.extension.umd.edu/resource/fruit-plant-care','讨论前季负载、疏果、施氮及修剪对果树生产和花芽的影响。','不同果树需采用各自管理方法；不据此对每种作物发统一肥料处方。'],
 ['P6','大学推广','University of Minnesota Extension','葡萄：当年新梢与上季枝条','Growing grapes in the home garden','https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/growing-grapes-in-the-home-garden','果实形成在由上季木质枝长出的当年新梢；修剪与枝芽保留需配合栽培方式。','冷凉地区推广背景；不能直接复制到所有热带葡萄生产周期。未给 C:N 催花阈值。'],
 ['P7','大学推广','University of California Cooperative Extension · Olive Notes · April 2011','橄榄：品种冷量与花芽发育','Olive Notes — Flower Bud Induction and Development','https://ucanr.edu/sites/default/files/2011-03/80688.pdf','品种的冷量需求不同；花芽发育期缺水可能影响花的发育，授粉也需考虑品种与环境。','California 推广资料；没有适用所有品种的单一低温或 C:N 触发值。'],
 ['P8','大学推广','University of Minnesota Extension','草莓：先分清结果类型','Growing strawberries in the home garden','https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/growing-strawberries-in-the-home-garden','区分 June-bearing、ever-bearing 与 day-neutral，讨论日照、建株和正常花果期。','当地月份适用于 Minnesota；热带 / 设施种植需核对品种与环境，不能只套月份或 C:N。'],
 ['P9','大学推广','University of Florida · UF/IFAS','火龙果：枝条、受光与授粉','Pitaya (Dragonfruit) Growing in the Florida Home Landscape','https://ask.ifas.ufl.edu/publication/HS303','讨论栽培受光、枝条管理与夜间开花；部分品种自交不亲和，有花不代表能自行坐果。','Florida 背景；没有据此验证补光小时数或统一 C:N 催花值，不能从夜间开花推算补光方案。'],
 ['P10','大学推广','Virginia Cooperative Extension · SPES-795','番茄：开花与坐果要分开','Tomatoes','https://www.pubs.ext.vt.edu/content/dam/pubs_ext_vt_edu/426/426-418/SPES-795.pdf','讨论温度、营养生长与花果表现；形成花与花后坐果是不同问题。','推广背景；具体品种、露地或温室条件不同。未给可直接判定催花的 C:N 值。'],
 ['P11','大学推广','University of Minnesota Extension · reviewed 2026','辣椒 / 甜椒：高温掉花与水分','Growing peppers','https://extension.umn.edu/vegetables/growing-peppers','高温日夜可伴随掉花，土壤水分也影响花与幼果。幼苗建株管理不同于已建立的结果植株。','Minnesota 背景；不把温度风险解释为所有辣椒品种必然停花，也没有 C:N 催花阈值。']
];
export const practicalSources=rows.map(r=>Object.fromEntries(['id','type','org','title','english','url','text','scope'].map((k,i)=>[k,r[i]])));
const base=(name,latin,ref,factors,focus)=>({name,latin,cn:'收录资料未建立可用于催花决策的 C:N 数字',cnDetail:'该作物的实际核对重点是品种、阶段与环境。下面的来源支持这些核对项，但没有提供把组织 C:N 调到一个数字便会开花的验证方法。',cnSource:ref,numbers:[],factors:factors.map(([a,b])=>[a,b,ref]),studies:[[practicalSources.find(s=>s.id===ref).english,practicalSources.find(s=>s.id===ref).scope,ref]],focus,refs:[ref]});
export const additionalCrops={
 lychee:base('荔枝','Litchi chinensis','P2',[['品种与气候','先核对当地是否有该品种稳定开花记录；温暖海平面环境与较凉产区不能互套。'],['末次梢与施氮','记录是否持续抽梢及近期施肥；不要把叶色当成 C:N 测量。'],['繁殖方式与年龄','实生苗与压条 / 嫁接苗进入结果期可能不同。']],'核对品种、当地气候适应性和末次梢。'),
 avocado:base('牛油果','Persea americana','P3',[['温度与品种','花芽形成受到温度影响，不能只看当前叶色或施肥。'],['花型与授粉','A / B 花型和开放时间涉及授粉，不等于催花阈值。']],'把无花与有花不坐果分开，再核对品种和温度。'),
 apple:base('苹果','Malus domestica','P4',[['修剪与受光','近期重剪及旺长需要核对，不以增加胁迫替代修剪诊断。'],['树龄、负载与品种','记录上一季产量、树龄和砧木，再核对当地适应性。']],'先检查修剪、树龄和上一季负载。'),
 grape:base('葡萄','Vitis spp.','P6',[['结果枝与芽','核对上季枝条与当年新梢，不要把结果母枝误剪后归因为 C:N。'],['修剪方式','品种与栽培系统影响留枝留芽方式，不能用统一重剪方案。']],'先拍枝条 / 芽和架面，核对结果枝及修剪方式。'),
 olive:base('橄榄','Olea europaea','P7',[['品种冷量','不同品种需要的冬季条件不同，不统一给冷小时数。'],['花芽发育与供水','花芽发育期缺水可能损害花发育，不能一味追求较干。'],['授粉','已有花时核对授粉品种与花期环境。']],'先核对品种与冬季条件，然后看花芽期水分和授粉。'),
 strawberry:base('草莓','Fragaria × ananassa','P8',[['结果类型','先分季节型、四季型和日中性型，再讨论花期。'],['日照与建株','记录定植日期、受光、花和匍匐茎；不要照搬温带月份。']],'先查清品种及结果类型。'),
 dragonfruit:base('火龙果','Selenicereus spp.','P9',[['枝条与受光','记录枝条、支架和遮阴情况；本文不验证统一补光时长。'],['夜间开花与授粉','某些品种自交不亲和；无花与有花不坐果应分开处理。']],'无花查枝条 / 受光，有花不坐果查品种和花粉。'),
 tomato:base('番茄','Solanum lycopersicum','P10',[['无花还是不坐果','花序形成、开花、掉花与坐果需分别记录。'],['温度与营养生长','记录昼夜温度、氮肥和水分，不能以 C:N 一项诊断掉花。']],'先确认有无花序，再查温度、施肥和水分。'),
 pepper:base('辣椒 / 甜椒','Capsicum spp.','P11',[['建株与开花阶段','幼苗、已建立植株与结果株的管理目标不同。'],['高温与水分','高温期间掉花和水分波动需要现场核对，不直接诊断为 C:N 不足。']],'先记录花与幼果、昼夜温度和根区水分。'),
 other:{name:'其他作物（尚未收录）',latin:'请填写具体作物与品种',cn:'尚无作物专属依据',cnDetail:'可以整理现场记录，但本工具不会自动套用其他作物的花期规则。',cnSource:'',numbers:[],factors:[],studies:[],focus:'先确认作物、品种和正常花期资料。',refs:[]}
};
