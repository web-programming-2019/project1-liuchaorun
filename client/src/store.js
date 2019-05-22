import {createStore} from "redux";
import app from './reducer';

const initValues = {
    login: {
        nickname: '',
        password: '',
        loginState: false,
    },
    framework: {
        collapsed: false
    },
    search: {
        table: {
            data: [],
            currentPage: 1,
            total: 1,
        },
        isbn: '',
        title: '',
        author: '',
    }
};

const Store = createStore(app, initValues);

export default Store;
