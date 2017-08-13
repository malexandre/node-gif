const config = require('./config')
const emojilib = require("emojilib")
const giphy = require('giphy-api')(config.GIPHY_API_KEY)

module.exports = {}

giphySearch = (query, offset, callback) => {
    giphy.search({
        q: query,
        limit: 20,
        offset: offset
    }).then(resGiphy => {
        callback({
            items: resGiphy.data,
            more: resGiphy.pagination.total_count > resGiphy.pagination.count + resGiphy.pagination.offset
        })
    }).catch(reason => console.error(reason))
}

emojiSearch = (query, offset, callback) => {
    let emojis = []

    Object.keys(emojilib.lib).forEach(key => {
        let match = key.includes(query)

        if (!match) {
            match = emojilib.lib[key].keywords.find(word => word.includes(query)) !== undefined
        }

        if (match) {
            emojis.push(emojilib.lib[key])
        }
    })

    callback({
        items: emojis.splice(offset, 20),
        more: emojis.splice(offset, 21).length > 20
    })
}

module.exports.searchHandler = (req, res) => {
    let offset = parseInt(req.query.offset) || 0
    let nextPage = `/api/${req.params.type}/search/${req.params.query}?offset=${offset + 20}`

    let searchFn = () => { res.sendStatus(404) }

    if (req.params.type === 'gifs') {
        searchFn = giphySearch
    }
    else if (req.params.type === 'emojis') {
        searchFn = emojiSearch
    }

    searchFn(req.params.query, offset, ({ items, more }) => res.json({
        items: items,
        nextPage: more ? nextPage : undefined
    }))
}
