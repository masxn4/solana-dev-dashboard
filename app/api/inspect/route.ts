import { NextRequest,NextResponse } from "next/server";
import { inspectAddress,inspectSignature } from "@/lib/solana";

export async function GET(req:NextRequest){
  const q=req.nextUrl.searchParams.get("q")?.trim();
  const type=req.nextUrl.searchParams.get("type") || "address";
  if(!q) return NextResponse.json({error:"Missing q parameter"},{status:400});
  try{
    const data=type==="transaction"?await inspectSignature(q):await inspectAddress(q);
    if(data===null) return NextResponse.json({error:"Transaction not found"},{status:404});
    return NextResponse.json({type,data});
  }catch(error){
    return NextResponse.json({error:error instanceof Error?error.message:"Inspection failed"},{status:400});
  }
}
