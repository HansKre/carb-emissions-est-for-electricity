import React, {useEffect, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import weekdays from '../utils/weekdays';
import AppContext from './AppContext';
import {LOCALE} from './constants';

const MIN = 0, MAX = 300, STEP_COUNT = 100;

const useStyles = makeStyles((theme) => ({
    sliderContainer: {
        height: 190,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    marginLeft: {
        marginLeft: theme.spacing(3),
    },
    vertical: {
        marginLeft: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(4),
        flexWrap: 'nowrap',
    },
    thumb: {
        borderRadius: '1px',
        height: '20px',
        width: '26px',
        left: '7px'
    },
    valueLabel: {
        left: '0 !important',
        transform: 'none !important',
        position: 'initial',
        textAlign: 'center',
        top: '5px',
        "& *": {
            background: "transparent",
        }
    },
}));

const valuetext = (value: number) => {
    return `${value.toLocaleString(LOCALE)}mwh`;
}

const MARKS = [
    {
        value: MAX,
        label: valuetext(MAX),
    },
];

export default function UsageForm() {
    const classes = useStyles();
    const {
        setIsValide,
        electricityValues,
        setElectricityValues
    } = useContext(AppContext);

    const notEmpty = (arr: number[]): boolean => {
        const sum = arr.reduce((acc, curr) => acc + curr, 0);
        return sum > 0;
    }

    const checkValidity = (values: number[]) => {
        if (notEmpty(values)) {
            setIsValide(true);
        } else {
            setIsValide(false);
        }
    }

    useEffect(() => {
        checkValidity(electricityValues);
    }, [electricityValues]);

    const handleChange = (value: number | number[], sliderNumber: number) => {
        if (Array.isArray(value)) {
            throw new Error('Single value expected');
        }
        setElectricityValues(prev => {
            const newValues = Array.from(prev);
            newValues[sliderNumber] = value;
            return newValues;
        });
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Enter your weekly electricity usage
            </Typography>
            <Grid container className={classes.container}>
                {[...Array(7)].map((v, i) => {
                    return (
                        <Grid key={i} item container direction="column">
                            <Grid item className={classes.sliderContainer}>
                                <Slider
                                    color="secondary"
                                    orientation="vertical"
                                    aria-labelledby="weekday-slider"
                                    getAriaValueText={valuetext}
                                    min={MIN}
                                    max={MAX}
                                    step={(MAX - MIN) / STEP_COUNT}
                                    marks={MARKS}
                                    valueLabelDisplay="on"
                                    value={electricityValues[i]}
                                    onChange={(event, value) => handleChange(value, i)}
                                    classes={{
                                        vertical: classes.vertical,
                                        thumb: classes.thumb,
                                        valueLabel: classes.valueLabel
                                    }}
                                />
                            </Grid>
                            <Typography
                                id="weekday-slider"
                                className={classes.marginLeft}
                            >
                                {weekdays[i]}
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}
