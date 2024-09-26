import express from "express";
import JWT from "jsonwebtoken";
import { CONFIG } from "./config.js";

const app = express();
app.use(express.json()); // Middleware para entender JSON no corpo das requisições

export function GenerateLicense({ days }) {
  return JWT.sign({ days }, CONFIG.SECRET_KEY, {
    expiresIn: `${days || 1}d`,
  });
}


