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

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    center: {
        textAlign: 'center',
    },
    eventIcon: {
        marginTop: '17px',
    },
    container: {
        marginTop: '15px',
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
        setDate
    } = useContext(AppContext);

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
        setCountry(event.target.value as string);
        setIsValide(true);
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Please provide your Country and Date
            </Typography>
            <Grid container spacing={5} direction="row" className={classes.container} >
                <Grid item xs={12} sm={3} className={classes.center}>
                    <ExploreIcon color="primary" style={{fontSize: 60}} />
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