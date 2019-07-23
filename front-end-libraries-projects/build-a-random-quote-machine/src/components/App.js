import React from 'react';
import '../App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectToRandomQuote from '../containers/RedirectToRandomQuote';
import FetchQuoteBox from '../containers/FetchQuoteBox';

const App = () => (
  <main>
    <Router>
      <Switch>
        <Route exact path="/" component={RedirectToRandomQuote} />
        <Route path="/:id" component={FetchQuoteBox} />
      </Switch>
    </Router>
  </main>
);

export default App;