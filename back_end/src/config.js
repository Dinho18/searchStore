const SECRET_KEY = process.env.JWT_SECRET_KEY;

if (!SECRET_KEY) throw new Error("JWT_SECRET_KEY is required");

const ADMIN_KEY = process.env.MD5_ADMIN_KEY;

if (!ADMIN_KEY) throw new Error("MD5_ADMIN_KEY is required");

export const CONFIG = {
  SECRET_KEY,
  ADMIN_KEY,
};
