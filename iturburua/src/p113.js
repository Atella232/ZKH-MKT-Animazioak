const svg=document.getElementById("scene");
const N=32,AREA={x:20,y:62,w:600,sw:14,sh:19,g:3,pad:6,bg:12,center:true};
const head=T("32 ikasle",{x:320,y:34,"text-anchor":"middle",class:"disp","font-size":22,style:"fill:var(--blue)"},svg);
const boxG=S("g",{},svg),itemG=S("g",{},svg);
const COLS=["--blue","--pink","--green","--violet","--red"];
const items=[];
for(let i=0;i<N;i++){
  const g=S("g",{class:"mv",style:"opacity:0;transform:translate(320px,140px)"},itemG);
  const c=COLS[i%COLS.length];
  S("circle",{cx:7,cy:4.5,r:4.2,style:`fill:var(${c});stroke:var(--ink);stroke-width:1`},g);
  S("path",{d:"M1 19V14.5C1 11.5 3.5 10 7 10S13 11.5 13 14.5V19Z",style:`fill:var(${c});stroke:var(--ink);stroke-width:1`},g);
  items.push(g);
}
const cap=caption(svg,70,196,500);
const IC={1:16,2:2,3:3,4:4,8:4,16:8,32:16};
function arrange(k,label){
  const L=packGroups(N,k,Object.assign({ic:IC[k]},AREA));
  moveItems(items,L,8);drawBoxes(boxG,L,{hide:k===N,leftLabel:label,rx:10});
}
let cyc=null;
const steps=[
 {h:"32 ikasle, taldeka",t:7000,
  p:"Zientzia-proiektu baterako taldeak egin behar dira. Talde bakoitzak <b>gutxienez 2 kide</b> izan behar ditu: inor ez da bakarrik geratu behar."},
 {h:"Baldintza ezkutua: talde berdinak",t:8500,
  p:"Zatigarritasunaren gaian gaude: talde guztiek <b>kide kopuru bera</b> izango dute, eta ikasle guztiek talde batean egon behar dute. Beraz, kideen kopuruak 32 zatitu behar du."},
 {h:"Proba: 3 kideko taldeak",t:8500,
  p:"32 : 3 = 10, eta <b>2 ikasle soberan</b> geratzen dira. 3-k ez du 32 zatitzen.",
  b:`<div class="eq">32 = 3 · 10 + 2 &nbsp;<span class="bad">hondarra 2</span></div>`},
 {h:"32-ren zatitzaileak",t:9500,
  p:"32 = 2<sup>5</sup>. Zatitzaileak 2-ren berreturak dira: 1, 2, 4, 8, 16 eta 32. Horiek dira talde bakoitzeko kide kopuru posibleak.",
  b:`<div class="ladders">${ladder(32,[2,2,2,2,2],"32 = 2<sup>5</sup>")}</div>`+mrow("32",chips([1,2,4,8,16,32]))},
 {h:"Gehienez: 2 kideko taldeak",t:9000,
  p:"Talde asko izateko, taldeak ahalik eta txikienak: 1 kideko taldeak ez (bakarrik geratuko lirateke), beraz <b>2 kide</b>. 32 : 2 = <b>16 talde</b>.",
  b:`<div class="eq">32 : 2 = 16 talde</div><div class="eq"><span class="off">32 : 1 = 32 → bakarrik</span> <span class="bad">✗</span></div>`},
 {h:"Beste aukerak",t:12000,
  p:"4 kideko <b>8 talde</b>, edo 8 kideko <b>4 talde</b>. Biak baliagarriak dira, baina ez dira muturrak.",
  b:`<div class="eq">32 : 4 = 8 talde</div><div class="eq">32 : 8 = 4 talde</div>`},
 {h:"Gutxienez: 16 kideko taldeak",t:9000,
  p:"Talde gutxi izateko, taldeak ahalik eta handienak. 32 kideko talde bakarra gela osoa da, ez da taldeak egitea. Beraz, <b>16 kide</b>: 32 : 16 = <b>2 talde</b>.",
  b:`<div class="eq">32 : 16 = 2 talde</div><div class="eq"><span class="off">32 : 32 = 1 → gela osoa</span> <span class="bad">✗</span></div>`},
 {h:"Emaitza",t:9000,
  p:"Gutxienez <b>2 talde</b> (16 kidekoak) eta gehienez <b>16 talde</b> (2 kidekoak) osa daitezke.",
  b:`<div class="result"><span class="tag">Emaitza</span><span class="big">2 eta 16 talde</span><span>32 = 2<sup>5</sup> · zatitzaileak: 1, 2, 4, 8, 16, 32</span></div>`}
];
const CAP=["32 ikasle","Talde guztiak berdinak","10 talde · 3 kide · 2 soberan","32 = 2⁵","16 talde · 2 kide","","2 talde · 16 kide","Gutxienez 2 · gehienez 16"];
Player(steps,k=>{
  clearInterval(cyc);cap.textContent=CAP[k];
  if(k<=1){arrange(32);head.textContent="32 ikasle";}
  else if(k===2){arrange(3,"2 soberan");head.textContent="3 kideko taldeak?";}
  else if(k===3){arrange(32);head.textContent="32 = 2⁵";}
  else if(k===4){arrange(2);head.textContent="16 talde × 2 kide";}
  else if(k===5){let i=0;const tick=()=>{const s=i%2?8:4;arrange(s);head.textContent=`${32/s} talde × ${s} kide`;cap.textContent=`${32/s} talde · ${s} kide`;i++;};tick();cyc=setInterval(tick,2800);}
  else if(k===6){arrange(16);head.textContent="2 talde × 16 kide";}
  else{arrange(16);head.textContent="2 eta 16 talde";}
});
