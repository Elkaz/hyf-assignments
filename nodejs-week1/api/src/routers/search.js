import express from "express";
import knex from "../../../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;

    let query = knex("snippets");

    if (q) {
      query = query.where(function () {
        this.where("title", "like", `%${q}%`).orWhere(
          "contents",
          "like",
          `%${q}%`,
        );
      });
    }

    const results = await query.select("id", "title", "contents");

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/snippets/:id", async (req, res) => {
  try {
    const snippet = await knex("snippets").where({ id: req.params.id }).first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    res.status(200).json(snippet);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { q } = req.query;
    const { fields } = req.body;

    // ❌ rule: both not allowed
    if (q && fields) {
      return res.status(400).json({
        error: "Cannot use both query param (q) and fields",
      });
    }

    let query = knex("snippets");

    // fields filtering
    if (fields) {
      if (fields.tags) {
        query = query
          .join("snippet_tags", "snippets.id", "snippet_tags.snippet_id")
          .join("tags", "tags.id", "snippet_tags.tag_id")
          .where("tags.name", fields.tags);
      }

      if (fields.title) {
        query = query.where("snippets.title", "like", `%${fields.title}%`);
      }
    }

    //q search
    if (q) {
      query = query.where(function () {
        this.where("snippets.title", "like", `%${q}%`).orWhere(
          "snippets.contents",
          "like",
          `%${q}%`,
        );
      });
    }

    const results = await query
      .select("snippets.id", "snippets.title", "snippets.contents")
      .distinct();

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
