import React, { Component } from 'react';
import Navbar from 'Components/Navbar';
import Popular from 'Components/Popular';
import './HomePage.style.scss';

class HomePage extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Popular />
            </>
        );
    }
}

export default HomePage;
