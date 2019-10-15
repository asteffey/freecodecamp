import React from 'react';
import { Keys } from '../../constants';
import DrumPad from './DrumPad';

const DrumMachine = () => {
    const [status, setStatus] = React.useState('');

    return (
        <main id='drum-machine'>
            <div id='drum-pad'>
                {/* {Keys.map(lowerKey => {
                    const upperKey = lowerKey.toUpperCase();
                    const {id, url} = Drums[lowerKey];
                    return (
                        <button id={id} key={lowerKey} className='drum-pad'>
                            <audio id={upperKey} src={url} className='clip'></audio>
                            {upperKey}
                        </button>
                    );
                })} */}
                {Keys.map(drumKey => <DrumPad key={drumKey} drumKey={drumKey} updateDescription={setStatus}/>)}
            </div>
            <div id='panel'>
                <div id='display'>{status}</div>
            </div>
        </main>
    );
};

export default DrumMachine;