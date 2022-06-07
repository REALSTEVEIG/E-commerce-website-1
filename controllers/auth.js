const User = require('../model/User')
const {StatusCodes} = require('http-status-codes')
const { BadRequestAPIError, UnauthenticatedAPIError } = require('../errors')

 
exports.register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user : {username : user.username}, token})
}

exports.login = async (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        throw new BadRequestAPIError('All request parameters must be provided!')
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new UnauthenticatedAPIError('Email does not exist!')
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    
    if (!isPasswordCorrect) {
        throw new UnauthenticatedAPIError('Password is incorrect!')
    }
    const token = user.createJWT()
    return res.status(StatusCodes.OK).json({user : {username : user.username}, token})
}