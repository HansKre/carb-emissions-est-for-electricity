import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import {makeStyles} from '@material-ui/core/styles';

export const steps = ['Your weekly electricity usage', 'Your country', 'Your carbon emissions'];

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
}));

type Props = {
    activeStep: number;
}

export default function CustomStepper(props: Props) {
    const {activeStep} = props;
    const classes = useStyles();
    return <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
            <Step key={label}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>;
}
