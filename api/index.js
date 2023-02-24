const express = require("express");
const app = express();
var mysql = require("mysql");

app.get("/", async (req, res) => {
  var connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "db",
  });

  connection.connect();

  let pessoas_lista = "<ul>";

  connection.query("SELECT * FROM pessoas", function (error, results, fields) {
    if (error) throw error;
    const formated_results = JSON.parse(JSON.stringify(results));
    console.log("formated_results", formated_results);
    for (let item of formated_results) {
      pessoas_lista += `<li>${item.id} - ${item.nome}</li>`;
    }
    pessoas_lista += "</ul>";

    console.log("pessoas_lista 1", pessoas_lista);

    res.send(`<h1>Full Cycle Rocks!</h1>${pessoas_lista}`);
  });

  console.log("pessoas_lista", pessoas_lista);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
