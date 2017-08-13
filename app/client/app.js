import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Styles from './styles.scss'

import NavBar from './modules/navbar'

class App extends Component {
    render() {
        return (
            <div className="container">
                <NavBar />
                <div className="jumbotron">
                    <h1 className="display-3">Hello, world!</h1>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'));

export default App
