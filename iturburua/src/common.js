const NS="http://www.w3.org/2000/svg";
const REDUCE=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
function S(tag,attrs,parent){const e=document.createElementNS(NS,tag);if(attrs)for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e;}
function T(txt,attrs,parent){const e=S("text",attrs,parent);e.textContent=txt;return e;}
function show(e,on,delay){e.style.transitionDelay=((on&&delay)||0)+"ms";e.style.opacity=on?"1":"0";}
function pop(e,on,delay){e.style.transitionDelay=((on&&delay)||0)+"ms";e.style.opacity=on?"1":"0";e.style.transform=on?"scale(1)":"scale(.4)";}
function chips(list,hit,win,more){return list.map(n=>{let c="chip";if(n===win)c+=" win";else if(hit&&hit.indexOf(n)>-1)c+=" hit";return `<span class="${c}">${n}</span>`;}).join("")+(more?'<span class="chip">…</span>':"");}
function mrow(label,html){return `<div class="row"><span class="lab">${label}</span>${html}</div>`;}
function ladder(n,divs,eq){let h="",x=n;for(const d of divs){h+=`<span>${x}</span><span>${d}</span>`;x/=d;}h+="<span>1</span><span></span>";return `<div class="lad"><div class="ladder">${h}</div><div class="eq">${eq}</div></div>`;}
function Player(steps,apply){
  const $=id=>document.getElementById(id);
  const panel=$("panel"),dots=$("dots"),bPrev=$("prev"),bNext=$("next"),bPlay=$("play"),bReset=$("reset"),bar=$("timer");
  let k=0,playing=false,timer=null;
  steps.forEach((s,i)=>{const d=document.createElement("button");d.type="button";d.className="dot";d.setAttribute("aria-label",(i+1)+". urratsa");d.addEventListener("click",()=>go(i));dots.appendChild(d);});
  function schedule(){
    clearTimeout(timer);bar.classList.remove("run");void bar.offsetWidth;
    if(!playing)return;
    if(k>=steps.length-1){setPlaying(false);return;}
    const t=steps[k].t||7500;bar.firstElementChild.style.animationDuration=t+"ms";bar.classList.add("run");
    timer=setTimeout(()=>go(k+1),t);
  }
  function go(i){
    k=Math.max(0,Math.min(steps.length-1,i));const s=steps[k];
    $("stepNum").textContent=`${k+1}. urratsa · ${steps.length}`;
    $("stepTitle").innerHTML=s.h;$("stepText").innerHTML=s.p;
    const b=$("board");b.innerHTML=s.b||"";b.hidden=!s.b;
    panel.classList.remove("in");void panel.offsetWidth;panel.classList.add("in");
    [...dots.children].forEach((d,j)=>{d.className="dot"+(j===k?" on":j<k?" done":"");if(j===k)d.setAttribute("aria-current","step");else d.removeAttribute("aria-current");});
    bPrev.disabled=k===0;bNext.disabled=k===steps.length-1;
    apply(k);schedule();
  }
  function setPlaying(v){
    playing=v;bPlay.querySelector("span").textContent=v?"Pausatu":"Erreproduzitu";
    bPlay.querySelector(".i-play").hidden=v;bPlay.querySelector(".i-pause").hidden=!v;
    if(v&&k>=steps.length-1){go(0);return;}
    schedule();
  }
  bPrev.addEventListener("click",()=>go(k-1));
  bNext.addEventListener("click",()=>go(k+1));
  bPlay.addEventListener("click",()=>setPlaying(!playing));
  bReset.addEventListener("click",()=>go(0));
  document.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight")go(k+1);
    else if(e.key==="ArrowLeft")go(k-1);
    else if(e.key===" "&&!(e.target&&e.target.closest&&e.target.closest("button"))){e.preventDefault();setPlaying(!playing);}
  });
  go(0);
}
function packGroups(N,k,o){
  const s=o.sw,h=o.sh,g=o.g==null?2:o.g,pad=o.pad==null?4:o.pad,bg=o.bg==null?6:o.bg;
  const ic=Math.min(o.ic||k,k),ir=Math.ceil(k/ic);
  const bw=ic*s+(ic-1)*g+2*pad,bh=ir*h+(ir-1)*g+2*pad;
  const per=Math.max(1,Math.floor((o.w+bg)/(bw+bg)));
  const nb=Math.floor(N/k),r=N-nb*k,tot=nb+(r?1:0);
  const usedW=Math.min(tot,per)*(bw+bg)-bg;
  const x0=o.x+(o.center?(o.w-usedW)/2:0);
  const box=b=>({x:x0+(b%per)*(bw+bg),y:o.y+Math.floor(b/per)*(bh+bg),w:bw,h:bh});
  const boxes=[];for(let b=0;b<nb;b++)boxes.push(box(b));
  let left=null;
  if(r){left=box(nb);const lc=Math.min(r,ic),lr=Math.ceil(r/ic);left.w=lc*s+(lc-1)*g+2*pad;left.h=lr*h+(lr-1)*g+2*pad;}
  const pos=[];
  for(let i=0;i<N;i++){const b=Math.floor(i/k),j=i%k,B=box(b);pos.push([B.x+pad+(j%ic)*(s+g),B.y+pad+Math.floor(j/ic)*(h+g)]);}
  return {pos,boxes,left,nb,r,height:Math.ceil(tot/per)*(bh+bg)-bg};
}
function drawBoxes(g,L,o){
  o=o||{};g.innerHTML="";const els=[];
  if(!o.hide)for(const B of L.boxes)els.push(S("rect",{x:B.x-1,y:B.y-1,width:B.w+2,height:B.h+2,rx:o.rx==null?4:o.rx,class:"fade",style:`fill:${o.fill||"var(--paper)"};stroke:${o.stroke||"var(--ink)"};stroke-width:${o.width||1.5};opacity:0`},g));
  if(L.left&&!o.hide){
    const B=L.left;
    els.push(S("rect",{x:B.x-3,y:B.y-3,width:B.w+6,height:B.h+6,rx:5,class:"fade",style:"fill:none;stroke:var(--red-d);stroke-width:2.2;stroke-dasharray:5 3;opacity:0"},g));
    if(o.leftLabel)els.push(T(o.leftLabel,{x:B.x+B.w/2,y:B.y+B.h+18,"text-anchor":"middle",class:"disp fade","font-size":13,style:"fill:var(--red-d);opacity:0"},g));
  }
  requestAnimationFrame(()=>requestAnimationFrame(()=>els.forEach(e=>show(e,true,o.delay==null?650:o.delay))));
}
function moveItems(items,L,stagger){
  items.forEach((it,i)=>{const p=L.pos[i];it.style.transitionDelay=(i*(stagger||3))+"ms";it.style.opacity=1;it.style.transform=`translate(${p[0]}px,${p[1]}px)`;});
}
function caption(svg,x,y,w){
  S("rect",{x,y,width:w,height:32,rx:16,style:"fill:var(--ink)"},svg);
  return T("",{x:x+w/2,y:y+21,"text-anchor":"middle","font-size":14.5,style:"fill:var(--sheet)"},svg);
}
