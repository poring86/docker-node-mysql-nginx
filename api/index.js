const express = require("express");
const app = express();
var mysql = require("mysql");
const util = require("util");

var connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "db",
});

const query = util.promisify(connection.query).bind(connection);

connection.connect();

app.get("/", async (req, res) => {
  const setDb = `
  -- Copiando estrutura para tabela db.pessoas
  CREATE TABLE IF NOT EXISTS pessoas (
    id int NOT NULL AUTO_INCREMENT,
    nome varchar(200) NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  
  `;
  const setData = `-- Copiando dados para a tabela db.pessoas: ~2 rows (aproximadamente)
  INSERT IGNORE INTO pessoas (id, nome) VALUES
    (1, 'Matheus'),
    (2, 'Fulano');`;

  await query(setDb);
  await query(setData);

  await query("SELECT * FROM pessoas", function (error, results, fields) {
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
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
