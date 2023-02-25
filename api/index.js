const express = require("express");
const app = express();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "db",
});

connection.connect();

app.get("/", async (req, res) => {
  connection.query("SELECT * FROM pessoas", function (error, results, fields) {
    if (!results)
      res.send(`<h1>Full Cycle Rocks!</h1><p>Lista de pessoas vazia!</p>`);
    const formated_results = JSON.parse(JSON.stringify(results));

    let pessoas_lista = "<ul>";
    for (let item of formated_results) {
      pessoas_lista += `<li>${item.id} - ${item.nome}</li>`;
    }
    pessoas_lista += "</ul>";

    res.send(`<h1>Full Cycle Rocks!</h1>${pessoas_lista}`);
  });

  console.log("pessoas_lista", pessoas_lista);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
