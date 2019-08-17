import React from 'react';
import { bindActionCreators } from 'redux';
import { retrieveQuote } from '../../actions';
import { connect } from 'react-redux';
import QuoteBox from './QuoteBox';

const FetchQuoteBox = ({id, retrieveQuote}) => {
    React.useEffect(() => {
        retrieveQuote(id);
    }, [id, retrieveQuote]);

    return (
        <QuoteBox />
    );
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ retrieveQuote }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FetchQuoteBox);