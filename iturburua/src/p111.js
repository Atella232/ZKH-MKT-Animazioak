const svg=document.getElementById("scene");
const NP=240,NY=225;
const base={sw:8,sh:8,g:1,pad:3,bg:5,w:290,y:48};
const AP=Object.assign({x:20},base),AY=Object.assign({x:330},base);
T("Urdaiazpikoa · 240",{x:165,y:28,"text-anchor":"middle",class:"body","font-size":15},svg);
T("Tortilla · 225",{x:475,y:28,"text-anchor":"middle",class:"body","font-size":15},svg);
S("line",{x1:320,y1:14,x2:320,y2:250,style:"stroke:var(--line);stroke-width:1.5;stroke-dasharray:4 4"},svg);
const boxP=S("g",{},svg),boxY=S("g",{},svg),itemG=S("g",{},svg);
function sand(c){const g=S("g",{class:"mv",style:"opacity:0;transform:translate(320px,120px)"},itemG);
  S("path",{d:"M0 0L8 8H0Z",style:`fill:var(${c});stroke:var(--ink);stroke-width:.7;stroke-linejoin:round`},g);return g;}
const P=[],Y=[];for(let i=0;i<NP;i++)P.push(sand("--pink"));for(let i=0;i<NY;i++)Y.push(sand("--yellow"));
const cap=caption(svg,70,268,500);
function group(k){
  const lp=packGroups(NP,k,Object.assign({ic:k>=20?20:5},AP)),ly=packGroups(NY,k,Object.assign({ic:k>=20?20:5},AY));
  moveItems(P,lp,2);moveItems(Y,ly,2);
  drawBoxes(boxP,lp,{hide:k>=NY,leftLabel:lp.r+" soberan"});drawBoxes(boxY,ly,{hide:k>=NY,leftLabel:ly.r+" soberan"});
}
const D240=[1,2,3,4,5,6,8,10,12,15,16,20,24,30,40,48,60,80,120,240],D225=[1,3,5,9,15,25,45,75,225],COM=[1,3,5,15];
const steps=[
 {h:"Bi zapore, kutxa berdinak",t:8000,
  p:"240 urdaiazpiko-ogitarteko eta 225 tortilla-ogitarteko. Kutxa guztiak <b>tamaina berekoak</b>, <b>zaporeak nahastu gabe</b>, eta kutxa bakoitzean <b>ahalik eta ogitarteko gehien</b>."},
 {h:"Proba: 10 ogitarteko kutxako",t:9000,
  p:"Urdaiazpikoekin ondo doa: 24 kutxa. Tortillekin, ordea, 22 kutxa bete eta <b>5 soberan</b> geratzen dira. 10-ek ez du 225 zatitzen.",
  b:`<div class="eq">240 : 10 = 24 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">225 : 10 = 22 &nbsp;<span class="bad">hondarra 5</span></div>`},
 {h:"Proba: 5 ogitarteko kutxako",t:9000,
  p:"Orain biak zehatz: 48 eta 45 kutxa. Baina <b>93 kutxa</b> txiki dira. Handiagoak nahi ditugu.",
  b:`<div class="eq">240 : 5 = 48 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">225 : 5 = 45 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Zatitzaile komunak",t:10000,
  p:"Kutxako kopuruak 240 eta 225 zatitu behar ditu: <b>zatitzaile komuna</b>. Ahalik eta handiena nahi dugu: <b>zkh(240, 225)</b>.",
  b:mrow("240",chips(D240,COM,15))+mrow("225",chips(D225,COM,15))+mrow("biak",chips(COM,COM,15))},
 {h:"Faktore lehenak",t:9000,
  p:"Bi zenbakiak faktore lehenetan deskonposatzen ditugu.",
  b:`<div class="ladders">${ladder(240,[2,2,2,2,3,5],"240 = 2<sup>4</sup> · 3 · 5")}${ladder(225,[3,3,5,5],"225 = 3<sup>2</sup> · 5<sup>2</sup>")}</div>`},
 {h:"zkh kalkulatu",t:9000,
  p:"<b>Faktore komunak</b> bakarrik, <b>berretzaile txikienarekin</b>. Komunak 3 eta 5 dira, biak 1 berretzailearekin.",
  b:`<div class="eq">240 = <span class="off">2<sup>4</sup></span> · <span class="pk">3</span> · <span class="pk">5</span></div><div class="eq">225 = 3<sup>2</sup> · 5<sup>2</sup></div><div class="eq">zkh(240, 225) = 3 · 5 = <b>15</b></div><div class="rule">zkh: faktore komunak bakarrik, berretzaile txikienarekin.</div>`},
 {h:"Kutxak bete",t:9000,
  p:"15 ogitarteko kutxa bakoitzean: 240 : 15 = <b>16 kutxa</b> urdaiazpikoz, eta 225 : 15 = <b>15 kutxa</b> tortillaz.",
  b:`<div class="eq">240 : 15 = 16 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">225 : 15 = 15 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">16 + 15 = <b>31 kutxa</b></div>`},
 {h:"Emaitza",t:9000,
  p:"Kutxa bakoitzean <b>15 ogitarteko</b> egongo dira, eta guztira <b>31 kutxa</b> beharko dira.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">15 ogitarteko · 31 kutxa</span><span>zkh(240, 225) = 15</span></div>`}
];
const CAP=["240 + 225 = 465 ogitarteko","10 kutxako: 24 kutxa  |  22 kutxa + 5 soberan","5 kutxako: 48 + 45 = 93 kutxa","zkh(240, 225) = ?","240 = 2⁴ · 3 · 5     225 = 3² · 5²","zkh(240, 225) = 15","15 kutxako: 16 + 15 = 31 kutxa","31 kutxa, 15 ogitarteko bakoitzean"];
Player(steps,k=>{
  cap.textContent=CAP[k];
  group(k===1?10:k===2?5:k>=5?15:1000);
});
