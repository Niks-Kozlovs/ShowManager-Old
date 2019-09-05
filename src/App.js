import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from 'Routes/HomePage';
import './style/main.scss';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={ HomePage } />
            </Switch>
        </Router>
    );
}

export default App;
