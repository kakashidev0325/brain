import{r as ye,m as It,k as Ot,e as M,c as ne,W as le,b as Dt,l as L,B as re,t as Nt,a as st,d as be,q as it}from"./layout-DQNtl7TS.js";import{D as rt,L as Xe,T as qt}from"./data-C33ofF4D.js";import{t as de,a as Bt,f as Ut}from"./live-DtNsAahZ.js";import{w as Wt,n as ct}from"./workers-x3e-Gkel.js";import"./explorer-abi-DnI6ndb3.js";import"./network-C32dV2Rj.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const ae=[248,247,244],Y=[243,134,161],q=Math.PI*2,Ze=520,Qe=[[-1.8,.95],[-.1,1.6],[1.75,.85],[1.1,-1.3],[-1.25,-1.25]];function P(e,t){let n=2166136261;for(const l of`${e}:${t}`)n=Math.imul(n^l.charCodeAt(0),16777619);return n^=n>>>16,n=Math.imul(n,2246822507),n^=n>>>13,n=Math.imul(n,3266489909),n^=n>>>16,(n>>>0)/4294967296}function se(e,t){const n=Math.max(1e-6,P(e,t*2)),l=P(e,t*2+1),r=Math.sqrt(-2*Math.log(n));return[r*Math.cos(q*l),r*Math.sin(q*l)]}const V=(e,t)=>`rgba(${e[0]},${e[1]},${e[2]},${t.toFixed(3)})`,Ht=e=>e<.5?4*e*e*e:1-(-2*e+2)**3/2,ie=(e,t,n)=>e+(t-e)*n,zt="attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }",Jt=`
precision highp float;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uSeed;
uniform float uStrength;
uniform float uTime;
uniform vec3 uColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

vec3 hue(float t) {
  return 0.55 + 0.45 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67)));
}

void main() {
  vec2 p = (gl_FragCoord.xy - uCenter) / uRadius;
  float radius = length(p);
  if (radius > 1.02) discard;
  float turn = fract(atan(p.y, p.x) / 6.28318 + 0.5 + uTime * 0.004);

  float strand = turn * 720.0 + noise(vec2(turn * 40.0, radius * 3.0)) * 3.0;
  float id = floor(strand);
  float reach = 0.55 + 0.45 * hash(vec2(id, 1.0));
  float line = smoothstep(0.5, 0.0, abs(fract(strand) - 0.5) * 2.2);
  float filaments = line * hash(vec2(id, 2.0)) * smoothstep(0.08, 0.4, radius) * smoothstep(reach + 0.05, reach - 0.25, abs(radius - 0.62) * 1.6);
  vec3 filamentColor = mix(hue(hash(vec2(id, 3.0))), uColor, 0.4);

  float fray = (noise(vec2(turn * 300.0, uTime * 0.3)) - 0.5) * 0.06;
  float shape = abs(radius - 0.56);
  float band = smoothstep(0.075, 0.0, shape + fray);
  float glow = smoothstep(0.22, 0.0, shape) * 0.35;

  float outer = smoothstep(0.012, 0.0, abs(radius - 0.98));
  float cross = (smoothstep(0.004, 0.0, abs(p.x)) + smoothstep(0.004, 0.0, abs(p.y))) * step(radius, 0.98) * 0.35;

  vec2 grid = floor(p * 46.0);
  vec2 local = fract(p * 46.0) - 0.5;
  float star = smoothstep(0.16, 0.0, length(local)) * step(0.93, hash(grid)) * smoothstep(0.3, 0.6, radius) * step(radius, 0.98);

  vec3 color = filamentColor * filaments * 1.4 + uColor * (band * 1.3 + glow) + vec3(0.95, 0.97, 1.0) * (outer * 0.7 + cross + star);
  float alpha = clamp(filaments * 1.3 + band + glow + outer * 0.7 + cross + star, 0.0, 1.0);
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(color / max(alpha, 0.001), alpha * 0.5 * uStrength);
}`;function Gt(e){const t=e.getContext("webgl",{alpha:!0,premultipliedAlpha:!1,antialias:!1});if(!t)return;const n=($,v)=>{const x=t.createShader($);return x?(t.shaderSource(x,v),t.compileShader(x),t.getShaderParameter(x,t.COMPILE_STATUS)?x:null):null},l=n(t.VERTEX_SHADER,zt),r=n(t.FRAGMENT_SHADER,Jt),s=t.createProgram();if(!l||!r||!s||(t.attachShader(s,l),t.attachShader(s,r),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS)))return;t.useProgram(s);const i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),t.STATIC_DRAW);const d=t.getAttribLocation(s,"aPosition");t.enableVertexAttribArray(d),t.vertexAttribPointer(d,2,t.FLOAT,!1,0,0);const h=$=>t.getUniformLocation(s,$),A={center:h("uCenter"),radius:h("uRadius"),seed:h("uSeed"),strength:h("uStrength"),time:h("uTime"),color:h("uColor")};return t.uniform3f(A.color,Y[0]/255,Y[1]/255,Y[2]/255),t.clearColor(0,0,0,0),{size($,v){e.width=$,e.height=v,t.viewport(0,0,$,v)},draw($,v,x,j,N){t.clear(t.COLOR_BUFFER_BIT),t.uniform2f(A.center,$[0],e.height-$[1]),t.uniform1f(A.radius,v),t.uniform1f(A.seed,x),t.uniform1f(A.strength,j),t.uniform1f(A.time,N/1e3),t.drawArrays(t.TRIANGLES,0,3)}}}const Kt=`
attribute vec3 aPosition;
attribute vec3 aColor;
attribute float pointSize;
attribute float pointAlpha;
attribute float pointSignal;
attribute float pointLayer;
varying vec3 vColor;
varying float vAlpha;
varying float vSignal;
varying float vLayer;
uniform float uMotion;
uniform float uPixelRatio;
uniform float uTime;
uniform vec2 uCenter;
uniform float uUnit;
uniform vec2 uResolution;

