import { combineReducers } from 'redux';
import user from './user';
import showSearchBar from './showSeachBar';
import searchResults from './searchResults';

const rootReducer = combineReducers({ user, showSearchBar, searchResults });

export default rootReducer;
