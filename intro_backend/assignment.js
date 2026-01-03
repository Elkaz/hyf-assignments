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
  try {
    const result = await knex.raw("SELECT * FROM users");
    if (!result || !result.length)
      return res.status(404).send({ error: "No users found" });
    result.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await knex.raw(`SELECT * FROM users WHERE id = ${id}`);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/create", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password || name.trim() === "" || password.trim() === "") {
      return res.status(400).json({
        error: "Name and password cannot be empty",
      });
    }

    await knex.raw(
      `INSERT INTO users (name, password) VALUES ('${name}', '${password}')`
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});
app.get("/user-count", async (req, res) => {
  try {
    const result = await knex.raw("SELECT COUNT(*) as count FROM users");
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get user count" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await knex.raw(`DELETE FROM users WHERE id = ${id}`);

    if (result.changes === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

app.get("/", (req, res) => {
  res.send("/root works!");
});
