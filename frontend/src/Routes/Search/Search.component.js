import React, { Component } from 'react';
import Navbar from 'Components/Navbar';
import MovieCard, { MOVIE_TYPE_LIST, MOVIE_TYPE_CARD } from 'Components/MovieCard';
import PropTypes from 'prop-types';
import './Search.style.scss';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: MOVIE_TYPE_LIST,
            loading: true
        };
    }

    componentDidMount() {
        this.find();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { term: oldTerm } } } = prevProps;
        const { match: { params: { term } } } = this.props;

        if (term !== oldTerm) {
            this.find();
        }
    }

    find() {
        this.setState({
            loading: true
        });
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

        const { type } = this.state;

        return (
            <div className="SearchRoute">
                <div className="CardTypeSelector">
                    <button onClick={ () => this.setState({ type: MOVIE_TYPE_CARD }) }>Card</button>
                    <button onClick={ () => this.setState({ type: MOVIE_TYPE_LIST }) }>List</button>
                </div>
                <div className={ `SearchResult-${type}` }>
                        { shows.map((show) => <MovieCard show={ show } key={ show.id } type={ type } />) }
                </div>
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
