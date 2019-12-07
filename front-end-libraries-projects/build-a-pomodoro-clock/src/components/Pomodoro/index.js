import React, {useCallback, useRef} from 'react';
import usePomodoro from '../../hooks/usePomodoro';
import LengthSetter from './LengthSetter';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, ExpansionPanel, Grid, Typography, Toolbar, ExpansionPanelSummary, ExpansionPanelDetails, Card, CardContent, CardActions } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';

import DigitalDisplay from './DigitalDisplay';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    settings: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%'
    },
    settingsGrid: {

    },
    settingsSlider: {
        maxWidth: 400
    },
    settingsButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    }
}));


const Pomodoro = () => {
    const classes = useStyles();

    const audio = useRef();

    const doAlarm = useCallback(() => audio.current.play(), [audio]);

    const {breakLength, sessionLength, displayTime, status, toggle, reset, isRunning} = usePomodoro(doAlarm);

    const [showSettings, setShowSettings] = React.useState(true);

    React.useEffect( () => {
        //hide Settings on initial load if it covers the clock
        if (window.innerWidth < 600) {
            if (window.innerHeight < 750) {
                setShowSettings(false);
            }
        } else {
            if (window.innerHeight < 550) {
                setShowSettings(false);
            }
        }
    }, []);

    const resetEverything = useCallback(()=> {
        audio.current.pause();
        audio.current.currentTime = 0;
        reset();
    }, [audio, reset]);

    return (

        <div className={classes.root}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography variant='h3' component='h1' className={classes.title} align='center'>Pomodoro Clock</Typography>
                </Toolbar>
            </AppBar>
            <Card>
                <CardContent>
                    <DigitalDisplay id='time-left'>{displayTime}</DigitalDisplay>
                    <Typography variant='h6' id='timer-label' align='center'>{status}</Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify='space-around'>
                        <Button 
                            color='primary'
                            id='start_stop'
                            size='small'
                            startIcon={isRunning ? <PauseIcon/> : <PlayIcon/>} 
                            onClick={toggle}
                        >
                            {isRunning ? 'Pause' : 'Play'}
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
            <ExpansionPanel
                className={classes.settings}
                expanded={showSettings}
                onChange={(event, isExpanded) => setShowSettings(isExpanded)}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='settings-content'
                    id='settings-header'
                >
                    <Typography variant='h6'>Settings</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Grid container justify='space-around' spacing={1} className={classes.settingsGrid}>
                        <Grid item xs={12} sm={5} className={classes.settingsSlider}>
                            <LengthSetter label='Break' {...breakLength}  />
                        </Grid>
                        <Grid item xs={12} sm={5} className={classes.settingsSlider}>
                            <LengthSetter label='Session' {...sessionLength} />
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.settingsButton}>
                            <Button variant='contained' color='secondary' id='reset' onClick={resetEverything}>Reset</Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <audio id="beep" preload="auto"
                src='https://goo.gl/65cBl1'
                ref={audio} />
        </div>
    );
};

export default Pomodoro;