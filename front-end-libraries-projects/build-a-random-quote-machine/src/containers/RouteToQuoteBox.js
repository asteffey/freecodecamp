import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from '../containers/RedirectToRandomQuote';
import FetchQuoteBox from '../containers/FetchQuoteBox';

const RouteToQuoteBox = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={RedirectToRandomQuote} />
            <Route path="/:id" component={FetchQuoteBox} />
        </Switch>
    </Router>
);

export default RouteToQuoteBox;