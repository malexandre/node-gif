import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EmptyList from './empty-list'
import Loader from './loader'
import SearchBar from './search-bar'

class MediaList extends Component {
    constructor(props) {
        super(props)

        const initialState = localStorage.getItem(this.getLocalStorageKey())

        this.state =
            initialState && initialState !== '' ?
                JSON.parse(initialState) :
                {
                    filter: '',
                    items: [],
                    loading: false,
                    nextPage: undefined
                }

        this.onFilterSubmit = this.onFilterSubmit.bind(this)
        this.onNextPageClick = this.onNextPageClick.bind(this)
    }

    getLocalStorageKey() {
        const fakeLogin = localStorage.getItem('fake-login') || ''
        return fakeLogin + this.props.url
    }

    fetchNewQuery(url) {
        this.setState({ loading: true })

        fetch(url)
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                this.setState({
                    items: this.state.items.concat(json.items),
                    loading: false,
                    nextPage: json.nextPage
                })

                setTimeout(() => localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(this.state)))
            })
            .catch(() => {
                this.setState({ loading: false })
            })
    }

    onFilterSubmit(filter) {
        if (filter.trim() !== this.state.filter.trim()) {
            this.setState({ filter, items: [] })
            this.fetchNewQuery(`${this.props.url}/${filter.trim()}`)
        }
    }

    onNextPageClick() {
        if (this.state.nextPage) {
            this.fetchNewQuery(this.state.nextPage)
        }
    }

    render() {
        const items = this.state.items.map((item) => <this.props.item key={ item.id } item={ item } />)
        const paginationButton = (
            <div className="mt-3 text-center">
                <button className="btn btn-secondary" type="button" onClick={ this.onNextPageClick }>
                    Next page
                </button>
            </div>
        )

        return (
            <div className="gif-list">
                <SearchBar onFilterSubmit={ this.onFilterSubmit } init={ this.state.filter } />
                <div className="mt-3">
                    <EmptyList items={ this.state.items } loading={ this.state.loading } />
                    <div className="row">
                        { items }
                    </div>
                    <Loader loading={ this.state.loading } />
                    { this.state.nextPage ? paginationButton : null }
                </div>
            </div>
        )
    }
}

MediaList.propTypes = {
    item: PropTypes.func,
    url: PropTypes.string
}

export default MediaList
