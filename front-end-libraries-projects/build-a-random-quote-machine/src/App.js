import React from 'react';
import './App.scss';
import { QuoteBox } from "./QuoteBox"
import { retrieveQuote, retrieveRandomQuote } from "./actions/fetchQuote"
import { connect } from "react-redux";

const App = (props) => (
  <main>
    <QuoteBox 
        quote={props.quote}
        status={props.status}
        retrieveRandomQuote={props.retrieveRandomQuote}
        retrieveQuote={props.retrieveQuote} 
    />
  </main>
);

const mapStatetoProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
    retrieveRandomQuote: () => {
        dispatch(retrieveRandomQuote());
    },
    retrieveQuote: (index) => {
        dispatch(retrieveQuote(index));
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);