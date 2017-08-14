import 'whatwg-fetch'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Common from '../common'
import GifItem from './gif-item'

class GifList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            loading: false,
            nextPage: null
        }

        // Timeout because we cannot do setState in the constructor
        setTimeout(() => this.fetchNewQuery(props.filter))
    }

    fetchNewQuery(query) {
        const hasNewQuery = query && query.trim() !== ''
        this.setState({ items: [], laoding: hasNewQuery })

        if (hasNewQuery) {
            fetch(`/api/gifs/search/${query}`)
                .then((res) => {
                    return res.json()
                }).then((json) => {
                    this.setState({ items: this.state.items.concat(json.items), loading: false })
                }).catch(() => {
                    this.setState({ loading: false })
                })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter === nextProps.filter) {
            return
        }

        this.fetchNewQuery(nextProps.filter)
    }

    render() {
        const items = this.state.items.map((gif) => <GifItem key={ gif.id } gif={ gif } />)

        return (
            <div className="mt-3">
                <Common.EmptyList items={ this.state.items } loading={ this.state.loading } />
                <div className="row">
                    { items }
                </div>
                <Common.Loader items={ this.state.items } loading={ this.state.loading } />
            </div>
        )
    }
}

GifList.propTypes = {
    filter: PropTypes.string
}

export default GifList
