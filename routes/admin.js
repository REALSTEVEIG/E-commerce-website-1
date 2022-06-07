const express = require('express')

const router = express.Router()

const {createProduct, updateProduct, deleteProduct ,getAllProducts, getSingleProduct} = require('../controllers/admin')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/:product_name').get(getSingleProduct)
router.route('/:id').patch(updateProduct).delete(deleteProduct)

module.exports = router