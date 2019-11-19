import React, { Component } from 'react';
import Navbar from 'Components/Navbar';
import PropTypes from 'prop-types';
import './Watchlist.style.scss';

class Watchlist extends Component {
    componentDidMount() {
        const { user: { loggedIn }, history } = this.props;

        if (!loggedIn) {
            history.goBack();
        }
    }

    render() {
        return (
            <>
                <Navbar />
                <div>Watchlist</div>
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
