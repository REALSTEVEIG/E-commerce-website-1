// createProduct , update product, delete products
const Admin = require('../model/admin')
const {StatusCodes} = require('http-status-codes')
const { BadRequestAPIError } = require('../errors')

exports.createProduct = async (req, res) => {
    const newProduct = await Admin.create({...req.body})
    res.status(StatusCodes.CREATED).json({newProduct})
}

exports.getAllProducts = async (req, res) => {
    const allproducts = await Admin.find({})
    res.status(StatusCodes.OK).json({allproducts, count : allproducts.length})
}


exports.getSingleProduct = async (req, res) => {
    const findOne = await Admin.findOne({name : req.params["product_name"]})
    if (!findOne) {
        throw new BadRequestAPIError(`No product exists by the name ${req.params.product_name}! Please ensure you have the produnct name spelt correctly`)
    }
    return res.status(StatusCodes.OK).json({findOne})
}

exports.updateProduct = async (req, res) => {
    const {id : productId} = req.params
    const editTask = await Admin.findByIdAndUpdate({_id : productId}, req.body, {new : true, runValidators : true})
    if (!editTask) {
        throw new BadRequestAPIError(`No task with id ${productId}`)
    }
    return res.status(StatusCodes.OK).json({editTask})
}

exports.deleteProduct = async (req, res) => {
   const {id : productId} = req.params
   const removeProduct = await Admin.findByIdAndDelete({_id : productId})
   if (!removeProduct) {
    throw new BadRequestAPIError(`No product with id ${productId}`)
   }
   return res.status(StatusCodes.OK).json({msg : `Deleted Successfully!`})
}