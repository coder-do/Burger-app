import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { watchAuth, watchBurger, watchOrder } from './store/sagas/index';
import './index.css';

const reducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchOrder);
sagaMiddleware.run(watchBurger);

const app = (
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
 
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
