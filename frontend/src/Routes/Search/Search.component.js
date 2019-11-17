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
        const { match: { params: { term: oldTerm, page: oldPage } } } = prevProps;
        const { match: { params: { term, page } } } = this.props;

        if (term !== oldTerm || oldPage !== page) {
            this.find();
        }
    }

    setPage(page) {
        const { history } = this.props;
        const { match: { params: { term } } } = this.props;

        history.push(`/search/${decodeURI(term)}/${page}`);
    }

    getEndPage(total_pages, page) {
        if (page < 5) {
            return total_pages < 10 ? total_pages : 10;
        }

        return page + 5 < total_pages ? page + 5 : total_pages;
    }

    find() {
        this.setState({
            loading: true
        });
        const { match: { params: { term, page } } } = this.props;
        const searchText = decodeURI(term);

        const query = encodeURI(`
        query {
            searchShow(value: "${searchText}", page: ${page || 1}, type: "All") {
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

    renderPages() {
        const { loading } = this.state;

        if (loading) {
            return null;
        }

        const { searchResult: { total_pages } } = this.state;
        const { match: { params: { page: pageString } } } = this.props;
        const page = parseInt(pageString, 10) || 1;
        const startPage = page - 5 >= 0 ? page - 5 : 1;
        const endPage = this.getEndPage(total_pages, page);
        const items = [];

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <button
                  className={ page === i ? 'Current' : '' }
                  key={ i }
                  onClick={ () => this.setPage(i) }
                >
                    { i }
                </button>
            );
        }

        return (
            <div className="Search-Pages">
                { items }
            </div>
        );
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
                { this.renderPages() }

            </>
        );
    }
}

Search.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            term: PropTypes.string,
            page: PropTypes.string
        })
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

export default Search;
