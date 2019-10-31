/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieCard.style.scss';

class MovieCard extends Component {
    render() {
        const imageUrl = 'https://image.tmdb.org/t/p/w500';
        const { show } = this.props;
        const {
            backdrop_path,
            vote_average,
            vote_count,
            release_date,
            overview,
            poster_path
        } = show;
        const title = show.title || show.name;
        return (
            <button className="MovieCard" onClick={ () => console.log('click') }>
                <img src={ imageUrl.concat(poster_path) } alt={ title } />
            </button>
        );
    }
}

MovieCard.propTypes = {
    show: PropTypes.shape().isRequired
};

export default MovieCard;
