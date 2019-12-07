import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Slider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpward from'@material-ui/icons/ArrowUpward';
import ArrowDownward from'@material-ui/icons/ArrowDownward';


const useStyles = makeStyles(() => ({
    label: {
        lineHeight: 1.25
    },
    length: {
        fontFamily: 'Digital',
        fontSize: '1.25rem'
    },
    controlButton: {
        padding: 0
    }
}));

const LengthSetter = ({label, current, min, max, set}) => {
    const id = label.toLowerCase();
    const classes = useStyles();

    const increment = () => set(oldValue => {
        return Math.min(oldValue + 1, max);
    });
    const decrement = () => set(oldValue => Math.max(oldValue - 1, min));

    return (
        <Grid container spacing={0}>
            <Grid item xs={12}>
                <Typography>
                    <label id={`${id}-label`} htmlFor={`${id}-length`} className={classes.label}>{label} Length: </label>
                    <Typography id={`${id}-length`} component='span' className={classes.length}>{current}</Typography>
                </Typography>
            </Grid>
            <Grid item>
                <IconButton id={`${id}-decrement`} onClick={decrement} size='small' className={classes.controlButton}>
                    <ArrowDownward/>
                </IconButton>
            </Grid>
            <Grid item xs>
                <Slider 
                    value={current}
                    min={1}
                    max={60}
                    onChange={(event, newValue) => set(newValue)}
                    aria-labelledby={`${id}-label`}
                />
            </Grid>
            <Grid item>
                <IconButton id={`${id}-increment`} onClick={increment} size='small' className={classes.controlButton}>
                    <ArrowUpward/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

LengthSetter.propTypes = {
    label: PropTypes.string.isRequired,
    current: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    set: PropTypes.func.isRequired
};

export default LengthSetter;