const ProductService = require('../services/ProductService');

const createProduct = async (req, res) =>{
    try {
        const { name, image, type, price, countInStock, condition } = req.body
        if (!name || !image || !type || !price || !countInStock || !condition){
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateProduct = async (req, res) =>{
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId){
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required"
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailProduct = async (req, res) =>{
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: "ERR",
                message: "The productId is required"
            })
        }
        const response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllProduct = async (req, res) =>{
    try {
        const response = await ProductService.getAllProduct()
        return res.status(200).json(response)   
    }
    catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    getAllProduct
}