import 'whatwg-fetch'
import React, { Component } from 'react'

import Common from '../common'
import EmojiItem from './emoji-item'

class EmojiList extends Component {
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
            fetch(`/api/emojis/search/${query}`)
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
        const items = this.state.items.map((emoji) => <EmojiItem key={ emoji.key } emoji={ emoji } />)

        return (
            <div className="emoji-list">
                <Common.SearchBar onFilterSubmit={ this.onFilterSubmit } />
                <div className="mt-3">
                    <Common.EmptyList items={ this.state.items } loading={ this.state.loading } />
                    <div className="row">
                        { items }
                    </div>
                    <Common.Loader items={ this.state.items } loading={ this.state.loading } />
                </div>
            </div>
        )
    }
}

export default EmojiList
