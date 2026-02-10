// Client Router // chemin : /api/clients
const express = require("express");
const router = express.Router();
const { register, login, logout, getMe } = require("../controllers/ClientControllers");
const { verifyToken } = require("../../middleware/authMiddleware");

// Vérification de session client
// Route protégée
// GET / /api/clients/me
router.get("/me", verifyToken, getMe)

// Déconnexion
// Route protégée

// POST /api/clients/logout
router.post("/logout", logout)

// Inscription d'un client
// POST /api/clients/register
// Body : { nom, prenom, email, mot_de_passe }

router.post("/register", register);

// Connexion
// POST /api/clients/login
// Body : { email, mot_de_passe }
// Retourne un token JWT
router.post("/login", login);

module.exports = router;
