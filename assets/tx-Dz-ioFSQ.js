import{m as g,e as d}from"./layout-DQNtl7TS.js";import{l as i,m as $,n as u,o as b,d as f,j as k,e as m,h as x,f as T,b as c}from"./explorer-GgEGJhGS.js";import"./explorer-abi-DnI6ndb3.js";import"./network-C32dV2Rj.js";import"./http-M4IlNaJf.js";import"./createTransport-DwygY8CQ.js";import"./preload-helper-CLcXU_4U.js";import"./localBatchGatewayRequest-BmSaWXQR.js";import"./secp256k1-Z3DxcrOW.js";const s=new URLSearchParams(location.search).get("hash")??"";if(!/^0x[0-9a-fA-F]{64}$/.test(s))i("Transaction",s,"A transaction hash is 0x followed by 64 hexadecimal characters.");else try{const[a,t]=await Promise.all([$(s),u(s)]);if(!a)i("Transaction",s,"BrainChain has no transaction with this hash. It may be on another chain, or still waiting to be included.");else{const r=a.blockNumber?await b(BigInt(a.blockNumber)):null,l=(t?.logs??[]).map(f).filter(o=>o!==void 0),p=k(a),n=BigInt(a.value),e=t?t.status==="0x1":void 0,h=p??(n>0n?`Send ${m(n)}`:"Transaction");g({title:"Transaction",nav:"explorer",description:`${h} on BrainChain.`,body:`
          <section class="page">
            <header class="page-head">
              <span class="chapter__index"><a href="/explorer">Explorer</a> / Transaction</span>
              <h1>${d(h)}.</h1>
              <p>${e===void 0?"Waiting to be included in a block.":e?"This transaction succeeded.":"This transaction failed and changed nothing on the chain."}</p>
            </header>
            <dl class="facts facts--wide">
              <dt>Hash</dt><dd class="mono"><span>${d(a.hash)}</span></dd>
              <dt>Status</dt><dd>${e===void 0?"Pending":e?"Succeeded":"Failed"}</dd>
              <dt>Block</dt><dd>${a.blockNumber?x(BigInt(a.blockNumber)):"Pending"}</dd>
              ${r?`<dt>Time</dt><dd>${T(r.timestamp)}</dd>`:""}
              <dt>From</dt><dd>${c(a.from)}</dd>
              <dt>To</dt><dd>${t?.contractAddress?`New contract ${c(t.contractAddress)}`:c(a.to)}</dd>
              ${n>0n?`<dt>Value</dt><dd class="mono">${m(n)}</dd>`:""}
              ${t?`<dt>Gas used</dt><dd class="mono">${BigInt(t.gasUsed).toLocaleString("en-US")}</dd>`:""}
            </dl>
            <h2 class="section-title">What happened</h2>
            ${l.length?`<ol class="timeline">${l.map(o=>`<li><strong>${o.text}</strong><span class="mono">${o.name}</span></li>`).join("")}</ol>`:`<p class="note">${e===!1?"A failed transaction emits no events.":"This transaction emitted no events from BrainChain's contracts."}</p>`}
            ${a.input!=="0x"?`<details class="raw"><summary>Input data</summary><pre class="code"><code>${d(a.input)}</code></pre></details>`:""}
          </section>`})}}catch{i("Transaction",s)}
