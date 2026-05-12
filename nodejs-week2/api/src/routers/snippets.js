import express from "express";
import knex from "../../../database.js";

const router = express.Router();

// Intentionally unsafe endpoint for SQL injection demonstration
router.get("/unsafe", async (req, res) => {
  let query = knex("snippets").select("*");

  if (req.query.sort) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable on purpose
    }
  }

  console.log("SQL (unsafe)", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Safe sort endpoint
const allowedSortColumns = ["id", "created_at", "title"];
const allowedDirections = ["asc", "desc"];

router.get("/sort", async (req, res) => {
  let query = knex("snippets").select("*");

  if (req.query.sort) {
    const parts = req.query.sort.toString().split(",");
    const rawColumn = parts[0];
    const rawDirection = parts[1] || "asc";

    if (!allowedSortColumns.includes(rawColumn)) {
      return res.status(400).json({ error: "Invalid sort column." });
    }

    if (!allowedDirections.includes(rawDirection)) {
      return res.status(400).json({ error: "Invalid sort direction." });
    }

    query = query.orderBy(rawColumn, rawDirection);
  }

  console.log("SQL (sort)", query.toSQL().sql);

  try {
    const data = await query;
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all
router.get("/", async (req, res) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .orderBy("created_at", "desc");

    res.status(200).json({ data: snippets });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET public feed
router.get("/public", async (req, res) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .where({ is_private: 0 })
      .orderBy("created_at", "desc");

    return res.status(200).json({ data: snippets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET snippets by user
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isInteger(userId) || userId < 1) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await knex("users").select("id").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const snippets = await knex("snippets")
      .select("*")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");

    return res.status(200).json({ data: snippets });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Part C
router.post("/", async (req, res) => {
  try {
    const { title, contents, user_id } = req.body;

    if (!title?.trim() || !contents?.trim() || user_id === undefined) {
      return res
        .status(400)
        .json({ error: "Missing title, contents, or user_id" });
    }

    const parsedUserId = Number(user_id);

    if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
      return res.status(400).json({ error: "Invalid user_id" });
    }

    const user = await knex("users")
      .select("id")
      .where({ id: parsedUserId })
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [id] = await knex("snippets").insert({
      title: title.trim(),
      contents: contents.trim(),
      user_id: parsedUserId,
    });

    return res.status(201).json({
      data: {
        id,
        title: title.trim(),
        contents: contents.trim(),
        user_id: parsedUserId,
      },
    });
  } catch (err) {
    console.error("Failed to create snippet", {
      message: err.message,
      body: req.body,
    });

    return res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
