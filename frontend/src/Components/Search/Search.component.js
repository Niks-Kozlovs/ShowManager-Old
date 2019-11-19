import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchIcon from 'resources/Search.svg';

import './Search.style.scss';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
    }

    componentDidMount() {
        const { match: { params: { term } } } = this.props;

        this.setState({
            searchText: term
        });
    }

    handleChange(result) {
        const { target: { value: searchText } } = result;
        this.setState({
            searchText
        });
    }


    search() {
        const { searchText } = this.state;
        const { history } = this.props;

        history.push(`/search/${ encodeURI(searchText)}`);
    }

    render() {
        const { searchText } = this.state;

        return (
            <form className="Search">
                <input
                  value={ searchText }
                  onChange={ this.handleChange.bind(this) }
                  type="text"
                  placeholder="Search"
                />
                <button type="submit" onClick={ () => this.search() }><img src={ SearchIcon } alt="Search" /></button>
            </form>
        );
    }
}

Search.propTypes = {
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired
};

export default withRouter(Search);
