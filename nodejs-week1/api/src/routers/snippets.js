import express from "express";
import knex from "../../../database.js";

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .orderBy("created_at", "desc");

    res.status(200).json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET snippet by ID
router.get("/:id", async (req, res) => {
  try {
    const snippet = await knex("snippets").where({ id: req.params.id }).first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json(snippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST create snippet
router.post("/", async (req, res) => {
  try {
    const { user_id, title, contents, is_private } = req.body;

    // validation
    if (!user_id || !title || !contents) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [newSnippet] = await knex("snippets")
      .insert({
        user_id,
        title,
        contents,
        is_private: is_private ?? 1,
      })
      .returning("*");

    res.status(201).json(newSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update snippet
router.put("/:id", async (req, res) => {
  try {
    const { title, contents, is_private } = req.body;

    const updated = await knex("snippets").where({ id: req.params.id }).update({
      title,
      contents,
      is_private,
    });

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const updatedSnippet = await knex("snippets")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedSnippet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE snippet
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("snippets").where({ id: req.params.id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json({ message: "Snippet deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
