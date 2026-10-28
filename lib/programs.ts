const labels:Record<string,string>={
"11111111111111111111111111111111":"System Program",
"ComputeBudget111111111111111111111111111111":"Compute Budget",
"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA":"SPL Token",
"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL":"Associated Token",
"Stake11111111111111111111111111111111111111":"Stake Program",
"Vote111111111111111111111111111111111111111":"Vote Program"
};
export function programName(id:string){return labels[id]??null;}
