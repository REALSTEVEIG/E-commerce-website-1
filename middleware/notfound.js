const notFoundMiddleware = async (req, res) => {res.status(404).json({msg : 'Page not found!'})}

module.exports = notFoundMiddleware