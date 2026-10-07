const svg=document.getElementById("scene");
const N=84,AREA={x:20,y:52,w:600,sw:10,sh:22,g:2,pad:4,bg:7,center:true};
const head=T("84 botila",{x:320,y:32,"text-anchor":"middle",class:"disp","font-size":22,style:"fill:var(--blue)"},svg);
const boxG=S("g",{},svg),itemG=S("g",{},svg);
const items=[];
for(let i=0;i<N;i++){
  const g=S("g",{class:"mv",style:"opacity:0;transform:translate(320px,150px)"},itemG);
  S("path",{d:"M3.5 0h3v4c2.5 1 3.5 3 3.5 5.5V21a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V9.5C0 7 1 5 3.5 4Z",style:"fill:var(--green);stroke:var(--ink);stroke-width:.9"},g);
  S("rect",{x:1.5,y:11,width:7,height:5,style:"fill:var(--sheet);opacity:.85"},g);
  items.push(g);
}
const cap=caption(svg,70,232,500);
const DIV=[1,2,3,4,6,7,12,14,21,28,42,84];
const icFor=k=>Math.min(k,Math.ceil(Math.sqrt(k*2.4)));
function arrange(k,label){
  const L=packGroups(N,k,Object.assign({ic:k===N?14:icFor(k)},AREA));
  moveItems(items,L,3);drawBoxes(boxG,L,{leftLabel:label});
}
let cyc=null;
const pairs=[[1,84],[2,42],[3,28],[4,21],[6,14],[7,12]];
const pairChips=pairs.map(([a,b])=>`<span class="chip">${a} · ${b}</span>`).join("");

const steps=[
 {h:"84 botila, kutxetan",t:7000,
  p:"Botila guztiak kutxetan sartu behar dira, <b>kutxa bakoitzean kopuru bera</b> eta <b>bat ere soberan geratu gabe</b>. Zenbat modu daude?"},
 {h:"Proba: 8 botila kutxa bakoitzean",t:8500,
  p:"84 : 8 = 10, eta <b>4 botila soberan</b> geratzen dira. 8 ez da 84-ren zatitzailea, beraz ez du balio.",
  b:`<div class="eq">84 = 8 · 10 + 4 &nbsp;<span class="bad">hondarra 4</span></div>`},
 {h:"Proba: 12 botila kutxa bakoitzean",t:8500,
  p:"84 : 12 = 7, zehatz. <b>7 kutxa</b>, 12 botilarekin bakoitza. Modu bat aurkitu dugu!",
  b:`<div class="eq">84 = 12 · 7 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Modu guztiak",t:21000,
  p:"Botila kopuruak kutxa bakoitzean <b>84-ren zatitzailea</b> izan behar du. Ikusi animazioa: zatitzaile bakoitzak antolatzeko modu bat ematen du.",
  b:mrow("84",chips(DIV))},
 {h:"Faktore lehenak",t:9000,
  p:"Zatitzaileak ez ahazteko, 84 <b>faktore lehenetan</b> deskonposatzen dugu.",
  b:`<div class="ladders">${ladder(84,[2,2,3,7],"84 = 2<sup>2</sup> · 3 · 7")}</div>`},
 {h:"Zatitzaileak binaka",t:10000,
  p:"Biderkatuta 84 ematen duten <b>bikoteak</b> bilatzen ditugu. Bikote bakoitzak bi modu ematen ditu: adibidez, 4 kutxa 21 botilarekin, edo 21 kutxa 4 botilarekin.",
  b:`<div class="row">${pairChips}</div><div class="eq">6 bikote · 2 = <b>12 modu</b></div><div class="rule">Trikimailua: (2+1) · (1+1) · (1+1) = 12 zatitzaile. Berretzaile bakoitzari 1 gehitu eta biderkatu.</div>`},
 {h:"Emaitza",t:9000,
  p:"84-k <b>12 zatitzaile</b> ditu, beraz <b>12 modutara</b> bana daitezke botilak. Kutxa bakarra (84 botila) eta 84 kutxa (botila bana) kontuan hartzen ez badira, 10 modu geratzen dira.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">12 modu</span><span>1, 2, 3, 4, 6, 7, 12, 14, 21, 28, 42, 84</span></div>`}
];
const CAP=["84 botila","10 kutxa · 8 botila · 4 soberan","7 kutxa · 12 botila","","84 = 2² · 3 · 7","4 kutxa · 21 botila  edo  21 kutxa · 4 botila","12 modu"];

Player(steps,k=>{
  clearInterval(cyc);
  cap.textContent=CAP[k];
  if(k===0){
    const L=packGroups(N,N,Object.assign({},AREA,{ic:21}));moveItems(items,L,6);drawBoxes(boxG,L,{hide:true});head.textContent="84 botila";
  }else if(k===1){arrange(8,"4 soberan");head.textContent="8 botila kutxako?";}
  else if(k===2){arrange(12);head.textContent="12 botila kutxako";}
  else if(k===3){
    let i=0;const tick=()=>{const d=DIV[i%DIV.length];arrange(d);head.textContent=`${84/d} kutxa × ${d} botila`;cap.textContent=`${(i%DIV.length)+1}. modua · ${84/d} · ${d} = 84`;i++;};
    tick();cyc=setInterval(tick,1700);
  }else{arrange(21);head.textContent=k===6?"12 modu":"4 kutxa × 21 botila";}
});
