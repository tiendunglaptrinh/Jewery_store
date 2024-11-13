const express = require("express");
const router = express.Router();
const ProductController = require('../controller/ProductController')
const { authMiddleware } = require("../midleware/authMiddleware");

const Product = require("../models/ProductModel");

router.post('/create', ProductController.createProduct)
router.put('/update/:id', authMiddleware, ProductController.updateProduct)
router.get('/get-detail/:id', ProductController.getDetailProduct)
router.get('/get-all', ProductController.getAllProduct)

module.exports = router;