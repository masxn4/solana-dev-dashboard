"use client";
import { FormEvent,useState } from "react";

type Mode="address"|"transaction";
export default function Home(){
 const [q,setQ]=useState(""); const [mode,setMode]=useState<Mode>("address"); const [data,setData]=useState<any>(null); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
 async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError("");setData(null);try{const r=await fetch(`/api/inspect?type=${mode}&q=${encodeURIComponent(q)}`);const j=await r.json();if(!r.ok)throw new Error(j.error);setData(j.data)}catch(e){setError(e instanceof Error?e.message:"Request failed")}finally{setLoading(false)}}
 return <main>
  <header><span className="eyebrow">SOLANA DEVELOPER TOOLING</span><h1>Inspect the chain.<br/>Understand the result.</h1><p>Developer-focused account and transaction inspection without digging through raw RPC responses.</p></header>
  <section className="panel">
   <div className="tabs"><button className={mode==="address"?"active":""} onClick={()=>setMode("address")}>Account</button><button className={mode==="transaction"?"active":""} onClick={()=>setMode("transaction")}>Transaction</button></div>
   <form onSubmit={submit}><input aria-label="Solana address or signature" value={q} onChange={e=>setQ(e.target.value)} placeholder={mode==="address"?"Enter account / wallet address":"Enter transaction signature"}/><button disabled={loading||!q}>{loading?"Inspecting…":"Inspect"}</button></form>
  </section>
  {error&&<section className="result error"><strong>Inspection failed</strong><p>{error}</p></section>}
  {data&&<section className="result"><div className="resultHead"><h2>{mode==="address"?"Account report":"Transaction report"}</h2><span className={data.status==="failed"?"bad":"good"}>{data.status??(data.exists?"found":"not found")}</span></div>
   <pre>{JSON.stringify(data,null,2)}</pre>
  </section>}
  <section className="features"><article><b>01</b><h3>Account context</h3><p>Balance, owner program, executable state, data size and recent signatures.</p></article><article><b>02</b><h3>Transaction debugging</h3><p>Status, fees, compute usage, involved accounts, logs and runtime errors.</p></article><article><b>03</b><h3>RPC-first</h3><p>Built directly on Solana RPC primitives so the underlying data path stays understandable.</p></article></section>
 </main>
}