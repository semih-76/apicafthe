// Model Articles

const db = require("../../db");

// Récupérer tous les articles
const getAllArticles = async () => {
  const [rows] = await db.query("SELECT * FROM articles");
  return rows;
};

// Récupéré un article par son ID
const getArticleById = async (id) => {
  const [rows] = await db.query("SELECT * FROM articles WHERE id_article = ?", [
    id,
  ]);
  return rows;
};

module.exports = { getAllArticles, getArticleById };
