import{m as T,e as g,i as I,j as D}from"./layout-DQNtl7TS.js";import{l as u,c,a as G,d as O,e as R,u as S,b as E,t as x}from"./explorer-GgEGJhGS.js";import{N as p}from"./network-C32dV2Rj.js";import{g as F,i as H,p as P}from"./createTransport-DwygY8CQ.js";import"./explorer-abi-DnI6ndb3.js";import"./http-M4IlNaJf.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";import"./preload-helper-CLcXU_4U.js";const i=new URLSearchParams(location.search).get("a")??"",A="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",n=100000n,B=25,h=(e,r)=>c.request({method:"eth_getLogs",params:[{fromBlock:`0x${e.toString(16)}`,toBlock:"latest",...r}]});if(!/^0x[0-9a-fA-F]{40}$/.test(i))u("Address",i,"An address is 0x followed by 40 hexadecimal characters.");else try{const e=F(i),r=H(e).toLowerCase(),[d,b]=await Promise.all([c.getBlockNumber(),c.getCode({address:e})]),s=!!b&&b!=="0x",l=d>n?d-n:1n,[v,C,L,N,U,k]=await Promise.all([c.getBalance({address:e}),c.getTransactionCount({address:e}),c.readContract({address:p.contracts.USDG,abi:P(["function balanceOf(address) view returns (uint256)"]),functionName:"balanceOf",args:[e]}),h(l,{address:p.contracts.USDG,topics:[A,r]}),h(l,{address:p.contracts.USDG,topics:[A,null,r]}),s?h(l,{address:e}):Promise.resolve([])]),o=G(e),f=[...N,...U].sort((t,a)=>Number(BigInt(a.blockNumber)-BigInt(t.blockNumber))||Number(BigInt(a.logIndex)-BigInt(t.logIndex))).slice(0,B),$=k.slice(-B).reverse().map(t=>({log:t,event:O(t)})).filter(t=>t.event!==void 0),w=T({title:o?.name??"Address",nav:"explorer",description:o?.role??`Balances and activity for ${e} on BrainChain.`,body:`
        <section class="page">
          <header class="page-head">
            <span class="chapter__index"><a href="/explorer">Explorer</a> / ${s?"Contract":"Account"}</span>
            <h1>${g(o?.name??(s?"Contract":"Account"))}</h1>
            <p>${g(o?.role??(s?"A contract on BrainChain.":"An account on BrainChain."))}${o?.href?` <a href="${o.href}">See its page</a>.`:""}</p>
          </header>
          <dl class="facts facts--wide">
            <dt>Address</dt><dd class="mono"><span>${e}</span> ${I(e,"address")}</dd>
            <dt>ETH</dt><dd class="mono">${R(v)}</dd>
            <dt>USDG</dt><dd class="mono">${S(L)}</dd>
            ${s?"":`<dt>Transactions sent</dt><dd class="mono">${C.toLocaleString("en-US")}</dd>`}
          </dl>
          <h2 class="section-title">Latest USDG transfers</h2>
          ${f.length?`<table class="data-table card-table">
            <thead><tr><th scope="col">Transfer</th><th scope="col">Counterparty</th><th scope="col">Amount</th><th scope="col">Transaction</th></tr></thead>
            <tbody>${f.map(t=>{const a=`0x${t.topics[1].slice(26)}`,y=`0x${t.topics[2].slice(26)}`,m=a.toLowerCase()===e.toLowerCase();return`<tr>
                  <th scope="row">${m?"Sent":"Received"}</th>
                  <td data-label="${m?"To":"From"}">${E(m?y:a)}</td>
                  <td class="mono" data-label="Amount">${S(BigInt(t.data))}</td>
                  <td data-label="Transaction">${x(t.transactionHash)}</td>
                </tr>`}).join("")}</tbody>
          </table>`:`<p class="note">No USDG has moved in or out of this address${d>n?` in the latest ${n.toLocaleString("en-US")} blocks`:""}.</p>`}
          ${s?`<h2 class="section-title">Latest events</h2>${$.length?`<ol class="timeline">${$.map(({log:t,event:a})=>`<li><strong>${a.text}</strong><span class="mono">${a.name} · ${x(t.transactionHash)}</span></li>`).join("")}</ol>`:`<p class="note">No events from this contract that the explorer can read${d>n?` in the latest ${n.toLocaleString("en-US")} blocks`:""}.</p>`}`:""}
        </section>`});D(w)}catch{u("Address",i)}
