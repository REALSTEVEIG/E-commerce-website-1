const mongoose = require('mongoose')

const connectDB = (url) => {
    return new mongoose.connect(url, {
        useNewUrlparser : true,
        useUnifiedTopology : true,
        useFindAndModify : false
    })
}

module.exports = connectDB
