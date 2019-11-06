/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieCard.style.scss';

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    popUp(e, status) {
        if (!status && e.target !== e.currentTarget) {
            return;
        }
        console.log('Changing popup');
        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }));
    }

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
        const { isOpen } = this.state;
        const title = show.title || show.name;
        return (
            <div>
                <button className="MovieCard" onClick={ () => this.popUp(null, true) }>
                    <img src={ imageUrl.concat(poster_path) } alt={ title } />
                </button>
                <div onClick={ (e) => this.popUp(e) } className={ `MovieCardPopup${ isOpen ? '-Open' : ''}` }>
                    <div className="Content">
                        <p>{ overview }</p>
                    </div>
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    show: PropTypes.shape().isRequired
};

export default MovieCard;
