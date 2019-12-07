import React from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ThemeProvider from './ThemeProvider';
import Pomodoro from './Pomodoro';

const useStyles = makeStyles(() => ({
    fullScreen: {
        height: '100vh'
    }
}));

function App() {
    const classes = useStyles();

    useFccTest({
        fccTest: FccTests.pomodoro_clock,
        queryParam: 'fcc-test'
    });

    return (
        <ThemeProvider>
            <Grid 
                className={classes.fullScreen}
                container
                alignContent='center'
                justify='center'
            >
                <Pomodoro />
            </Grid>
        </ThemeProvider>
    );
}

export default App;
