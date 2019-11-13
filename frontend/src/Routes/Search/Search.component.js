import React, { Component } from 'react';
import Navbar from 'Components/Navbar';
import MovieCard from 'Components/MovieCard';
import PropTypes from 'prop-types';
import './Search.style.scss';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.find();
    }

    find() {
        const { match: { params: { term } } } = this.props;
        const searchText = decodeURI(term);

        const query = encodeURI(`
        query {
            searchShow(value: "${searchText}", page: 1, type: "All") {
            total_pages
            shows {
                id
                video
                vote_count
                genre_ids
                vote_average
                title
                release_date
                original_language
                original_title
                backdrop_path
                adult
                overview
                popularity
                media_type
                name
                original_name
                first_air_date
                poster_path
            }
          }
        }
        `);

        const url = 'http://localhost:8000/graphql'.concat(`?query=${query}`);

        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => {
                const { data: { searchShow } } = res;
                this.setState({
                    searchResult: searchShow,
                    loading: false
                });
            });
    }

    renderMovies() {
        const { searchResult, loading } = this.state;

        if (loading) {
            return (
                <div>Loading</div>
            );
        }

        if (!searchResult) {
            return null;
        }

        const { shows } = searchResult;

        return (
            <div className="Popular-Cards">
                    { shows.map((show) => <MovieCard show={ show } key={ show.id } />) }
            </div>
        );
    }

    render() {
        return (
            <>
                <Navbar />
                { this.renderMovies() }

            </>
        );
    }
}

Search.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            term: PropTypes.string
        })
    }).isRequired
};

export default Search;
