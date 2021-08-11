import React, {useEffect, useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import weekdays from '../utils/weekdays';
import AppContext from './AppContext';
import VerticalSlider from './VerticalSlider';
import ChartData from '../../types/ChartData';

const useStyles = makeStyles((theme) => ({
    sliderContainer: {
        height: 190,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 20
        },
        backgroundColor: theme.palette.primary.contrastText
    },
    marginLeft: {
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
        },
    },
    container: {
        marginTop: theme.spacing(4),
        flexWrap: 'nowrap',
    },
    background: {
        backgroundColor: theme.palette.primary.contrastText
    }
}));

export default function UsageForm() {
    const classes = useStyles();
    const {
        setIsValide,
        data,
        setData
    } = useContext(AppContext);
    const theme = useTheme();
    // smaller than XS
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    const notEmpty = (arr: number[]): boolean => {
        const sum = arr.reduce((acc, curr) => acc + curr, 0);
        return sum > 0;
    }

    const checkValidity = () => {
        if (notEmpty(data.map(d => d.electricityValue))) {
            setIsValide(true);
        } else {
            setIsValide(false);
        }
    }

    useEffect(() => {
        checkValidity();
    }, [data]);

    const handleChange = (value: number | number[], sliderNumber: number) => {
        if (Array.isArray(value)) {
            throw new Error('Single value expected');
        }
        setData(prev => {
            const newValues = Array.from(prev);
            newValues[sliderNumber].electricityValue = value;
            newValues[sliderNumber].outdated = true;
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
                        <Grid key={i} item container className={classes.background} direction="column">
                            <Grid item className={classes.sliderContainer}>
                                <VerticalSlider
                                    value={data[i].electricityValue}
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
