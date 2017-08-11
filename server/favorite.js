const db = require('./db')

module.exports = {}

module.exports.saveFavoriteHandler = (req, res) => {
    if (!req.body.type || req.body.type !== req.params.type || !req.body.id ||
        Object.keys(req.body.meta || {}).length === 0) {
        res.sendStatus(422)
        return
    }

    db.saveFavorite(req.body.id, req.params.type, req.body.meta, res.locals.user)
    res.sendStatus(200)
}

module.exports.listFavoritesHandler = (req, res) => {
    let offset = parseInt(req.query.offset) || 0
    let nextPage = `/api/${req.params.type}/favorite?offset=${offset + 20}`

    db.loadFavorites(req.params.type, res.locals.user, 21, offset, items => {
        res.json({
            items: items,
            nextPage: (items || []).length > 20 ? nextPage : undefined
        })
    })
}
