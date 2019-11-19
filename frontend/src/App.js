import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { CookiesDispatcher } from 'Store/Cookies';
import HomePage from 'Routes/HomePage';
import Search from 'Routes/Search';
import history from 'Util/History';
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
                <Router history={ history }>
                    <Switch>
                        <Route exact path="/" component={ HomePage } />
                        <Route path="/search/:term?/:page?" component={ Search } />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
