import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const NavItem = (props) => {
    return (
        <Route path={ props.to } exact children={({ match }) => {
            let classes = 'nav-item'

            if (match) {
                classes += ' active'
            }

            return (
                <li className={ classes }>
                    <Link className="nav-link" to={ props.to }>{ props.label }</Link>
                </li>
            )
        }}/>
    )
}

export default NavItem
