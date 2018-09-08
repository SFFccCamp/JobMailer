import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import logger from 'redux-logger';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './store/sagas/index';
import userReducer  from './store/reducers/userReducer';


const rootReducer = combineReducers( {
    user: userReducer
} );

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <Provider store={ store } >
        <BrowserRouter>
            <App store={ store }/>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
