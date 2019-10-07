import React, { Component } from 'react';

import './Search.style.scss';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchText: ''
        };
    }

    handleChange(result) {
        const { target: { value: searchText }} = result;
        console.log(searchText);
        this.setState({
            searchText
        });
    }

    search() {
        const searchText = this.state.searchText;
        console.log(searchText);
    }

    render() {
        return (
            <div className="Search">
                <input onChange= {this.handleChange.bind(this)} type="text" placeholder="Search" />
                <button type="submit" onClick={ () => this.search() }>submit</button>
            </div>
        );
    }
}

export default Search;