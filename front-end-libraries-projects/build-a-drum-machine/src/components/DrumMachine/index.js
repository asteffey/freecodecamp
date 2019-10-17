import React from 'react';
import { Keys } from '../../constants';
import DrumPad from './DrumPad';
import { Card, Heading, Text, Flex } from 'rebass';
import { Tiles } from '@rebass/layout';
import Nbsp from 'react-nbsp';

// import styled from 'styled-components';

const DrumMachine = () => {
    const [status, setStatus] = React.useState('');

    return (
        <Flex alignItems='center' justifyContent='center' height='100vh'>
            <Card id='drum-machine' maxWidth='500px' bg='gray' fontSize={4}>
                <Heading marginBottom={3} color='primary' fontSize={5} textAlign='center'>
                    Drum Machine
                </Heading>
                <Tiles columns={3}>
                    {Keys.map(drumKey =>
                        <DrumPad key={drumKey} drumKey={drumKey} updateDescription={setStatus} />
                    )}
                </Tiles>
                <Flex id='display' alignItems='center' justifyContent='center' height='60px' paddingTop={2}>
                    <Text color='primary' bg='highlight' p={2}>
                        {status.length ? status : <Nbsp count={20} />}
                    </Text>
                </Flex>
            </Card>
        </Flex>
    );
};

export default DrumMachine;