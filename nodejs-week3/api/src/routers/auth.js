import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import knex from "../../../database.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await knex("users")
      .where({ email: email.trim() })
      .select("id", "email", "password_hash", "role");

    if (result.length !== 1) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result[0];

    if (!user.password_hash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    console.error("Login error", {
      message: err.message,
      email: req.body?.email,
    });

    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login-token", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const result = await knex("users")
      .where({ email: email.trim() })
      .select("id", "email", "password_hash");

    if (result.length !== 1) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result[0];

    if (!user.password_hash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await knex("tokens").insert({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    });

    return res.status(200).json({
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error("login-token error", {
      message: err.message,
      email: req.body?.email,
    });

    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout-token", async (req, res) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.slice(7);

    const deletedRows = await knex("tokens")
      .where({ token })
      .del();

    if (deletedRows === 0) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return res.status(200).json({
      msg: "Token logged out",
    });
  } catch (err) {
    console.error("logout-token error", { message: err.message });
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", (req, res) => {
  return res.status(200).json({
    data: {
      user: req.userPayload,
    },
  });
});

export default router;