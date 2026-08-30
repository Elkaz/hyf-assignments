import express from "express";
import knex from "../../../database.js";
import requireAuth from "../../../middleware/requireAuth.js";
import requireRole from "../../../middleware/requireRole.js";

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

// POST snippet - any logged-in user
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, contents } = req.body;
    const userId = req.userPayload.id;

    if (!title?.trim() || !contents?.trim()) {
      return res.status(400).json({ error: "Missing title or contents" });
    }

    const user = await knex("users")
      .select("id")
      .where({ id: userId })
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [id] = await knex("snippets").insert({
      title: title.trim(),
      contents: contents.trim(),
      user_id: userId,
    });

    return res.status(201).json({
      data: {
        id,
        title: title.trim(),
        contents: contents.trim(),
        user_id: userId,
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

// DELETE snippet - admin only
router.delete("/:id", requireAuth, requireRole(["admin"]), async (req, res) => {
  try {
    const snippetId = Number(req.params.id);

    if (!Number.isInteger(snippetId) || snippetId < 1) {
      return res.status(400).json({ error: "Invalid snippet id" });
    }

    const snippet = await knex("snippets")
      .select("id")
      .where({ id: snippetId })
      .first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    await knex("snippets")
      .where({ id: snippetId })
      .del();

    return res.status(200).json({ msg: "Snippet deleted" });
  } catch (err) {
    console.error("Failed to delete snippet", {
      message: err.message,
      snippetId: req.params.id,
    });

    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;