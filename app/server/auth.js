module.exports = {}

module.exports.authMiddleware = (req, res, next) => {
    const token = req.headers['x-user-token']

    if (token) {
        res.locals.user = token
    }

    next()
}

module.exports.authWrapper = function(handler) {
    return async function authenticated(req, res) {
        if (!res.locals.user) {
            res.sendStatus(401)
            return
        }

        return await handler(req, res)
    }
}
