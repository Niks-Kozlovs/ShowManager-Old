/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';

import './Login.style.scss';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            showPopUp: false,
            register: false,
            username: '',
            password: '',
            repeatPassword: '',
            email: ''
        };
    }

    setLoggedIn() {
        this.setState({
            password: ''
        });
    }

    register() {
        const { register } = this.state;

        this.setState({
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            register: !register
        });
    }

    popUp() {
        const { showPopUp } = this.state;

        this.setState({
            showPopUp: !showPopUp
        });
    }

    handleRegiserSubmit(event) {
        const { updateUserInfo } = this.props;
        event.preventDefault();

        const {
            username,
            email,
            password,
            repeatPassword
        } = this.state;

        const url = 'http://localhost:8000/graphql';
        const query = JSON.stringify({
            query: `
            mutation {
                register(input: { name: "${username}",
                email: "${email}",
                password: "${password}",
                password_confirmation: "${repeatPassword}" }) {
                  access_token
                  refresh_token
                  expires_in
                  token_type
                  user {
                    name
                    email
                    name
                  }
                }
              }
        `
        });

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                updateUserInfo(res.data);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { updateUserInfo } = this.props;

        const { username, password } = this.state;

        // username: dariana69@example.org
        // password: password

        const url = 'http://localhost:8000/graphql';
        const query = JSON.stringify({
            query: `
            mutation {
                login(input: { username: "${username}", password: "${password}" }) {
                  access_token
                  refresh_token
                  expires_in
                  token_type
                  user {
                    email
                    name
                  }
                }
              }
        `
        });

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: query
        })
            .then((res) => res.json())
            .then((res) => {
                updateUserInfo(res.data);
            });
    }

    renderLoginButton() {
        return (
            <button
              className="Login"
              onClick={ () => this.popUp() }
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

    renderLoginForm() {
        const { username, password } = this.state;
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) }>
                <label>
                  Username:
                  <input
                    type="text"
                    name="username"
                    onChange={ ({ target: { value } }) => this.setState({ username: value }) }
                    value={ username }
                  />
                </label>
                <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      onChange={ ({ target: { value } }) => this.setState({ password: value }) }
                      value={ password }

                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    renderRegisterForm() {
        const {
            username,
            email,
            password,
            repeatPassword
        } = this.state;

        return (
            <form onSubmit={ (e) => this.handleRegiserSubmit(e) }>
                <label>
                    Username:
                    <input
                      type="text"
                      name="username"
                      onChange={ ({ target: { value } }) => this.setState({ username: value }) }
                      value={ username }
                    />
                </label>
                <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      onChange={ ({ target: { value } }) => this.setState({ email: value }) }
                      value={ email }
                    />
                </label>
                <label>
                    Password:
                    <input
                      type="password"
                      name="password"
                      onChange={ ({ target: { value } }) => this.setState({ password: value }) }
                      value={ password }
                    />
                </label>
                <label>
                    Repeat password:
                    <input
                      type="password"
                      name="repeatPassword"
                      onChange={ ({ target: { value } }) => this.setState({ repeatPassword: value }) }
                      value={ repeatPassword }
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }

    renderRegisterButton() {
        const { register } = this.state;
        const accountText = register ? 'Already have an account?' : 'Don\'t have an accout?';
        const buttonText = register ? 'Log in' : 'Register';

        return (
            <>
                <p>{ accountText }</p>
                <button
                  onClick={ () => this.register() }
                >
                { buttonText }
                </button>
            </>
        );
    }

    renderName(name) {
        return (
            <>
                <p>{ name }</p>
            </>
        );
    }

    render() {
        const { showPopUp, register } = this.state;
        const { user: { name, loggedIn } } = this.props;

        return (
            <>
                { loggedIn ? this.renderName(name) : this.renderLoginButton() }
                <Popup
                  open={ showPopUp && name === '' }
                  onClose={ () => this.popUp() }
                >
                    { register ? this.renderRegisterForm() : this.renderLoginForm() }
                    { this.renderRegisterButton() }
                </Popup>
            </>
        );
    }
}

Login.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool
    }).isRequired
};

export default Login;
