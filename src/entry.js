import React from 'react';
import {render} from 'react-dom'
import {Provider} from 'react-redux' 
import { createStore, applyMiddleware, compose,combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from './components/App.js';

import calendar from './reducer/calendar'

const reducer = combineReducers({calendar})
const extension = window.devToolsExtension
const store = extension?createStore(reducer,compose(applyMiddleware(thunkMiddleware),extension())):
            createStore(reducer,applyMiddleware(thunkMiddleware))

// window.Promise=Promise
render(   
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app')
)