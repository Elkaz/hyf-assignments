export default function requireRole(allowedRoles = []) {
  return function roleMiddleware(req, res, next) {
    if (!req.userPayload) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!allowedRoles.includes(req.userPayload.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}