const jwt = require('jsonwebtoken')
const { UnauthenticatedAPIError } = require('../errors')


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedAPIError('No token available')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId : payload.userId, username : payload.username}
        next()
    } catch (error) {
        throw new UnauthenticatedAPIError('Not authorized to access this resource!')
    }
}


module.exports = authMiddleware

