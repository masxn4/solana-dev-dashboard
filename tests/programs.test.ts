import test from "node:test";import assert from "node:assert/strict";import {programName} from "../lib/programs";
test("recognizes system program",()=>assert.equal(programName("11111111111111111111111111111111"),"System Program"));
test("returns null for unknown program",()=>assert.equal(programName("unknown"),null));
