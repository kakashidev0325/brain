import{m as r,u as d,e as i}from"./layout-DQNtl7TS.js";import{l as n,g as h,c as m,i as p,f as g,h as b,t as k,j as $,b as u,e as B}from"./explorer-GgEGJhGS.js";import"./explorer-abi-DnI6ndb3.js";import"./network-C32dV2Rj.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const s=new URLSearchParams(location.search).get("n")??"";if(!/^\d{1,12}$/.test(s))n("Block",s,"A block number is a whole number, such as 42.");else try{const t=BigInt(s),[e,c]=await Promise.all([h(t),m.getBlockNumber()]);if(!e)n("Block",s,`BrainChain has produced ${(c+1n).toLocaleString("en-US")} blocks so far, numbered from 0.`);else{const o=e.transactions.filter(a=>!p(a)),l=e.transactions.length-o.length;r({title:`Block ${t}`,nav:"explorer",description:`Block ${t} on BrainChain and the transactions in it.`,body:`
          <section class="page">
            <header class="page-head">
              <span class="chapter__index"><a href="/explorer">Explorer</a> / Block</span>
              <h1>Block ${Number(t).toLocaleString("en-US")}</h1>
              <p>${o.length===0?"No user transactions":o.length===1?"One transaction":`${o.length} transactions`}, ${BigInt(e.timestamp)===0n?"the genesis block":g(e.timestamp)}.${l?" Every block also carries one chain bookkeeping transaction, not listed here.":""}</p>
            </header>
            <dl class="facts facts--wide">
              <dt>Time</dt><dd>${BigInt(e.timestamp)===0n?"Genesis (no timestamp)":d(new Date(Number(BigInt(e.timestamp))*1e3).toISOString())}</dd>
              <dt>Hash</dt><dd class="mono"><span>${i(e.hash)}</span></dd>
              <dt>Parent</dt><dd>${t>0n?b(t-1n):"None (genesis)"}</dd>
              <dt>Gas used</dt><dd class="mono">${BigInt(e.gasUsed).toLocaleString("en-US")}</dd>
            </dl>
            ${o.length?`<table class="data-table card-table">
              <thead><tr><th scope="col">Transaction</th><th scope="col">Action</th><th scope="col">From</th><th scope="col">Value</th></tr></thead>
              <tbody>${o.map(a=>`<tr>
                  <th scope="row">${k(a.hash)}</th>
                  <td data-label="Action">${i($(a)??"Transfer")}</td>
                  <td data-label="From">${u(a.from)}</td>
                  <td class="mono" data-label="Value">${BigInt(a.value)>0n?B(BigInt(a.value)):"None"}</td>
                </tr>`).join("")}</tbody>
            </table>`:""}
            <p class="pager">${t>0n?`<a href="/block?n=${t-1n}">Previous block</a>`:""}${t<c?` <a href="/block?n=${t+1n}">Next block</a>`:""}</p>
          </section>`})}}catch{n("Block",s)}
