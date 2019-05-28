import { combineReducers } from 'redux';
import login from './login';
import framework from './framework';
import search from './search';
import book from './book';

export default combineReducers({
    login,
    framework,
    search,
    book
})
