import React from 'react';
import useKey from 'use-key-hook';
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
    
    return (
        <button id={id} className='drum-pad' onClick={hit}>
            <audio id={upperKey} src={url} className='clip' ref={audio}/>
            {upperKey}
        </button>
    );
};

DrumPad.propTypes = {
    drumKey: PropTypes.string.isRequired,
    updateDescription: PropTypes.func.isRequired
};

export default DrumPad;