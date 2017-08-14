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

module.exports.loadFavorites = (type, userToken, limit = 20, offset = 0) => {
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT meta FROM Favorites WHERE type = ? AND userToken = ? LIMIT ? OFFSET ?'
        db.all(sqlQuery, type, userToken, limit, offset, (error, rows) => {
            if (error) {
                return reject(error)
            }

            resolve(rows.map((row) => {
                row.meta = JSON.parse(row.meta)
                return row
            }))
        })
    })
}

module.exports.close = () => {
    db.close()
}
