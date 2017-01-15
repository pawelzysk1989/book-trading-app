import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import NotFoundPage from './components/notFound/NotFoundPage';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import AddBook from './components/book/AddBook';
import Search from './components/search/Search';
import MyCollection from './components/book/MyCollection';
import SearchItemDetails from './components/search/SearchItemDetails';
import Settings from './components/settings/Settings';
import RequireAuth from './components/auth/RequireAuth';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="/signin" component={Signin}/>
    <Route path="/signout" component={Signout}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/addBook" component={RequireAuth(AddBook)}/>
    <Route path="/myCollection" component={RequireAuth(MyCollection)}/>
    <Route path="/search" component={RequireAuth(Search)}/>
    <Route path="/book/:id" component={RequireAuth(SearchItemDetails)}/>
    <Route path="/settings" component={RequireAuth(Settings)}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
