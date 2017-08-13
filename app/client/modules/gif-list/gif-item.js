import React, { Component } from 'react'

import Styles from './styles/gif-item.scss'

const GifItem = (props) => {
    return (
        <div className="col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top gif-item_fix-height-image_img"
                     src={ props.gif.images.preview_webp.url }
                     alt={ `Preview gif ${props.gif.slug}` } />
                <div className="card-body">
                    <div className="row">
                        <button className="btn btn-sm btn-warning">
                            Favorite
                        </button>
                        <a className="btn btn-sm btn-secondary" href={ props.gif.url }>
                            Open in Giphy
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GifItem
