const svg=document.getElementById("scene");
const SH=236,BW=52,BH=12,CX=320;
const COLS=["--blue","--pink","--yellow","--green","--red","--violet"];
// izenburu handia (riso erregistro-desbiderapenarekin)
const eqBack=T("",{x:CX+3,y:52,"text-anchor":"middle",class:"disp","font-size":28,style:"fill:var(--pink);opacity:.7"},svg);
const eqFront=T("",{x:CX,y:50,"text-anchor":"middle",class:"disp","font-size":28,style:"fill:var(--blue)"},svg);
function setEq(s){eqBack.textContent=s;eqFront.textContent=s;}
// apala
S("rect",{x:14,y:SH,width:612,height:12,rx:2,style:"fill:var(--ink)"},svg);
S("rect",{x:30,y:SH+12,width:10,height:16,style:"fill:var(--ink)"},svg);
S("rect",{x:600,y:SH+12,width:10,height:16,style:"fill:var(--ink)"},svg);
// soberan-kutxa
const left=S("g",{class:"fade",style:"opacity:0"},svg);
const leftBox=S("rect",{x:0,y:0,width:72,height:90,rx:8,style:"fill:none;stroke:var(--red-d);stroke-width:2.5;stroke-dasharray:6 4"},left);
const leftLab=T("6 soberan",{x:0,y:0,"text-anchor":"middle",class:"disp","font-size":15,style:"fill:var(--red-d)"},left);
// liburuak
const books=[];
for(let b=0;b<36;b++){
  const g=S("g",{class:"mv",style:`opacity:0;transform:translate(${CX-BW/2}px,${SH-BH}px)`},svg);
  S("rect",{x:0,y:0,width:BW,height:BH,rx:2,style:`fill:var(${COLS[b%6]});stroke:var(--ink);stroke-width:1.2`},g);
  S("rect",{x:6,y:2,width:3,height:BH-4,style:"fill:var(--sheet);opacity:.75"},g);
  S("rect",{x:BW-10,y:2,width:3,height:BH-4,style:"fill:var(--sheet);opacity:.75"},g);
  books.push(g);
}
// etiketak apalaren azpian
const labs=[];for(let i=0;i<9;i++)labs.push(T("",{x:0,y:SH+44,"text-anchor":"middle",class:"disp","font-size":15,style:"opacity:0"},svg));

