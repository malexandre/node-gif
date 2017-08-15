import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EmptyList from './empty-list'
import Error from './error'
import Loader from './loader'

class MediaList extends Component {
    constructor(props) {
        super(props)

        const initialState = localStorage.getItem(this.getLocalStorageKey())
        const hasInitialState = initialState && initialState !== ''

        this.state = hasInitialState ? JSON.parse(initialState) : this.defaultState()

        if (!hasInitialState && this.props.url) {
            setTimeout(() => this.fetchNewQuery(this.props.url, this.props.auth))
        }

        this.onFavoriteClick = this.onFavoriteClick.bind(this)
        this.onNextPageClick = this.onNextPageClick.bind(this)
    }

    defaultState() {
        return {
            items: [],
            loading: false,
            nextPage: undefined,
            error: undefined
        }
    }

    checkFetchStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        }
        const error = new Error(response.statusText)
        error.response = response
        throw error
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth !== this.props.auth || nextProps.url !== this.props.url) {
            this.setState(this.defaultState())

            if (nextProps.url.trim().length !== 0) {
                this.fetchNewQuery(nextProps.url, nextProps.auth)
            }
        }
    }

    getLocalStorageKey() {
        const fakeLogin = this.props.auth || ''
        return `${fakeLogin}::list::${this.props.url}`
    }

    fetchNewQuery(url, auth) {
        this.setState({ loading: true, error: undefined })

        let params
        if (auth) {
            params = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-token': auth
                }
            }
        }

        fetch(url, params)
            .then((res) => this.checkFetchStatus(res))
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: this.state.items.concat(json.items),
                    loading: false,
                    nextPage: json.nextPage
                })

                setTimeout(() => localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(this.state)))
            })
            .catch((err) => {
                this.setState({ loading: false, error: `Server error: ${err.response.statusText}` })
            })
    }

    onNextPageClick() {
        if (this.state.nextPage) {
            this.fetchNewQuery(this.state.nextPage)
        }
    }

    onFavoriteClick(item) {
        if (!this.props.auth) {
            this.setState({ error: 'You must be authentified to save a favorite' })
            return
        }

        fetch(`/api/${item.type}/favorite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-token': this.props.auth
            },
            body: JSON.stringify({
                id: item.id,
                meta: item,
                type: item.type
            })
        })
            .then((res) => this.checkFetchStatus(res))
            .then(() => (item.favorite = !item.favorite))
            .catch((err) => {
                this.setState({ error: `Server error: ${err.response.statusText}` })
            })
    }

    render() {
        const items = this.state.items.map((item) =>
            <this.props.item key={ item.id } item={ item } auth={ this.props.auth } onFavoriteClick={ this.onFavoriteClick } />
        )
        const paginationButton = (
            <div className="mt-3 text-center">
                <button className="btn btn-secondary" type="button" onClick={ this.onNextPageClick }>
                    Next page
                </button>
            </div>
        )

        return (
            <div className="media-list mt-3">
                <Error error={ this.state.error } />
                <EmptyList items={ this.state.items } loading={ this.state.loading } />
                <div className="row">
                    { items }
                </div>
                <Loader loading={ this.state.loading } />
                { this.state.nextPage ? paginationButton : null }
            </div>
        )
    }
}

MediaList.propTypes = {
    auth: PropTypes.string,
    item: PropTypes.func,
    url: PropTypes.string
}

export default MediaList
