import React, { Component } from 'react'

const Loader = (props) => {
    if (props.loading) {
        return <div className="alert alert-secondary text-center" role="alert">Loading in progress</div>
    }

    return null
}

export default Loader
