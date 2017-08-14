import PropTypes from 'prop-types'
import React from 'react'

const GifItem = (props) => {
    return (
        <div className="col-lg-3">
            <div className="card mb-3 text-center">
                <img className="card-img-top"
                    src={ props.item.images.preview_webp.url }
                    alt={ `Preview gif ${props.item.slug}` }/>
                <div className="card-body">
                    <button className="btn btn-sm btn-warning mr-3">Favorite</button>
                    <a className="btn btn-sm btn-secondary" href={ props.item.url }>
                        Open in Giphy
                    </a>
                </div>
            </div>
        </div>
    )
}

GifItem.propTypes = {
    item: PropTypes.object
}

export default GifItem
