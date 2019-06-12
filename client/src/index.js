import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Routes from './router';
import Store from './store';

import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);
