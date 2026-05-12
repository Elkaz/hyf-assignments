import express from "express";
import knex from "../../../database.js";

const router = express.Router();


import z from 'zod'
const tagsCreateSchema = z.object({
name: z.string().min(2),
id: z.number().min(1)
})

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await knex("tags").select("*");
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET tag by id
router.get("/:id", async (req, res) => {
  try {
    const tag = await knex("tags").where({ id: req.params.id }).first();

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE tag

router.post("/", async (req, res) => {

  const {error, data, success} = tagsCreateSchema.safeParse();
  if (!success) {
    return res.statusMessage(400).json({ error: error.issues});
  }ß
  const {id, name} = data;


  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    const [newTag] = await knex("tags").insert({ name }).returning("*");

    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE tag
router.put("/:id", async (req, res) => {
  try {
    const updated = await knex("tags")
      .where({ id: req.params.id })
      .update({ name: req.body.name });

    if (!updated) {
      return res.status(404).json({ error: "Tag not found" });
    }

    const tag = await knex("tags").where({ id: req.params.id }).first();

    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE tag

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex("tags").where({ id: req.params.id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
