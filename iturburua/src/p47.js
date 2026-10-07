const svg=document.getElementById("scene");
const XA=150,PX=1.2,x=m=>XA+PX*m;
const ROWS=[
  {p:30,y:160,c:"var(--pink)",lab:"1. erlojua",sub:"30 min"},
  {p:90,y:225,c:"var(--blue)",lab:"2. erlojua",sub:"90 min"},
  {p:150,y:290,c:"var(--yellow)",lab:"3. erlojua",sub:"150 min"}
];
// goiburua
T("Oihanaren alarmak",{x:16,y:44,class:"disp","font-size":22},svg);
T("8:00etatik 16:00etara · 1 marra = 1 ordu",{x:16,y:68,"font-size":13,style:"fill:var(--muted)"},svg);
// LED erlojua
const led=S("g",{},svg);
S("rect",{x:540,y:14,width:208,height:78,rx:12,style:"fill:var(--ink)"},led);
S("rect",{x:548,y:22,width:192,height:62,rx:7,style:"fill:#14173A"},led);
const SEG={a:[4,0,18,5],b:[21,3,5,19],c:[21,24,5,19],d:[4,41,18,5],e:[0,24,5,19],f:[0,3,5,19],g:[4,20.5,18,5]};
const DIG=["abcdef","bc","abdeg","abcdg","bcfg","acdfg","acdefg","abc","abcdefg","abcdfg"];
function digit(x0,y0){const segs={};for(const k in SEG){const [a,b,w,h]=SEG[k];segs[k]=S("rect",{x:x0+a,y:y0+b,width:w,height:h,rx:2,style:"fill:var(--red)"},led);}
  return v=>{const on=v===null?"":DIG[v];for(const k in segs)segs[k].style.opacity=on.includes(k)?1:.1;};}
const d1=digit(566,30),d2=digit(600,30),d3=digit(650,30),d4=digit(684,30);
S("circle",{cx:638,cy:43,r:3.2,style:"fill:var(--red)"},led);S("circle",{cx:638,cy:63,r:3.2,style:"fill:var(--red)"},led);
let ledM=0,raf=0;
function setLED(m){const tot=480+m,hh=Math.floor(tot/60),mm=tot%60;d1(hh>=10?Math.floor(hh/10):null);d2(hh%10);d3(Math.floor(mm/10));d4(mm%10);}
function ledTo(m){cancelAnimationFrame(raf);const from=ledM,dur=REDUCE?0:2400,t0=performance.now();
  const f=now=>{const p=dur?Math.min(1,(now-t0)/dur):1;const e=p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;ledM=Math.round(from+(m-from)*e);setLED(ledM);if(p<1)raf=requestAnimationFrame(f);};
  raf=requestAnimationFrame(f);}
setLED(0);
// sareta
for(let h=0;h<=8;h++){
  S("line",{x1:x(60*h),y1:128,x2:x(60*h),y2:318,style:"stroke:var(--line);stroke-width:1.2"},svg);
  T(`${8+h}:00`,{x:x(60*h),y:342,"text-anchor":"middle","font-size":12.5,style:"fill:var(--muted)"},svg);
  if(h<8)S("line",{x1:x(60*h+30),y1:128,x2:x(60*h+30),y2:318,style:"stroke:var(--line);stroke-width:1;stroke-dasharray:2 4"},svg);
}
// bat-egite bandak
function band(m,y1,y2,fill,op){const g=S("g",{class:"fade",style:"opacity:0"},svg);
  S("rect",{x:x(m)-16,y:y1,width:32,height:y2-y1,rx:16,class:"blend",style:`fill:${fill};fill-opacity:${op}`},g);return g;}
const b90=band(90,138,247,"var(--yellow)",1);
const b450=band(450,203,312,"var(--pink)",.55);
const b450all=band(450,138,312,"var(--green)",.3);
const l90=T("9:30",{x:x(90),y:120,"text-anchor":"middle",class:"disp fade","font-size":16,style:"opacity:0"},svg);
const l450=T("15:30",{x:x(450),y:120,"text-anchor":"middle",class:"disp fade","font-size":16,style:"opacity:0"},svg);
// lerroak
const rowG=ROWS.map(r=>{
  const lg=S("g",{},svg);
  S("circle",{cx:22,cy:r.y,r:9,style:`fill:${r.c};stroke:var(--ink);stroke-width:1.5`},lg);
  T(r.lab,{x:38,y:r.y-3,class:"body","font-size":14},lg);
  T(r.sub,{x:38,y:r.y+14,"font-size":11,style:"fill:var(--muted)"},lg);
  S("line",{x1:x(0),y1:r.y,x2:x(480),y2:r.y,style:"stroke:var(--ink);stroke-width:1.5"},svg);
  const g=S("g",{class:"fade"},svg);
  S("circle",{cx:x(0),cy:r.y,r:9,class:"blend",style:`fill:${r.c};stroke:var(--ink);stroke-width:1.3`},svg);
  const ticks=[];
  for(let m=r.p;m<=480;m+=r.p){const c=S("circle",{cx:x(m),cy:r.y,r:9,class:"pop blend",style:`fill:${r.c};stroke:var(--ink);stroke-width:1.3;opacity:0`},g);ticks.push(c);}
  return {g,ticks};
});
// kurtsorea
const cur=S("g",{style:`transition:transform ${REDUCE?0:2.4}s cubic-bezier(.45,0,.2,1)`},svg);
S("line",{x1:x(0),y1:132,x2:x(0),y2:322,style:"stroke:var(--ink);stroke-width:2;stroke-dasharray:5 4"},cur);
S("path",{d:`M${x(0)-7} 126 L${x(0)+7} 126 L${x(0)} 136 Z`,style:"fill:var(--ink)"},cur);

