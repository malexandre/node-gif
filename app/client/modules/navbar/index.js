import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import NavItem from './nav-item'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Gifs &amp; emojis search engine</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarGif" aria-controls="navbarGif" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarGif">
                <ul className="navbar-nav mr-auto">
                    <NavItem to={ '/' } label={ 'Gifs' } />
                    <NavItem to={ '/fav-gifs' } label={ 'Favorite gifs' } />
                    <NavItem to={ '/emojis' } label={ 'Emojis' } />
                    <NavItem to={ '/fav-emojis' } label={ 'Favorite emojis' } />
                </ul>
                <span className="navbar-text">
                    Simple application to discover React &amp; Node
                </span>
            </div>
        </nav>
    )
}

export default NavBar
