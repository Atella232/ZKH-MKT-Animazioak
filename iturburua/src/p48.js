const svg=document.getElementById("scene");
const G=552,BX=190,RX=345,D=11,SB=55,SR=45,RUL=86;
// erregela
S("line",{x1:RUL,y1:G,x2:RUL,y2:G-510,style:"stroke:var(--ink);stroke-width:2"},svg);
for(let v=0;v<=510;v+=10){const big=v%50===0;
  S("line",{x1:RUL-(big?10:5),y1:G-v,x2:RUL,y2:G-v,style:`stroke:var(--ink);stroke-width:${big?1.6:1}`},svg);
  if(big)T(String(v),{x:RUL-14,y:G-v+4,"text-anchor":"end","font-size":12,style:"fill:var(--muted)"},svg);}
T("mm",{x:RUL,y:G-520,"text-anchor":"middle","font-size":12,style:"fill:var(--muted)"},svg);
// lurra
S("rect",{x:40,y:G,width:480,height:6,style:"fill:var(--ink)"},svg);
// bat-egite lerroa
const match=S("g",{class:"fade",style:"opacity:0"},svg);
S("line",{x1:RUL,y1:G-495,x2:470,y2:G-495,style:"stroke:var(--green);stroke-width:3;stroke-dasharray:8 5"},match);
S("rect",{x:432,y:G-495-30,width:88,height:24,rx:12,style:"fill:var(--green)"},match);
T("495 mm",{x:476,y:G-495-13,"text-anchor":"middle",class:"disp","font-size":14,style:"fill:var(--sheet)"},match);

function cube(x0,y0,s,c,n,parent){
  const g=S("g",{class:"mv",style:"opacity:0;transform:translate(0px,-60px)"},parent);
  S("polygon",{points:`${x0+s},${y0} ${x0+s+D},${y0-D} ${x0+s+D},${y0+s-D} ${x0+s},${y0+s}`,style:`fill:var(${c}-d);stroke:var(--ink);stroke-width:1.3;stroke-linejoin:round`},g);
  S("polygon",{points:`${x0},${y0} ${x0+D},${y0-D} ${x0+s+D},${y0-D} ${x0+s},${y0}`,style:`fill:var(${c}-l);stroke:var(--ink);stroke-width:1.3;stroke-linejoin:round`},g);
  S("rect",{x:x0,y:y0,width:s,height:s,style:`fill:var(${c});stroke:var(--ink);stroke-width:1.5`},g);
  T(String(n),{x:x0+s/2,y:y0+s/2+5,"text-anchor":"middle",class:"disp","font-size":14,style:"fill:var(--sheet)"},g);
  return g;
}
const gB=S("g",{},svg),gR=S("g",{},svg);
const blues=[],reds=[];
for(let i=0;i<9;i++)blues.push(cube(BX,G-SB*(i+1),SB,"--blue",i+1,gB));
for(let i=0;i<11;i++)reds.push(cube(RX,G-SR*(i+1),SR,"--red",i+1,gR));
// garaiera-etiketak
function htag(xx,c){const g=S("g",{class:"mv"},svg);
  S("path",{d:`M${xx} 0 l10 -11 h62 v22 h-62 z`,style:`fill:var(${c});stroke:var(--ink);stroke-width:1.3`},g);
  const t=T("",{x:xx+44,y:5,"text-anchor":"middle","font-size":13,style:"fill:var(--sheet);font-weight:500"},g);
  return {g,t};}
const tagB=htag(BX+SB+D+6,"--blue"),tagR=htag(RX+SR+D+6,"--red");
const labB=T("urdina · 55 mm",{x:BX+SB/2,y:G+28,"text-anchor":"middle",class:"body","font-size":14},svg);
const labR=T("gorria · 45 mm",{x:RX+SR/2,y:G+28,"text-anchor":"middle",class:"body","font-size":14},svg);

