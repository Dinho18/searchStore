import "dotenv/config.js";
import JWT from "jsonwebtoken";
import express from "express";
import cors from "cors"; // Importando o middleware CORS
import { Search } from "./search.js";
import { GenerateLicense } from "./generate.js";
import { CONFIG } from "./config.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Permita o frontend específico
  methods: ["GET", "POST"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


// Rota de ping para testar se o servidor está ativo
app.get("/ping", (_, res) => {
  return res.status(200).json({
    message: "pong",
  });
});

// Validação de chave ADMIN
app.get("/validate/admin", (req, res) => {
  try {
    if (CONFIG.ADMIN_KEY !== req.headers.authorization)
      throw new Error("ADMIN_KEY invalid");

    return res.status(200).json({
      valid: true,
    });
  } catch (err) {
    return res.status(200).json({
      valid: false,
    });
  }
});

// Validação de licença comum
app.get("/validate", (req, res) => {
  try {
    JWT.verify(req.headers.authorization, CONFIG.SECRET_KEY);

    return res.status(200).json({
      valid: true,
    });
  } catch (err) {
    return res.status(200).json({
      valid: false,
    });
  }
});

// Middleware para validar a licença antes de realizar uma pesquisa
app.get(
  "/search",
  (req, res, next) => {
    const license = req.headers.authorization;

    if (!license)
      return res.status(400).json({
        error: "authorization header is required",
      });

    JWT.verify(license, CONFIG.SECRET_KEY, (err) => {
      if (err)
        return res.status(401).json({
          error: "Licença inválida ou expirada.",
        });

      next();
    });
  },
  async (req, res) => {
    const { q, count } = req.query;
    const response = await Search(q, count);

    return res.status(200).send(response);
  }
);

// Rota para gerar uma licença (usando ADMIN_KEY para autorização)
app.post(
  "/generate",
  (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({
        error: "authorization header is required",
      });

    if (token == CONFIG.ADMIN_KEY) return next();

    return res.status(401).json({
      error: "Licença inválida ou expirada",
    });
  },
  (req, res) => {
    const { days } = req.body;

    if (!days)
      return res.status(400).json({
        error: "days is required",
      });

    // Gera a licença usando a função importada do generate.js
    const license = GenerateLicense({ days });

    return res.status(200).json({
      license,
    });
  }
);

// Inicia o servidor na porta 8080
app.listen(8080, () => console.log("server running on 8080"));
