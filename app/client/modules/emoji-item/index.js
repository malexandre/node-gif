import PropTypes from 'prop-types'
import React from 'react'

const EmojiItem = (props) => {
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
                    { props.auth ? <button className="btn btn-sm btn-warning">Favorite</button> : null }
                </div>
            </div>
        </div>
    )
}

EmojiItem.propTypes = {
    auth: PropTypes.string,
    item: PropTypes.object
}

export default EmojiItem
