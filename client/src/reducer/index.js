import { combineReducers } from 'redux';
import login from './login';
import framework from './framework';
import search from './search';

export default combineReducers({
    login,
    framework,
    search
})
