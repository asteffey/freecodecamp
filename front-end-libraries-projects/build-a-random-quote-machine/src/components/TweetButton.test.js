import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TweetButton from './TweetButton';

describe('TweetButton', () => {
    test('creates a#tweet-quote', () => {
        const { container } = render(<TweetButton/>);
        const link = container.querySelector('a#tweet-quote');
        expect(link).toBeInTheDocument();
    });

    test('a#tweet-quote posts to twitter', () => {
        const { container } = render(<TweetButton/>);
        const link = container.querySelector('a#tweet-quote');
        expect(link.getAttribute('href').includes('https://twitter.com/intent/tweet')).toBe(true);
    });

});