const M30=[30,60,90,120,150,180,210,240,270,300,330,360,390,420,450,480];
const M90=[90,180,270,360,450];
const M150=[150,300,450];

const steps=[
 {h:"Hiru erloju, 8:00etan",t:7500,
  p:"Goizeko 8:00etan hiru erlojuek batera jo dute. Hemendik aurrera bakoitzak bere erritmoan joko du: <b>30</b>, <b>90</b> eta <b>150</b> minutuz behin."},
 {h:"1. erlojua: 30 minutuz behin",t:8000,
  p:"Jotzen duen minutuak 30-en multiploak dira. Ordutan: 8:30, 9:00, 9:30, 10:00…",
  b:mrow("30",chips(M30))},
 {h:"2. erlojua: 90 minutuz behin",t:8000,
  p:"90-en multiploak. Ordutan: 9:30, 11:00, 12:30, 14:00, 15:30.",
  b:mrow("90",chips(M90))},
 {h:"a) Noiz jotzen dute berriz batera 1.ak eta 2.ak?",t:9500,
  p:"Bi lerroak alderatu: biek jotzen duten lehen unea <b>90. minutua</b> da. 8:00etatik 90 minutu (1 h 30 min) igarota: <b>9:30</b>.",
  b:mrow("30",chips(M30.slice(0,9),[90,180,270],90,true))+mrow("90",chips(M90,[180,270],90))+`<div class="eq">mkt(30, 90) = <b>90</b></div>`},
 {h:"Zergatik 90?",t:9000,
  p:"90 = 30 · 3. Hau da, 90 30-en multiploa da, eta horregatik haien mkt <b>90 bera</b> da. Faktorizazioak gauza bera dio.",
  b:`<div class="eq">30 = 2 · 3 · 5</div><div class="eq">90 = <span class="pk">2</span> · <span class="pk">3<sup>2</sup></span> · <span class="pk">5</span></div><div class="eq">mkt(30, 90) = 2 · 3<sup>2</sup> · 5 = <b>90</b></div>`},
 {h:"3. erlojua: 150 minutuz behin",t:8000,
  p:"150-en multiploak. Ordutan: 10:30, 13:00, 15:30.",
  b:mrow("150",chips(M150))},
 {h:"b) Noiz jotzen dute berriz batera 2.ak eta 3.ak?",t:9500,
  p:"Orain 2. eta 3. lerroak alderatu. Bien lehen bat-egitea <b>450. minutuan</b> dago: <b>15:30</b>.",
  b:mrow("90",chips(M90,[],450))+mrow("150",chips(M150,[],450))+`<div class="eq">mkt(90, 150) = <b>450</b></div>`},
 {h:"mkt faktorizazioarekin",t:10000,
  p:"mkt lortzeko, faktore <b>komunak eta ez-komunak</b> hartzen ditugu, <b>berretzaile handienarekin</b>.",
  b:`<div class="ladders">${ladder(90,[2,3,3,5],"90 = 2 · 3<sup>2</sup> · 5")}${ladder(150,[2,3,5,5],"150 = 2 · 3 · 5<sup>2</sup>")}</div><div class="eq">mkt(90, 150) = <span class="pk">2</span> · <span class="pk">3<sup>2</sup></span> · <span class="pk">5<sup>2</sup></span> = 2 · 9 · 25 = <b>450</b></div><div class="eq">450 min = 7 h 30 min</div><div class="rule">mkt: faktore komunak eta ez-komunak, berretzaile handienarekin.</div>`},
 {h:"Emaitza",t:9000,
  p:"a) <b>90 minutu</b> igaro behar dira: 9:30ean. b) <b>450 minutu</b> (7 h 30 min): 15:30ean. Gainera, 450 30-en multiploa ere bada: 15:30ean <b>hiru erlojuek</b> batera joko dute.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">a) 9:30 · b) 15:30</span><span>mkt(30, 90) = 90 min · mkt(90, 150) = 450 min</span></div>`}
];

Player(steps,k=>{
  const vis=[k>=1,k>=2,k>=5];
  rowG.forEach((r,i)=>{r.ticks.forEach((c,j)=>pop(c,vis[i],j*70));
    r.g.style.opacity=(k===6||k===7)&&i===0?.25:1;});
  show(b90,k>=3&&k!==6&&k!==7,0);
  show(l90,k>=3&&k!==6&&k!==7,0);
  show(b450,k>=6,0);show(l450,k>=6,0);
  show(b450all,k===8,0);
  const m=k<3?0:k<6?90:450;
  cur.style.transform=`translate(${PX*m}px,0)`;
  ledTo(m);
});
