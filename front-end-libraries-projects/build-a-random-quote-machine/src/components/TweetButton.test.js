import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TweetButton from './TweetButton';

describe('TweetButton', () => {
    it('encodes tweet with reserved characters correctly in href', async () => {
        const tweet = 'foo; bar';
        const { findByText } = render(<TweetButton tweet={tweet}>click me</TweetButton>);
        
        const link = await findByText(/click me/);
        const href = link.getAttribute('href');
        
        expect(href).toContain(encodeURIComponent(tweet));
    });
});