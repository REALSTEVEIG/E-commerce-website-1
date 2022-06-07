const express = require('express')

const router = express.Router()

const {getAllProducts, getSingleProduct} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/:product_name').get(getSingleProduct)

module.exports = router