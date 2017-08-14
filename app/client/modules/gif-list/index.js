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
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter === nextProps.filter) {
            return
        }

        const hasNewQuery = nextProps.filter && nextProps.filter.trim() !== ''
        this.setState({ items: [], laoding: hasNewQuery })

        if (!hasNewQuery){
            return
        }

        fetch(`/api/gifs/search/${nextProps.filter}`)
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.setState({ items: this.state.items.concat(json.items), loading: false })
            }).catch((ex) => {
                console.log('parsing failed', ex)
            })
    }

    render() {
        return (
            <div className="mt-3">
                <Common.EmptyList items={ this.state.items } loading={ this.state.loading } />
                <div className="row">
                    { this.state.items.map((gif) => <GifItem key={ gif.id } gif={ gif } />) }
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
