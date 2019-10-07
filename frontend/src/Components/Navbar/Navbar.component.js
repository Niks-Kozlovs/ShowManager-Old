import React, { Component } from 'react';
import Search from 'Components/Search';
import Logo from 'resources/Logo.svg';

import './Navbar.style.scss';

class Navbar extends Component {
    renderLogo() {
        return <img src={ Logo } alt="Logo" />
    }

    renderLogin() {
        return (
            <p>login</p>
        );
    }

    render() {
        return (
            <nav className="Navbar">
                { this.renderLogo() }
                <Search />
                { this.renderLogin() }
            </nav>
        );
    }
}

export default Navbar;