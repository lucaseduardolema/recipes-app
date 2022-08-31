import { combineReducers } from 'redux';
import user from './user';
import showSearchBar from './showSeachBar';

const rootReducer = combineReducers({ user, showSearchBar });

export default rootReducer;
