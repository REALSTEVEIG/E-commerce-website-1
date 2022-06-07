//call the admin model here. we would need that model to find all the products we have created in the admin create controllers\
const Admin = require('../model/admin')
const {StatusCodes} = require('http-status-codes')
const {BadRequestAPIError} = require('../errors')

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
