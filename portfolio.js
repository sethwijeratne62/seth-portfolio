(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>Array.from(document.querySelectorAll(s));const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;history.scrollRestoration='manual';if(!window.gsap||!window.ScrollTrigger){$('.opening').remove();return}gsap.registerPlugin(ScrollTrigger);if(window.SplitText)gsap.registerPlugin(SplitText);let lenis;if(window.Lenis&&!reduced){lenis=new Lenis({lerp:.11,wheelMultiplier:.8});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}function toTop(){lenis?lenis.scrollTo(0,{duration:1.25}):window.scrollTo({top:0,behavior:reduced?'instant':'smooth'})}$('.brand').addEventListener('click',toTop);$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=$(a.getAttribute('href'));if(target){e.preventDefault();if(lenis)lenis.scrollTo(target,{offset:-70,duration:1.25});else target.scrollIntoView({behavior:reduced?'instant':'smooth'})}}));let opening;function playIntro(){window.scrollTo(0,0);lenis?.scrollTo(0,{immediate:true,force:true});lenis?.stop();const overlay=$('.opening'),cover=$('.cover-svg path'),signature=$('.opening-signature'),traces=$$('.ink-trace');opening?.kill();const length=cover.getTotalLength();gsap.set(overlay,{display:'block',autoAlpha:1});gsap.set(cover,{strokeDasharray:length,strokeDashoffset:0,strokeWidth:1550});gsap.set(signature,{autoAlpha:1,y:0});const penLengths=traces.map(path=>path.getTotalLength());traces.forEach((path,i)=>gsap.set(path,{autoAlpha:0,strokeDasharray:penLengths[i],strokeDashoffset:penLengths[i]}));const letterLength=penLengths[0]+penLengths[1];opening=gsap.timeline({onComplete:()=>{gsap.set(overlay,{display:'none'});lenis?.start();ScrollTrigger.refresh()}});opening.set(traces[0],{autoAlpha:1}).to(traces[0],{strokeDashoffset:0,duration:.75,ease:'none'}).set(traces[1],{autoAlpha:1}).to(traces[1],{strokeDashoffset:0,duration:1.255,ease:'none'}).set($('.final-stroke'),{autoAlpha:1}).to($('.final-stroke'),{strokeDashoffset:0,duration:.65,ease:'power1.inOut'}).to(signature,{autoAlpha:0,y:0,duration:.65,delay:.45}).to(cover,{strokeDashoffset:-length,strokeWidth:45,duration:1.5,ease:'power1.inOut'},'-=.2').fromTo('.hero-labels',{opacity:0,y:30},{opacity:1,y:0,duration:.8},'-=.6')}

