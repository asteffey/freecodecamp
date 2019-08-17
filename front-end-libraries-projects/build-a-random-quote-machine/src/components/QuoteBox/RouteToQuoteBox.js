import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from './RedirectToRandomQuote';
import FetchQuoteBox from './FetchQuoteBox';

const RouteToQuoteBox = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={RedirectToRandomQuote} />
            <Route path="/:id" render=
                {({ match: { params: { id } } }) =>
                    <FetchQuoteBox id={id} />
                }
            />
        </Switch>
    </Router>
);

export default RouteToQuoteBox;