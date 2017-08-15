import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import EmptyList from './empty-list'
import Loader from './loader'

class MediaList extends Component {
    constructor(props) {
        super(props)

        const initialState = localStorage.getItem(this.getLocalStorageKey())

        this.state = initialState && initialState !== '' ? JSON.parse(initialState) : this.defaultState()

        this.onFavoriteClick = this.onFavoriteClick.bind(this)
        this.onNextPageClick = this.onNextPageClick.bind(this)
    }

    defaultState() {
        return {
            items: [],
            loading: false,
            nextPage: undefined
        }
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
        this.setState({ loading: true })

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
                // Todo display error
            })
    }

    onNextPageClick() {
        if (this.state.nextPage) {
            this.fetchNewQuery(this.state.nextPage)
        }
    }

    onFavoriteClick(item) {
        if (!this.props.auth) {
            return // Todo display error
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
        }).then(() => (item.favorite = !item.favorite))
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
