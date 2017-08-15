import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './styles.scss'

import EmojiItem from './modules/emoji-item'
import GifItem from './modules/gif-item'
import MediaList from './modules/media-list'
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

        return (
            <div className="container">
                <NavBar auth={ this.state.auth } onLoginSubmit={ this.onLoginSubmit } />
                <Route path="/" exact render={ () => mediaList('/api/gifs/search', GifItem) } />
                <Route path="/emojis" exact render={ () => mediaList('/api/emojis/search', EmojiItem) } />
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
