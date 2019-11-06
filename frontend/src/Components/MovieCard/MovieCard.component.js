/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MovieCard.style.scss';

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.imageUrl = 'https://image.tmdb.org/t/p/w500';

        this.state = {
            isOpen: false
        };
    }

    popUp(e, status) {
        if (!status && e.target !== e.currentTarget) {
            return;
        }

        this.setState(({ isOpen }) => ({
            isOpen: !isOpen
        }));
    }

    keyPopUp(e) {
        if (e.key === 'Enter') {
            this.popUp(null, true);
        }
    }

    renderPopupContent() {
        const { show } = this.props;
        const {
            backdrop_path,
            vote_average,
            vote_count,
            release_date,
            overview
        } = show;
        return (
            <div className="Content">
                        <p>{ overview }</p>
                        <img src={ this.imageUrl.concat(backdrop_path) } alt="Backdrop" />
                        <p>{ vote_average }</p>
                        <p>{ vote_count }</p>
                        <p>{ release_date }</p>
            </div>
        );
    }

    render() {
        const { show, show: { poster_path } } = this.props;
        const { isOpen } = this.state;
        const title = show.title || show.name;
        return (
            <div>
                <button className="MovieCard" onClick={ () => this.popUp(null, true) }>
                    <img src={ this.imageUrl.concat(poster_path) } alt={ title } />
                </button>
                <div
                  onKeyDown={ (e) => this.keyPopUp(e) }
                  tabIndex={ 0 }
                  role="button"
                  onClick={ (e) => this.popUp(e) }
                  className={ `MovieCardPopup${ isOpen ? '-Open' : ''}` }
                >
                    { this.renderPopupContent() }
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    show: PropTypes.shape().isRequired
};

export default MovieCard;
