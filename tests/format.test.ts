import test from "node:test";import assert from "node:assert/strict";import {formatSol,shortAddress,formatTime} from "../lib/format";
test("shortens long addresses",()=>assert.equal(shortAddress("1234567890abcdefghijklmnop"),"123456…klmnop"));
test("formats lamports as SOL",()=>assert.equal(formatSol(1_500_000_000),"1.5 SOL"));
test("handles missing block time",()=>assert.equal(formatTime(null),"Unavailable"));
