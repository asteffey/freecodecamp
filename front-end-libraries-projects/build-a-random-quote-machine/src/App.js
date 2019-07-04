import React from 'react';
import './App.scss';
import { QuoteBox } from "./QuoteBox"
import { retrieveQuote } from "./actions/fetchQuote"
import { connect } from "react-redux";

const App = (props) => (
  <main>
    <QuoteBox quote={props.quote} retrieveQuote={props.retrieveQuote} />
  </main>
);

const mapStatetoProps = (state) => ({
    quote: state.quote
});

const mapDispatchToProps = (dispatch) => ({
    retrieveQuote: (index) => {
        dispatch(retrieveQuote(index));
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);