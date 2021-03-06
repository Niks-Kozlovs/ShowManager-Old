/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            email: '',
            loading: false
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

        this.setState({
            loading: true
        });

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
                this.setState({
                    loading: false
                });
                updateUserInfo(res.data);
            });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { updateUserInfo } = this.props;

        const { username, password } = this.state;

        this.setState({
            loading: true
        });

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
                this.setState({
                    loading: false
                });
                updateUserInfo(res.data);
            });
    }

    logout() {
        const { logout } = this.props;

        logout();
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

    renderName() {
        const { user: { name } } = this.props;
        return (
            <div className="isLoggedIn">
                <p className="isLoggedIn-Name">{ name }</p>
                <div className="isLoggedIn-DropDown">
                    <Link to="/watchlist">Watchlist</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    <Link to="/profile">My profile</Link>
                    <button onClick={ () => this.logout() }>Logout</button>
                </div>
            </div>
        );
    }

    render() {
        const { showPopUp, register, loading } = this.state;
        const { user: { name, loggedIn } } = this.props;

        return (
            <>
                { loggedIn ? this.renderName() : this.renderLoginButton() }
                <Popup
                  open={ showPopUp && name === '' }
                  onClose={ () => this.popUp() }
                >
                    <>
                        { loading ? <div>Loading</div> : null }
                        { register ? this.renderRegisterForm() : this.renderLoginForm() }
                        { this.renderRegisterButton() }
                    </>
                </Popup>
            </>
        );
    }
}

Login.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool
    }).isRequired
};

export default Login;
