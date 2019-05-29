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
    },
    book: {
        comments: [{
            author: 'a',
            datetime: new Date().toString(),
            content: 'a'
        }],
        value: '',
        submitting: false,
        bookDetails: {},
        score: 0
    }
};

const Store = createStore(app, initValues);

export default Store;
