const express = require("express");
const router = express.Router();
const { createOrder, getClientOrders } = require("../controllers/OrderController");
const { verifyToken } = require("../../middleware/authMiddleware");

router.get("/", verifyToken, getClientOrders);
router.post("/", createOrder);

module.exports = router;