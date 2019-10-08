import React, { Component } from 'react';
import Search from 'Components/Search';
import Login from 'Components/Login';
import Logo from 'resources/Logo.svg';

import './Navbar.style.scss';

class Navbar extends Component {
    renderLogo() {
        return <img src={ Logo } alt="Logo" />;
    }

    render() {
        return (
            <nav className="Navbar">
                { this.renderLogo() }
                <Search className="Navbar-Search" />
                <Login />
            </nav>
        );
    }
}

export default Navbar;
