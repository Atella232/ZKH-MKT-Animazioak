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
