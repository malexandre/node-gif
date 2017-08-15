import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const EmojiItem = (props) => {
    const classes = ClassNames('btn', 'btn-sm', {
        'btn-warning': props.item.favorite,
        'btn-outline-warning': !props.item.favorite
    })

    return (
        <div className="col-lg-3">
            <div className="card mb-3 text-center">
                <span className="card-img-top display-4">
                    { props.item.char }
                </span>
                <div className="card-body">
                    <div>
                        :{ props.item.id }:
                    </div>
                    { props.auth ?
                        <button className={ classes } onClick={ () => props.onFavoriteClick(props.item) }>
                              Favorite
                        </button> :
                        null }
                </div>
            </div>
        </div>
    )
}

EmojiItem.propTypes = {
    auth: PropTypes.string,
    item: PropTypes.object,
    onFavoriteClick: PropTypes.func
}

export default EmojiItem
