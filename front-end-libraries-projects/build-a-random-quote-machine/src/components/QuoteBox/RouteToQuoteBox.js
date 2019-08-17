import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from './RedirectToRandomQuote';
import FetchQuoteBox from './FetchQuoteBox';

const RouteToQuoteBox = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={RedirectToRandomQuote} />
            <Route path="/:id" component={FetchQuoteBox}/>
        </Switch>
    </Router>
);

export default RouteToQuoteBox;