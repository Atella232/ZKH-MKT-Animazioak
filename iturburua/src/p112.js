const svg=document.getElementById("scene");
const X0=110,PX=10.5,xt=t=>X0+PX*t,YC=c=>318-13*c;
const count=t=>Math.max(0,9-Math.floor(t/4)+Math.floor(t/10));
const PLANE="M12 1C13.5 1 14 3 14 5V9L23 14V16L14 13.5V19L17 21.5V23L12 21.8L7 23V21.5L10 19V13.5L1 16V14L10 9V5C10 3 10.5 1 12 1Z";
// aparkalekua
T("Aparkalekua",{x:16,y:22,class:"body","font-size":14},svg);
S("rect",{x:16,y:30,width:430,height:56,rx:8,style:"fill:var(--paper);stroke:var(--ink);stroke-width:1.5"},svg);
const planes=[];
for(let i=0;i<9;i++){
  S("rect",{x:24+i*47,y:38,width:40,height:40,rx:4,style:"fill:none;stroke:var(--line);stroke-width:1.2;stroke-dasharray:3 3"},svg);
  const g=S("g",{class:"pop",style:"opacity:1"},svg);
  S("path",{d:PLANE,transform:`translate(${32+i*47} ${46}) scale(1)`,style:"fill:var(--blue);stroke:var(--ink);stroke-width:1;stroke-linejoin:round"},g);
  planes.push(g);
}
// erlojua eta kontagailua
const clock=T("8:00",{x:600,y:66,"text-anchor":"middle",class:"disp","font-size":40,style:"fill:var(--blue)"},svg);
const cnt=T("9 hegazkin",{x:600,y:90,"text-anchor":"middle",class:"body","font-size":15},svg);
// denbora-lerroak
const rowA=118,rowL=150;
T("Aireratu",{x:16,y:rowA+5,class:"body","font-size":13},svg);
T("Lurreratu",{x:16,y:rowL+5,class:"body","font-size":13},svg);
const bands=[20,40,60].map(t=>{const r=S("rect",{x:xt(t)-10,y:rowA-14,width:20,height:rowL-rowA+28,rx:10,class:"fade blend",style:"fill:var(--yellow);opacity:0"},svg);return r;});
S("line",{x1:xt(0),y1:rowA,x2:xt(60),y2:rowA,style:"stroke:var(--ink);stroke-width:1.3"},svg);
S("line",{x1:xt(0),y1:rowL,x2:xt(60),y2:rowL,style:"stroke:var(--ink);stroke-width:1.3"},svg);
const mA=[],mL=[];
for(let t=4;t<=60;t+=4)mA.push(S("path",{d:`M${xt(t)-6} ${rowA+5}L${xt(t)} ${rowA-7}L${xt(t)+6} ${rowA+5}Z`,class:"pop",style:"fill:var(--pink);stroke:var(--ink);stroke-width:1;opacity:0"},svg));
for(let t=10;t<=60;t+=10)mL.push(S("path",{d:`M${xt(t)-6} ${rowL-5}L${xt(t)} ${rowL+7}L${xt(t)+6} ${rowL-5}Z`,class:"pop",style:"fill:var(--blue);stroke:var(--ink);stroke-width:1;opacity:0"},svg));
// grafikoa
for(let c=0;c<=9;c+=3){S("line",{x1:xt(0),y1:YC(c),x2:xt(60),y2:YC(c),style:"stroke:var(--line);stroke-width:1"},svg);
  T(String(c),{x:xt(0)-10,y:YC(c)+4,"text-anchor":"end","font-size":12,style:"fill:var(--muted)"},svg);}
T("hegazkinak",{x:16,y:YC(9)+4,"font-size":12,style:"fill:var(--muted)"},svg);
for(let t=0;t<=60;t+=10){S("line",{x1:xt(t),y1:YC(0),x2:xt(t),y2:YC(0)+5,style:"stroke:var(--ink);stroke-width:1.2"},svg);
  T(t===60?"9:00":`8:${String(t).padStart(2,"0")}`,{x:xt(t),y:YC(0)+20,"text-anchor":"middle","font-size":12,style:"fill:var(--muted)"},svg);}
let d=`M${xt(0)} ${YC(9)}`,prev=9;
for(let t=1;t<=60;t++){const c=count(t);if(c!==prev){d+=`H${xt(t)}V${YC(c)}`;prev=c;}}
d+=`H${xt(60)}`;
const clip=S("clipPath",{id:"reveal"},S("defs",{},svg));
const clipR=S("rect",{x:0,y:0,width:xt(0),height:400},clip);
S("path",{d,"clip-path":"url(#reveal)",style:"fill:none;stroke:var(--pink);stroke-width:3;stroke-linejoin:round"},svg);
const zero=S("g",{class:"pop",style:"opacity:0"},svg);
S("circle",{cx:xt(56),cy:YC(0),r:7,style:"fill:var(--yellow);stroke:var(--ink);stroke-width:2"},zero);
T("8:56",{x:xt(56),y:YC(0)-14,"text-anchor":"middle",class:"disp","font-size":15},zero);
// kurtsorea
const cur=S("line",{x1:xt(0),y1:rowA-18,x2:xt(0),y2:YC(0),style:"stroke:var(--ink);stroke-width:1.6;stroke-dasharray:5 4"},svg);
let tNow=0,raf=0;
function setT(t){
  const ti=Math.floor(t);clipR.setAttribute("width",xt(t));cur.setAttribute("x1",xt(t));cur.setAttribute("x2",xt(t));
  clock.textContent=ti>=60?"9:00":`8:${String(ti).padStart(2,"0")}`;
  const c=count(ti);cnt.textContent=c+" hegazkin";planes.forEach((p,i)=>pop(p,i<c,0));
}
function goT(T1){cancelAnimationFrame(raf);const T0=tNow,dur=REDUCE?0:Math.min(5200,Math.abs(T1-T0)*130),s=performance.now();
  const f=n=>{const p=dur?Math.min(1,(n-s)/dur):1;tNow=T0+(T1-T0)*p;setT(tNow);if(p<1)raf=requestAnimationFrame(f);};raf=requestAnimationFrame(f);}
