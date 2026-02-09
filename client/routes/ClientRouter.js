// Client Router // chemin : /api/clients
const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/ClientControllers");

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