function setupInkButtons(){
if(reduced||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
const ns='http://www.w3.org/2000/svg';
$$('.button').forEach((button,i)=>{
const label=button.textContent.trim(),svg=document.createElementNS(ns,'svg');svg.classList.add('scribble-overlay');svg.setAttribute('aria-hidden','true');
const maskId='ink-hover-'+i;
function layout(){const w=button.clientWidth,h=button.clientHeight;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.innerHTML=`<defs><mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}"><path d="M0 30 C30 0 75 15 25 60 S90 15 110 25 S55 95 105 70 S175 5 155 55 S180 80 205 35" transform="scale(${w/200} ${h/100})" fill="none" stroke="white" stroke-width="0" stroke-linecap="round"/></mask></defs><foreignObject width="${w}" height="${h}" mask="url(#${maskId})"><div xmlns="http://www.w3.org/1999/xhtml" class="scribble-label"></div></foreignObject>`;svg.querySelector('.scribble-label').textContent=label;}
button.append(svg);layout();let tween;
button.addEventListener('pointerenter',()=>{const p=svg.querySelector('path'),l=p.getTotalLength();tween?.kill();gsap.set(p,{strokeDasharray:l,strokeDashoffset:l,strokeWidth:0});tween=gsap.to(p,{strokeDashoffset:0,strokeWidth:125,duration:.8,ease:'power2.inOut'});});
button.addEventListener('pointerleave',()=>{const p=svg.querySelector('path');tween?.kill();tween=gsap.to(p,{strokeDashoffset:-p.getTotalLength(),strokeWidth:4,duration:.8,ease:'power2.inOut'});});
new ResizeObserver(layout).observe(button);
});}
// Match the reference easing without changing the site's other animations.
function referenceEase(progress){
let lo=0,hi=1,t=progress;
for(let i=0;i<20;i++){t=(lo+hi)/2;const x=3*(1-t)*(1-t)*t*.625+t*t*t;if(x<progress)lo=t;else hi=t;}
return 3*(1-t)*(1-t)*t*.05+3*(1-t)*t*t+t*t*t;
}
function setupContact(){
const section=$('.contact-section'),content=$('.contact-content'),layer=$('.contact-words');
if(reduced){gsap.set(content,{autoAlpha:1,yPercent:0,scale:1,filter:'none'});return;}
gsap.set(content,{autoAlpha:0,yPercent:25,scale:.96,filter:'blur(.5rem)'});
gsap.to(content,{autoAlpha:1,yPercent:0,scale:1,filter:'blur(0rem)',ease:'none',scrollTrigger:{trigger:section,start:'top 60%',end:'top 25%',scrub:true,invalidateOnRefresh:true}});
const positions=[[-38,-38],[-14,-40],[14,-40],[38,-38],[-42,-14],[-18,-18],[18,-18],[42,-14],[-42,14],[-18,18],[18,18],[42,14],[-38,38],[-14,40],[14,40],[38,38]];
const tunnel=gsap.timeline({scrollTrigger:{trigger:section,start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true}});
const random=gsap.utils.random;
for(let index=0;index<50;index++){
const word=document.createElement('span');word.textContent='CONTACT';layer.append(word);
const [x,y]=positions[index%positions.length];
const at=random(0,.52)+.12*Math.floor(index/positions.length),enter=random(.12,.18),leave=random(.12,.18);
const startX=x*random(.08,.22),startY=y*random(.08,.22),midX=x+random(-4,4),midY=y+random(-4,4),endX=midX+random(-3,3),endY=midY+random(-3,3),size=random(.7,1.3),alpha=random(.25,.62);
gsap.set(word,{xPercent:-50,yPercent:-50,x:startX+'vw',y:startY+'vh',z:random(-1600,-1100),scale:.35*size,autoAlpha:0,filter:'blur(.65rem)'});
tunnel.to(word,{x:midX+'vw',y:midY+'vh',z:0,scale:size,autoAlpha:alpha,filter:'blur(0rem)',duration:enter,ease:'power1.inOut'},at)
.to(word,{x:endX+'vw',y:endY+'vh',z:random(800,1200),scale:size*random(1.3,1.65),autoAlpha:0,filter:'blur(.5rem)',duration:leave,ease:'power1.in'},at+enter);
}
}
function setupResumeHeading(){
if(reduced||!window.SplitText)return;
$$('[data-assemble]').forEach(heading=>{
const radius=Math.min(3*parseFloat(getComputedStyle(heading).fontSize),.2*Math.min(innerWidth,innerHeight));
SplitText.create(heading,{type:'chars',charsClass:'assembly-char',onSplit(split){
gsap.set(split.chars,{x:()=>gsap.utils.random(-radius,radius),y:()=>gsap.utils.random(-radius,radius),rotation:()=>gsap.utils.random(-90,90),scale:()=>gsap.utils.random(.5,1.4),filter:'blur(8px)'});
return gsap.to(split.chars,{x:0,y:0,rotation:0,scale:1,filter:'blur(0px)',duration:.6,ease:referenceEase,stagger:{each:.03,from:'random'},scrollTrigger:{trigger:heading,start:'top bottom',end:'top 15%',scrub:true}});
}});
});
}
function setupProjectVideo(){
const video=$('.drone-loop'),button=$('.video-toggle');if(!video)return;
let userPaused=reduced,inView=false;video.muted=true;
function sync(){button.textContent=userPaused?'Play':'Pause';button.setAttribute('aria-label',userPaused?'Play drone video':'Pause drone video');if(inView&&!userPaused)video.play().catch(()=>{userPaused=true;button.textContent='Play';button.setAttribute('aria-label','Play drone video')});else video.pause();}
button.addEventListener('click',()=>{userPaused=!userPaused;sync()});
new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync()},{threshold:.1}).observe(video);
}
function setup(){setupInkButtons();setupContact();setupResumeHeading();setupProjectVideo();const mm=gsap.matchMedia();if(!reduced){mm.add('(min-width: 768px)',()=>gsap.to('.brand',{width:'17%',marginTop:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.7}}));mm.add('(max-width: 767px)',()=>gsap.to('.brand',{width:'40%',marginTop:0,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.7}}));gsap.to('.hero-cutout',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})}else gsap.set('.brand',{width:'30%',marginTop:0});
if(!reduced&&window.SplitText){$$('[data-roll]').forEach(el=>{SplitText.create(el,{type:'chars,lines',mask:'lines',autoSplit:true,onSplit:split=>{gsap.set(split.lines,{perspective:500});return gsap.from(split.chars,{rotationX:-55,y:'45%',opacity:0,duration:1.05,ease:'power3.out',stagger:.035,scrollTrigger:{trigger:el,start:'top 85%',once:true}})}})});$$('[data-lines]').forEach(el=>SplitText.create(el,{type:'lines',mask:'lines',autoSplit:true,onSplit:split=>gsap.from(split.lines,{yPercent:100,duration:1.05,ease:'power4.out',stagger:.1,scrollTrigger:{trigger:el,start:'top 88%',once:true}})}));$$('[data-random]').forEach(el=>SplitText.create(el,{type:'chars',onSplit:split=>gsap.from(split.chars,{x:()=>gsap.utils.random(-90,90),y:()=>gsap.utils.random(-90,90),rotation:()=>gsap.utils.random(-90,90),scale:()=>gsap.utils.random(.5,1.4),filter:'blur(8px)',stagger:{each:.03,from:'random'},scrollTrigger:{trigger:el,start:'top bottom',end:'top 20%',scrub:true}})}))}
if(!reduced){$$('.about .bracket, .work-title .bracket').forEach(el=>{const spans=el.querySelectorAll('span');gsap.from(spans[0],{xPercent:-160,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 40%',scrub:true}});gsap.from(spans[1],{xPercent:160,ease:'none',scrollTrigger:{trigger:el,start:'top bottom',end:'top 40%',scrub:true}})});const sweep=$('.section-sweep path'),length=sweep.getTotalLength();gsap.set(sweep,{strokeDasharray:length,strokeDashoffset:length,strokeWidth:20});gsap.timeline({scrollTrigger:{trigger:'.work-transition',start:'top top',end:'+=180%',pin:true,scrub:.7}}).to(sweep,{strokeDashoffset:length*.15,duration:1,ease:'none'},0).to(sweep,{strokeWidth:1550,duration:.75,ease:'none'},.25);}

['.services','.contact-section'].forEach(selector=>ScrollTrigger.create({trigger:selector,start:'top 80px',end:'bottom 80px',onToggle:()=>{const dark=$$('.services,.contact-section').some(el=>{const r=el.getBoundingClientRect();return r.top<=80&&r.bottom>=80});gsap.set('.brand',{color:dark?'#fffaf5':'#111016'})}}));ScrollTrigger.refresh();if(reduced){$('.opening').style.display='none';return}playIntro()}
Promise.all([document.fonts.ready,...$$('.opening image,.hero img').map(img=>img.decode?img.decode().catch(()=>{}):Promise.resolve())]).then(setup);setTimeout(()=>{if(!opening&&$('.opening')){$('.opening').style.display='none';lenis?.start()}},15000);
})();