const M4=[4,8,12,16,20,24,28,32,36,40,44,48,52,56,60],M10=[10,20,30,40,50,60];
const steps=[
 {h:"8:00etan, 9 hegazkin",t:7000,
  p:"Aireportuan 9 hegazkin daude. Hemendik aurrera batzuk aireratu egingo dira (irten) eta beste batzuk lurreratu (iritsi). Noiz geratuko da hutsik?"},
 {h:"Kontuz! Irakurri arretaz",t:12000,
  p:"Liburuak dioen bezala, 20 minututan <b>2 hegazkin aireratzen</b> dira eta <b>5 lurreratzen</b>: aireportuan gero eta hegazkin <b>gehiago</b> egongo lirateke, eta ez litzateke inoiz hustuko. Datuak alderantziz idatzita daude. Problema zentzuzkoa da <b>4 minutuz behin aireratu</b> eta <b>10 minutuz behin lurreratu</b> eginez gero. Horrela ebatziko dugu.",
  b:`<div class="eq">Liburuan: 20 min → −2 + 5 = <span class="bad">+3</span></div><div class="eq">Zuzenduta: 20 min → −5 + 2 = <span class="ok">−3</span></div>`},
 {h:"Aireratzeak: 4 minutuz behin",t:8000,
  p:"Hegazkin bat irteten da 4-ren multiploak diren minutuetan: 8:04, 8:08, 8:12…",
  b:mrow("4",chips(M4))},
 {h:"Lurreratzeak: 10 minutuz behin",t:8000,
  p:"Hegazkin bat iristen da 10-en multiploak diren minutuetan: 8:10, 8:20, 8:30…",
  b:mrow("10",chips(M10))},
 {h:"Noiz errepikatzen da dena?",t:10000,
  p:"Bi gertaerak batera 20. minutuan gertatzen dira: <b>mkt(4, 10) = 20</b>. 20 minuturo dena berdin errepikatzen da: <b>5 irten eta 2 iritsi</b>, hau da, 3 hegazkin gutxiago.",
  b:`<div class="eq">4 = 2<sup>2</sup> &nbsp; 10 = 2 · 5</div><div class="eq">mkt(4, 10) = 2<sup>2</sup> · 5 = <b>20</b></div>`+mrow("4",chips(M4,[20,40,60],null))+mrow("10",chips(M10,[20,40,60],null))},
 {h:"Lehen zikloa: 8:00 → 8:20",t:9000,
  p:"20 minututan 5 hegazkin aireratu eta 2 lurreratu dira: 9 − 5 + 2 = <b>6 hegazkin</b>.",
  b:`<div class="eq">8:20 → 9 − 3 = <b>6</b></div>`},
 {h:"Bigarren zikloa: 8:20 → 8:40",t:9000,
  p:"Beste 20 minutu, beste 3 hegazkin gutxiago: 6 − 3 = <b>3 hegazkin</b>.",
  b:`<div class="eq">8:20 → 6</div><div class="eq">8:40 → 6 − 3 = <b>3</b></div>`},
 {h:"Azken minutuak, banan-banan",t:11000,
  p:"Hemen ez dugu ziklo osoa itxaron behar: 3 hegazkin baino ez daude. Minutuz minutu jarraitzen dugu, eta <b>8:56an</b> irteten da azkena.",
  b:`<div class="eq">8:44 aireratu → 2</div><div class="eq">8:48 aireratu → 1</div><div class="eq">8:50 lurreratu → 2</div><div class="eq">8:52 aireratu → 1</div><div class="eq">8:56 aireratu → <b>0</b></div>`},
 {h:"Emaitza",t:9000,
  p:"Aireportua <b>8:56an</b> geratuko da hegazkinik gabe. Kontuz: 9:00 erantzuna (3 ziklo) okerra da, zikloa amaitu baino lehen hustu egiten baita.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">8:56</span><span>mkt(4, 10) = 20 min · ziklo bakoitzean −3</span></div>`}
];
const TT=[0,0,0,0,0,20,40,56,56];
Player(steps,k=>{
  mA.forEach((m,i)=>pop(m,k>=2,i*60));mL.forEach((m,i)=>pop(m,k>=3,i*90));
  bands.forEach((b,i)=>show(b,k>=4&&(k<=6||i<2),0));
  pop(zero,k>=7,k===7?3000:0);
  goT(TT[k]);
});
