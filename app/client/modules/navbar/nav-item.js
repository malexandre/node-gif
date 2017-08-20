import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Route, Link } from 'react-router-dom'

const NavItem = (props) => {
    return (
        <Route path={ props.to } exact>
            { ({ match }) => {
                const classes = ClassNames('nav-item', {
                    'active': match
                })

                return (
                    <li className={ classes }>
                        <Link className="nav-link" to={ props.to }>
                            { props.label }
                        </Link>
                    </li>
                )
            } }
        </Route>
    )
}

NavItem.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string
}

export default NavItem
