import{m as k,x as y,E as h,k as w}from"./layout-DQNtl7TS.js";import{c as p}from"./live-DtNsAahZ.js";import{N as v,T as f}from"./network-C32dV2Rj.js";import{p as $}from"./http-M4IlNaJf.js";import{l as T}from"./createTransport-DwygY8CQ.js";import"./explorer-abi-DnI6ndb3.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";import"./preload-helper-CLcXU_4U.js";const u=y.mainnet.inscriptions,I=498n,c=new Map([["set","Contracts"],["contract","Contract"],["cli","Worker CLI"],["integration","Integration"],["consistency","Consistency"]]),_=[{block:445,hash:"0x4e709af977235bcf0753ed8e4dd492225baf7269770fd02763949f8baac77beb"},{block:448,hash:"0x69caa0184e8e624208383a4a9d8f6387c2e2f57458db912114614bc4547459d2"}],C=$("event Inscribed(address indexed by, string kind, bytes data)"),i=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");function b(t,e,a,n,o){try{const r=T(o),s=JSON.parse(r);if(s.brainchain!==1)return;const l=n??String(s.kind??"record");if(!c.has(l))return;const g=typeof s.at=="string"?s.at:void 0;return{block:t,hash:e,by:a,kind:l,at:g,body:s}}catch{return}}async function N(){const[t,e]=await Promise.all([p.getLogs({address:u,event:C,fromBlock:I}),Promise.all(_.map(async({block:n,hash:o})=>({block:n,hash:o,tx:await p.getTransaction({hash:o})})))]),a=[];for(const{block:n,hash:o,tx:r}of e){const s=b(n,o,r.from,void 0,r.input);s&&a.push(s)}for(const n of t){const o=b(Number(n.blockNumber),n.transactionHash,n.args.by,n.args.kind,n.args.data);o&&a.push(o)}return a.sort((n,o)=>o.block-n.block)}function S(t){const e=t.body;switch(t.kind){case"set":{const a=e.version??e.release??e.set;return a===void 0?"Contracts updated":`Contracts updated to version ${i(a)}`}case"cli":return`Worker CLI ${i(e.version??"")}`;case"contract":return`New contract: ${i(e.name??"")}`;case"integration":return`New integration: ${i(e.name??"")}`;case"consistency":return`Jev gave the same answer to ${i(e.sameAnswer??"?")} of ${i(e.asked??"?")} recorded questions`;default:return i(c.get(t.kind)??t.kind)}}const x=[["address","Address"],["method","Method"],["meanProbabilityShift","Mean probability shift"]];function E(t){const e=x.filter(([a])=>t.body[a]!==void 0).map(([a,n])=>`<div><dt>${i(n)}</dt><dd>${i(t.body[a])}</dd></div>`);return e.length?`<dl class="ops-record__facts">${e.join("")}</dl>`:""}function L(t){return t.length===0?'<p class="empty-state">No records yet.</p>':`
    <ol class="ops-log">
      ${t.map(e=>`
        <li class="ops-record" data-kind="${i(e.kind)}">
          <div class="ops-record__meta">
            <span class="ops-record__kind">${i(c.get(e.kind)??e.kind)}</span>
            <span class="ops-record__at">${i(e.at?e.at.replace("T"," ").replace(/:00Z$/,"Z"):`block ${e.block}`)}</span>
          </div>
          <div class="ops-record__body">
            <h3>${S(e)}</h3>
            ${E(e)}
            <p class="ops-record__verify"><a href="/tx?hash=${e.hash}">Block ${e.block}</a></p>
          </div>
        </li>`).join("")}
    </ol>`}const m=k({title:"Operations",nav:"operations",description:"How the BrainChain network is run, and a record of updates to its contracts, worker CLI and integrations, written into BrainChain's own blocks.",body:`
    <section class="chapter chapter--ink ops-head" aria-labelledby="ops-title">
      <header class="page-head">
        <span class="chapter__index">Operations</span>
        <h1 id="ops-title">Run by an agent, on the record.</h1>
        <p>An AI agent operates the BrainChain network and keeps it current. Updates to the contracts, the worker CLI and integrations are written into BrainChain's own blocks, where they cannot be edited afterwards.</p>
      </header>
      <dl class="ops-facts">
        <div>
          <dt>What the agent does</dt>
          <dd>It keeps the network's node and services running and up to date, and writes the record on this page. It cannot move funds, change a contract or adopt a chain change. Chain changes are decided by Jev and wait 48 hours before they take effect (<a href="${h("trust-model")}">Trust model</a>).</dd>
        </div>
        <div>
          <dt>If the sequencer stops</dt>
          <dd>Any account can still have its transactions included by sending them through Robinhood Chain. The <a href="${h("network")}">network docs</a> explain how.</dd>
        </div>
        <div>
          <dt>Reading the record</dt>
          <dd>Each entry links to the transaction that wrote it. New entries are events of <a href="/address?a=${u}">the Inscriptions contract</a>, readable by anyone from <code>rpc.usebrainchain.com</code>.</dd>
        </div>
      </dl>
    </section>
    <section class="chapter chapter--ink ops-body" aria-labelledby="check-title">
      <header class="chapter__head">
        <span class="chapter__index">Check it yourself</span>
        <h2 id="check-title">Live, from the services.</h2>
        <p>Each figure below is read now from BrainChain's own services. Follow the links to the raw data.</p>
      </header>
      <dl class="ops-facts" id="ops-live">
        <div><dt>Second opinion</dt><dd>Reading…</dd></div>
        <div><dt>Testnet enclave</dt><dd>Reading…</dd></div>
      </dl>
    </section>
    <section class="chapter chapter--ink ops-body" aria-labelledby="log-title">
      <header class="chapter__head">
        <span class="chapter__index">The record</span>
        <h2 id="log-title">Updates, written into blocks.</h2>
        <p>New contracts, worker CLI versions, integrations and Jev's consistency checks, newest first.</p>
      </header>
      <div id="ops-log"><p class="empty-state">Reading the chain…</p></div>
    </section>`}),d=m.querySelector("#ops-log");d&&N().then(t=>{d.innerHTML=L(t)},()=>{d.innerHTML=w});async function R(){const t=m.querySelector("#ops-live");if(!t)return;const[e,a]=await Promise.all([fetch(`${v.service}/second-opinions`).then(s=>s.ok?s.json():void 0,()=>{}),fetch(`${f.service}/attestation`).then(s=>s.ok?s.json():void 0,()=>{})]),n=e?.byKind.grade,o=e?`An independent open model, served in a TEE (Trusted Execution Environment) by Phala Private AI, is asked every decision Jev makes. Its top choice matches Jev's on ${e.agree} of ${e.asked}${n?.compared?`; on grades, it would have paid the same way ${n.sameOutcome??0} of ${n.compared} times`:""}. <a href="${v.service}/second-opinions">The tally and its signed receipts</a>.`:"The tally could not be read just now.",r=a?`The testnet service that records decisions runs in a TEE. Its key, ${i(a.brain)}, was created inside the enclave, and its <a href="${f.service}/attestation">attestation</a> is served by the enclave itself.`:"The attestation could not be read just now.";t.innerHTML=`<div><dt>Second opinion</dt><dd>${o}</dd></div><div><dt>Testnet enclave</dt><dd>${r}</dd></div>`}R();
