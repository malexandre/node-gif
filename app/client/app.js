import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './styles.scss'

import GifList from './modules/gif-list'
import NavBar from './modules/navbar'
import SearchBar from './modules/search-bar'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }

        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }

    onFilterSubmit(filter) {
        this.setState({ filter })
    }

    render() {
        return (
            <div className="container">
                <NavBar />
                <SearchBar onFilterSubmit={ this.onFilterSubmit } />
                <GifList filter={ this.state.filter } />
            </div>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))

export default App
