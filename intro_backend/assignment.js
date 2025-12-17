const express = require("express");
const filesystem = require("fs/promises");
const bodyParser = require("body-parser");
const app = express();

const knexLibrary = require("knex");

const knex = knexLibrary({
  client: "sqlite3",
  connection: {
    filename: "test.sqlite3",
  },
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

app.use(bodyParser.json());

app.get("/users", async (req, res) => {
  const result = await knex.raw("SELECT * FROM users");
  res.send(result);
});

app.post("/create", async function (req, res) {
  const name = req.body.name;
  const password = req.body.password;
  await knex.raw(
    `insert into users (name,password) values('${name}', '${password}')`
  );
  res.send("user created");
});

app.get("/user-count", async (req, res) => {
  const result = await knex.raw("SELECT COUNT(*) as count FROM users");
  res.json(result[0]);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const result = await knex.raw(`SELECT * FROM users WHERE id = ${id}`);
  res.send(result);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await knex.raw(`DELETE FROM users WHERE id = ${id}`);
  res.send("User deleted");
});

app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Dashboard</title>
            <style>
                body {
                    font-family: sans-serif;
                    background-color: #233d71ff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .card {
                    background: white;
                    padding: 30px 40px;
                    border-radius: 12px;
                    box-shadow: 0 8px 20px rgba(41, 39, 39, 0.1);
                    text-align: center;
                }
                h1 {
                    margin-bottom: 10px;
                }
                #count {
                    font-size: 48px;
                    color: #8c8a9bff;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Total Users</h1>
                <div id="count"></div>
            </div>

            <script>
                fetch('/user-count')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('count').innerText = data.count;
                    });
            </script>
        </body>
        </html>
    `);
});
