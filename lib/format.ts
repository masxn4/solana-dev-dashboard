export function shortAddress(value:string,head=6,tail=6){if(value.length<=head+tail+1)return value;return `${value.slice(0,head)}…${value.slice(-tail)}`;}
export function formatSol(lamports:number){return `${(lamports/1_000_000_000).toLocaleString(undefined,{maximumFractionDigits:9})} SOL`;}
export function formatTime(unix:number|null|undefined){return unix?new Date(unix*1000).toISOString():"Unavailable";}
