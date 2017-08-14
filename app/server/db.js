const sqlite3 = require('sqlite3')

module.exports = {}
let db

module.exports.initDb = () => {
    db = new sqlite3.Database('favorites.db')
    db.exec('CREATE TABLE IF NOT EXISTS Favorites (id TEXT PRIMARY KEY, type TEXT, meta BLOB, userToken STRING)')
}

module.exports.saveFavorite = (id, type, meta, userToken) => {
    db.run('INSERT OR REPLACE INTO Favorites VALUES (?, ?, ?, ?)', id, type, JSON.stringify(meta), userToken)
}

module.exports.loadFavorites = (type, userToken, limit, offset, callback) => {
    db.all("SELECT meta FROM Favorites WHERE type = ? AND userToken = ? LIMIT ? OFFSET ?",
           type, userToken, limit || 20, offset || 0, (err, rows) => {
        callback((rows || []).map(favorite => JSON.parse(favorite.meta)))
    })
}

module.exports.close = () => {
    db.close()
}
