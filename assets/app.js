(function(){
'use strict';
var C=window.RP_CONTENT,FN=C.FN,SENT=C.SENT,TENSES=C.TENSES,CHECK=C.CHECK,CAP=C.CAP,HG=C.HG,LOOP=C.LOOP;
var $=function(s){return document.querySelector(s)},$$=function(s){return [].slice.call(document.querySelectorAll(s))};
var lang='en';
try{var sv=localStorage.getItem('rp-lang');if(sv)lang=sv;else if((navigator.language||'').toLowerCase().indexOf('zh')===0)lang='zh';}catch(e){}
function L(o){return lang==='zh'?o.zh:o.en}
var REDUCED=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme + palette ---------- */
var PAL={light:{sky:'#82b2e6',violet:'#ac9fe4',amber:'#f2b45e',coral:'#ee928a',teal:'#52b09c',oat:'#dcd5c2',green:'#55a883',paper:'#f9f7f1'},
         dark:{sky:'#5b8fcf',violet:'#8979cf',amber:'#d89b3f',coral:'#d4706a',teal:'#3c9784',oat:'#4b473c',green:'#3b8c6a',paper:'#14130f'}};
function isDark(){var d=document.documentElement.getAttribute('data-theme');return d==='dark'||(d!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)}
var pal=PAL.light,SPR={};
function mixc(a,b,t){var pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);function ch(s){return Math.round((pa>>s&255)*(1-t)+(pb>>s&255)*t)}return 'rgb('+ch(16)+','+ch(8)+','+ch(0)+')'}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* a hand-painted looking square */
function sprite(hex,paper,seed){
 var S=128,c=document.createElement('canvas');c.width=c.height=S;var x=c.getContext('2d'),r=rng(seed),m=7,n=9,pts=[],i,t;
 for(i=0;i<n;i++){t=i/n;pts.push([m+(S-2*m)*t+(r()-.5)*2,m+(r()-.5)*5])}
 for(i=0;i<n;i++){t=i/n;pts.push([S-m+(r()-.5)*5,m+(S-2*m)*t+(r()-.5)*2])}
 for(i=0;i<n;i++){t=i/n;pts.push([S-m-(S-2*m)*t+(r()-.5)*2,S-m+(r()-.5)*5])}
 for(i=0;i<n;i++){t=i/n;pts.push([m+(r()-.5)*5,S-m-(S-2*m)*t+(r()-.5)*2])}
 x.beginPath();pts.forEach(function(p,k){k?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();
 var g=x.createLinearGradient(0,0,0,S);g.addColorStop(0,hex);g.addColorStop(.55,mixc(hex,paper,.12));g.addColorStop(1,mixc(hex,paper,.4));
 x.fillStyle=g;x.fill();x.save();x.clip();
 for(i=0;i<70;i++){x.fillStyle=r()<.5?'rgba(255,255,255,.12)':'rgba(40,30,10,.05)';x.fillRect(r()*S,r()*S,10+r()*55,1+r()*2.4)}
 for(i=0;i<520;i++){x.fillStyle=r()<.5?'rgba(255,255,255,.10)':'rgba(40,30,10,.07)';x.fillRect(r()*S,r()*S,1,1)}
 x.restore();
 x.globalAlpha=.3;x.strokeStyle=mixc(hex,'#000000',.3);x.lineWidth=2.4;x.stroke();
 return c}
function buildSprites(){
 pal=isDark()?PAL.dark:PAL.light;SPR={};
 ['sky','violet','amber','coral','teal','oat','green'].forEach(function(k){SPR[k]=[0,1,2,3].map(function(v){return sprite(pal[k],pal.paper,k.length*31+v*97+7)})});
}

/* ---------- canvas setup ---------- */
var pin=$('#pin'),cv=$('#cv'),bg=$('#bg'),ctx=cv.getContext('2d'),bctx=bg.getContext('2d');
var W=0,H=0,DPR=1,cell=40,cols=0,rows=0,gx=0,gy=0,N=0,mobile=false,cells=[],T=[],LB=[],cur=0;

function home(i){return {x:gx+(i%cols)*cell+cell/2,y:gy+Math.floor(i/cols)*cell+cell/2}}
function hid(i){var h=home(i);return {x:h.x,y:h.y,s:cell*.5,a:0,c:'oat'}}
function pick(R,list){var t=R(),a=0;for(var i=0;i<list.length;i++){a+=list[i][1];if(t<a)return list[i][0]}return list[0][0]}
function alloc(count,off){var st=Math.max(1,Math.floor(N/count)),out=[];for(var k=0;k<count;k++)out.push((k*st+(off||0))%N);return out}

function drawBg(){
 bg.width=W*DPR;bg.height=H*DPR;bctx.setTransform(DPR,0,0,DPR,0,0);bctx.clearRect(0,0,W,H);
 var R=rng(11),dk=isDark(),i,y,x;
 for(i=0;i<=cols+1;i++){x=gx+i*cell;bctx.strokeStyle=dk?'rgba(255,250,230,'+(i%4?.05:.10)+')':'rgba(80,66,40,'+(i%4?.09:.17)+')';bctx.lineWidth=i%4?.6:1;bctx.beginPath();bctx.moveTo(x,0);for(y=0;y<=H+60;y+=60)bctx.lineTo(x+(R()-.5)*1.4,y);bctx.stroke()}
 for(i=0;i<=rows+1;i++){y=gy+i*cell;bctx.strokeStyle=dk?'rgba(255,250,230,'+(i%4?.05:.10)+')':'rgba(80,66,40,'+(i%4?.09:.17)+')';bctx.lineWidth=i%4?.6:1;bctx.beginPath();bctx.moveTo(0,y);for(x=0;x<=W+60;x+=60)bctx.lineTo(x,y+(R()-.5)*1.4);bctx.stroke()}
}

function build(){
 var i,R,t,h,col,row,L0=[];T=[];LB=[];
 // S0 scattered, left side
 R=rng(5);t=[];
 for(i=0;i<N;i++){h=home(i);col=i%cols;row=Math.floor(i/cols);var inreg=mobile?row<rows*.42:col<cols*.56;
  t.push(inreg&&R()<.4?{x:h.x,y:h.y,s:cell*.84,a:1,c:pick(R,[['oat',.3],['sky',.2],['violet',.2],['amber',.1],['green',.2]])}:hid(i))}
 T[0]=t;LB[0]=[];
 // S1 full sheet of sentences
 R=rng(9);t=[];
 for(i=0;i<N;i++){h=home(i);t.push(R()<.9?{x:h.x,y:h.y,s:cell*.86,a:1,c:'oat'}:hid(i))}
 T[1]=t;LB[1]=[];
 // S2 paper order, by section
 R=rng(13);t=[];
 for(i=0;i<N;i++){h=home(i);col=i%cols;row=Math.floor(i/cols);var p=(row+col/cols)/rows+(R()-.5)*.07,c=p<.17?'sky':p<.40?'oat':p<.68?'green':p<.88?'violet':'amber';
  t.push(R()<.94?{x:h.x,y:h.y,s:cell*.86,a:1,c:c}:hid(i))}
 T[2]=t;LB[2]=[];
 // S3 six sentences
 t=[];for(i=0;i<N;i++)t.push(hid(i));
 var idx=alloc(6,3),c3=mobile?2:3,r3=Math.ceil(6/c3),big=mobile?Math.min(cell*1.5,62):Math.min(cell*2.2,86),spx=mobile?W*.42:Math.min(200,W*.15),spy=mobile?big*2.05:big*2.1,
     cx=mobile?W/2:W*.62,cy=mobile?H*.3:H*.46,order=['sky','violet','amber','coral','teal','oat'],lb=[];
 idx.forEach(function(ci,k){var cc=k%c3,rr=Math.floor(k/c3),x=cx+(cc-(c3-1)/2)*spx,y=cy+(rr-(r3-1)/2)*spy;
  t[ci]={x:x,y:y,s:big,a:1,c:order[k]};
  lb.push({text:CAP[k].n,x:x,y:y+big/2+16,size:10.5,w:600,col:'ink',up:true,maxw:spx*.9});
  lb.push({text:CAP[k].t,x:x,y:y+big/2+31,size:12.5,w:400,col:'mute',maxw:spx*.9})});
 T[3]=t;LB[3]=lb;
 // S4 hourglass
 t=[];for(i=0;i<N;i++)t.push(hid(i));
 var total=0,nr=0;HG.forEach(function(g){g.rows.forEach(function(n){total+=n;nr++})});
 var idx4=alloc(total,1),hs=Math.min(cell*1.05,H*.74/(nr*1.08),(mobile?W*.6:W*.4)/11),hcx=mobile?W*.36:W*.56,y0=(mobile?H*.32:H*.5)-nr*hs*1.08/2+hs/2,ptr=0,rowi=0;lb=[];
 HG.forEach(function(g){var yy0=y0+rowi*hs*1.08;
  g.rows.forEach(function(n){var y=y0+rowi*hs*1.08;for(var k=0;k<n;k++){t[idx4[ptr++]]={x:hcx+(k-(n-1)/2)*hs*1.05,y:y,s:hs,a:1,c:g.c}}rowi++});
  var yy1=y0+(rowi-1)*hs*1.08;lb.push({text:g.n,x:hcx+5.5*hs+16,y:(yy0+yy1)/2+4,size:11,w:600,col:'ink',up:true,left:true})});
 T[4]=t;LB[4]=lb;
 // S5 loop ring
 t=[];for(i=0;i<N;i++)t.push(hid(i));
 var ring=40,idx5=alloc(ring,2),rcx=mobile?W/2:W*.6,rcy=mobile?H*.34:H*.5,RR=Math.min(W,H)*(mobile?.24:.29),rs=2*Math.PI*RR/ring*.92;lb=[];
 idx5.forEach(function(ci,k){var ang=-90+k*360/ring+4.5,q=Math.floor(((ang+90+360)%360)/90),rad=ang*Math.PI/180;
  t[ci]={x:rcx+RR*Math.cos(rad),y:rcy+RR*Math.sin(rad),s:rs,a:1,c:LOOP[q].k}});
 [-45,45,135,225].forEach(function(a,q){var rad=a*Math.PI/180,x=rcx+(RR+rs+10)*Math.cos(rad),y=rcy+(RR+rs+10)*Math.sin(rad);
  lb.push({text:LOOP[q].n,x:x,y:y+4,size:11,w:600,col:'ink',up:false,left:Math.cos(rad)>0,right:Math.cos(rad)<0})});
 T[5]=t;LB[5]=lb;
 // S6 back to the sheet
 R=rng(21);t=[];
 for(i=0;i<N;i++){h=home(i);col=i%cols;row=Math.floor(i/cols);inreg=mobile?row<rows*.45:col<cols*.56;
  t.push(inreg&&R()<.5?{x:h.x,y:h.y,s:cell*.84,a:1,c:pick(R,[['sky',.2],['violet',.15],['amber',.15],['coral',.15],['teal',.15],['green',.2]])}:hid(i))}
 T[6]=t;LB[6]=[];
}

function layout(){
 DPR=Math.min(2,window.devicePixelRatio||1);W=pin.clientWidth;H=pin.clientHeight;if(!W||!H)return;
 mobile=W<760||H>W*.95;document.documentElement.classList.toggle('stacked',mobile);
 cell=mobile?Math.max(24,Math.min(46,Math.floor(W/11))):Math.max(26,Math.min(46,Math.round(W/32)));
 cols=Math.floor(W/cell);rows=Math.floor(H/cell);gx=(W-cols*cell)/2;gy=(H-rows*cell)/2;N=cols*rows;
 cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
 var R=rng(3);
 while(cells.length<N){var r=R();cells.push({x:0,y:0,s:0,a:0,rot:(R()-.5)*.07,v:Math.floor(R()*4),c0:'oat',c1:'oat',mix:1,k:.05+r*.07,_i:cells.length})}
 cells.length=N;
 cells.forEach(function(c,i){if(!c.init){var h=home(i);c.x=h.x;c.y=h.y;c.s=cell*.5;c.init=1}});
 build();drawBg();retarget();wake();
}

function retarget(){
 var tg=T[cur];if(!tg)return;
 cells.forEach(function(c,i){var g=tg[i];if(g.c!==c.c1){c.c0=c.c1;c.c1=g.c;c.mix=(g.a===0||c.a<.05)?1:0}});
}
var labA=[];for(var q=0;q<7;q++)labA.push(0);

function wrap(text,maxw){
 if(!maxw)return [text];var out=[],line='',parts=lang==='zh'?text.split(''):text.split(' '),sep=lang==='zh'?'':' ';
 parts.forEach(function(w){var test=line?line+sep+w:w;if(ctx.measureText(test).width>maxw&&line){out.push(line);line=w}else line=test});if(line)out.push(line);return out}

var raf=0,calm=0;
function wake(){calm=0;if(!raf&&visible)raf=requestAnimationFrame(frame)}
function frame(){
 raf=0;if(!visible||!T[cur])return;
 var tg=T[cur],i,c,g,k,moved=false;
 ctx.clearRect(0,0,W,H);
 for(i=0;i<cells.length;i++){c=cells[i];g=tg[i];k=REDUCED?1:c.k;
  c.x+=(g.x-c.x)*k;c.y+=(g.y-c.y)*k;c.s+=(g.s-c.s)*k;c.a+=(g.a-c.a)*(REDUCED?1:.09);if(c.mix<1){c.mix=Math.min(1,c.mix+(REDUCED?1:.06));moved=true}
  if(Math.abs(g.x-c.x)>.2||Math.abs(g.y-c.y)>.2||Math.abs(g.s-c.s)>.1||Math.abs(g.a-c.a)>.004)moved=true;
  if(c.a<.01)continue;
  ctx.save();ctx.translate(c.x,c.y);ctx.rotate(c.rot);
  if(c.mix<1){ctx.globalAlpha=c.a*(1-c.mix);ctx.drawImage(SPR[c.c0][c.v],-c.s/2,-c.s/2,c.s,c.s);ctx.globalAlpha=c.a*c.mix}else ctx.globalAlpha=c.a;
  ctx.drawImage(SPR[c.c1][c.v],-c.s/2,-c.s/2,c.s,c.s);ctx.restore()}
 // labels
 var dk=isDark(),inkc=dk?'#ece8dc':'#1d1c19',mutec=dk?'#a8a397':'#6f6b61';
 for(var s=0;s<7;s++){var lt=s===cur?1:0;labA[s]+=(lt-labA[s])*(REDUCED?1:.12);if(Math.abs(lt-labA[s])>.01)moved=true;if(labA[s]<.02||!LB[s])continue;
  LB[s].forEach(function(l){var font=(l.w||400)+' '+l.size+'px '+getComputedStyle(document.documentElement).getPropertyValue('--sans');ctx.font=font;
   var txt=L(l.text);if(l.up&&lang!=='zh')txt=txt.toUpperCase();ctx.letterSpacing=l.up&&lang!=='zh'?'1px':'0px';
   ctx.globalAlpha=labA[s];ctx.fillStyle=l.col==='ink'?inkc:mutec;ctx.textAlign=l.left?'left':l.right?'right':'center';
   var lines=wrap(txt,l.maxw);lines.forEach(function(ln,j){ctx.fillText(ln,l.x,l.y+j*(l.size+4))});ctx.globalAlpha=1;ctx.letterSpacing='0px'})}
 calm=moved?0:calm+1;if(calm<8)raf=requestAnimationFrame(frame);
}

/* ---------- scroll scenes ---------- */
var tall=$('#tall'),HDR=52,visible=true,tick=false;
var NS=7,dots=[];
function sceneTitle(n){var e=$('.sc[data-s="'+n+'"] h3')||$('.hero h1');return e?e.textContent:''}
function buildNav(){var nav=$('#dotnav');nav.innerHTML='';dots=[];
 for(var i=0;i<NS;i++){(function(i){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label',(i+1)+' / '+NS+': '+sceneTitle(i));b.title=sceneTitle(i);
  b.onclick=function(){var total=tall.offsetHeight-pin.offsetHeight,top=tall.getBoundingClientRect().top+scrollY-HDR;scrollTo({top:top+((i+.5)/NS)*total,behavior:REDUCED?'auto':'smooth'})};
  nav.appendChild(b);dots.push(b)})(i)}
 dots.forEach(function(b,i){b.setAttribute('aria-current',i===cur)})}
function setScene(n,force){if(!force&&n===cur&&T[cur]&&cells.length)return;cur=n;retarget();wake();
 $$('.sc,.hero').forEach(function(e){var on=+e.dataset.s===n;e.classList.toggle('on',on);e.setAttribute('aria-hidden',on?'false':'true')});
 $$('.legend').forEach(function(e){e.classList.toggle('on',+e.dataset.s===n)});
 dots.forEach(function(b,i){b.setAttribute('aria-current',i===n)});
 var t=(n+1)+' / '+NS+': '+sceneTitle(n);$('#live').textContent=t;cv.setAttribute('aria-label',t)}
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(function(){tick=false;
 var total=tall.offsetHeight-pin.offsetHeight,top=tall.getBoundingClientRect().top-HDR,p=Math.min(1,Math.max(0,-top/total)),n=Math.min(6,Math.floor(p*7));
 setScene(n);var h=document.documentElement.scrollHeight-innerHeight;$('#prog').style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')'})}
new IntersectionObserver(function(e){visible=e[0].isIntersecting;if(visible)wake()},{rootMargin:'100px'}).observe(tall);
addEventListener('scroll',onScroll,{passive:true});
var rt=0;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){layout();onScroll()},120)});
function toEx(){$('#ex').scrollIntoView({behavior:REDUCED?'auto':'smooth'})}
$('#jump').onclick=toEx;$('#jump2').onclick=toEx;

