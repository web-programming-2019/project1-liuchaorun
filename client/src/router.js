import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import LoginPage from './container/login/login';
import FrameworkPage from './container/framework/framework';
import SearchPage from './container/search/search';

const Routes = () => {
    return (
        <Router history={browserHistory}>
            <Route path='/'>
                <IndexRedirect to='/login'/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/admin' component={FrameworkPage}>
                    <IndexRedirect to='/admin/search'/>
                    <Route path='/admin/search' component={SearchPage}/>
                    {/*<Route path='/admin/book/:id' component={BookPage}/>*/}
                </Route>
            </Route>
        </Router>
    );
};

export default Routes;
