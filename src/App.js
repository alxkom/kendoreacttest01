import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom';

import Home from './views/Home';

import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.css';
import '@progress/kendo-theme-material/dist/all.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    render() {
        return (
            <Home />
        );
    }
}

export default App;