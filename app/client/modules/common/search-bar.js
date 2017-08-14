import PropTypes from 'prop-types'
import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: ''
        }

        this.onFilterSubmit = this.onFilterSubmit.bind(this)
    }

    onFilterSubmit(event) {
        event.preventDefault()

        if (this.props.onFilterSubmit) {
            this.props.onFilterSubmit(this.state.filter)
        }
    }

    render() {
        return (
            <div className="row my-3">
                <div className="col-lg-12">
                    <form onSubmit={ this.onFilterSubmit }>
                        <div className="input-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Search for..."
                                aria-label="Search for..."
                                value={ this.state.filter }
                                onChange={ (event) => this.setState({ filter: event.target.value }) } />
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="submit">
                                    Go!
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    onFilterSubmit: PropTypes.func
}

export default SearchBar
