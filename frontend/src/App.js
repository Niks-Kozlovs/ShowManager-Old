import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesDispatcher } from 'Store/Cookies';
import HomePage from 'Routes/HomePage';
import './style/main.scss';
import { Provider } from 'react-redux';
import store from 'Store';

class App extends Component {
    componentDidMount() {
        const { dispatch } = store;

        CookiesDispatcher.checkCookiesLogIn(dispatch);
    }

    render() {
        return (
            <Provider store={ store }>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ HomePage } />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
