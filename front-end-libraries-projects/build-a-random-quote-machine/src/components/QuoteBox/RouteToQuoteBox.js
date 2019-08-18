import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from './RedirectToRandomQuote';
import QuoteBox from './QuoteBox';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" component={RedirectToRandomQuote} />
            <Route path="/:id" render={({ match: { params: { id } } }) => <QuoteBox id={id} />} />
        </Switch>
    </Router>
);