import{m,p,e as b,U as k}from"./layout-DQNtl7TS.js";import{s as g,k as u,c as f,h as i,g as $,i as y,f as B,t as T,j as L,b as w}from"./explorer-GgEGJhGS.js";import{N as n}from"./network-C32dV2Rj.js";import"./explorer-abi-DnI6ndb3.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const e=m({title:"Explorer",nav:"explorer",description:"Blocks, transactions and addresses on BrainChain, read straight from the chain.",body:`
    <section class="page">
      ${p("Explorer","Every block on BrainChain.","Look up a transaction, an address or a block. Tasks and decisions have their own pages, linked from each transaction.")}
      ${g()}
      <dl class="facts facts--wide" id="stats">
        <dt>Latest block</dt><dd class="mono" id="height">Reading…</dd>
        <dt>Chain ID</dt><dd class="mono">${n.chainId}</dd>
        <dt>Settles to</dt><dd>${n.parent.name} (chain ${n.parent.chainId})</dd>
      </dl>
      <h2 class="section-title">Latest blocks</h2>
      <table class="data-table card-table" id="blocks" hidden>
        <thead><tr><th scope="col">Block</th><th scope="col">Age</th><th scope="col">Transactions</th><th scope="col">First transaction</th></tr></thead>
        <tbody></tbody>
      </table>
      <p class="hint" id="blocks-status" role="status">Reading the chain…</p>
    </section>`});u(e);const c=e.querySelector("#blocks-status");try{const o=await f.getBlockNumber();e.querySelector("#height").innerHTML=i(o);const d=Array.from({length:Math.min(20,Number(o)+1)},(t,a)=>o-BigInt(a)),l=(await Promise.all(d.map(t=>$(t)))).filter(t=>t!==null).map(t=>{const a=t.transactions.filter(h=>!y(h)),s=a[0];return`<tr>
        <th scope="row">${i(BigInt(t.number))}</th>
        <td data-label="Age">${B(t.timestamp)}</td>
        <td data-label="Transactions">${a.length}</td>
        <td data-label="First transaction">${s?`${T(s.hash)} <span class="muted">${b(L(s)??"Transfer")} from ${w(s.from)}</span>`:'<span class="muted">Chain bookkeeping only</span>'}</td>
      </tr>`}),r=e.querySelector("#blocks");r.tBodies[0].innerHTML=l.join(""),r.hidden=!1,c.hidden=!0}catch{c.textContent=k}
