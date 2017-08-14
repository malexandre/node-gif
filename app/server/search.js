const config = require('./config')
const emojilib = require('emojilib')
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
        // console.log(resGiphy)
    }
    catch (err) {
        winston.log('error', 'Error from Giphy Api.', err)
        return
    }

    return {
        items: resGiphy.data,
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
            emojis.push(Object.assign({}, emojilib.lib[key], { id: key }))
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

    res.json({
        items: results.items,
        nextPage: results.more ? nextPage : undefined
    })
}
