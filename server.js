const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const db = require("./db");

const articleRoutes = require("./article/routes/ArticleRouter");
const clientRoutes = require("./client/routes/ClientRouter");
const orderRoutes = require("./order/routes/OrderRouter");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
);

// Sert les images produits depuis le dossier /images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenue sur l'API CafThé",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      articles: "/api/articles",
      articleById: "/api/articles/:id",
      register: "/api/clients/register",
      login: "/api/clients/login"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API fonctionnelle",
  });
});

app.use("/api/articles", articleRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/commandes", orderRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
  });
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Serveur démarré sur http://${host}:${port}`);
});