import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';
import CustomStepper, {steps} from './CustomStepper';
import AppContext from './AppContext';
import CountryForm from './CountryForm';
import Emissions from './Emissions';
import dynamic from 'next/dynamic'

const UsageFormWithoutSSR = dynamic(
    () => import('./UsageForm'),
    {ssr: false}
)

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <UsageFormWithoutSSR />;
        case 1:
            return <CountryForm />;
        case 2:
            return <Emissions />;
        default:
            throw new Error('Unknown step');
    }
}

export default function ElectricityToCarbon() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isValide, setIsValide] = useState(false);
    const [electricityValues, setElectricityValues] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const isLastStep = activeStep === steps.length - 1;
    return (
        <AppContext.Provider value={{
            setIsValide,
            electricityValues,
            setElectricityValues,
            country,
            setCountry,
            date,
            setDate,
        }}>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Estimate your weekly carbon emissions!
                    </Typography>
                    <CustomStepper activeStep={activeStep} />
                    <>
                        {getStepContent(activeStep)}
                        <div className={classes.buttons}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                                disabled={isLastStep || !isValide}
                            >
                                Continue
                            </Button>
                        </div>
                    </>
                </Paper>
                <Copyright />
            </main>
        </AppContext.Provider >
    );
}
