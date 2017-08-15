import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import MediaList from '../media-list/'
import SearchBar from './search-bar'

class MediaSearch extends Component {
    constructor(props) {
        super(props)

        const initialState = localStorage.getItem(this.getLocalStorageKey())

        this.state = initialState && initialState !== '' ? JSON.parse(initialState) : { filter: '', url: '' }

        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }

    getLocalStorageKey() {
        const fakeLogin = this.props.auth || ''
        return `${fakeLogin}::search::${this.props.url}`
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth !== this.props.auth) {
            this.onFilterSubmit('')
        }
    }

    onFilterSubmit(filter) {
        if (filter.trim() !== this.state.filter.trim()) {
            if (filter.trim()) {
                this.setState({ filter, url: `${this.props.url}/${filter.trim()}` })
            }
            else {
                this.setState({ filter: '', url: '' })
            }
            setTimeout(() => localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(this.state)))
        }
    }

    render() {
        return (
            <div className="media-search">
                <SearchBar onFilterSubmit={ this.onFilterSubmit } init={ this.state.filter } auth={ this.props.auth } />
                <MediaList url={ this.state.url } item={ this.props.item } auth={ this.props.auth } />
            </div>
        )
    }
}

MediaSearch.propTypes = {
    auth: PropTypes.string,
    item: PropTypes.func,
    url: PropTypes.string
}

export default MediaSearch
