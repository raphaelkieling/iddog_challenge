import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
//Redurcers
import { feed } from './reducers/feed';
import { signup } from './reducers/signup';

const reducers = combineReducers({ feed, signup });
export default createStore(reducers, applyMiddleware(thunkMiddleware));