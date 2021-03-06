/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MovieCard.style.scss';

export const MOVIE_TYPE_CARD = 'Card';
export const MOVIE_TYPE_LIST = 'List';

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.imageUrl = 'https://image.tmdb.org/t/p/w500';
        this.imageUrlSmall = 'https://image.tmdb.org/t/p/w92';

        this.renderList = {
            [MOVIE_TYPE_CARD]: this.renderCard(),
            [MOVIE_TYPE_LIST]: this.renderList()
        };

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

    addToWatchlist(id) {
        const { addToWatchlist, user: { loggedIn } } = this.props;
        if (!loggedIn) {
            console.error('Must log in to add to watchlist');
            return;
        }
        addToWatchlist(id);
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

    renderList() {
        const { show, show: { poster_path, id } } = this.props;
        const title = show.title || show.name;

        return (
            <div className="MovieList">
                    <img src={ this.imageUrlSmall.concat(poster_path) } alt={ title } />
                    <p>{ title }</p>
                    <button className="DetailsButton" onClick={ () => this.popUp(null, true) }>Details</button>
                    <button className="AddToWatchlist" onClick={ () => this.addToWatchlist(id) }>Add to watchlist</button>
            </div>
        );
    }

    renderCard() {
        const { show, show: { poster_path } } = this.props;
        const title = show.title || show.name;
        return (
            <button className="MovieCard" onClick={ () => this.popUp(null, true) }>
                    <img src={ this.imageUrl.concat(poster_path) } alt={ title } />
            </button>
        );
    }

    render() {
        const { type } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="Movie">
                { this.renderList[type] }
                <div
                  onKeyDown={ (e) => this.keyPopUp(e) }
                  tabIndex={ 0 }
                  role="button"
                  onClick={ (e) => this.popUp(e) }
                  className={ `MoviePopup${ isOpen ? '-Open' : ''}` }
                >
                    { this.renderPopupContent() }
                </div>
            </div>
        );
    }
}

MovieCard.propTypes = {
    show: PropTypes.shape().isRequired,
    type: PropTypes.string,
    addToWatchlist: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool
    }).isRequired
};

MovieCard.defaultProps = {
    type: 'Card'
};

export default MovieCard;
