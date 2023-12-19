import { randomUUID } from "crypto";
import ejs from "ejs";
import { mkdirSync, readFileSync, rmSync, unlinkSync, writeFileSync } from "fs";

const template = ejs.compile(
  readFileSync("./template.ejs", { encoding: "utf-8" }),
  { async: false }
);

const tmp = JSON.parse(readFileSync("./tmp.txt", { encoding: "utf-8" }));
unlinkSync("./tmp.txt");

/** @type {{[key:string]: string}} */
let o = {};
tmp.forEach(([k, v]) => {
  o[k] = v;
});

const order = readFileSync(process.stdin.fd, "utf-8").split("\n");

const lista = order.map((v) => o[v]);

const objs = lista.map((v, i) => ({
  nome: v,
  amigo: lista[i + 1 >= lista.length ? 0 : i + 1],
  id: randomUUID(),
}));

rmSync("./amigo", { recursive: true });
mkdirSync("./amigo", { recursive: true });

objs.forEach((v) => {
  writeFileSync("./amigo/" + v.id + ".html", template(v));
});

console.log("Concluído, por favor envie os seguintes links para as pessoas:\n");

objs.sort((a, b) => a.nome.localeCompare(b.nome));

objs.forEach((v) => {
  console.log(
    v.nome,
    ":",
    "http://natal2023.jgobi.github.io/amigo/" + v.id + ".html"
  );
});
