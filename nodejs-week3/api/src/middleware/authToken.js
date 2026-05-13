import knex from "../database.js";

export default async function authToken(req, res, next) {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const token = authHeader.slice(7);

    const tokenRecord = await knex("tokens")
      .join("users", "tokens.user_id", "users.id")
      .select(
        "tokens.id as token_id",
        "tokens.token",
        "tokens.created_at as token_created_at",
        "tokens.expires_at",
        "users.id as user_id",
        "users.email",
      )
      .where("tokens.token", token)
      .first();

    if (!tokenRecord) {
      return res.status(401).json({ error: "Invalid token" });
    }

    if (tokenRecord.expires_at) {
      const now = new Date();
      const expiresAt = new Date(tokenRecord.expires_at);

      if (expiresAt < now) {
        return res.status(401).json({ error: "Token expired" });
      }
    }

    req.user = {
      id: tokenRecord.user_id,
      email: tokenRecord.email,
    };

    req.authToken = {
      id: tokenRecord.token_id,
      token: tokenRecord.token,
      created_at: tokenRecord.token_created_at,
      expires_at: tokenRecord.expires_at,
    };

    next();
  } catch (err) {
    console.error("authToken error", { message: err.message });
    return res.status(500).json({ error: "Internal server error" });
  }
}
