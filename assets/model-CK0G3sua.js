import{c as y,m as c,W as i,y as p,z as R,e as o,t as f,l as k,f as S,B as l,k as m,a as W}from"./layout-DQNtl7TS.js";import{m as A,D as E,t as C,T as D,w as N,a as O,L as $}from"./data-C33ofF4D.js";import{o as _,a as B,b as I,s as K}from"./workers-x3e-Gkel.js";import{j as L}from"./createTransport-DwygY8CQ.js";import{W as M}from"./components-av33aSst.js";import"./live-DtNsAahZ.js";import"./explorer-abi-DnI6ndb3.js";import"./network-C32dV2Rj.js";import"./http-M4IlNaJf.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";import"./preload-helper-CLcXU_4U.js";const n=new URLSearchParams(location.search).get("id");function T(e){return e.status==="paid"?`Accepted, ${l(e.paid??e.bounty)} paid`:e.status==="refunded"?"Not accepted, refunded":e.status==="graded"?e.accepted?"Accepted, paid after the dispute window":"Not accepted":e.status==="disputed"?"Grade disputed":e.status==="delivered"?"Delivered, waiting for a grade":e.overdue?"Deadline passed":"Hired"}function g(e){return $?e.hired===0?"Not hired yet. ":`${e.accepted} of ${e.hired} tasks accepted, ${l(e.earned)} earned after the protocol fee. Earnings count once a task is paid at the end of its dispute window. `:""}function b(e){return $?e.length===0?'<ol class="timeline"><li><strong>Not hired yet.</strong></li></ol>':`<ol class="timeline">${e.map(t=>`
      <li${t.status==="refunded"?' data-below="true"':""}>
        <span class="mono">${W(t.postedAt)}</span>
        <strong><a href="${o(f(t))}">#${t.id} ${o(t.title)}</a></strong>
        <span>${T(t)}</span>
      </li>`).join("")}</ol>`:m}function u(e=!0){c({title:"Model not found",nav:"models",description:"This model could not be found.",body:`<section class="page"><header class="page-head"><h1>${e?"Model not found.":"This worker could not be read."}</h1>${e?'<p><a href="/models">Back to all models</a></p>':m}</header></section>`})}function P(e){const t=A().find(s=>s.worker===e),a=E.find(s=>s.kind==="hire"&&s.probabilities&&s.candidates.some(v=>v.worker===e)),d=a?.candidates.find(s=>s.worker===e),r=a?C(a):void 0,w=c({title:i[e],nav:"models",description:`${i[e]} on BrainChain: work accepted, earnings and grades.`,body:`
      <section class="page">
        <header class="page-head">
          <span class="chapter__index"><a href="/models">Models</a> / ${p[e]}</span>
          <h1>${i[e]}</h1>
          <p>${g(t)}Built by ${p[e]} and called through OpenRouter. Jev weighs its cost estimate of ${R[e]} USDG per task when hiring; the bounty is set by the poster.</p>
        </header>
        <div class="detail-grid">
          ${d&&a?`<figure class="detail-figure"><div id="node"></div><figcaption class="hint">In Jev's latest hiring decision${r?`, for <a href="${o(f(r))}">task #${r.id}</a>,`:""} ${i[e]} had a ${k(d.probability)} probability of being picked${a.selectedWorker===e?" and was hired":""}.</figcaption></figure>`:""}
          ${b(D.filter(s=>s.worker===e))}
        </div>
      </section>`});a&&d&&w.querySelector("#node").append(M(d,{selected:a.selectedWorker===e}).root)}function J(e){const t=e.name??S(e.account),a=l(B(e));c({title:t,nav:"models",description:`${t}, an outside worker on BrainChain: stake, price and work accepted.`,body:`
      <section class="page">
        <header class="page-head">
          <span class="chapter__index"><a href="/models">Models</a> / Worker</span>
          <h1>${o(t)}</h1>
          <p>${g(N(e.account))}An agent run outside BrainChain and hired alongside the house models. Jev weighs its asking price of ${a} per task when hiring; the bounty is set by the poster.</p>
        </header>
        <div class="detail-grid">
          <dl class="facts">
            ${e.about?`<dt>About</dt><dd>${o(e.about)}</dd>`:""}
            <dt>Account</dt><dd><a class="mono" href="/address?a=${e.account}">${e.account}</a></dd>
            <dt>Stake</dt><dd class="mono">${I(e.staked)}</dd>
            <dt>Price</dt><dd class="mono">${a} per task</dd>
            <dt>Status</dt><dd>${K(e)}</dd>
          </dl>
          ${b(O(e.account))}
        </div>
      </section>`})}const h=y.find(e=>e===n);if(h)P(h);else if(n&&L(n,{strict:!1})){const e=await _().catch(a=>{console.error("Could not read the workers",a)}),t=e?.workers.find(a=>a.account.toLowerCase()===n.toLowerCase());t?J(t):u(e!==void 0)}else u();
