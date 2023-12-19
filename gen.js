const ejs = require("ejs");
const { readFileSync, mkdirSync, writeFileSync } = require("fs");
const { randomUUID } = require("crypto");

const template = ejs.compile(
  readFileSync("./template.ejs", { encoding: "utf-8" }),
  { async: false }
);

const lista = ["Thamyres", "João Gabriel"];

const objs = lista.map((v, i) => ({
  nome: v,
  amigo: lista[i >= lista.length ? 0 : i],
  id: randomUUID(),
}));

mkdirSync("./amigo", { recursive: true });

objs.forEach((v) => {
  writeFileSync("./amigo/" + v.id + ".html", template(v));
});

console.log("Concluído, por favor envie os seguintes links para as pessoas:\n");

objs.forEach((v) => {
  console.log(
    v.nome,
    ":",
    "http://natal2023.jgobi.github.io/amigo/" + v.id + ".html"
  );
});
