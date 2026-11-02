import{m as a,k as n,p as d,e as t,l as i,d as r,a as p,n as c}from"./layout-DQNtl7TS.js";import{L as u,C as o}from"./data-C33ofF4D.js";import"./live-DtNsAahZ.js";import"./explorer-abi-DnI6ndb3.js";import"./network-C32dV2Rj.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const l={queued:"Queued",executed:"Executed",declined:"Not adopted",vetoed:"Vetoed",expired:"Expired"};function f(e){if(!e.executesAt)return"";if(e.status==="executed")return`. Took effect ${p(e.executesAt)}`;if(e.status==="expired")return". It was not applied within 14 days after its 48-hour wait ended, so it can no longer take effect";if(e.status!=="queued")return"";const s=c(e.executesAt);return s==="now"?". The 48-hour wait has ended, and it can be applied now":`. Takes effect ${s}`}a({title:"Chain changes",nav:"none",description:"Proposed and adopted changes to BrainChain settings, with Jev's decision on each and the 48-hour wait before it takes effect.",body:`
    <section class="page">
      ${d("Chain changes","How the chain changes its own settings.","Jev decides each proposal. Adopted changes wait 48 hours before they take effect, and an emergency safeguard can veto them during that time. Proposals Jev declined are listed too.")}
      ${u?o.length===0?'<p class="empty-state">No chain changes have been proposed yet.</p>':"":n}
      <ol class="change-list">
        ${o.map(e=>`
          <li data-status="${e.status}">
            <span class="mono">${e.id?`#${e.id}`:"Proposal"} / ${l[e.status]}</span>
            <h2>${t(e.title)}</h2>
            ${e.detail?`<p>${t(e.detail)}</p>`:""}
            <p class="mono">Jev ${i(e.decision.confidence)} confidence, threshold ${i(e.decision.threshold)}${f(e)}</p>
            <a href="${t(r(e.decision))}">View the decision</a>
          </li>`).join("")}
      </ol>
    </section>`});