void main() {
  vec3 transformed = aPosition;
  float fieldPhase = aPosition.x * 1.17 + aPosition.y * 1.53 - aPosition.z * 0.82;
  float crossPhase = aPosition.x * 0.63 - aPosition.y * 0.48 + aPosition.z * 1.71;
  float drift = sin(fieldPhase - uTime * 0.37 + pointLayer * 0.8);
  float counter = cos(crossPhase + uTime * 0.31);
  float coherence = 0.45 + pointSignal * 0.55;
  transformed.x += counter * 0.014 * uMotion * coherence;
  transformed.y += drift * 0.032 * uMotion * (0.72 + pointLayer * 0.2);
  vec2 px = vec2(uCenter.x + transformed.x * uUnit, uCenter.y - transformed.y * uUnit);
  gl_Position = vec4(px.x / uResolution.x * 2.0 - 1.0, 1.0 - px.y / uResolution.y * 2.0, 0.0, 1.0);
  float pulse = 1.0 + sin(fieldPhase * 0.7 + uTime * 0.39) * 0.045 * uMotion;
  gl_PointSize = pointSize * uPixelRatio * pulse;
  vColor = aColor;
  vAlpha = pointAlpha;
  vSignal = pointSignal;
  vLayer = pointLayer;
}`,Vt=`
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
varying float vSignal;
varying float vLayer;

