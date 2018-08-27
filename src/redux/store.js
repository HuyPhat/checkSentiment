import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

// default value for notifications
const defaultNotification = {
    status: 'info',
    position: 'tr',
    dismissible: true,
    dismissAfter: 2000,
    allowHTML: false,
    closeButton: true
};

// store
const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, createLogger({ collapsed: true }))
)(createStore);

const store = createStoreWithMiddleware(combineReducers({
    // reducer must be mounted as `notifications` !
    notifications: notificationsReducer(defaultNotification),
    // your reducers here
    ...rootReducer
}), {});

// const store = createStore(rootReducer, applyMiddleware(thunk, createLogger({ collapsed:true })));

export default store;