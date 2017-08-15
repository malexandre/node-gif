const db = require('./db')
const winston = require('winston')

module.exports = {}

module.exports.saveFavoriteHandler = (req, res) => {
    const hasValidType = req.body.type && req.body.type === req.params.type
    const hasValidId = Boolean(req.body.id)
    const hasValidMeta = Object.keys(req.body.meta || {}).length !== 0

    if (!hasValidType || !hasValidId || !hasValidMeta) {
        winston.log('error', 'Bad arguments', {
            hasValidType,
            hasValidId,
            hasValidMeta
        })
        res.sendStatus(422)
        return
    }

    db.saveFavorite(req.body.id, req.params.type, req.body.meta, res.locals.user)
    res.sendStatus(200)
}

module.exports.listFavoritesHandler = async(req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const nextPage = `/api/${req.params.type}/favorite?offset=${offset + 20}`

    let items
    try {
        items = await db.loadFavorites(req.params.type, res.locals.user, 21, offset)
        items = await module.exports.updateFavoriteStatus(items, req.params.type, res.locals.user)
    }
    catch (err) {
        winston.log('error', 'Error from sqlite3.', err)
        return res.sendStatus(500)
    }

    res.json({
        items: items,
        nextPage: (items || []).length > 20 ? nextPage : undefined
    })
}

module.exports.updateFavoriteStatus = async(items, type, userToken) => {
    if (!userToken) {
        return items
    }

    const favorites = await db.areFavorites(type, userToken, items.map((item) => item.id))
    return items.map((item) => Object.assign(item, { favorite: favorites.indexOf(item.id) !== -1 }))
}
