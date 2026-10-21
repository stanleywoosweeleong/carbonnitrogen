import {tissue} from './core.mjs';
export function cnDecision(p){
 let ratio=null;
 if(p.mode==='elements')ratio=tissue(p.carbon,p.nitrogen,p.unit).mass;
 if(p.mode==='ratio'){if(!Number.isFinite(p.cn)||p.cn<=0)throw Error('请输入大于 0 的检测比值。');ratio=p.cn;}
 const measured=ratio!=null;
 let comparison='收录资料没有与此样本匹配的催花 C:N 阈值，不能判定“偏低 / 合适 / 偏高”。',ref=null;
 if(p.crop==='mango'&&measured&&p.organ==='reproductive-bud'&&p.basis==='总碳 / 总氮，干基质量比'){
  comparison=(ratio>=25.5&&ratio<=40.18?'数值落在':'数值不在')+'一项芒果生殖芽研究的 25.50–40.18 观察范围。该范围来自不同砧穗组合，不是诱导阈值，也不是你的品种目标值。';ref='F4';
 }
 return {ratio,title:measured?'已得到 C:N；仍不能据此认定可催花':'C:N 未知：先获取合格检测数据',reason:measured?'这个比值回答了样本中碳与氮的相对含量。现有收录证据不足以把它转换成“现在能催花”的指令。':'普通秤、叶色、糖度、NPK 配方或长势，不能直接给出作物组织的 C:N。',comparison,ref,
 actions:measured?['核对报告：同一组织、采样日期及相同干重基准；总碳、有机碳和糖 / 淀粉不是同一指标。','将这次 C:N 与同品种、同组织、同方法的花前记录对照；同时保留未开花的记录。','不要只为提高比值而减氮或断水。记录实际见花芽日期，检验该比值对本园是否有参考价值。']:['联系植物营养检测实验室，询问能否测同一样本的总碳和总氮，并按实验室要求采样。','要求报告说明组织、干 / 湿基准、单位和检测方法；总碳与总氮都用干基 % 或 g/kg。','取得结果后输入：C:N = 总碳 ÷ 总氮。没有检测时保留“未知”，先用田间记录跟踪花期。'],
 review:measured?'下一次在相同采样方法下复测，并回填实际花芽表现；趋势和本园对照比单次数字更有解释力。':'拿到同一样本、同一基准的碳和氮结果后，回来计算。'};
}
