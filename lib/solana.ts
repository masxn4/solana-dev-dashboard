import { Connection, PublicKey } from "@solana/web3.js";
import { programName } from "./programs";

export const DEFAULT_RPC = process.env.SOLANA_RPC_URL || "https://api.mainnet.solana.com";

export function connection(endpoint=DEFAULT_RPC){ return new Connection(endpoint,"confirmed"); }

export async function inspectAddress(value:string, endpoint=DEFAULT_RPC){
  const key=new PublicKey(value);
  const conn=connection(endpoint);
  const [info,balance,signatures]=await Promise.all([
    conn.getAccountInfo(key),
    conn.getBalance(key),
    conn.getSignaturesForAddress(key,{limit:10})
  ]);
  return {
    address:key.toBase58(),
    exists:Boolean(info),
    lamports:balance,
    sol:balance/1_000_000_000,
    owner:info?.owner.toBase58() ?? null,
    ownerLabel:info ? programName(info.owner.toBase58()) : null,
    executable:info?.executable ?? false,
    dataBytes:info?.data.length ?? 0,
    recentSignatures:signatures.map(x=>({signature:x.signature,slot:x.slot,err:x.err,blockTime:x.blockTime,confirmationStatus:x.confirmationStatus}))
  };
}

export async function inspectSignature(signature:string, endpoint=DEFAULT_RPC){
  const tx=await connection(endpoint).getTransaction(signature,{maxSupportedTransactionVersion:0});
  if(!tx) return null;
  const keys=tx.transaction.message.getAccountKeys();
  return {
    signature,slot:tx.slot,blockTime:tx.blockTime,status:tx.meta?.err?"failed":"success",
    feeLamports:tx.meta?.fee ?? 0,computeUnits:tx.meta?.computeUnitsConsumed ?? null,
    accounts:Array.from({length:keys.length},(_,i)=>keys.get(i)?.toBase58()).filter(Boolean),
    programs:tx.transaction.message.compiledInstructions.map(ix=>keys.get(ix.programIdIndex)?.toBase58()).filter((x):x is string=>Boolean(x)).filter((x,i,a)=>a.indexOf(x)===i).map(id=>({id,label:programName(id)})),
    logs:tx.meta?.logMessages ?? [],error:tx.meta?.err ?? null
  };
}
