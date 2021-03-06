const config = require('./config')
const emojilib = require('emojilib')
const favorite = require('./favorite')
const giphy = require('giphy-api')(config.GIPHY_API_KEY)
const winston = require('winston')

module.exports = {}

const giphySearch = async(query, offset) => {
    let resGiphy
    try {
        resGiphy = await giphy.search({
            q: query,
            limit: 20,
            offset: offset
        })
    }
    catch (err) {
        winston.log('error', 'Error from Giphy Api.', err)
        return
    }

    return {
        items: resGiphy.data.map((item) => Object.assign({}, item, { type: 'gifs' })),
        more: resGiphy.pagination.total_count > resGiphy.pagination.count + resGiphy.pagination.offset
    }
}

const emojiSearch = (query, offset) => {
    const emojis = []

    Object.keys(emojilib.lib).forEach((key) => {
        let match = key.includes(query)

        if (!match) {
            match = emojilib.lib[key].keywords.find((word) => word.includes(query)) !== undefined
        }

        if (match) {
            emojis.push(Object.assign({}, emojilib.lib[key], { id: key, type: 'emojis' }))
        }
    })

    return {
        items: emojis.splice(offset, 20),
        more: emojis.splice(offset, 21).length > 20
    }
}

module.exports.searchHandler = async(req, res) => {
    const offset = parseInt(req.query.offset) || 0
    const nextPage = `/api/${req.params.type}/search/${req.params.query}?offset=${offset + 20}`

    let searchFn = () => {
        res.sendStatus(404)
    }

    if (req.params.type === 'gifs') {
        searchFn = giphySearch
    }
    else if (req.params.type === 'emojis') {
        searchFn = emojiSearch
    }

    const results = await searchFn(req.params.query, offset)

    if (!results) {
        res.sendStatus(500)
        return
    }

    let items = results.items

    if (res.locals && res.locals.user) {
        try {
            items = await favorite.updateFavoriteStatus(items, req.params.type, res.locals.user)
        }
        catch (err) {
            winston.log('error', 'Error from sqlite3.', err)
            return res.sendStatus(500)
        }
    }

    res.json({
        items: items,
        nextPage: results.more ? nextPage : undefined
    })
}
