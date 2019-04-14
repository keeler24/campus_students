import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';
import store from './store'



ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , document.getElementById('root'))