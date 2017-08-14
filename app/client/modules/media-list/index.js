import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EmptyList from './empty-list'
import Loader from './loader'
import SearchBar from './search-bar'

class MediaList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: '',
            items: [],
            loading: false,
            nextPage: null
        }

        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }

    fetchNewQuery(query) {
        const hasNewQuery = query && query.trim() !== ''
        this.setState({ items: [], laoding: hasNewQuery })

        if (hasNewQuery) {
            fetch(`${this.props.url}/${query}`)
                .then((res) => {
                    return res.json()
                }).then((json) => {
                    this.setState({ items: this.state.items.concat(json.items), loading: false })
                }).catch(() => {
                    this.setState({ loading: false })
                })
        }
    }

    onFilterSubmit(filter) {
        if (filter.trim() !== this.state.filter.trim()) {
            this.setState({ filter })
            this.fetchNewQuery(filter)
        }
    }

    render() {
        const items = this.state.items.map((item) => <this.props.item key={ item.id } item={ item } />)

        return (
            <div className="gif-list">
                <SearchBar onFilterSubmit={ this.onFilterSubmit } />
                <div className="mt-3">
                    <EmptyList items={ this.state.items } loading={ this.state.loading } />
                    <div className="row">
                        { items }
                    </div>
                    <Loader items={ this.state.items } loading={ this.state.loading } />
                </div>
            </div>
        )
    }
}

MediaList.propTypes = {
    url: PropTypes.string,
    item: PropTypes.func
}

export default MediaList
