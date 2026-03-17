// Model Articles

const db = require("../../db");

// Récupérer tous les articles
const getAllArticles = async () => {
  const [rows] = await db.query(
      "SELECT *, en_promotion AS promo_active FROM articles"
  );
  return rows;
};

// Récupéré un article par son ID

const getArticleById = async (id) => {
  const [rows] = await db.query(
      "SELECT *, en_promotion AS promo_active FROM articles WHERE ID_Article = ?",
      [id]
  );
  return rows;
};

const searchArticles = async (query, limit = 5) => {
  const [rows] = await db.query(
      `SELECT *, en_promotion AS promo_active 
     FROM articles 
     WHERE nom_produit LIKE ? OR categorie LIKE ?
     LIMIT ?`,
      [`%${query}%`, `%${query}%`, limit]
  );
  return rows;
};

module.exports = { getAllArticles, getArticleById, searchArticles };
