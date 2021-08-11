import React, {useContext, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date';
import {FormControl, InputLabel, Select, MenuItem, FormHelperText, makeStyles} from '@material-ui/core';
import countries from './countries';
import AppContext from './AppContext';
import ExploreIcon from '@material-ui/icons/Explore';
import EventIcon from '@material-ui/icons/Event';
import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    center: {
        textAlign: 'center',
    },
    exploreIcon: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px',
            marginBottom: theme.spacing(-2),
        }
    },
    eventIcon: {
        marginTop: '17px',
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(-4),
        }
    },
    container: {
        marginTop: '15px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px',
        }
    },
    datePickerRoot: {
        '& .MuiIconButton-root': {
            left: '8px'
        }
    }
}));

export default function CountryForm() {
    const classes = useStyles();
    const {
        setIsValide,
        country,
        setCountry,
        date,
        setDate,
        setData
    } = useContext(AppContext);
    const theme = useTheme();
    // smaller than XS
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        if (country) {
            setIsValide(true);
        } else {
            setIsValide(false);
        }
    }, [country])

    const handleDateChange = (date: MaterialUiPickersDate) => {
        if (date) {
            setDate(date);
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<{value: unknown}>) => {
        const newCountry = event.target.value as string;
        if (country !== newCountry) {
            setCountry(newCountry);
            // invalidate carbon values
            setData(prev => {
                prev.forEach(p => p.outdated = true);
                return prev;
            });
        }
        setIsValide(true);
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Please provide your Country and Date
            </Typography>
            <Grid container spacing={isXs ? 2 : 5} direction="row" className={classes.container} >
                <Grid item xs={12} sm={3} className={classes.center}>
                    <ExploreIcon color="primary" style={{fontSize: 60}} className={classes.exploreIcon} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <FormControl required size="small" fullWidth className={classes.formControl}>
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country-select"
                            value={country}
                            onChange={handleLocationChange}
                            margin="dense"
                        >
                            {countries.map((country, i) => {
                                return (
                                    <MenuItem
                                        key={i}
                                        value={country.value}>
                                        {country.label}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3} className={classes.center}>
                    <EventIcon color="primary" style={{fontSize: 60}} className={classes.eventIcon} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            fullWidth
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Your Date"
                            value={date}
                            onChange={handleDateChange}
                            autoOk
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            color="secondary"
                            className={classes.datePickerRoot}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
        </>
    );
}