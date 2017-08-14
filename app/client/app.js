import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles.scss'

import GifList from './modules/gif-list'
import NavBar from './modules/navbar'

const App = () => {
    return (
        <div className="container">
            <NavBar />
            <GifList />
        </div>
    )
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))

export default App
