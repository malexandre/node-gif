const sqlite3 = require('sqlite3')

module.exports = {}
let db

module.exports.initDb = () => {
    db = new sqlite3.Database('favorites.db')
    db.exec('CREATE TABLE IF NOT EXISTS Media (id TEXT, type TEXT, content BLOB, PRIMARY KEY (id, type))')
    db.exec(
        'CREATE TABLE IF NOT EXISTS Favorites (mediaId STRING, type TEXT, userToken STRING,' +
            ' PRIMARY KEY (mediaId, type, userToken),' +
            ' FOREIGN KEY (mediaId, type) REFERENCES Media(id, type))'
    )
}

module.exports.saveFavorite = (id, type, meta, userToken) => {
    db.run('INSERT OR REPLACE INTO Media VALUES (?, ?, ?)', id, type, JSON.stringify(meta))
    db.run('INSERT OR REPLACE INTO Favorites VALUES (?, ?, ?)', id, type, userToken)
}

module.exports.loadFavorites = (type, userToken, limit = 20, offset = 0) => {
    return new Promise((resolve, reject) => {
        const sqlQuery =
            'SELECT content FROM Media' +
            ' LEFT JOIN Favorites ON Media.id = Favorites.mediaId AND Media.type = Favorites.type' +
            ' WHERE Favorites.type = ? AND Favorites.userToken = ? LIMIT ? OFFSET ?'
        db.all(sqlQuery, type, userToken, limit, offset, (error, rows) => {
            if (error) {
                return reject(error)
            }

            resolve(rows.map((row) => JSON.parse(row.content)))
        })
    })
}

module.exports.areFavorites = (type, userToken, mediaList) => {
    return new Promise((resolve, reject) => {
        const sqlQuery =
            'SELECT Media.id FROM Media' +
            ' LEFT JOIN Favorites ON Media.id = Favorites.mediaId AND Media.type = Favorites.type' +
            ` WHERE Media.type = '${type}' AND Favorites.userToken = '${userToken}' AND` +
            ` Media.id IN ( ${mediaList.map((id) => `'${id}'`).join(', ')} )`
        db.all(sqlQuery, (error, rows) => {
            if (error) {
                return reject(error)
            }

            resolve(rows.map((row) => row.id))
        })
    })
}

module.exports.close = () => {
    db.close()
}
