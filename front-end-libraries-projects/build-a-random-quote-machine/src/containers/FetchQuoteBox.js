import React from 'react';
import { bindActionCreators } from 'redux';
import { retrieveQuote } from '../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import QuoteBox from '../components/QuoteBox';

class FetchQuoteBox extends React.Component {
    componentDidMount() {
        console.log('FetchQuoteBox componentDidMount');
        this.retrieveQuote();

        this.unlisten = this.props.history.listen
    }

    componentDidUpdate({ location: prevLocation }) {
        console.log('FetchQuoteBox componentDidUpdate');
        const { location } = this.props;
        
        if (location.pathname !== prevLocation.pathname)
            this.retrieveQuote();
    }

    retrieveQuote = () => {
        const { match: { params: { id } }, retrieveQuote } = this.props;
        retrieveQuote(id);
    }

    render() {
        return (
            <QuoteBox />
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ retrieveQuote }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FetchQuoteBox));