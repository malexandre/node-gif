const bodyParser = require("body-parser")
const express = require('express')

const { authMiddleware, authWrapper } = require('./auth')
const db = require('./db')
const { listFavoritesHandler, saveFavoriteHandler } = require('./favorite')
const { searchHandler } = require('./search')

module.exports = {}

module.exports.run = () => {
    db.initDb()

    let app = express()
    app.use(authMiddleware)
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/api/:type/search/:query', searchHandler)
    app.get('/api/:type/favorite', authWrapper(listFavoritesHandler))

    app.post('/api/:type/favorite', authWrapper(saveFavoriteHandler))

    let server = app.listen(8000)

    process.on('SIGINT', () => {
        db.close()
        server.close()
    })
}

