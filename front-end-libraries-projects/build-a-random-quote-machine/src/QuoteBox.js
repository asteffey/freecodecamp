import React from 'react';

export class QuoteBox extends React.Component {
    retreiveRandomQuote = () => {
        let rand = Math.floor(Math.random()*(2274+1));
        this.props.retrieveQuote(rand);
    }

    componentDidMount() {
        this.retreiveRandomQuote();
    }

    render() {
        return (
            <div id="quote-box">
                <div>
                    <p id="text">{this.props.quote.text}</p>
                    <p id="author">{this.props.quote.author}</p>
                </div>
                <footer>
                    <button id="new-quote" onClick={this.retreiveRandomQuote}>New Quote</button>
                    <a id="tweet-quote" href="https://twitter.com/intent/tweet">Tweet Quote</a>
                </footer>
            </div>
        );
    }
};