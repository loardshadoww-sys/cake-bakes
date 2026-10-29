(function(){
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(pointer:fine)').matches,DARK=matchMedia('(prefers-color-scheme:dark)').matches,mx=0,my=0,px=0,py=0;
addEventListener('pointermove',function(e){mx=e.clientX/innerWidth*2-1;my=e.clientY/innerHeight*2-1;px=e.clientX;py=e.clientY},{passive:true});
function bg(){if(typeof THREE==='undefined')return;var cv=document.getElementById('bg'),r;try{r=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true})}catch(e){return}
r.setPixelRatio(Math.min(devicePixelRatio,1.5));var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,1,.1,50);cam.position.z=7;
var N=innerWidth<700?55:120,im=new THREE.InstancedMesh(new THREE.CylinderGeometry(.035,.035,.24,6),new THREE.MeshBasicMaterial(),N),pal=DARK?['#F7C8D3','#E879A8','#E89568','#FFF1E5']:['#E879A8','#E89568','#F7C8D3','#4A2E25'],S=[],d=new THREE.Object3D(),c=new THREE.Color();
for(var i=0;i<N;i++){S.push({x:(Math.random()-.5)*18,y:(Math.random()-.5)*11,z:Math.random()*5-3,rx:Math.random()*6,ry:Math.random()*6,sp:.2+Math.random()*.6,ph:Math.random()*6});im.setColorAt(i,c.set(pal[i%4]))}
sc.add(im);function rs(){r.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
function f(t){var s=t/1000;for(var i=0;i<N;i++){var a=S[i];d.position.set(a.x+Math.sin(s*.3*a.sp+a.ph)*.4,a.y+Math.cos(s*.25*a.sp+a.ph)*.5,a.z);d.rotation.set(a.rx+s*a.sp,a.ry+s*.5*a.sp,0);d.updateMatrix();im.setMatrixAt(i,d.matrix)}
im.instanceMatrix.needsUpdate=true;cam.position.x+=(mx*.9-cam.position.x)*.04;cam.position.y+=(-my*.6+Math.sin(scrollY*.0015)*1.5-cam.position.y)*.04;cam.lookAt(0,cam.position.y*.3,0);r.render(sc,cam)}
if(RM){f(0);return}(function loop(t){if(!document.hidden)f(t);requestAnimationFrame(loop)})(0)}
var cakeR,cakeId;
function cake(){var el=document.getElementById('cake3d');if(cakeId)cancelAnimationFrame(cakeId);if(cakeR){cakeR.dispose();cakeR=null}
if(!el||typeof THREE==='undefined')return;var r;try{r=new THREE.WebGLRenderer({alpha:true,antialias:true})}catch(e){return}
cakeR=r;r.setPixelRatio(Math.min(devicePixelRatio,2));var sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(32,1,.1,50);cam.position.set(0,3.4,9.8);cam.lookAt(0,.4,0);
sc.add(new THREE.AmbientLight(0xffffff,.75));var L=new THREE.DirectionalLight(0xffffff,.9);L.position.set(3,6,4);sc.add(L);var PL=new THREE.PointLight(0xE879A8,.6,20);PL.position.set(-4,2,3);sc.add(PL);
function M(c,ro,me){return new THREE.MeshStandardMaterial({color:c,roughness:ro==null?.7:ro,metalness:me||0})}
var G=new THREE.Group();function cyl(rt,h,y,c){var m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rt,h,48),M(c));m.position.y=y;G.add(m)}
cyl(2.3,.12,-1,'#FFF1E5');cyl(1.7,1.9,0,'#FFF6EC');cyl(1.72,.07,-.25,'#4A2E25');cyl(1.72,.07,.4,'#4A2E25');
function inst(n,fn,col){var m=new THREE.InstancedMesh(new THREE.BoxGeometry(.2,.04,.1),M(col,.6),n),o=new THREE.Object3D();for(var i=0;i<n;i++){fn(o);o.updateMatrix();m.setMatrixAt(i,o.matrix)}G.add(m)}
inst(260,function(o){var a=Math.random()*6.283;o.position.set(Math.cos(a)*1.75,-.85+Math.random()*1.75,Math.sin(a)*1.75);o.rotation.set(Math.random()*3,-a+Math.random()*1.5,Math.random()*3);o.scale.setScalar(.6+Math.random()*1.1)},'#4A2E25');
inst(80,function(o){var a=Math.random()*6.283,q=Math.sqrt(Math.random());o.position.set(Math.cos(a)*q,.98+Math.random()*.08,Math.sin(a)*q);o.rotation.set(Math.random()*3,Math.random()*6,Math.random()*3);o.scale.setScalar(.8+Math.random())},'#3a2018');
for(var i=0;i<8;i++){var a=i/8*6.283,x=Math.cos(a)*1.3,z=Math.sin(a)*1.3,cr=new THREE.Mesh(new THREE.SphereGeometry(.3,24,16),M('#FFFDF8',.5));cr.scale.y=.75;cr.position.set(x,1.1,z);G.add(cr);
var ch=new THREE.Mesh(new THREE.SphereGeometry(.2,24,16),M('#C0213B',.25,.1));ch.position.set(x,1.4,z);G.add(ch);
var st=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.55,6),M('#6b3d2e'));st.position.set(x,1.75,z);st.rotation.z=(Math.random()-.5)*.6;G.add(st)}
G.position.y=.2;sc.add(G);el.innerHTML='';el.appendChild(r.domElement);r.domElement.setAttribute('role','img');r.domElement.setAttribute('aria-label','Rotating 3D Black Forest style cake');
function rs(){var w=el.clientWidth,h=el.clientHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}rs();
if(window.ResizeObserver)new ResizeObserver(rs).observe(el);var vis=true;if(window.IntersectionObserver)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(el);
var st0=performance.now();function draw1(){var s=(performance.now()-st0)/1000;G.rotation.y=s*.5+mx*.5;G.rotation.x=.1+my*.12;G.position.y=.2+Math.sin(s*1.4)*.12;r.render(sc,cam)}
if(RM){draw1();return}(function l(){cakeId=requestAnimationFrame(l);if(vis&&!document.hidden)draw1()})()}
var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}})},{threshold:.1});
function rv(){document.querySelectorAll('.card,.steps li,.feat,.banner,main h2').forEach(function(n){n.classList.add('rv');io?io.observe(n):n.classList.add('vis')})}
function spr(x,y,n){var pal=['#E879A8','#E89568','#F7C8D3','#4A2E25'];for(var i=0;i<n;i++){var s=document.createElement('i');s.className='sp';s.style.cssText='left:'+x+'px;top:'+y+'px;background:'+pal[Math.random()*4|0];document.body.appendChild(s);
var dx=(Math.random()-.5)*(n>1?180:30),dy=n>1?-70+Math.random()*130:40;s.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:'translate('+dx+'px,'+dy+'px) rotate('+Math.random()*360+'deg)',opacity:0}],{duration:700+Math.random()*400,easing:'ease-out'}).onfinish=(function(e){return function(){e.remove()}})(s)}}
if(!RM){addEventListener('pointerdown',function(e){spr(e.clientX,e.clientY,10)});
if(FINE){var ring=document.createElement('div'),dot=document.createElement('div'),rx=0,ry=0,cur=null,lx=0,ly=0,lt=0;ring.id='cur';dot.id='curd';document.body.append(ring,dot);
function reset(){if(cur){cur.style.transform='';cur=null}}
addEventListener('pointermove',function(e){dot.style.transform='translate3d('+px+'px,'+py+'px,0) translate(-50%,-50%)';var T=e.target.closest?e.target:document.body;ring.classList.toggle('h',!!T.closest('a,button,.card,input,textarea,select'));
var n=performance.now();if(n-lt>50&&Math.hypot(px-lx,py-ly)>30){lt=n;lx=px;ly=py;spr(px,py,1)}
var t=T.closest('.btn,.chip,.card');if(cur&&cur!==t)reset();if(t){cur=t;var b=t.getBoundingClientRect(),x=(px-b.left)/b.width-.5,y=(py-b.top)/b.height-.5;t.style.transform=t.classList.contains('card')?'perspective(700px) rotateX('+(-y*8)+'deg) rotateY('+x*8+'deg) translateY(-4px)':'translate('+x*b.width*.2+'px,'+y*b.height*.3+'px)'}});
document.addEventListener('pointerout',function(e){if(!e.relatedTarget)reset()});
(function fl(){rx+=(px-rx)*.18;ry+=(py-ry)*.18;ring.style.transform='translate3d('+rx+'px,'+ry+'px,0) translate(-50%,-50%)';requestAnimationFrame(fl)})()}}
bg();var _d=draw;draw=function(k){_d(k);rv();cake();var v=document.getElementById('promo');if(v&&!v.src){v.src=VID;v.muted=true;if(!RM){new IntersectionObserver(function(e){if(e[0].isIntersecting){v.play().catch(function(){})}else v.pause()},{threshold:.4}).observe(v)}}};draw();
})();
