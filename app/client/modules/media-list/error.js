import PropTypes from 'prop-types'
import React from 'react'

const Error = (props) => {
    if (props.error) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                { props.error }
            </div>
        )
    }

    return null
}

Error.propTypes = {
    error: PropTypes.string
}

export default Error
