import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const wordLengths = [3, 2, 8, 4, 8, 4, 3, 1, 4, 7, 1, 6, 6, 5, 4, 6, 9, 2, 3, 7, 4, 2, 7, 3, 3, 4, 4, 6, 2, 1, 5, 2, 5, 8, 3, 6, 9, 4, 3, 1, 6, 2, 9, 8, 11, 6];
const skeletonParagraph = wordLengths.flatMap((w, i) => [<Skeleton key={i} width={w * 9} />, ' ']);
const SkeletonText = () => (
    <span>{skeletonParagraph}</span>
);

const Quote = ({ text, author }) => {
    return (
        <div id="quote">
            <p id="text">{text || <SkeletonText />}</p>
            <p id="author">{author || <Skeleton width={200}/>}</p>
        </div>
    );
};

Quote.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string
};

export default Quote;