import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import './styles.scss'

import EmojiItem from './modules/emoji-item'
import GifItem from './modules/gif-item'
import MediaList from './modules/media-list'
import NavBar from './modules/navbar'

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <Route path="/" exact render={ () => <MediaList url="/api/gifs/search" item={ GifItem } /> } />
            <Route path="/emojis" exact render={ () => <MediaList url="/api/emojis/search" item={ EmojiItem } /> } />
        </div>
    )
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))

export default App
