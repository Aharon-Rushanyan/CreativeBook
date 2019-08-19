import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import User from '../user/User';
import SignInSide from '../signup/signup';
import BookRender from '../book/BookRender';
import AddBook from '../addbook/Addbook';
import Forum from '../forum/forum';
import Mybooks from '../mybooks/Mybooks';
import Booktable from '../Booktable/Booktable';
import BookDetail from '../book-details/book-detail';



import SearchResult from '../SearchResult/SearchResult'
import pageNotFound from '../pageNotFound/pageNotFound'

export default function Routing() {
    return (
        <div>
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={BookRender} />
                    <Route path="/user" component={User} />
                    <Route path="/signin" component={SignInSide} />
                    <Route path="/addbook" component={AddBook} />
                    <Route path="/mybook/:key(all|read|reading|willread)" component={Mybooks} />
                    <Route path="/forum" component={Forum} />

                    <Route path="/table" component={Booktable} />
                    <Route path="/book/:id" component={BookDetail} />
                    <Route path="/searchresult" component={SearchResult} />
                    <Route path="*" component={pageNotFound} />

                </Switch>
                <input
                    type="button"
                    value="Top"
                    className="scroll-to-top"
                    onClick={() => window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })}
                />
            </Router>
        </div>
    );
}
