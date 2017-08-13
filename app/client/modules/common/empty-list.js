import React, { Component } from 'react'

const EmptyList = (props) => {
    if (props.loading !== true && (props.items === undefined || props.items.length === 0)) {
        return (<div className="alert alert-secondary text-center" role="alert">No items to display</div>)
    }

    return null
}

export default EmptyList
