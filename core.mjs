export const C_ATOMIC = 12.011;
export const N_ATOMIC = 14.007;
const finite = x => typeof x === 'number' && Number.isFinite(x);
export function tissue(c,n,unit='percent') {
  const limit=unit==='gkg'?1000:100;
  if(!finite(c)||!finite(n)||c<0||n<=0||c>limit||n>limit||c+n>limit+1e-9) throw Error('请输入同一干重基准的有效总碳、总氮；总氮须大于 0，C 与 N 之和不能超过干物质总量。');
  return {mass:c/n,atomic:c/n*N_ATOMIC/C_ATOMIC};
}
export function mixture(rows) {
  if(!rows.length) throw Error('请先添加至少一种原料。');
  let mass=0,water=0,c=0,n=0,dry=0;
  for(const r of rows) {
    if(![r.mass,r.moisture,r.c,r.n].every(finite)||r.mass<0||r.moisture<0||r.moisture>100||r.c<0||r.n<0||r.c+r.n>100+1e-9) throw Error('检查原料：重量须 ≥ 0，含水率为 0–100%，干基 C 与 N 合计不能超过 100%。');
    const d=r.mass*(1-r.moisture/100);
    mass+=r.mass;water+=r.mass*r.moisture/100;dry+=d;c+=d*r.c/100;n+=d*r.n/100;
  }
  if(mass<=0)throw Error('原料总重量须大于 0。');
  if(n<=0)throw Error('混合物中没有可计算的氮；请填写总氮含量，纯水不能提供 C 或 N。');
  return {mass,water,dry,c,n,ratio:c/n,moisture:water/mass*100};
}
export function addition(current,material,target) {
  if(!finite(target)||target<=0)throw Error('目标 C:N 须大于 0。');
  const a=(1-material.moisture/100)*material.c/100;
  const b=(1-material.moisture/100)*material.n/100;
  const numerator=target*current.n-current.c, denominator=a-target*b;
  if(Math.abs(numerator)<1e-10*Math.max(1,current.c,target*current.n))return 0;
  if(Math.abs(denominator)<1e-12)throw Error('这项原料不能把当前混合物调整到该目标；请选择另一种原料。');
  const x=numerator/denominator;
  if(!finite(x)||x<0)throw Error('只增加这项原料无法达到目标。换用目标另一侧的原料，或调整目标。');
  return x;
}
export function molecule(cAtoms,nAtoms) {return {atomic:cAtoms/nAtoms,mass:cAtoms*C_ATOMIC/(nAtoms*N_ATOMIC)};}
export function moistureFromWeights(tare,wetGross,dryGross) {
  if(![tare,wetGross,dryGross].every(finite)||tare<0||wetGross<=tare||dryGross<tare||dryGross>wetGross)throw Error('检查重量：湿样加容器须大于空容器；干样加容器须介于空容器与湿样加容器之间。');
  return {wet:wetGross-tare,dry:dryGross-tare,moisture:(wetGross-dryGross)/(wetGross-tare)*100};
}
export function csv(rows) {
  return '\uFEFF'+rows.map(row=>row.map(v=>{let s=String(v??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}).join(',')).join('\r\n');
}
