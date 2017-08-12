import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Styles from './styles.scss'

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-3">Hello, world!</h1>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App
