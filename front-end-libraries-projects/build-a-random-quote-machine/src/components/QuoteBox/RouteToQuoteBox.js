import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from './RedirectToRandomQuote';
import QuoteBox from './QuoteBox';

const RouteToQuoteBox = () => (
    <Router>
        <Switch>
            <Route path="/:id([0-9]+)" render={({ match: { params: { id } } }) => <QuoteBox id={parseInt(id)} />} />
            <Route component={RedirectToRandomQuote} />
        </Switch>
    </Router>
);

export default RouteToQuoteBox;
