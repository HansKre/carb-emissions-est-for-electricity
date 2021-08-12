import React, {useContext, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import AppContext from './AppContext';
import CustomBarChart from './CustomBarChart';
import CustomBackdrop from '../backdrop/CustomBackdrop';
import {steps} from './CustomStepper';
import {makeStyles} from '@material-ui/core/styles';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Grid from '@material-ui/core/Grid';
import useFetch from './useFetch';

const useStyles = makeStyles((theme) => ({
    errorTypo: {
        fontWeight: 500,
        marginTop: '10px',
    }
}));

export default function Emissions() {
    const classes = useStyles();
    const {country, data, setData, activeStep, setActiveStep} = useContext(AppContext);
    const {newData, isLoading, apiCallFailed, apiCallSucceeded} = useFetch(data, country);

    useEffect(() => {
        if (!isLoading && apiCallSucceeded) {
            if (activeStep < steps.length) {
                setActiveStep(prev => prev + 1);
            }
        }
    }, [data, isLoading, apiCallFailed, apiCallSucceeded]);

    useEffect(() => {
        if (!isLoading && apiCallSucceeded) {
            setData(newData);
        }
    }, [newData]);

    return (
        <>
            <CustomBackdrop isLoading={isLoading} />
            <Typography variant="h6" gutterBottom>
                Your carbon emissions
            </Typography>
            {!isLoading && apiCallSucceeded && <CustomBarChart data={data} />}
            {!isLoading && apiCallFailed && <Grid container alignItems="center" >
                <Typography
                    id="errorMsg"
                    variant="body2"
                    color="error"
                    className={classes.errorTypo}
                >
                    Ooops, we are really sorry that something went wrong...
                </Typography>
                <SentimentVeryDissatisfiedIcon color="error" />
            </Grid>
            }
        </>
    );
}