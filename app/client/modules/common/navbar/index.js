import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

class NavBar extends Component {
    renderNavItem(label, to) {
        return (
            <Route path={to} exact children={({ match }) => {
                let classes = 'nav-item'

                if (match) {
                    classes += ' active'
                }

                return (
                    <li className={ classes }>
                        <Link className="nav-link" to={ to }>{ label }</Link>
                    </li>
                )
            }}/>
        )
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Gifs &amp; emojis search engine</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarGif" aria-controls="navbarGif" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarGif">
                    <ul className="navbar-nav mr-auto">
                        { this.renderNavItem('Gifs', '/') }
                        { this.renderNavItem('Favorite gifs', '/fav-gifs') }
                        { this.renderNavItem('Emojis', '/emojis') }
                        { this.renderNavItem('Favorite emojis', '/fav-emojis') }
                    </ul>
                    <span className="navbar-text">
                        Simple application to discover React &amp; Node
                    </span>
                </div>
            </nav>
        )
    }
}

export default NavBar
