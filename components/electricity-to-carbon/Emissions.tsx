import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import AppContext from './AppContext';
import postRequest from '../utils/postRequest';
import CustomBarChart, {ChartData} from './CustomBarChart';
import weekday from '../utils/weekdays';
import Response from '../../types/Response';
import CustomBackdrop from '../backdrop/CustomBackdrop';
import {steps} from './CustomStepper';
import {makeStyles} from '@material-ui/core/styles';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    errorTypo: {
        fontWeight: 500,
        marginTop: '10px',
    }
}));

const isDev = process.env.NODE_ENV !== 'production';
const API_URL = isDev ? '/api/estimates/mock' : '/api/estimates';

export default function Emissions() {
    const classes = useStyles();
    // TODO: avoid re-renders due to new reference
    const {country, electricityValues, activeStep, setActiveStep} = useContext(AppContext);
    const [data, setData] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [dataWhileLoading, setDataWhileLoading] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [isLoading, setIsLoading] = useState(false);
    const [apiCallSucceeded, setApiCallSucceeded] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const pendingRequests: Promise<any>[] = [];
        electricityValues.forEach((value, i) => {
            if (value) {
                const pendingRequest = postRequest(API_URL, {
                    country,
                    value
                })
                    .then((response: Response) => {
                        if (response.status === 200) {
                            setDataWhileLoading(prev => {
                                const newData = [...prev];
                                const index = newData.findIndex(v => v.weekday === weekday[i]);
                                newData[index].value = response.body ? response.body : 0;
                                return newData;
                            })
                        }
                    });
                pendingRequests.push(pendingRequest);
            }
        });
        Promise.all(pendingRequests)
            .then(() => {
                setIsLoading(false);
                setApiCallSucceeded(true);
                setData(dataWhileLoading);
                if (activeStep < steps.length) {
                    setActiveStep(prev => prev + 1);
                }
            })
            .catch((e) => {
                console.log(e);
                setApiCallSucceeded(false);
                setIsLoading(false);
            });
    }, [electricityValues]);

    return (
        <>
            <CustomBackdrop isLoading={isLoading} />
            <Typography variant="h6" gutterBottom>
                Your carbon emissions
            </Typography>
            {apiCallSucceeded ?
                <CustomBarChart data={data} />
                : <Grid container alignItems="center" >
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