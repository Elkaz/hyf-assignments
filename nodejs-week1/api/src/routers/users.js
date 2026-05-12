import express from "express";
import knex from "../../../database.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await knex("users")
      .select("*")
      .join("users", "snippets.user_id", "users.id");


    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
});
