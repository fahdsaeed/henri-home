import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import usersReducer from './reducers/usersReducer';
import todosReducer from './reducers/todosReducer';
import feedsReducer from './reducers/feedsReducer';
import loadingReducer from './reducers/loadingReducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
// root reducer
const reducer = combineReducers({
    users: usersReducer,
    todos: todosReducer,
    feeds: feedsReducer,
    loading: loadingReducer
});
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);
let persistor = persistStore(store);
export { store, persistor };