/* ---------- exercises ---------- */
var picks=[SENT[0].a,'','','','',''],checked=false;
var tIdx=0;
function buildRows(){var box=$('#rows');box.innerHTML='';
 SENT.forEach(function(s,i){var r=document.createElement('div');r.className='trow'+(checked?' chk '+(picks[i]===s.a?'ok':'no'):'');
  var p=document.createElement('p');p.textContent=L(s);
  var c=document.createElement('div'),pk=document.createElement('div');pk.className='pick';
  var sw=document.createElement('i');sw.className='sw'+(picks[i]?' set':'');if(picks[i])sw.setAttribute('data-k',FN[picks[i]].k);
  var sel=document.createElement('select');sel.id='pick'+i;sel.setAttribute('aria-label','Sentence '+(i+1));
  var o=document.createElement('option');o.value='';o.textContent=L({en:'Choose a job…',zh:'选择功能…'});sel.appendChild(o);
  Object.keys(FN).forEach(function(k){var op=document.createElement('option');op.value=k;op.textContent=L(FN[k]);if(picks[i]===k)op.selected=true;sel.appendChild(op)});
  sel.onchange=function(){picks[i]=sel.value;checked=false;$('#score').textContent='';buildRows()};
  pk.appendChild(sw);pk.appendChild(sel);c.appendChild(pk);
  if(checked){var res=document.createElement('div');res.className='res';res.textContent=picks[i]===s.a?L({en:'✓ Correct',zh:'✓ 正确'}):L({en:'✗ Answer: ',zh:'✗ 答案：'})+L(FN[s.a]);c.appendChild(res)}
  var why=document.createElement('div');why.className='why';why.textContent=L(s.why);
  r.appendChild(p);r.appendChild(c);r.appendChild(why);box.appendChild(r)})}
