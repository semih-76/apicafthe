const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/OrderController");

// POST /api/orders - Créer une commande et décrémenter le stock
router.post("/", createOrder);

module.exports = router;