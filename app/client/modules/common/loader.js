import PropTypes from 'prop-types'
import React from 'react'

const Loader = (props) => {
    if (props.loading) {
        return <div className="alert alert-secondary text-center" role="alert">Loading in progress</div>
    }

    return null
}

Loader.propTypes = {
    loading: PropTypes.bool
}

export default Loader