function layout(n,gap){const tot=n*BW+(n-1)*gap;return i=>CX-tot/2+i*(BW+gap);}
function arrange(assign,n,gap,labels){
  const sx=layout(n,gap);
  books.forEach((g,b)=>{const a=assign(b);
    if(!a){g.style.transitionDelay="0ms";g.style.opacity=0;return;}
    g.style.transitionDelay=(b*18)+"ms";g.style.opacity=1;
    g.style.transform=`translate(${sx(a[0])}px,${SH-BH*(a[1]+1)}px)`;});
  labs.forEach((t,i)=>{const on=labels&&i<labels.length;t.style.opacity=on?1:0;if(on){t.textContent=labels[i];t.setAttribute("x",sx(i)+BW/2);}});
  return sx;
}
const steps=[
 {h:"Hiru pila mota",t:7500,
  p:"Liburuak <b>4ko</b>, <b>6ko</b> edo <b>9ko</b> piletan jar daitezke, eta ez da inoiz libururik soberan geratzen. Zenbat liburu dira, gutxienez?"},
 {h:"Proba: 24 liburu",t:10000,
  p:"24 4-ren multiploa da (6 pila) eta 6-ren multiploa ere bai (4 pila). Baina 9ko piletan 2 pila osatzen dira eta <b>6 liburu soberan</b> geratzen dira. 24 ez da baliagarria.",
  b:`<div class="eq">24 : 4 = 6 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">24 : 6 = 4 &nbsp;<span class="ok">hondarra 0</span></div><div class="eq">24 : 9 = 2 &nbsp;<span class="bad">hondarra 6</span></div>`},
 {h:"Hiruren multiploa",t:10000,
  p:"Liburu kopurua 4-ren, 6-ren eta 9-ren multiploa izan behar da aldi berean: <b>multiplo komuna</b>. Gutxienez galdetzen digutenez, txikiena: <b>mkt(4, 6, 9)</b>. Horiz: bi zerrendatan agertzen direnak. Arrosaz: hiruretan.",
  b:mrow("4",chips([4,8,12,16,20,24,28,32,36],[12,24],36))+mrow("6",chips([6,12,18,24,30,36],[12,18,24],36))+mrow("9",chips([9,18,27,36],[18],36))},
 {h:"mkt faktorizazioarekin",t:9500,
  p:"Faktore <b>komunak eta ez-komunak</b>, <b>berretzaile handienarekin</b>: 2-ren handiena 2² da, eta 3-rena 3².",
  b:`<div class="eq">4 = 2<sup>2</sup></div><div class="eq">6 = 2 · 3</div><div class="eq">9 = 3<sup>2</sup></div><div class="eq">mkt(4, 6, 9) = <span class="pk">2<sup>2</sup></span> · <span class="pk">3<sup>2</sup></span> = 4 · 9 = <b>36</b></div><div class="rule">mkt: faktore komunak eta ez-komunak, berretzaile handienarekin.</div>`},
 {h:"Egiaztatu: 4ko pilak",t:7000,
  p:"36 : 4 = 9. <b>Bederatzi pila</b>, eta ez da libururik soberan geratzen.",
  b:`<div class="eq">36 : 4 = 9 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Egiaztatu: 6ko pilak",t:7000,
  p:"Liburu berberak berrantolatuta: 36 : 6 = 6. <b>Sei pila</b>, soberarik gabe.",
  b:`<div class="eq">36 : 6 = 6 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Egiaztatu: 9ko pilak",t:7000,
  p:"Eta berriro: 36 : 9 = 4. <b>Lau pila</b>, soberarik gabe.",
  b:`<div class="eq">36 : 9 = 4 &nbsp;<span class="ok">hondarra 0</span></div>`},
 {h:"Emaitza",t:8000,
  p:"Apalategian gutxienez <b>36 liburu</b> daude. Beste aukera batzuk 72, 108… izango lirateke (36-ren multiploak), baina txikiena 36 da.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">36 liburu</span><span>mkt(4, 6, 9) = 2<sup>2</sup> · 3<sup>2</sup> = 36</span></div>`}
];

Player(steps,k=>{
  show(left,k===1,k===1?900:0);
  if(k===0){
    arrange(b=>b<4?[0,b]:b<10?[1,b-4]:b<19?[2,b-10]:null,3,110,["4ko pila","6ko pila","9ko pila"]);
    setEq("4ko, 6ko edo 9ko pilak");
  }else if(k===1){
    const sx=arrange(b=>b<18?[Math.floor(b/9),b%9]:b<24?[2,b-18]:null,3,70,["9","9",""]);
    leftBox.setAttribute("x",sx(2)-10);leftBox.setAttribute("y",SH-6*BH-10);leftBox.setAttribute("height",6*BH+10);
    leftLab.setAttribute("x",sx(2)+BW/2);leftLab.setAttribute("y",SH-6*BH-18);
    setEq("24 liburu?");
  }else if(k===2||k===3){
    arrange(()=>null,1,0,null);
    setEq(k===2?"mkt(4, 6, 9) = ?":"mkt(4, 6, 9) = 36");
  }else if(k===4){
    arrange(b=>[Math.floor(b/4),b%4],9,16,Array(9).fill("4"));setEq("9 pila × 4 = 36");
  }else if(k===5){
    arrange(b=>[Math.floor(b/6),b%6],6,34,Array(6).fill("6"));setEq("6 pila × 6 = 36");
  }else{
    arrange(b=>[Math.floor(b/9),b%9],4,60,Array(4).fill("9"));setEq(k===7?"36 liburu":"4 pila × 9 = 36");
  }
});
