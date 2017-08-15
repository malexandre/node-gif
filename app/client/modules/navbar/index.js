import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavItem from './nav-item'

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fakeLogin: this.props.auth
        }
    }

    render() {
        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    Gifs &amp; emojis search engine
                </Link>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarGif"
                    aria-controls="navbarGif"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarGif">
                    <ul className="navbar-nav mr-auto">
                        <NavItem to={ '/' } label={ 'Gifs' } />
                        <NavItem to={ '/fav-gifs' } label={ 'Favorite gifs' } />
                        <NavItem to={ '/emojis' } label={ 'Emojis' } />
                        <NavItem to={ '/fav-emojis' } label={ 'Favorite emojis' } />
                    </ul>
                    <form className="form-inline my-2 my-lg-0"
                        onSubmit={ (event) => this.props.onLoginSubmit(event, this.state.fakeLogin) }>
                        <input className="form-control mr-sm-2"
                            type="text"
                            placeholder="Fake login"
                            aria-label="Login"
                            value={ this.state.fakeLogin }
                            onChange={ (event) => this.setState({ fakeLogin: event.target.value }) }/>
                        <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                            Fake Login
                        </button>
                    </form>
                </div>
            </nav>
        )
    }
}

NavBar.propTypes = {
    auth: PropTypes.string,
    onLoginSubmit: PropTypes.func
}

export default NavBar
