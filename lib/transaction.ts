import type { VersionedTransactionResponse } from "@solana/web3.js";
import { programName } from "./programs";

export type BalanceDelta={accountIndex:number,address:string|null,deltaLamports:number};
export type TokenDelta={accountIndex:number,mint:string,owner?:string,before:string,after:string};

export function transactionDetails(tx:VersionedTransactionResponse){
 const keys=tx.transaction.message.getAccountKeys();
 const address=(i:number)=>keys.get(i)?.toBase58()??null;
 const balanceDeltas:BalanceDelta[]=(tx.meta?.preBalances??[]).map((before,i)=>({
  accountIndex:i,address:address(i),deltaLamports:(tx.meta?.postBalances?.[i]??before)-before
 })).filter(x=>x.deltaLamports!==0);
 const pre=new Map((tx.meta?.preTokenBalances??[]).map(x=>[`${x.accountIndex}:${x.mint}`,x]));
 const post=new Map((tx.meta?.postTokenBalances??[]).map(x=>[`${x.accountIndex}:${x.mint}`,x]));
 const tokenDeltas:TokenDelta[]=[...new Set([...pre.keys(),...post.keys()])].map(k=>{
  const a=pre.get(k),b=post.get(k),x=b??a!;
  return {accountIndex:x.accountIndex,mint:x.mint,owner:b?.owner??a?.owner,before:a?.uiTokenAmount.uiAmountString??"0",after:b?.uiTokenAmount.uiAmountString??"0"};
 }).filter(x=>x.before!==x.after);
 const instructions=tx.transaction.message.compiledInstructions.map((ix,index)=>{
  const id=address(ix.programIdIndex)??"unknown";
  return {index,programId:id,programLabel:programName(id),accounts:ix.accountKeyIndexes.map(address),data:Buffer.from(ix.data).toString("base64")};
 });
 return {balanceDeltas,tokenDeltas,instructions};
}