function showScore(){var n=SENT.filter(function(s,i){return picks[i]===s.a}).length;$('#score').textContent=lang==='zh'?(n+' / '+SENT.length+' 正确'):(n+' / '+SENT.length+' correct')}
$('#check').onclick=function(){checked=true;buildRows();showScore()};
$('#reset').onclick=function(){picks=[SENT[0].a,'','','','',''];checked=false;$('#score').textContent='';buildRows()};

function buildTense(){var seg=$('#seg');seg.innerHTML='';
 TENSES.forEach(function(t,i){var b=document.createElement('button');b.textContent=t.v;b.setAttribute('aria-pressed',i===tIdx);b.onclick=function(){tIdx=i;buildTense()};seg.appendChild(b)});
 var t=TENSES[tIdx],el=$('#tsent');el.innerHTML='';el.appendChild(document.createTextNode('Queues '));
 var v=document.createElement('span');v.className='verb';v.textContent=t.v;el.appendChild(v);el.appendChild(document.createTextNode(' at landing points when arrivals exceed capacity.'));
 $('#thear').textContent=L(t.hear);$('#tnote').textContent=L(t.note)}

var done={};try{done=JSON.parse(localStorage.getItem('rp-check')||'{}')}catch(e){}
function buildCheck(){var box=$('#check-list');box.innerHTML='';
 CHECK.forEach(function(c,i){var l=document.createElement('label'),inp=document.createElement('input');inp.type='checkbox';inp.id='ck'+i;inp.checked=!!done[i];
  inp.onchange=function(){done[i]=inp.checked;try{localStorage.setItem('rp-check',JSON.stringify(done))}catch(e){}count()};
  var sp=document.createElement('span');sp.textContent=L(c);l.appendChild(inp);l.appendChild(sp);box.appendChild(l)});count()}
