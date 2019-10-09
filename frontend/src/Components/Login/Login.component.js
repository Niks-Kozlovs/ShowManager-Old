import React, { Component } from 'react';

import './Login.style.scss';

class Login extends Component {
    login() {
        console.log('Clicked log in');
    }

    render() {
        return (
            <button
              className="Login"
              onClick={ () => this.login() }
              onKeyPress={ () => this.login() }
              tabIndex="0"
            >
                <svg>
                    { /* eslint-disable-next-line max-len */ }
                    <path id="login" d="M17.582 17.582a6.791 6.791 0 1 0-6.791-6.791 6.789 6.789 0 0 0 6.791 6.791zm0 3.4C13.049 20.977 4 23.252 4 27.768v3.4h27.164v-3.4c0-4.516-9.049-6.791-13.582-6.791z" transform="translate(-4 -4)" />
                </svg>
                <p>Login</p>
            </button>
        );
    }
}

export default Login;
