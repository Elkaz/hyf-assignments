import express from "express";
import knex from "../../../database.js";

const router = express.Router();

const allowedSortColumns = ["id", "created_at", "title"];
const allowedDirections = ["asc", "desc"];

function sendServerError(res) {
  return res.status(500).json({ error: "Internal server error" });
}

function parsePositiveInt(value) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function parsePrivacyValue(value) {
  if (value === undefined) {
    return undefined;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || (parsed !== 0 && parsed !== 1)) {
    return null;
  }

  return parsed;
}

// Intentionally unsafe endpoint for SQL injection demonstration
router.get("/unsafe", async (req, res) => {
  let query = knex("snippets").select("*");

  if ("sort" in req.query) {
    const orderBy = req.query.sort.toString();
    if (orderBy.length > 0) {
      query = query.orderByRaw(orderBy); // Vulnerable on purpose
    }
  }

  console.log("SQL (unsafe)", query.toSQL().sql);

  try {
    const data = await query;
    return res.status(200).json({ data });
  } catch (e) {
    console.error("GET /api/snippets/unsafe failed", {
      sort: req.query.sort,
      message: e.message,
    });
    return sendServerError(res);
  }
});

// Safe version of the sort endpoint.
// Fix approach:
//   1. A whitelist restricts which columns can be sorted — only by "id", "created_at" and "title".
//   2. A whitelist restricts direction to only "asc" or "desc".
//   3. Knex's .orderBy(column, direction) is used instead of orderByRaw,
//      so user input is never interpolated into raw SQL.
router.get("/sort", async (req, res) => {
  let query = knex("snippets").select("*");

  if ("sort" in req.query) {
    const [rawColumn, rawDirection = "asc"] = req.query.sort
      .toString()
      .split(",")
      .map((s) => s.trim().toLowerCase());

    if (!allowedSortColumns.includes(rawColumn)) {
      return res.status(400).json({
        error: `Invalid sort column.`,
      });
    }

    if (!allowedDirections.includes(rawDirection)) {
      return res.status(400).json({
        error: `Invalid sort direction.`,
      });
    }

    query = query.orderBy(rawColumn, rawDirection);
  }

  console.log("SQL (sort)", query.toSQL().sql);

  try {
    const data = await query;
    return res.status(200).json({ data });
  } catch (err) {
    console.error("GET /api/snippets/sort failed", {
      sort: req.query.sort,
      message: err.message,
    });
    return sendServerError(res);
  }
});

// GET all
router.get("/", async (req, res) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .orderBy("created_at", "desc");

    return res.status(200).json({ data: snippets });
  } catch (err) {
    console.error("GET /api/snippets failed", { message: err.message });
    return sendServerError(res);
  }
});


// Part B 

// GET public feed (non-private snippets only)
router.get("/public", async (req, res) => {
  try {
    const snippets = await knex("snippets")
      .select("*")
      .where({ is_private: 0 })
      .orderBy("created_at", "desc");

    return res.status(200).json({ data: snippets });
  } catch (err) {
    console.error("GET /api/snippets/public failed", { message: err.message });
    return sendServerError(res);
  }
});

// GET snippets by user
router.get("/users/:userId", async (req, res) => {
  try {
    const userId = parsePositiveInt(req.params.userId);
    if (!userId) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const user = await knex("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const snippets = await knex("snippets")
      .select("*")
      .where({ user_id: userId })
      .orderBy("created_at", "desc");

    return res.status(200).json({ data: snippets });
  } catch (err) {
    console.error("GET /api/snippets/users/:userId failed", {
      userId: req.params.userId,
      message: err.message,
    });
    return sendServerError(res);
  }
});

// Part C

// GET snippet by ID
router.get("/:id", async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const snippet = await knex("snippets").where({ id }).first();

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.status(200).json({ data: snippet });
  } catch (err) {
    console.error("GET /api/snippets/:id failed", {
      id: req.params.id,
      message: err.message,
    });
    return sendServerError(res);
  }
});

// POST create snippet
router.post("/", async (req, res) => {
  try {
    const { user_id, title, contents, is_private } = req.body;

    const userId = parsePositiveInt(user_id);
    if (!userId) {
      return res.status(400).json({ error: "user_id must be a positive integer" });
    }

    if (!isNonEmptyString(title) || !isNonEmptyString(contents)) {
      return res.status(400).json({
        error: "title and contents are required and must be non-empty strings",
      });
    }

    const parsedPrivacy = parsePrivacyValue(is_private);
    if (parsedPrivacy === null) {
      return res.status(400).json({ error: "is_private must be 0 or 1" });
    }

    const user = await knex("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [newSnippet] = await knex("snippets")
      .insert({
        user_id: userId,
        title: title.trim(),
        contents: contents.trim(),
        is_private: parsedPrivacy ?? 1,
      })
      .returning("*");

    return res.status(201).json({ data: newSnippet });
  } catch (err) {
    console.error("POST /api/snippets failed", {
      body: req.body,
      message: err.message,
    });
    return sendServerError(res);
  }
});

// PUT update snippet
router.put("/:id", async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updates = {};

    if ("title" in req.body) {
      if (!isNonEmptyString(req.body.title)) {
        return res.status(400).json({ error: "title must be a non-empty string" });
      }
      updates.title = req.body.title.trim();
    }

    if ("contents" in req.body) {
      if (!isNonEmptyString(req.body.contents)) {
        return res
          .status(400)
          .json({ error: "contents must be a non-empty string" });
      }
      updates.contents = req.body.contents.trim();
    }

    if ("is_private" in req.body) {
      const parsedPrivacy = parsePrivacyValue(req.body.is_private);
      if (parsedPrivacy === null) {
        return res.status(400).json({ error: "is_private must be 0 or 1" });
      }
      updates.is_private = parsedPrivacy;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "Provide at least one updatable field: title, contents, is_private",
      });
    }

    const updated = await knex("snippets").where({ id }).update(updates);

    if (!updated) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const updatedSnippet = await knex("snippets").where({ id }).first();
    return res.status(200).json({ data: updatedSnippet });
  } catch (err) {
    console.error("PUT /api/snippets/:id failed", {
      id: req.params.id,
      body: req.body,
      message: err.message,
    });
    return sendServerError(res);
  }
});

// DELETE snippet
router.delete("/:id", async (req, res) => {
  try {
    const id = parsePositiveInt(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const deleted = await knex("snippets").where({ id }).del();

    if (!deleted) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.status(200).json({ data: { message: "Snippet deleted" } });
  } catch (err) {
    console.error("DELETE /api/snippets/:id failed", {
      id: req.params.id,
      message: err.message,
    });
    return sendServerError(res);
  }
});



export default router;
