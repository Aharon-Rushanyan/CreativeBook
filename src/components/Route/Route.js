import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Navbar from '../Navbar/Navbar'
import User from '../user/User'
import SignInSide from '../signup/signup'
import BookRender from '../book/BookRender';
import AddBook from '../addbook/Addbook';
import Forum from '../forum/forum';
import Mybooks from '../mybooks/Mybooks';

export default function Routing(){

    return(
        <div>
        <Router> 
    <Navbar />
    <Switch>
        <Route  path="/" exact component={BookRender}/>
        <Route path="/user" component={User} />
        <Route path="/signin" component={SignInSide} />
        <Route path="/addbook" component={AddBook}/>
        <Route path="/mybook" component={Mybooks}/>
        <Route path="/forum" component={Forum}/>
    </Switch> 
     </Router>
  </div>
    )
}
