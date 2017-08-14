import PropTypes from 'prop-types'
import React from 'react'
import { Route, Link } from 'react-router-dom'

const NavItem = (props) => {
    return (
        <Route path={ props.to } exact>
            { ({ match }) => {
                let classes = 'nav-item'

                if (match) {
                    classes += ' active'
                }

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
