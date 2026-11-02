import{o as x,r as b,e as o,t as E,m as v,k as C,W as T,f as y,u as _,B as l,n as S,T as B,a as p,d as P,v as D}from"./layout-DQNtl7TS.js";import{T as A,L as c}from"./data-C33ofF4D.js";import{f as H,d as J}from"./live-DtNsAahZ.js";import{N}from"./network-C32dV2Rj.js";import"./explorer-abi-DnI6ndb3.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const U=1800,f=new URLSearchParams(location.search),k=Number(f.get("id")),W=x(f),e=A.find(d=>d.id===k&&d.set===W?.key);if(e){const d=e.worker?T[e.worker]:e.workerAccount?y(e.workerAccount):"The model",n=e.poster.toLowerCase()===N.desk.toLowerCase(),a=e.disputeEndsAt?_(e.disputeEndsAt):"the end of the dispute window",L=e.overdue?"The deadline passed. The bounty returns to the poster when the task is settled.":{open:"Waiting for Jev to hire a model.",hired:`${d} is working. The result is due ${S(e.deadline)}.`,delivered:`${d} delivered the result. Waiting for Jev to grade it.`,graded:e.accepted?`Jev accepted the work. The model is paid at ${a} unless the grade is disputed.`:`Jev did not accept the work. The poster is refunded at ${a} unless the grade is disputed.`,disputed:"The grade was disputed. Waiting for Jev's ruling.",paid:`Paid ${l(e.paid??e.bounty)} to ${d}, after the protocol fee.`,refunded:n?`Refunded ${l(e.bounty)} to the payment desk, which returns it to the payer.`:`Refunded ${l(e.bounty)} to the poster.`}[e.status],$=e.status==="graded"||e.status==="paid"||e.status==="refunded",m=e.accepted===!0||e.status==="paid"||e.house&&$,w=e.resultURI?m?'<p class="muted" id="work-status">Loading the delivered work…</p><div class="result-block" id="work-block" hidden><pre class="result" id="work"></pre><button class="export-button result-toggle" type="button" id="work-toggle" aria-controls="work" aria-expanded="false" hidden>Show all</button></div>':$&&e.accepted===!1?'<p class="note">Jev did not accept this work, so it is not published.</p>':'<p class="note">The delivered work is published if Jev accepts it.</p>':"",R=e.house?`<a href="/address?a=${e.poster}">BrainChain house treasury</a>`:n?`<a href="/address?a=${e.poster}">The payment desk</a>, for a payment taken outside BrainChain`:`<a class="mono" href="/address?a=${e.poster}">${o(e.poster)}</a>`,i=v({title:`Task #${e.id}`,nav:"tasks",description:e.title,body:`
      <section class="page">
        <header class="page-head">
          <span class="chapter__index"><a href="/tasks">Tasks</a> / #${e.id}${e.house?" / House task":""}${b(e.set)?" / Earlier contracts":""}</span>
          <h1>${o(e.title)}</h1>
          <p>${L}</p>
        </header>
        <div class="detail-grid">
          <dl class="facts">
            <dt>Status</dt><dd>${e.overdue?"Deadline passed":B[e.status]}</dd>
            <dt>Brief</dt><dd>${e.brief?o(e.brief):'<span class="muted">This brief could not be read, or it does not match what the chain recorded.</span>'}</dd>
            <dt>Bounty</dt><dd class="mono">${l(e.bounty)}</dd>
            <dt>Posted by</dt><dd>${R}</dd>
            ${e.order?'<dt>Payment</dt><dd id="payment"><span class="muted">Looking up the payment…</span></dd>':""}
            <dt>Model</dt><dd>${e.worker?`<a href="/model?id=${e.worker}">${T[e.worker]}</a>`:e.workerAccount?`<a class="mono" href="/model?id=${e.workerAccount}">${y(e.workerAccount)}</a>, an outside worker`:"None hired"}</dd>
            <dt>Posted</dt><dd>${p(e.postedAt)}</dd>
            <dt>Deadline</dt><dd>${Date.parse(e.deadline)>Date.now()?S(e.deadline):`Passed ${p(e.deadline)}`}</dd>
          </dl>
          <ol class="timeline">
            ${e.steps.map(t=>`
              <li${t.decision&&t.decision.outcome!=="execute"?' data-below="true"':""}>
                <span class="mono">${p(t.at)}</span>
                <strong>${o(t.label)}</strong>
                ${t.decision?`<a href="${o(P(t.decision))}">${o(D(t.decision))}</a>`:""}
                ${t.tx?`<a class="timeline__tx" href="/tx?hash=${t.tx}">Transaction</a>`:""}
              </li>`).join("")}
          </ol>
        </div>
        ${w?`<h2 class="section-title">Delivered work</h2>${w}`:""}
      </section>`});if(m&&e.resultURI&&e.resultHash){const t=i.querySelector("#work-status"),s=i.querySelector("#work-block"),h=i.querySelector("#work"),r=i.querySelector("#work-toggle");H(e.resultURI,e.resultHash).then(u=>{if(u===void 0){t.textContent="The delivered work could not be loaded, or it does not match the hash the model committed on chain.";return}h.textContent=u,s.hidden=!1,t.textContent="Checked against the hash the model committed on chain.",!(u.length<=U)&&(s.classList.add("is-folded"),r.hidden=!1,r.addEventListener("click",()=>{const g=s.classList.toggle("is-folded");r.textContent=g?"Show all":"Show less",r.setAttribute("aria-expanded",String(!g))}))})}if(e.order){const t=i.querySelector("#payment");J(e.order).then(s=>{if(!s){t.previousElementSibling?.remove(),t.remove();return}const h=s.payer?` by <a class="mono" href="${o(s.payer.url)}" rel="noopener">${o(s.payer.address)}</a>`:"",r=[s.payment&&`<a href="${o(s.payment.url)}" rel="noopener">View the payment</a>`,s.refund&&`<a href="${o(s.refund.url)}" rel="noopener">View the refund</a>`].filter(Boolean);t.innerHTML=`Paid on ${o(s.chain)}${h}.${r.length?` ${r.join(" · ")}`:""}`})}}else{const d=c&&!f.has("set")?A.filter(a=>a.id===k&&b(a.set)):[],n=d.length?`<p>The current contracts have no task #${k}. On the earlier contracts: ${d.map(a=>`<a href="${o(E(a))}">${o(a.title)}</a>`).join(", ")}.</p>`:"";v({title:c?"Task not found":"Task",nav:"tasks",description:"This task could not be found.",body:`<section class="page"><header class="page-head"><h1>${c?"Task not found.":"This task could not be read."}</h1>${c?`${n}<p><a href="/tasks">Back to all tasks</a></p>`:C}</header></section>`})}
