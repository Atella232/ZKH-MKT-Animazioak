const svg=document.getElementById("scene");
const X0=60,Y0=52,W=520,H=240;
const defs=S("defs",{},svg);
const pat=S("pattern",{id:"halftone",width:9,height:9,patternUnits:"userSpaceOnUse"},defs);
S("circle",{cx:4.5,cy:4.5,r:1.4,style:"fill:var(--blue);opacity:.32"},pat);
const hatch=S("pattern",{id:"hatch",width:9,height:9,patternUnits:"userSpaceOnUse",patternTransform:"rotate(45)"},defs);
S("rect",{width:9,height:9,style:"fill:var(--sheet)"},hatch);
S("line",{x1:0,y1:0,x2:0,y2:9,style:"stroke:var(--red);stroke-width:4"},hatch);

S("rect",{x:X0,y:Y0,width:W,height:H,style:"fill:url(#halftone)"},svg);
// neurri-lerroak
S("line",{x1:X0,y1:30,x2:X0+W,y2:30,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("line",{x1:X0,y1:24,x2:X0,y2:36,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("line",{x1:X0+W,y1:24,x2:X0+W,y2:36,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("rect",{x:X0+W/2-42,y:19,width:84,height:22,style:"fill:var(--sheet)"},svg);
T("520 cm",{x:X0+W/2,y:35,"text-anchor":"middle",class:"disp","font-size":17},svg);
S("line",{x1:36,y1:Y0,x2:36,y2:Y0+H,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("line",{x1:30,y1:Y0,x2:42,y2:Y0,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("line",{x1:30,y1:Y0+H,x2:42,y2:Y0+H,style:"stroke:var(--ink);stroke-width:1.5"},svg);
S("rect",{x:25,y:Y0+H/2-42,width:22,height:84,style:"fill:var(--sheet)"},svg);
T("240 cm",{x:0,y:0,"text-anchor":"middle",class:"disp","font-size":17,transform:`translate(42 ${Y0+H/2}) rotate(-90)`},svg);

function tiles(s,cols,rows,styleFn,dk){
  const g=S("g",{},svg),arr=[];
  for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){
    const r=S("rect",{x:X0+i*s,y:Y0+j*s,width:s,height:s,class:"pop",style:styleFn(i,j)},g);
    r.style.opacity=0;r.dataset.d=(i+j)*dk;arr.push(r);
  }
  return arr;
}
const t60=tiles(60,8,4,(i,j)=>`fill:var(--pink);fill-opacity:${(i+j)%2?.5:.78};stroke:var(--ink);stroke-width:1.5`,55);
const gap=S("rect",{x:X0+480,y:Y0,width:40,height:H,class:"fade",style:"fill:url(#hatch);stroke:var(--red);stroke-width:2.5;opacity:0"},svg);
const gapLab=T("40 cm hutsik",{x:0,y:0,"text-anchor":"middle",class:"disp fade","font-size":15,style:"fill:var(--red-d);opacity:0",transform:`translate(${X0+W+26} ${Y0+H/2}) rotate(90)`},svg);
const t20=tiles(20,26,12,(i,j)=>`fill:var(--yellow);fill-opacity:${(i+j)%2?.65:1};stroke:var(--ink);stroke-width:.8`,14);
const t40=tiles(40,13,6,(i,j)=>`fill:var(--blue);fill-opacity:${(i+j)%2?.55:.85};stroke:var(--sheet);stroke-width:2`,45);
S("rect",{x:X0,y:Y0,width:W,height:H,style:"fill:none;stroke:var(--ink);stroke-width:3.5"},svg);
// 40 cm-ko marka bat, azken urratsetan
const one=S("g",{class:"fade",style:"opacity:0"},svg);
S("rect",{x:X0,y:Y0,width:40,height:40,style:"fill:none;stroke:var(--yellow);stroke-width:4"},one);
T("40",{x:X0+20,y:Y0+25,"text-anchor":"middle",class:"disp","font-size":14,style:"fill:var(--sheet)"},one);

const capBg=S("rect",{x:X0,y:Y0+H+18,width:W,height:34,rx:17,style:"fill:var(--ink)"},svg);
const cap=T("",{x:X0+W/2,y:Y0+H+40,"text-anchor":"middle","font-size":15,style:"fill:var(--sheet)"},svg);

const CAP=["Logela: 520 cm × 240 cm","60 cm: 8 lauza sartzen dira, eta 40 cm hutsik","20 cm: 26 × 12 = 312 lauza txiki","Zein neurrik zatitzen ditu 520 eta 240?","520 = 2³ · 5 · 13      240 = 2⁴ · 3 · 5","zkh(520, 240) = 2³ · 5 = 40","40 cm: 13 × 6 = 78 lauza","78 lauza, 40 cm × 40 cm, moztu gabe"];

const div520=[1,2,4,5,8,10,13,20,26,40,52,65,104,130,260,520];
const div240=[1,2,3,4,5,6,8,10,12,15,16,20,24,30,40,48,60,80,120,240];
const com=[1,2,4,5,8,10,20,40];

const steps=[
 {h:"Logela eta lauzak",t:7000,
  p:"Logelak 520 cm luze eta 240 cm zabal ditu. Lauza karratuak jarriko ditugu, <b>ahalik eta handienak</b> eta <b>bat bera ere moztu gabe</b>. Bi baldintza horiek dira problemaren gakoa."},
 {h:"Proba: 60 cm-ko lauzak",t:9000,
  p:"Zabaleran ondo doa: 240 : 60 = 4. Luzeran, ordea, 520 : 60 = 8 eta 40 cm geratzen dira. Hutsune hori betetzeko lauzak moztu beharko genituzke. Beraz, 60 cm ez da baliagarria.",
  b:`<div class="eq">240 : 60 = 4 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">520 : 60 = 8 &nbsp;<span class="bad">hondarra 40</span></div>`},
 {h:"Proba: 20 cm-ko lauzak",t:9000,
  p:"Oraingoan bai: 520 : 20 = 26 eta 240 : 20 = 12, zehatz. Ez da ezer moztu behar. Baina 312 lauza txiki dira, eta <b>handiagoak</b> nahi ditugu.",
  b:`<div class="eq">520 : 20 = 26 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">240 : 20 = 12 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">26 · 12 = 312 lauza</div>`},
 {h:"Zatitzaile komunak",t:10000,
  p:"Lauzaren aldeak 520 eta 240 zatitu behar ditu, zehatz. Beraz, bien <b>zatitzaile komuna</b> izan behar da. Biak zatitzen dituzten zenbakiak horiz daude: handiena <b>40</b> da.",
  b:mrow("520",chips(div520,com,40))+mrow("240",chips(div240,com,40))+mrow("biak",chips(com,com,40))},
 {h:"Bide laburra: faktore lehenak",t:9000,
  p:"Zatitzaile guztiak idaztea luzea da. Azkarrago: bi zenbakiak <b>faktore lehenetan deskonposatzen</b> ditugu, zatitzaile lehen txikienetik hasita.",
  b:`<div class="ladders">${ladder(520,[2,2,2,5,13],"520 = 2<sup>3</sup> · 5 · 13")}${ladder(240,[2,2,2,2,3,5],"240 = 2<sup>4</sup> · 3 · 5")}</div>`},
 {h:"zkh kalkulatu",t:9000,
  p:"zkh lortzeko, <b>faktore komunak</b> bakarrik hartzen ditugu, <b>berretzaile txikienarekin</b>. Komunak 2 eta 5 dira; 2-ren berretzaile txikiena 3 da.",
  b:`<div class="eq">520 = <span class="pk">2<sup>3</sup></span> · <span class="pk">5</span> · <span class="off">13</span></div><div class="eq">240 = 2<sup>4</sup> · <span class="off">3</span> · 5</div><div class="eq">zkh(520, 240) = 2<sup>3</sup> · 5 = 8 · 5 = <b>40</b></div><div class="rule">zkh: faktore komunak bakarrik, berretzaile txikienarekin.</div>`},
 {h:"Lauzak jarri",t:8000,
  p:"40 cm-ko lauzekin: 520 : 40 = <b>13</b> lauza luzeran eta 240 : 40 = <b>6</b> lauza zabaleran. Lurzoru osoa estaltzen da, eta ez da ezer moztu behar.",
  b:`<div class="eq">520 : 40 = 13 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">240 : 40 = 6 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Emaitza",t:8000,
  p:"Lauza bakoitzak <b>40 cm × 40 cm</b> neurtu behar du. Guztira, 13 · 6 = <b>78 lauza</b> beharko dira.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">40 cm-ko aldea</span><span>13 · 6 = 78 lauza</span></div>`}
];

Player(steps,k=>{
  t60.forEach(r=>pop(r,k===1,+r.dataset.d));
  show(gap,k===1,650);show(gapLab,k===1,650);
  t20.forEach(r=>pop(r,k===2,+r.dataset.d));
  t40.forEach(r=>pop(r,k>=6,+r.dataset.d));
  show(one,k>=6,900);
  cap.textContent=CAP[k];
});
