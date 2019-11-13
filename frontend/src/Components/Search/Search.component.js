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
        return (
            <div className="Search">
                <input onChange={ this.handleChange.bind(this) } type="text" placeholder="Search" />
                <button type="submit" onClick={ () => this.search() }><img src={ SearchIcon } alt="Search" /></button>
            </div>
        );
    }
}

Search.propTypes = {
    history: PropTypes.shape().isRequired
};

export default withRouter(Search);
