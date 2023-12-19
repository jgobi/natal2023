import { randomUUID } from "crypto";
import { readFileSync, writeFileSync } from "fs";
const names = readFileSync(process.stdin.fd, "utf-8").split("\n");
const hn = names.map((v) => [randomUUID(), v]).sort();
writeFileSync("tmp.txt", JSON.stringify(hn));

console.log(hn.map((v) => v[0]).join("\n"));