void main() {
  vec2 offset = gl_PointCoord - vec2(0.5);
  float distanceFromCenter = length(offset);
  float disc = 1.0 - smoothstep(0.42, 0.5, distanceFromCenter);
  float core = 1.0 - smoothstep(0.08, 0.3, distanceFromCenter);
  float ring = smoothstep(0.27, 0.34, distanceFromCenter) * (1.0 - smoothstep(0.42, 0.49, distanceFromCenter));
  float granular = 0.78 + 0.22 * cos((offset.x - offset.y) * 28.0 + vLayer * 5.0);
  float shape = mix(disc * granular, max(core * 0.84, ring), vSignal);
  if (shape <= 0.01) discard;
  float alpha = vAlpha * shape;
  gl_FragColor = vec4(vColor * alpha, alpha);
}`,et=[.9387,.9301,.9047],tt=[.8963,.2384,.3564],ce=10;function Yt(e){const t=e.getContext("webgl",{alpha:!0,premultipliedAlpha:!0,antialias:!0});if(!t)return;const n=($,v)=>{const x=t.createShader($);return x?(t.shaderSource(x,v),t.compileShader(x),t.getShaderParameter(x,t.COMPILE_STATUS)?x:null):null},l=n(t.VERTEX_SHADER,Kt),r=n(t.FRAGMENT_SHADER,Vt),s=t.createProgram();if(!l||!r||!s||(t.attachShader(s,l),t.attachShader(s,r),t.linkProgram(s),!t.getProgramParameter(s,t.LINK_STATUS)))return;t.useProgram(s);const i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i);const d=($,v,x)=>{const j=t.getAttribLocation(s,$);j<0||(t.enableVertexAttribArray(j),t.vertexAttribPointer(j,v,t.FLOAT,!1,ce*4,x*4))};d("aPosition",3,0),d("aColor",3,3),d("pointSize",1,6),d("pointAlpha",1,7),d("pointSignal",1,8),d("pointLayer",1,9);const h=$=>t.getUniformLocation(s,$),A={motion:h("uMotion"),pixelRatio:h("uPixelRatio"),time:h("uTime"),center:h("uCenter"),unit:h("uUnit"),resolution:h("uResolution")};return t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,0),{size($,v){e.width=$,e.height=v,t.viewport(0,0,$,v)},draw($,v,x,j,N){t.clear(t.COLOR_BUFFER_BIT),v!==0&&(t.bufferData(t.ARRAY_BUFFER,$.subarray(0,v*ce),t.DYNAMIC_DRAW),t.uniform1f(A.motion,N),t.uniform1f(A.pixelRatio,x.ratio),t.uniform1f(A.time,j/1e3),t.uniform2f(A.center,x.cx,x.cy),t.uniform1f(A.unit,x.unit),t.uniform2f(A.resolution,x.width,x.height),t.drawArrays(t.POINTS,0,v))}}}const Xt=14,Zt=2.399963229728653,Ce=.5,Qt=.42,ea=1700,ta=3400,aa=260;function na(e,t,n){const l=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.innerHTML=`
    <canvas class="piece__shader" aria-hidden="true"></canvas>
    <canvas class="piece__canvas" aria-hidden="true"></canvas>
    <canvas class="piece__points" aria-hidden="true"></canvas>
    <canvas class="piece__labels" aria-hidden="true"></canvas>
    <span class="piece__corner piece__corner--tl"></span>
    <span class="piece__corner piece__corner--tr"></span>
    <span class="piece__corner piece__corner--bl"></span>
    <span class="piece__corner piece__corner--br"></span>
    <span class="piece__tick"><span></span></span>
    <span class="piece__port">Posters</span>
    ${t.map(a=>`
      <span class="piece__seat" data-worker="${a}">
        <strong class="piece__seat-name">${n[a]}</strong>
        <span class="piece__seat-weight"></span>
        <span class="piece__seat-state"></span>
      </span>`).join("")}`;const r=e.querySelector(".piece__canvas"),s=Gt(e.querySelector(".piece__shader")),i=r.getContext("2d"),d=e.querySelector(".piece__labels"),h=d.getContext("2d"),A=e.querySelector(".piece__points"),$=Yt(A);let v=new Float32Array(16e3*ce),x=0;const j=(a,o,p,c,m,g,y,E)=>{if((x+1)*ce>v.length){const f=new Float32Array(v.length*2);f.set(v),v=f}const u=x*ce;v[u]=a,v[u+1]=o,v[u+2]=p,v[u+3]=c[0],v[u+4]=c[1],v[u+5]=c[2],v[u+6]=m,v[u+7]=g,v[u+8]=y,v[u+9]=E,x+=1},N=a=>e.querySelector(`.piece__corner--${a}`),$e=e.querySelector(".piece__tick"),wt=e.querySelector(".piece__port"),we=new Map(t.map(a=>[a,e.querySelector(`.piece__seat[data-worker="${a}"]`)])),I=t.map((a,o)=>({worker:a,center:Qe[o%Qe.length],dots:Array.from({length:Ze},(p,c)=>{const[m,g]=se(a,c);return{gx:m,gy:g,z:se(a,6e4+c)[0]*.3,tail:c%5===0?P(a,9e3+c):-1,size:P(a,2e4+c),phase:P(a,3e4+c)*q,evidence:.58+P(a,5e4+c)*.42}}),sigma:.3,count:60,pink:0,score:.2,target:{sigma:.3,count:60,pink:0,score:.2}})),U={tiltA:0,tiltB:0,lobe:0,gain:1,confidence:.5,ring:0},G={...U};let pe=[],Ue=-1/0,We=0,K=0,oe=0,w=1,F=1,Z=0,Q=0,ee=!1;const W=(a,o)=>[Z+a*F,Q-o*F],He=a=>a==="jev"?[0,0]:a==="poster"?[-(Z-28)/F,.15]:I.find(o=>o.worker===a)?.center;function ue(){const a=e.getBoundingClientRect();K=a.width,oe=a.height,w=Math.min(window.devicePixelRatio||1,2),r.width=Math.round(K*w),r.height=Math.round(oe*w),d.width=r.width,d.height=r.height,s?.size(r.width,r.height),$?.size(r.width,r.height),ee=K<600,F=Math.min(K*(ee?1.08:.94),oe)/(ee?6.4:7.2),Z=K*.5,Q=oe*(ee?.5:.53);for(const o of I){const p=we.get(o.worker),[c,m]=W(...o.center),g=o.center[1]>0,y=(o.sigma*2.2+.25)*F,E=Math.max(12,Math.min(K-96,c));p.style.left=`${E}px`,p.style.top=`${g?m-y:m+y}px`,p.dataset.side=g?"above":"below"}$e.style.left=`${Z+1.05*F}px`,$e.style.top=`${Q-2.45*F}px`,wt.style.top=`${Q-.15*F}px`}function xe(a,o){i.beginPath();for(let p=0;p<=a;p+=1){const[c,m]=o(p/a*q);p===0?i.moveTo(c*w,m*w):i.lineTo(c*w,m*w)}i.closePath(),i.stroke()}const xt=a=>{const o=Math.max(...I.map(p=>p.pink));return Math.min(1,o*.4+Math.exp(-Math.max(0,a-Ue)/1800)*.6)};function St(a){const{tiltA:o,tiltB:p,lobe:c,gain:m,confidence:g}=U,y=a*4e-5;i.lineWidth=.8*w;for(let u=0;u<13;u+=1){const f=u/12;i.strokeStyle=V(ae,u===0||u===12?.42:u%3===0?.22:.11),xe(144,_=>{const k=1.18+f*1.76,b=(Math.sin(_*2+u*.17+o+y)*.12+Math.cos(_*3-u*.11+p-y)*.08+Math.sin(_*10+g*q)*.03)*m,C=-.38+f*.72+Math.sin(_*2+u)*.045,S=-.12+Math.cos(_)*k*(1.18+b),T=.08+Math.sin(_)*k*(.82+b*.72);return W(S+C*.23,T-C*.13)})}const E=[[-.78+c,.34,.5+o],[.66+c,.12,-.35+p]];for(const[u,[f,_,k]]of E.entries())for(let b=0;b<6;b+=1){const C=b/5;i.strokeStyle=V(ae,b===0?.3:.08+C*.07),xe(120,S=>{const T=S+k,R=.7+C*1.15,O=(Math.sin(T*3+b*.6+u+o+y*2)*.1+Math.cos(T*5-g*q+b)*.05)*m;return W(f+Math.cos(T)*R*(1.05+O),_+Math.sin(T)*R*(.78+O*.6))})}}function Mt(a){const o=a*2e-4;for(let p=0;p<7;p+=1){i.lineWidth=.8*w,i.strokeStyle=V(ae,p%2===0?.24:.12);const c=.64+p*.26;xe(96,m=>{const g=c+Math.sin(m*5+U.confidence*q+o*(p%2?1:-1))*(.028+p*.006);return W(Math.cos(m)*g,Math.sin(m)*g)})}i.lineWidth=.8*w,i.strokeStyle=V(ae,.1),i.beginPath(),I.forEach((p,c)=>{const[m,g]=W(...p.center),[y,E]=W(...I[(c+1)%I.length].center);i.moveTo(m*w,g*w),i.lineTo(y*w,E*w)}),i.stroke()}function ze(a,o,p,c,m,g,y,E,u,f,_,k=Xt){j(a,o,p,g,y,E,u,f);for(let b=0;b<k;b+=1){const C=(b+.5)/k,S=c+b*Zt+m*.43,T=.012+C*.2;j(a+Math.cos(S)*T,o+Math.sin(S*1.31)*T,p+Math.sin(S)*T+(C-.5)*.24,g,.32+C*.82+(_?.24:0),(.055+(1-C)*.16)*(_?1.2:1)*Math.min(1,E*1.6),_&&b%7===0?.72:0,C)}}function kt(){const a=U.confidence;I.forEach((o,p)=>{const[c,m]=o.center,g=o.pink,y=g>.5,E=et.map((u,f)=>u+(tt[f]-u)*g);for(let u=0;u<Ze;u+=1){const f=Math.max(0,Math.min(1,o.count-u));if(f<=0)break;const _=o.dots[u];let k=c+_.gx*o.sigma,b=m+_.gy*o.sigma*.72;if(_.tail>=0&&g>.01){const R=_.tail*.82;k+=(c*(1-R)+_.gx*.05-k)*g,b+=(m*(1-R)+_.gy*.05-b)*g}const C=(2.1+o.score*4.6+_.size*1.2)*(.54+g*.14),S=Math.min(.98,(.18+a*.72)*_.evidence*(.86+g*.22))*f,T=y&&u%3===0?1:u%17===0?.55:0;ze(k,b,_.z,_.phase,p,E,C,S,T,p%5/4,y)}})}function At(a){const[o,p]=W(0,0),c=Qt*F;h.shadowColor="rgba(243,134,161,0.72)",h.shadowBlur=12*w,h.fillStyle=V(Y,1),h.beginPath(),h.arc(o*w,(p+c*.14)*w,2.5*w,0,q),h.fill(),h.fillStyle=V(ae,.9),h.font=`${10*w}px "Fragment Mono", ui-monospace, monospace`,h.textAlign="center",h.fillText("JEV",o*w,(p-c*.02)*w),h.shadowBlur=0,h.shadowColor="transparent"}function Je(a){if(a==="jev")return[Ce*.35,Ce*.35];if(a==="poster")return[.12,.7];const o=I.find(p=>p.worker===a);return o?[o.target.sigma*.8,o.target.sigma*.6]:[.2,.2]}function Ct(a,o,p,c,m,g){const y=`${c}:${Math.round(m)}`,[E,u]=Je(a),[f,_]=Je(o),k=Math.round(aa*(ee?.6:1)),b=Array.from({length:k},(C,S)=>{const[T,R]=se(y,S),[O,me]=se(y,1e4+S),ge=P(y,2e4+S)<.22;return{delay:P(y,3e4+S)**1.5*900,duration:1300+P(y,4e4+S)*1100,spread:O*.26,bend:g*(.12+P(y,5e4+S)*.3),from:[T*E,R*u],to:[me*f*.7,se(y,6e4+S)[0]*_*.7],size:2.1+P(y,7e4+S)*1.2,phase:P(y,8e4+S)*q,bright:.58+P(y,9e4+S)*.42,pink:ge?p!==Y:p===Y,z:R*.3,layer:P(y,1e5+S)}});return{from:a,to:o,color:p,packet:c,start:m,bend:g,motes:b}}function Tt(a){h.font=`${10*w}px "Fragment Mono", ui-monospace, monospace`,"letterSpacing"in h&&(h.letterSpacing=`${.9*w}px`),pe=pe.filter(o=>a-o.start<ta),pe.forEach((o,p)=>{const[c,m]=He(o.from),[g,y]=He(o.to);o.motes.forEach((f,_)=>{const k=(a-o.start-f.delay)/f.duration;if(k<=0||k>=1)return;const b=k*k*(3-2*k),C=c+f.from[0],S=m+f.from[1],T=g+f.to[0],R=y+f.to[1],O=Math.hypot(T-C,R-S)||1,me=-(R-S)/O,ge=(T-C)/O,Ve=Math.sin(Math.PI*b),Ye=f.spread*O*Ve+Math.sin(a*.005+f.phase)*.035*Ve,Pt=(C+T)/2+me*f.bend*O,Et=(S+R)/2+ge*f.bend*O,te=1-b,Rt=te*te*C+2*te*b*Pt+b*b*T+me*Ye,Lt=te*te*S+2*te*b*Et+b*b*R+ge*Ye,Ft=Math.min(.98,f.bright)*Math.sqrt(Math.sin(Math.PI*k)),jt=f.pink&&_%3===0?1:_%17===0?.55:0;ze(Rt,Lt,f.z,f.phase,5+p,f.pink?tt:et,f.size*(f.pink?.68:.54),Ft,jt,f.layer,f.pink,8)});const E=(a-o.start)/ea,u=Ht(Math.min(1,Math.max(0,E)));if(u>.18&&u<.82){const f=Math.hypot(g-c,y-m)||1,_=(c+g)/2+-(y-m)/f*o.bend*.27*f,k=(m+y)/2+(g-c)/f*o.bend*.27*f,b=1-u,[C,S]=W(b*b*c+2*b*u*_+u*u*g,b*b*m+2*b*u*k+u*u*y);h.fillStyle=V(o.color,Math.min(1,Math.sin(Math.PI*(u-.18)/.64)*2)),h.textAlign="left",h.fillText(o.packet.toUpperCase(),(C+14)*w,(S-14)*w)}}),"letterSpacing"in h&&(h.letterSpacing="0px")}function he(a){i.clearRect(0,0,r.width,r.height),h.clearRect(0,0,d.width,d.height),s?.draw([Z*w,Q*w],Ce*F*w,We,.6+U.ring*.4+xt(a)*.2,l?0:a),St(a),Mt(a),x=0,kt(),Tt(a),$?.draw(v,x,{cx:Z,cy:Q,unit:F,width:K,height:oe,ratio:w},l?0:a,l?0:1),At()}function Se(a){for(const o of Object.keys(U))U[o]=ie(U[o],G[o],a);for(const o of I)o.sigma=ie(o.sigma,o.target.sigma,a),o.count=ie(o.count,o.target.count,a),o.pink=ie(o.pink,o.target.pink,a),o.score=ie(o.score,o.target.score,a)}let fe=0,Me=!0,ke=performance.now(),Ge=0;function Ke(a){fe=0;const o=Math.min(64,a-ke);ke=a,Se(1-Math.exp(-o/420)),a-Ge>250&&(Ge=a,ue()),he(a),Me&&!document.hidden&&(fe=requestAnimationFrame(Ke))}const Ae=()=>{if(l){Se(1),ue(),he(0);return}fe||(ke=performance.now(),fe=requestAnimationFrame(Ke))};return new ResizeObserver(()=>{ue(),l&&he(0)}).observe(e),new IntersectionObserver(([a])=>{Me=a?.isIntersecting??!0,Me&&Ae()}).observe(e),document.addEventListener("visibilitychange",()=>{document.hidden||Ae()}),{show(a){const o=t.reduce((c,m)=>c+(a.weights[m]??0),0);for(const c of I){const m=o>0?(a.weights[c.worker]??0)/o:.2;c.target={sigma:.16+Math.sqrt(m)*.42,count:(ee?.6:1)*(70+m*450),pink:c.worker===a.hired?1:0,score:m};const g=we.get(c.worker);g.dataset.hired=String(c.worker===a.hired),g.querySelector(".piece__seat-weight").textContent=o>0?`${Math.round(m*100)}%${c.worker===a.hired?" / hired":""}`:""}if(G.tiltA=(P(a.seed,1)-.5)*1.2,G.tiltB=(P(a.seed,2)-.5)*1.2,G.lobe=(P(a.seed,3)-.5)*.5,G.gain=.7+a.confidence*.9,G.confidence=a.confidence,G.ring=a.positive?1:0,We=P(a.seed,4)*997%997*.173,N("tl").textContent=a.corners.tl,N("tr").textContent=a.corners.tr,N("bl").textContent=a.corners.bl,N("br").textContent=a.corners.br,N("br").dataset.positive=String(a.positive),$e.querySelector("span").textContent=a.tick,e.setAttribute("aria-label",a.label),l){Se(1),ue(),he(0);return}const p=performance.now();Ue=p,a.from!==a.to&&pe.push(Ct(a.from,a.to,a.from==="jev"&&a.positive?Y:ae,a.packet,p,P(a.packet,7)>.5?1:-1)),Ae()},seats(a){for(const[o,p]of we){const c=a[o];c&&(p.dataset.state=c.state,p.querySelector(".piece__seat-state").textContent=c.state==="idle"?"":c.line)}}}}const oa=2e4,lt=rt.some(e=>e.answerWorker&&!ye(e.set))?await Wt():new Map;let B=rt.map(e=>ct(e,lt)),H=qt;const Re=e=>`${e.set??""}:${e.id}`,z=(e,t)=>t.block-e.block||Number(t.id.slice(2))-Number(e.id.slice(2)),Le=e=>[...e].sort(z)[0];function sa(e){if(!e)return'<div class="weighed weighed--empty"><span>Not hired yet</span></div>';const t=e.outcome==="execute",n=ne.map(r=>{const s=e.candidates.find(d=>d.worker===r)?.probability??0;return`<span class="weighed__bar" data-chosen="${t&&e.selectedWorker===r}" style="--p:${s}" title="${le[r]} ${L(s)}"></span>`}).join(""),l=t&&!e.selectedWorker?`<span class="weighed__outside">${M(e.answer)}</span>`:"";return`
    <a class="weighed" href="${M(be(e))}" style="--threshold:${e.threshold}" aria-label="${M(it(e))}, ${L(e.confidence)} confidence">
      <span class="weighed__bars">${n}<span class="weighed__line" aria-hidden="true"></span></span>
      ${l}
    </a>`}function ia(e,t){if(!e)return`<div class="judged judged--empty"><span>${t?.outcome==="execute"?"Waiting for the work":""}</span></div>`;const n=e.options??[],l=e.outcome==="execute",r=n.length>1?n.slice(0,-1).reduce((i,d)=>i+d.probability,0):e.answer==="Accept"?e.confidence:1-e.confidence,s=n.map((i,d)=>`<span class="judged__level" data-paid="${d<n.length-1}" data-best="${d===0}" style="--p:${i.probability}" title="${M(i.label)}: ${L(i.probability)}"></span>`).join("");return`
    <a class="judged" href="${M(be(e))}" data-accepted="${l}" aria-label="${M(it(e))}">
      <span class="judged__verdict">${l?"Accepted":"Not accepted"} <span class="mono">${L(Math.min(1,r))}</span></span>
      <span class="judged__bar" style="--threshold:${e.threshold}">${s||`<span class="judged__level" data-paid="true" data-best="true" style="--p:${r}"></span>`}<span class="judged__tick" aria-hidden="true"></span></span>
    </a>`}function ra(e){return e.status==="paid"?{label:e.paid!==void 0?`Paid ${re(e.paid)}`:"Paid",state:"paid"}:e.status==="refunded"?{label:"Refunded",state:"refunded"}:e.overdue?{label:"Deadline passed",state:"refunded"}:{label:"In progress",state:"open"}}function ca(e,t){const n=t.filter(s=>s.kind==="hire").sort(z)[0],l=t.filter(s=>s.kind==="grade").sort(z)[0],r=ra(e);return`
    <li class="decision-task" data-key="${M(`${e.set??""}:${e.id}`)}" data-sig="${M(`${r.state}|${t.map(Re).join(",")}`)}" data-state="${r.state}" data-below="${t.some(s=>s.below)}">
      <a class="decision-task__name" href="${M(Nt(e))}">
        <span class="mono">#${e.id}${ye(e.set)?" · earlier contracts":""}</span>
        <span>${M(e.title||`Task ${e.id}`)}</span>
      </a>
      ${sa(n)}
      ${ia(l,n)}
      <span class="decision-task__outcome" data-state="${r.state}">
        <span>${M(r.label)}</span>
        <span class="mono">${M(st(Le(t).timestamp))}</span>
      </span>
    </li>`}function la(e){const t=e.options?.[0]?.probability??(e.answer==="Adopt"?e.confidence:1-e.confidence);return`
    <li class="decision-task decision-task--change" data-key="${M(Re(e))}" data-sig="${M(`${e.outcome}|${Re(e)}`)}" data-state="change" data-below="${e.below}">
      <a class="decision-task__name" href="${M(be(e))}">
        <span class="mono">Chain change</span>
        <span>${M(e.label)}</span>
      </a>
      <span class="weighed weighed--empty"></span>
      <a class="judged" href="${M(be(e))}" data-accepted="${e.outcome==="execute"}">
        <span class="judged__verdict">${e.outcome==="execute"?"Adopted":"Not adopted"} <span class="mono">${L(t)}</span></span>
        <span class="judged__bar" style="--threshold:${e.threshold}"><span class="judged__level" data-paid="true" data-best="true" style="--p:${t}"></span><span class="judged__tick" aria-hidden="true"></span></span>
      </a>
      <span class="decision-task__outcome" data-state="change">
        <span>${e.outcome==="execute"?"In effect":"Unchanged"}</span>
        <span class="mono">${M(st(e.timestamp))}</span>
      </span>
    </li>`}function dt(){const e=new Map,t=[];for(const i of B){if(i.kind==="governance"){t.push(i);continue}const d=de(H,i);d&&e.set(d,[...e.get(d)??[],i])}const n=[...e.entries()].sort(([,i],[,d])=>z(Le(i),Le(d))),l=Object.fromEntries(ne.map(i=>[i,0]));for(const i of B)i.kind==="hire"&&i.outcome==="execute"&&i.selectedWorker&&(l[i.selectedWorker]=(l[i.selectedWorker]??0)+1);const r=n.filter(([i])=>i.status==="paid").length,s=n.filter(([i])=>i.status==="refunded").length;return{rows:n.map(([i,d])=>ca(i,d)).join("")+t.sort(z).map(la).join(""),hires:l,counts:`<span>${n.length} tasks · ${B.length} decisions</span><span>${r} paid · ${s} refunded</span>`}}function ve(e){const t=Math.floor(Math.max(0,e)/6e4);if(t<1)return"under a minute";if(t<60)return`${t} min`;const n=Math.floor(t/60);return n<48?t%60?`${n} h ${t%60} min`:`${n} h`:`${Math.round(n/24)} days`}const pt=e=>e.worker?le[e.worker]:e.workerAccount?"An outside worker":"The model",da=e=>B.filter(t=>t.kind==="grade"&&de(H,t)===e).sort(z)[0],Fe=e=>{const t=e.options??[];return t.length>1?t.slice(0,-1).reduce((n,l)=>n+l.probability,0):e.answer==="Accept"?e.confidence:1-e.confidence},ut=16,pa=6,at=e=>e==="jev"?"Jev":e==="poster"?"Poster":le[e],Oe=(e,t=220)=>{const n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-1).trimEnd()}…`:n};function ua(e){const t=e.worker,n=pt(e),l=B.filter(s=>s.kind==="hire"&&de(H,s)===e).sort(z)[0],r=da(e);return e.steps.flatMap((s,i)=>{const d={key:`${e.set??""}:${e.id}:${i}`,at:s.at,task:e};if(s.label.startsWith("Posted"))return[{...d,from:"poster",to:"jev",kind:"post",text:`Task #${e.id} posted: ${e.title}`,...e.brief?{body:Oe(e.brief)}:{},...l?{decision:l}:{}}];if((s.label.startsWith("Hired")||s.label==="Jev hired a model")&&t){const h=s.decision?` at ${L(s.decision.confidence)}`:"";return[{...d,from:"jev",to:t,kind:"hire",text:`Jev hired ${n} for #${e.id}${h}. The brief goes out`,...l?{decision:l}:{}}]}if(s.label.endsWith("delivered the result")&&t)return[{...d,from:t,to:"jev",kind:"deliver",text:`${n} delivered the work for #${e.id}`,...l?{decision:l}:{}}];if(s.label==="Jev graded the work"&&t){const h=r?r.outcome==="execute":e.accepted===!0,A=r?L(Math.min(1,Fe(r))):"",$=h?`accepted${A?` at ${A}`:""}`:`not accepted${r?`, ${A} against a ${L(r.threshold)} bar`:""}`;return[{...d,from:"jev",to:t,kind:"grade",accepted:h,text:`Jev judged #${e.id}: ${$}`,...r?{decision:r}:{}}]}return s.label.includes("USDG paid to")&&t?[{...d,from:"jev",to:t,kind:"settle",accepted:!0,text:`Paid ${e.paid!==void 0?re(e.paid):""} to ${n} for #${e.id}`,...r?{decision:r}:{}}]:s.label.includes("refunded")?[{...d,from:"jev",to:"poster",kind:"settle",accepted:!1,text:`Bounty for #${e.id} refunded to the poster`,...r?{decision:r}:{}}]:[]})}const ht=()=>H.filter(e=>!ye(e.set)).flatMap(ua).sort((e,t)=>Date.parse(e.at)-Date.parse(t.at)).slice(-ut);function ha(e){const t=H.filter(s=>!ye(s.set)&&s.worker===e),n=t.find(s=>s.status==="hired"&&!s.overdue);if(n)return{state:"working",line:`Working on #${n.id}`};const l=t.find(s=>s.status==="delivered");if(l)return{state:"delivered",line:`Delivered #${l.id}`};const r=t.find(s=>s.status==="graded"||s.status==="disputed");return r?{state:"waiting",line:`Settling #${r.id}`}:{state:"idle",line:"Idle"}}const ft=(e,t)=>`
  <li class="stream__msg" data-key="${M(e.key)}" data-kind="${e.kind}" data-accepted="${e.accepted??""}">
    <span class="stream__meta mono"><span class="stream__who">${at(e.from)}</span><span aria-hidden="true">→</span><span class="stream__who">${at(e.to)}</span><span>#${e.task.id}</span><span><span data-since="${e.at}">${ve(Date.now()-Date.parse(e.at))}</span> ago</span></span>
    <p class="stream__text" data-text="${M(e.text)}">${t?"":M(e.text)}</p>
    ${e.body?`<p class="stream__body" data-text="${M(e.body)}">${t?"":M(e.body)}</p>`:""}
  </li>`,fa={claude:"Cla",gpt:"GPT",gemini:"Gem",grok:"Grok",deepseek:"DS"},mt=e=>ne.map(t=>`<span class="board-head__model"><span class="board-head__name">${le[t]}</span><span class="board-head__short">${fa[t]}</span><span class="mono">${e[t]}<span class="board-head__unit"> hired</span></span></span>`).join(""),Te=dt(),X=ht(),De=Math.max(0,X.length-pa),nt=new Set(X.map(e=>e.key)),ma=()=>X.slice(0,De).map(e=>ft(e,!1)).join(""),J=It({title:"Decisions",nav:"decisions",description:"Every decision Jev makes on BrainChain: which model it hires for each task, and how it judges the work.",body:`
    <section class="council" aria-labelledby="decisions-title">
      <div class="council__piece piece" id="council-piece" role="img" aria-label="Jev and the five house models"></div>
      <div class="council__side">
        <header class="council__head">
          <span class="chapter__index">Decisions</span>
          <h1 id="decisions-title">Every decision <span>Jev makes.</span></h1>
          <p class="council__lead">Jev sits at the core. Each house model is a cloud of points, sized by how well Jev expects it to do the task in front of it. Every brief and every result moves between them as it reaches the chain.</p>
        </header>
        <div class="council__exchange" id="exchange-title">
          <span>Exchange</span>
          <span class="now__live" id="now-live">Live</span>
          <span id="now-updated">Read from the chain just now</span>
        </div>
        <ol class="stream__list" id="stream" aria-live="polite" aria-labelledby="exchange-title">${ma()}</ol>
      </div>
    </section>
    <section class="page decisions-page">
      <div class="decisions-toolbar">
        <div class="filters" role="group" aria-label="Filter tasks">
          <button type="button" class="mode-button" data-filter="all" aria-pressed="true">All</button>
          <button type="button" class="mode-button" data-filter="paid" aria-pressed="false">Paid</button>
          <button type="button" class="mode-button" data-filter="refunded" aria-pressed="false">Refunded</button>
          <button type="button" class="mode-button" data-filter="open" aria-pressed="false">In progress</button>
          <button type="button" class="mode-button" data-filter="change" aria-pressed="false">Chain changes</button>
          <label class="filters__toggle"><input type="checkbox" id="below" /> Below threshold only</label>
        </div>
        <p class="decisions-toolbar__counts mono" id="counts">${Te.counts}</p>
      </div>
      ${Xe?"":Ot}
      <div class="board" role="region" aria-label="Jev's decisions by task">
        <div class="board-head" aria-hidden="true">
          <span class="board-head__task mono">Task</span>
          <span class="board-head__models" id="model-head">${mt(Te.hires)}</span>
          <span class="board-head__grade mono">Judged</span>
          <span class="board-head__outcome mono">Outcome</span>
        </div>
        <p class="board-key">Each bar is Jev's estimate of how well a model would do the task. The hired model is rose, and the line marks the hire threshold. The judgment splits the poster's quality levels, best first, and the tick marks how much the paid levels must reach.</p>
        ${B.length>0?`<ol class="decision-tasks" id="rows">${Te.rows}</ol>`:Xe?'<p class="empty-state">No decisions yet. Each hire and judgment Jev makes appears here as it happens.</p>':""}
      </div>
      <p class="empty" id="empty" hidden>No tasks match this filter.</p>
      <p class="visually-hidden" id="shown" aria-live="polite"></p>
    </section>`}),D=e=>J.querySelector(e);let je="all";const gt=D("#below");function Ne(){let e=0;for(const t of J.querySelectorAll(".decision-task")){const n=(je==="all"||t.dataset.state===je)&&(!gt.checked||t.dataset.below==="true");t.hidden=!n,n&&(e+=1)}D("#empty").hidden=e>0||B.length===0,D("#shown").textContent=`${e} ${e===1?"row":"rows"} shown.`}for(const e of J.querySelectorAll("[data-filter]"))e.addEventListener("click",()=>{je=e.dataset.filter;for(const t of J.querySelectorAll("[data-filter]"))t.setAttribute("aria-pressed",String(t===e));Ne()});gt.addEventListener("change",Ne);async function ga(){if(document.hidden)return;const e=await Bt().catch(()=>{});if(!e?.ok){D("#now-live").dataset.state="stale";return}D("#now-live").dataset.state="live",bt=Date.now(),B=e.decisions.map(s=>ct(s,lt)),H=e.tasks,Dt(s=>de(H,s));const t=ht().filter(s=>!nt.has(s.key));for(const s of t)nt.add(s.key);Ie.push(...t),$t(),qe();const n=J.querySelector("#rows");if(!n)return;const l=new Map([...n.querySelectorAll(".decision-task")].map(s=>[s.dataset.key,s.dataset.sig])),r=dt();n.innerHTML=r.rows;for(const s of n.querySelectorAll(".decision-task"))l.get(s.dataset.key)!==s.dataset.sig&&s.classList.add("is-new");D("#model-head").innerHTML=mt(r.hires),_e.seats(vt()),D("#counts").innerHTML=r.counts,Ne()}window.setInterval(()=>void ga(),oa);let bt=Date.now();function qe(){const e=Date.now();for(const n of J.querySelectorAll("[data-since]"))n.textContent=ve(e-Date.parse(n.dataset.since));for(const n of J.querySelectorAll("[data-until]"))n.textContent=ve(Date.parse(n.dataset.until)-e);const t=Math.round((e-bt)/1e3);D("#now-updated").textContent=t<5?"Read from the chain just now":`Read from the chain ${t} s ago`}qe();window.setInterval(qe,1e3);async function ba(e,t){const n=Math.max(1,Math.round(t.length/60));for(let l=0;l<t.length;l+=n)e.textContent=t.slice(0,l),await Be(16);e.textContent=t}const Pe=window.matchMedia("(prefers-reduced-motion: reduce)").matches,Be=e=>new Promise(t=>window.setTimeout(t,e)),Ie=X.slice(De);let Ee=!1;const va={post:"Posted",hire:"Hired",deliver:"Delivered",grade:"Judged",settle:"Settled"},ya={post:"Brief in",hire:"Jev decided",deliver:"Work back",grade:"Jev decided",settle:"Settled"},vt=()=>Object.fromEntries(ne.map(e=>[e,ha(e)])),_a=e=>B.filter(t=>t.kind==="hire"&&de(H,t)===e).sort(z)[0];function yt(e){const{task:t,kind:n}=e,l=_a(t),r={};for(const $ of l?.candidates??[])ne.includes($.worker)&&(r[$.worker]=$.probability);const s=pt(t),i=e.accepted===!0,d=e.decision,h=n==="post"?`Brief #${t.id}`:n==="hire"?`Brief #${t.id}`:n==="deliver"?`Work #${t.id}`:n==="grade"?i?`Accepted${d?` ${L(Math.min(1,Fe(d)))}`:""}`:"Not accepted":i&&t.paid!==void 0?re(t.paid):`Refund #${t.id}`,A=n==="post"?`Posted / ${re(t.bounty)}`:n==="hire"?`${s} / Hired${d?` / ${L(d.confidence)}`:""}`:n==="deliver"?`${s} / Delivered`:n==="grade"?`${s} / ${i?"Accepted":"Not accepted"}${d?` / ${L(Math.min(1,Fe(d)))}${i?"":` vs ${L(d.threshold)}`}`:""}`:i?`${s} / Paid ${t.paid!==void 0?re(t.paid):""}`.trim():"Refunded to the poster";return{from:e.from,to:e.to,packet:h,weights:r,task:t.id,...t.worker?{hired:t.worker}:{},positive:n==="hire"||(n==="grade"||n==="settle")&&i,confidence:d?.confidence??l?.confidence??.5,seed:`${t.set??""}:${l?.id??t.id}`,corners:{tl:`Task ${t.id} / ${va[n]}`,tr:d?`Decision ${d.id.replace(/^d-/,"")} / Block ${d.block.toLocaleString("en-US")}`:`Posted ${ve(Date.now()-Date.parse(t.postedAt))} ago`,bl:Oe(t.title,48),br:A},tick:ya[n],label:e.text}}const _e=na(D("#council-piece"),ne,le);_e.seats(vt());const ot=[...X].reverse().find(e=>e.kind!=="post")??X.at(-1);ot&&_e.show(yt(ot));const $a=e=>_e.show(yt(e));async function _t(e){if(e.kind!=="deliver")return e;const{task:t}=e;if(!(t.accepted||t.status==="paid")||!t.resultURI||!t.resultHash)return{...e,body:"The work is published once Jev accepts it."};const n=await Promise.race([Ut(t.resultURI,t.resultHash).catch(()=>{}),Be(4e3).then(()=>{})]);return n?{...e,body:Oe(n,280)}:e}async function $t(){if(Ee)return;Ee=!0;const e=D("#stream");for(;Ie.length>0;){const t=await _t(Ie.shift());e.insertAdjacentHTML("beforeend",ft(t,!Pe));const n=e.lastElementChild;if(n.classList.add("is-new"),e.scrollTop=e.scrollHeight,$a(t),!Pe)for(const l of n.querySelectorAll("[data-text]"))await ba(l,l.dataset.text);for(;e.children.length>ut;)e.firstElementChild.remove();await Be(Pe?0:900)}Ee=!1}$t();for(const e of X.slice(0,De).filter(t=>t.kind==="deliver"))_t(e).then(t=>{if(!t.body)return;const n=J.querySelector(`.stream__msg[data-key="${CSS.escape(e.key)}"]`);!n||n.querySelector(".stream__body")||n.insertAdjacentHTML("beforeend",`<p class="stream__body">${M(t.body)}</p>`)});
