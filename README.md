# Solana Dev Dashboard

A developer-focused web interface for inspecting Solana accounts and transactions.

## What it does

**Account inspection**
- SOL / lamport balance
- owning program
- executable state
- account data size
- recent transaction signatures

**Transaction inspection**
- success / failure
- slot and block time
- transaction fee
- compute units consumed
- involved account addresses
- program runtime logs
- execution errors

## Stack

Next.js, React, TypeScript, Solana web3.js, JSON-RPC, GitHub Actions.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open the local Next.js URL and inspect a public Solana address or transaction signature.

## RPC configuration

Set `SOLANA_RPC_URL` to your RPC endpoint. The example configuration uses Solana's public Mainnet endpoint for development. For a deployed/high-traffic application, use an appropriate private RPC provider rather than relying on shared public infrastructure.

## Architecture

The browser talks only to the dashboard's `/api/inspect` route. RPC access lives server-side in `lib/solana.ts`, keeping RPC configuration out of client components and giving future decoding/caching logic one place to live.

## Roadmap

- readable program labels
- decoded transaction instructions and CPI tree
- token-account and mint views
- SOL/token balance deltas
- cluster selector
- account history pagination
- PDA helper
- transaction links and copy controls
- richer error explanations
- fixture-driven tests

## Security

The application is read-only. It does not request wallet connection, private keys, seed phrases, or transaction signatures from a wallet.

## License

MIT
