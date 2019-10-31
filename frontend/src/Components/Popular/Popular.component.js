/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import MovieCard from 'Components/MovieCard';

import './Popular.style.scss';

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };

        this.getMovies();
    }

    getMovies() {
        const query = encodeURI(`
            query {
                moviesNew {
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
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ movies: res.data.moviesNew });
            });
    }

    renderPlaceholder() {
        return (
            <div>Shitty placeholder</div>
        );
    }

    render() {
        const { movies } = this.state;

        if (!movies.length) {
            this.renderPlaceholder();
        }
        return (
            <div className="Popular">
                <p>Popular</p>
                <div className="Popular-Cards">
                    { movies.map((show) => <MovieCard show={ show } key={ show.id } />) }
                </div>
            </div>
        );
    }
}

export default Popular;
