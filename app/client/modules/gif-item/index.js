import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import './gif-item.scss'

const GifItem = (props) => {
    const classes = ClassNames('btn', 'btn-sm', {
        'btn-warning': props.item.favorite,
        'btn-outline-warning': !props.item.favorite
    })

    const getUrl = (gif) => {
        const fixedHeight = (gif.images || {}).fixed_height || {}

        return fixedHeight.mp4 || fixedHeight.webp || fixedHeight.gif
    }

    return (
        <div className="col-lg-3">
            <div className="card mb-3 text-center">
                <video className="card-img-top gif-item_video" autoPlay loop muted>
                    <source src={ getUrl(props.item) } type="video/mp4" />
                </video>
                <div className="card-body">
                    { props.auth ?
                        <button className={ classes } onClick={ () => props.onFavoriteClick(props.item) }>
                              Favorite
                        </button> :
                        null }
                    <a className="btn btn-sm btn-secondary" href={ props.item.url }>
                        Open in Giphy
                    </a>
                </div>
            </div>
        </div>
    )
}

GifItem.propTypes = {
    auth: PropTypes.string,
    item: PropTypes.object,
    onFavoriteClick: PropTypes.func
}

export default GifItem
