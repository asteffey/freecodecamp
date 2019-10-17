import React from 'react';
import useKey from 'use-key-hook';
import { Button } from 'rebass';
import { Drums } from '../../constants';
import PropTypes from 'prop-types';


const DrumPad = ({ drumKey, updateDescription }) => {
    const lowerKey = drumKey.toLowerCase();
    const upperKey = drumKey.toUpperCase();
    const { id, url, description } = Drums[lowerKey];
    const audio = React.useRef();

    const hit = () => {
        audio.current.play();
        updateDescription(description);
    };

    useKey(hit, { detectKeys: [lowerKey, upperKey] });

    const maxSize = '100px';
    const size = '25vmin';
    
    return (
        <Button variant="contained" id={id} className='drum-pad' width={size} height={size} maxWidth={maxSize} maxHeight={maxSize} onClick={hit}>
            <audio id={upperKey} src={url} className='clip' ref={audio}/>
            {upperKey}
        </Button>
    );
};

DrumPad.propTypes = {
    drumKey: PropTypes.string.isRequired,
    updateDescription: PropTypes.func.isRequired
};

export default DrumPad;