function count(){var n=CHECK.filter(function(_,i){return done[i]}).length;$('#count').textContent=lang==='zh'?('已完成 '+n+' / '+CHECK.length):(n+' of '+CHECK.length+' done')}

/* ---------- language + theme ---------- */
function applyLang(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 $$('[data-zh]').forEach(function(e){if(e.dataset.en==null)e.dataset.en=e.textContent;e.textContent=lang==='zh'?e.dataset.zh:e.dataset.en});
 $('#l-en').setAttribute('aria-pressed',lang==='en');$('#l-zh').setAttribute('aria-pressed',lang==='zh');
 buildRows();buildTense();buildCheck();if(checked)showScore();if(W)build()}
function setLang(l){lang=l;try{localStorage.setItem('rp-lang',l)}catch(e){}applyLang();buildNav();retarget();wake()}
$('#l-en').onclick=function(){setLang('en')};$('#l-zh').onclick=function(){setLang('zh')};
function applyTheme(){buildSprites();if(W){drawBg()}wake()}
matchMedia('(prefers-color-scheme: dark)').addEventListener&&matchMedia('(prefers-color-scheme: dark)').addEventListener('change',applyTheme);
new MutationObserver(applyTheme).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});

buildSprites();applyLang();layout();buildNav();setScene(0,true);onScroll();wake();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(wake);
})();
