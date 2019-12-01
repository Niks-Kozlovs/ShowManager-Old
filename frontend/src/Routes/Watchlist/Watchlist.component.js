import Cookies from 'js-cookie';
import React, { Component } from 'react';
import Navbar from 'Components/Navbar';
import PropTypes from 'prop-types';
import './Watchlist.style.scss';
import MovieCard from 'Components/MovieCard';

class Watchlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shows: []
        };
    }

    componentDidMount() {
        const { user: { loggedIn } } = this.props;
        const { access_token } = this.getCookies();

        if (access_token || loggedIn) {
            this.getShows();
        }
    }

    getCookies() {
        const JSONCookies = Cookies.get('tokens');

        if (!JSONCookies) {
            return {};
        }

        return JSON.parse(JSONCookies);
    }

    getShows() {
        const { access_token } = this.getCookies();

        if (!access_token) {
            return;
        }

        const url = 'http://localhost:8000/graphql';
        const query = JSON.stringify({
            query: `
            query {
                me {
                  tracking {
                    id
                    type
                  }
                }
              }
        `
        });

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ access_token }` },
            body: query
        })
            .then((res) => res.json())
            .then((res) => {
                this.setShows(res.data.me.tracking || []);
            });
    }

    setShows(shows) {
        if (!shows.length) {
            return;
        }

        const showData = shows.reduce((shows, { id, type }) => {
            shows.push(this.getShow(id, type));
            return shows;
        }, []);

        console.log(Promise.all(showData));
    }

    async getShow(id, type) {
        const query = encodeURI(`
              query {
                getMovieById(type: "${type}", id: ${id}) {
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
        `);

        const url = 'http://localhost:8000/graphql'.concat(`?query=${query}`);

        return fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    renderShow({ id, type }) {
        const show = this.getShow(id, type).then((show) => <MovieCard show={ show } />);

        console.log(show);
    }

    render() {
        const { shows } = this.state;
        return (
            <>
                <Navbar />
                { shows.map((show) => this.renderShow(show)) }
            </>
        );
    }
}

Watchlist.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool
    }).isRequired,
    history: PropTypes.shape({
        goBack: PropTypes.func.isRequired
    }).isRequired
};

export default Watchlist;
