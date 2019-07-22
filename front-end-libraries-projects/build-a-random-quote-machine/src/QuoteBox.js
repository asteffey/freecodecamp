import React from 'react';
import { faSync, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactNbsp from 'react-nbsp'

export class QuoteBox extends React.Component {
    componentDidMount() {
        this.props.retrieveRandomQuote();
    }

    render() {
        const isLoading = this.props.status.isLoading;
        const hasError = this.props.status.hasError;

        return (
            <div id="quote-box">
                <div>
                    <p id="text">{this.props.quote.text}</p>
                    <p id="author">{this.props.quote.author}</p>
                </div>
                <footer>
                    <button id="new-quote" onClick={this.props.retrieveRandomQuote} disabled={isLoading}>
                        {isLoading && <span><FontAwesomeIcon icon={faSync} spin /><ReactNbsp /></span>}
                        {hasError && <span><FontAwesomeIcon icon={faExclamationTriangle} /><ReactNbsp /></span>}
                        New Quote
                    </button>
                    <a id="tweet-quote" href="https://twitter.com/intent/tweet">Tweet Quote</a>
                </footer>
            </div>
        );
    }
};