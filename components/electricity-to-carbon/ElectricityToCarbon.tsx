import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Copyright from './Copyright';
import CustomStepper, {steps} from './CustomStepper';
import UsageForm from './UsageForm';
import AppContext from './AppContext';
import CountryForm from './CountryForm';
import Emissions from './Emissions';
import WithAnimation from './WithAnimation';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Grid from '@material-ui/core/Grid';
import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChartData from '../../types/ChartData';
import weekday from '../utils/weekdays';

const MIN_PAPER_HEIGHT = 550;

const responsive100vh = document?.documentElement?.clientHeight || window?.innerHeight;

const useStyles = makeStyles((theme) => ({
    topAppBar: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(5),
        backgroundColor: theme.palette.primary.dark,
    },
    bottomAppBar: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        top: 'auto',
        bottom: 0,
        zIndex: -1,
        backgroundColor: theme.palette.primary.light,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        // extend width for high-density devices
        [theme.breakpoints.up('md')]: {
            width: 650,
        },
    },
    paper: {
        marginTop: theme.spacing(-3),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        height: responsive100vh - theme.spacing(12),
        [theme.breakpoints.down('xs')]: {
            height: Math.max(responsive100vh - theme.spacing(24), MIN_PAPER_HEIGHT + 90),
        },
        // contain layout-width on wider screens
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(-3),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(3),
            height: Math.max(responsive100vh - theme.spacing(23), MIN_PAPER_HEIGHT),
        },
        // no line-break on header
        [theme.breakpoints.up(615)]: {
            height: Math.max(responsive100vh - theme.spacing(17), MIN_PAPER_HEIGHT),
        },
        [theme.breakpoints.up('md')]: {
            height: Math.max(responsive100vh - theme.spacing(17), MIN_PAPER_HEIGHT),
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
            return <UsageForm />;
        case 1:
            return <CountryForm />;
        case 2:
        case 3:
            return <Emissions />;
        default:
            throw new Error('Unknown step');
    }
}

export default function ElectricityToCarbon() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isValide, setIsValide] = useState(false);
    const [data, setData] = useState<ChartData[]>(weekday.map(d => ({weekday: d, carbonValue: 0, electricityValue: 0, outdated: false})));
    const [country, setCountry] = useState('');
    const [date, setDate] = useState(new Date());

    const theme = useTheme();
    const isLandscape = useMediaQuery('(orientation: landscape)');
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (activeStep > steps.length - 1) {
            setActiveStep(steps.length - 2);
        } else {
            setActiveStep(prev => prev - 1);
        }
    };

    const isLastStep = activeStep >= steps.length - 1;
    return (
        <AppContext.Provider value={{
            setIsValide,
            data,
            setData,
            country,
            setCountry,
            date,
            setDate,
            activeStep,
            setActiveStep,
        }}>
            <CssBaseline />
            <WithAnimation>
                <Grid container direction="column">
                    <Grid item>
                        <AppBar position="static" className={classes.topAppBar} >
                            <Typography component="h1" variant="h4" align="center">
                                Estimate your weekly carbon emissions!
                            </Typography>
                        </AppBar>
                    </Grid>
                    <Grid item className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" style={{height: '100%'}} justifyContent="space-between">
                                <Grid item>
                                    <CustomStepper activeStep={activeStep} />
                                </Grid>
                                <Grid item>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button id="back-btn" onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            id="continue-btn"
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                            disabled={isLastStep || !isValide}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </Grid>
                                <Copyright />
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <AppBar position={(isLandscape && isSm) ? "relative" : undefined} className={classes.bottomAppBar}></AppBar>
                    </Grid>
                </Grid>
            </WithAnimation>
        </AppContext.Provider >
    );
}
