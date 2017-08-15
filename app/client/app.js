import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './styles.scss'

import EmojiItem from './modules/emoji-item'
import GifItem from './modules/gif-item'
import MediaList from './modules/media-list'
import MediaSearch from './modules/media-search'
import NavBar from './modules/navbar'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            auth: ''
        }
        this.onLoginSubmit = this.onLoginSubmit.bind(this)
    }

    onLoginSubmit(event, auth) {
        event.preventDefault()
        this.setState({ auth })
    }

    render() {
        const mediaList = (url, item) => <MediaList url={ url } item={ item } auth={ this.state.auth } />
        const mediaSearch = (url, item) => <MediaSearch url={ url } item={ item } auth={ this.state.auth } />

        return (
            <div className="container">
                <NavBar auth={ this.state.auth } onLoginSubmit={ this.onLoginSubmit } />
                <Route path="/" exact render={ () => mediaSearch('/api/gifs/search', GifItem) } />
                <Route path="/fav-gifs" exact render={ () => mediaList('/api/gifs/favorite', GifItem) } />
                <Route path="/emojis" exact render={ () => mediaSearch('/api/emojis/search', EmojiItem) } />
                <Route path="/fav-emojis" exact render={ () => mediaList('/api/emojis/favorite', EmojiItem) } />
            </div>
        )
    }
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)

export default App
