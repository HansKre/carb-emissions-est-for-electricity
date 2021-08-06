import React, {useEffect, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import weekdays from '../utils/weekdays';
import AppContext from './AppContext';
import VerticalSlider from './VerticalSlider';

const useStyles = makeStyles((theme) => ({
    sliderContainer: {
        height: 190,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    marginLeft: {
        marginLeft: theme.spacing(3),
    },
    container: {
        marginTop: theme.spacing(4),
        flexWrap: 'nowrap',
    },
}));

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
                                <VerticalSlider
                                    value={electricityValues[i]}
                                    onChange={(event, value) => handleChange(value, i)}
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