const NB=[1,4,5,9,9,9,9],NR=[1,4,6,11,11,11,11];
let pb=0,pr=0;
function stack(arr,n,prev){arr.forEach((g,i)=>{const on=i<n;g.style.transitionDelay=(on&&i>=prev?(i-prev)*130:0)+"ms";g.style.opacity=on?1:0;g.style.transform=on?"translate(0px,0px)":"translate(0px,-60px)";});}
function place(tag,h,s){tag.t.textContent=h+" mm";tag.g.style.transitionDelay="0ms";tag.g.style.transform=`translate(0px,${G-h+s/2}px)`;}

const M55=[55,110,165,220,275,330,385,440,495];
const M45=[45,90,135,180,225,270,315,360,405,450,495];

const steps=[
 {h:"Bi kubo mota",t:7000,
  p:"Kubo urdinaren ertzak <b>55 mm</b> ditu; gorriarenak, <b>45 mm</b>. Kolore bakoitzeko zutabe bat egingo dugu, eta biek <b>garaiera bera</b> izan behar dute."},
 {h:"Pilatzen hasi",t:8500,
  p:"Kubo bakoitzak bere ertza gehitzen dio zutabeari. Garaierak 55-en eta 45-en <b>multiploak</b> dira.",
  b:mrow("urdina",chips(M55.slice(0,4)))+mrow("gorria",chips(M45.slice(0,4)))},
 {h:"Ia, baina ez",t:8000,
  p:"5 kubo urdinekin 275 mm; 6 gorrirekin 270 mm. 5 mm-ko aldea dago oraindik. Jarraitu behar dugu.",
  b:mrow("urdina",chips(M55.slice(0,5)))+mrow("gorria",chips(M45.slice(0,6)))},
 {h:"Garaiera bera!",t:8500,
  p:"9 kubo urdinekin eta 11 gorrirekin, bi zutabeek <b>495 mm</b> neurtzen dute. Lehen aldiz dira berdinak.",
  b:mrow("urdina",chips(M55,[],495))+mrow("gorria",chips(M45,[],495))},
 {h:"Multiplo komun txikiena",t:9000,
  p:"495 55-en multiploa da, eta 45-en multiploa ere bai: <b>multiplo komuna</b>. Kubo gutxien nahi ditugunez, txikiena behar dugu: <b>mkt(55, 45)</b>.",
  b:mrow("55",chips(M55,[],495))+mrow("45",chips(M45,[],495))+`<div class="eq">mkt(55, 45) = <b>495</b></div>`},
 {h:"mkt faktorizazioarekin",t:9500,
  p:"Faktore <b>komunak eta ez-komunak</b> hartzen ditugu, <b>berretzaile handienarekin</b>.",
  b:`<div class="ladders">${ladder(55,[5,11],"55 = 5 · 11")}${ladder(45,[3,3,5],"45 = 3<sup>2</sup> · 5")}</div><div class="eq">mkt(55, 45) = <span class="pk">3<sup>2</sup></span> · <span class="pk">5</span> · <span class="pk">11</span> = 9 · 5 · 11 = <b>495</b></div><div class="rule">mkt: faktore komunak eta ez-komunak, berretzaile handienarekin.</div>`},
 {h:"Emaitza",t:9000,
  p:"495 : 55 = <b>9 kubo urdin</b> eta 495 : 45 = <b>11 kubo gorri</b>. Bi zutabeek 495 mm (49,5 cm) neurtuko dute.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">9 urdin · 11 gorri</span><span>Zutabe bakoitza: 495 mm = 49,5 cm</span></div>`}
];

Player(steps,k=>{
  stack(blues,NB[k],pb);stack(reds,NR[k],pr);pb=NB[k];pr=NR[k];
  place(tagB,NB[k]*SB,SB);place(tagR,NR[k]*SR,SR);
  show(match,k>=3,k===3?1400:0);
  labB.textContent=k===6?"9 kubo urdin":"urdina · 55 mm";
  labR.textContent=k===6?"11 kubo gorri":"gorria · 45 mm";
});
