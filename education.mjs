export const lessons=[
 {title:'C 和 N，各自做什么？',tag:'01 / 从这里开始',lead:'C:N 是碳与氮的比例，不是植物的健康分数。',body:'植物通过光合作用把空气中的 CO₂ 转为有机物。碳存在于糖、淀粉和结构组织等物质中。氮参与蛋白质、核酸和叶绿素等物质的组成；它与碳代谢相互关联。',example:'把植物想成一个持续建造、储存和运输物质的系统。这个比喻帮助理解，但碳不只有“储粮”作用，氮也不只负责“长叶”。',remember:'总碳不等于糖分；总氮不等于刚施进去的氮肥。',page:'explore',cta:'用滑块看比例',refs:['E1','E2']},
 {title:'同一个比值，为什么不一定是同一种状态？',tag:'02 / 看懂分子与分母',lead:'C:N 升高，可能是碳增加，也可能是氮减少，或两者同时变化。',body:'质量比 C:N = 同一基准的碳含量 ÷ 氮含量。必须同时查看 C 和 N，不能只盯最后的比值。不同组织、总碳与有机碳、质量比与原子比也不能直接互换。',example:'教学例子：40% C / 2% N 与 30% C / 1.5% N，都是 20:1；但两份样本的元素组成不同。',remember:'看到比值变化，先问：C 变了，还是 N 变了？',page:'explore',cta:'试试两个 20:1',refs:['E2','F1','F4']},
 {title:'植物不同阶段，应该怎样理解 C:N？',tag:'03 / 看阶段，不背通用数值',lead:'生长、结果、衰老和恢复，会改变组织组成和资源分配。',body:'快速生长时，养分浓度的变化可能与生物量增加有关。花果发育和叶片衰老时，资源可能重新分配。一次叶片比值并不能证明整株的储备充足，或确认氮去了哪里。',example:'冬小麦田间研究显示，发育阶段和天气都会影响元素组成；柳枝稷研究观察到衰老期氮从地上器官向地下器官再分配。',remember:'不同阶段的数值不同，不等于其中一个阶段出问题。',page:'stages',cta:'沿生长阶段学习',refs:['E3','E4']},
 {title:'研究里的数字，可以直接照用吗？',tag:'04 / 读懂作物证据',lead:'先看作物、品种、组织、方法和试验条件，再看数值。',body:'一项芒果砧穗研究测得生殖芽 C:N 约 25.50–40.18。这个观察范围不是把任何芒果调到某个值就会开花的处方。其他作物也不能直接套用它。',example:'同样写着 C:N，榴莲论文中的成熟叶有机碳 / 总氮，与芒果元素分析的总碳 / 总氮并不是同一套测量。',remember:'“研究观察到”与“管理目标已验证”是两件事。',page:'crops',cta:'选择作物，看能学什么',refs:['F1','F4']},
 {title:'田里看见的现象，能告诉我们什么？',tag:'05 / 学会提出好问题',lead:'叶色、抽梢、掉花和萎蔫是观察线索，不能直接换算 C:N。',body:'同一种现象可能有多个原因。先区分阶段，再考虑环境、根系、营养与品种背景；不要用一个比例解释全部问题。控水也不是简单把碳氮比“浓缩”得更高。',example:'如果只有水减少，而碳与氮的量都没变，质量比仍不变。真实干旱还会影响吸收、光合与代谢，不能用这个教学演示制定断水方案。',remember:'观察可以帮助排查；观察本身不是碳氮测量。',page:'cases',cta:'练习三个田间情境',refs:['E1','E2','F2']},
 {title:'把知识变成判断习惯',tag:'06 / 学完带走',lead:'先问“测的是什么、为什么变”，再问“对管理有何意义”。',body:'区分作物组织、土壤和堆肥的 C:N。比较时保持作物、组织、阶段和方法一致；用实际生长与产量结果核对解释。没有匹配证据时，不把一个数字变成施肥或催花指令。',example:'普通农友不需要先购买仪器才能学习。本课程帮助理解概念和研究边界；它不估算你的园区比值，也不替你开肥料或诱导处方。',remember:'C:N 是理解植物的一条线索，需要与阶段和背景一起看。',page:'quiz',cta:'做六题，检查是否学会',refs:['E2','S1','F4']}
];
export const stages=[
 {name:'幼苗 / 建株',icon:'🌱',question:'为什么先看组织和建立状态？',explain:'幼叶、成熟叶、根和整株的组成并不相同。此时比较 C:N，先明确取样的是哪一部分，不能拿幼苗整株与成年树成熟叶直接比较。',lesson:'组织不同，不能只比较两个比值大小。',observe:'认识幼叶、成熟叶、根与新梢；分清种植日期与生育阶段。',limit:'没有一个本课程可推荐给所有幼苗的通用 C:N 目标。',refs:['E2']},
 {name:'快速营养生长',icon:'🌿',question:'氮浓度下降，一定是缺氮吗？',explain:'随着植物长大，组织比例与生物量都会改变。养分浓度可能出现生长稀释；需要结合生长、阶段与匹配参考判断，而不是一看到比值升高就加肥。',lesson:'比值升高，不自动等于缺氮。',observe:'理解浓度、元素总量和植株大小是不同概念。',limit:'C:N 本身不能区分生长稀释、吸收受限或真实缺氮。',refs:['E2','E3']},
 {name:'花前 / 开花',icon:'🌸',question:'碳氮平衡参与开花，就能给一个开花数字吗？',explain:'碳氮营养与信号参与生长和开花；但品种、温度、光周期、梢龄等背景也重要。机制研究、观察关联和经过验证的诱导阈值必须分开。',lesson:'参与开花，不等于拥有通用的开花开关。',observe:'分清花芽诱导、花芽发育、开花和坐果。',limit:'不把芒果生殖芽观察范围当作榴莲或所有作物的催花目标。',refs:['S4','S5','F4']},
 {name:'果实 / 种子发育',icon:'🍏',question:'为什么不能只盯一片叶子的数值？',explain:'发育中的器官对养分有需求，叶片、茎和果实等组织可能发生资源再分配。叶片的变化需与取样阶段和其他证据一起解释。',lesson:'叶片的 C:N 不等于果实或整株的 C:N。',observe:'认识“供给器官”与“需求器官”；记录花果阶段及负载背景。',limit:'单次 C:N 不能证明资源运输方向，也不能直接预测甜度、产量或落果。',refs:['E2','E3','F4']},
 {name:'成熟 / 叶片衰老',icon:'🍂',question:'老叶比值升高，就一定是不健康吗？',explain:'衰老可伴随养分回收。柳枝稷的多年研究观察到地上部分氮减少、地下器官氮增加；这是该植物季节性再分配的证据，而不是所有作物统一的变化曲线。',lesson:'正常衰老与异常胁迫，需要分别判断。',observe:'比较相同叶龄；分清自然成熟与突然、异常的黄化。',limit:'不能只用高 C:N 诊断衰老、缺肥或决定补氮。',refs:['E4','E2']},
 {name:'恢复 / 下一轮生长',icon:'🔄',question:'怎么把一次观察变成有用的长期知识？',explain:'跨生长周期比较时，保持组织、阶段和方法一致，再结合实际生长与产量。连续记录用于检验解释；它本身还不能证明某项管理造成了变化。',lesson:'可比较的记录，比不同条件下的一串数字更有意义。',observe:'学会记品种、日期、阶段、组织、天气与已做过的管理。',limit:'恢复期没有所有作物通用的 C:N “充满电”数值。',refs:['E2','E4']}
];
export const cases=[
 {title:'叶片很绿，能说 C:N 偏低吗？',options:['能，绿色就是氮多','不能，叶色只是线索','能用秤称叶片判断'],answer:1,why:'叶色不提供总碳和总氮含量。它可以提示继续观察，但不能换算出组织 C:N，也不能单独证明施氮过量。',takeaway:'看得见的线索 ≠ 测得的比值。',refs:['E1','E2']},
 {title:'C:N 从 18 变成 25，表示状态变好了吗？',options:['是，越高越好','否，越低才好','信息不足，先看 C、N 和阶段'],answer:2,why:'比值可能因 C 增加、N 减少或两者变化而升高。再加上取样组织、阶段和方法可能不同，不能只凭升高认定改善。',takeaway:'先解释变化来源，再讨论好坏。',refs:['E2','E3']},
 {title:'把堆肥的约 30:1，用作果树催花目标？',options:['可以，都是 C:N','不可以，讨论对象不同','加水后就可以'],answer:1,why:'堆肥比值讨论分解原料中碳与氮的供给；植物组织的比值涉及不同生物过程和测量背景。两者不能共用一个管理阈值。',takeaway:'同一个符号，不代表同一种管理目标。',refs:['S1','F4']}
];
export const questions=[
 {q:'40% 碳和 2% 氮，干基质量比是多少？',options:['20:1','42:1','80:1'],answer:0,why:'40 ÷ 2 = 20；这里是元素质量比。'},
 {q:'比值升高，能立即判断什么？',options:['储糖一定更多','一定缺氮','需要分别查看碳和氮的变化'],answer:2,why:'分子与分母都可能变化，比例单独不能说明原因。'},
 {q:'干燥只移走水，C 与 N 都没有损失，比值会怎样？',options:['升高','不变','降低'],answer:1,why:'水不在 C/N 的分子或分母中；这里刻意排除了真实胁迫的代谢变化。'},
 {q:'芒果生殖芽研究中的 C:N 观察范围，能直接用于榴莲催花吗？',options:['能，植物都一样','不能，作物、组织和验证背景不同','换算成公斤就能'],answer:1,why:'观察范围不是跨作物的诱导阈值。'},
 {q:'老叶与幼叶 C:N 不同，首先应该怎么想？',options:['肯定有一片生病','组织年龄不同，要匹配比较','立刻补氮'],answer:1,why:'组织年龄、阶段与资源分配会影响解释。'},
 {q:'没有仪器，还能从本课程获得什么？',options:['推算本园准确比值','得到自动施肥剂量','理解比例、阶段与证据，减少误判'],answer:2,why:'学习不需要仪器；理解概念不等于测到了园区 C:N。'}
];
export const educationSources=[
 {id:'E1',type:'大学推广',org:'Oregon State University Extension',title:'植物生长：光合、呼吸与发育',english:'Plant growth and development',url:'https://extension.oregonstate.edu/catalog/em-9901-plant-growth-development',text:'介绍光合作用、呼吸与植物生长，帮助区分碳的来源和生长过程。',scope:'植物生理基础教学；不是 C:N 诊断或施肥处方。'},
 {id:'E2',type:'大学推广',org:'University of Minnesota Extension · Dan Kaiser · 2023',title:'为什么组织、时期与采样方法必须一致',english:'Plant tissue analysis: What to know about sampling strategy and handling',url:'https://blog-crop-news.extension.umn.edu/2023/03/plant-tissue-analysis-what-to-know.html',text:'强调取样时期与植物部位，说明晚期养分重新分配会影响组织浓度。',scope:'组织营养解释方法；不能仅凭外观推算 C:N。'},
 {id:'E3',type:'原始研究',org:'Weih, Pourazari & Vico · Scientific Reports · 2016',title:'冬小麦：发育阶段与天气改变元素组成',english:'Nutrient stoichiometry in winter wheat: Element concentration pattern reflects developmental stage and weather',url:'https://www.nature.com/articles/srep35958',text:'瑞典两年田间研究，从种子到下一代种子追踪元素组成，发现阶段与天气的重要影响。',scope:'研究主要讨论多元素组成；并不是所有作物各阶段的 C:N 标准表。'},
 {id:'E4',type:'原始研究',org:'Yang et al. · New Phytologist · 2016 · DOI 10.1111/nph.13898',title:'柳枝稷：衰老期的氮回收与再分配',english:'Nitrogen remobilization and conservation, and underlying senescence-associated gene expression in the perennial switchgrass Panicum virgatum',url:'https://nph.onlinelibrary.wiley.com/doi/10.1111/nph.13898',text:'连续三年按月采集地上、地下器官，观察季节性衰老与氮的再分配。',scope:'特定多年生草本；不外推为所有果树的 C:N 季节曲线。'}
];
export const exampleRatio=(c,n)=>{if(!Number.isFinite(c)||!Number.isFinite(n)||c<0||n<=0||c+n>100)throw Error('无效教学参数');return c/n;};
export function scoreAnswers(answers){return questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);}
