const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, `Please provide the product's name`],
        unique : true
      },
},{timestamps : true})

module.exports = mongoose.model('Admin', adminSchema)