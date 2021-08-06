import React from 'react'
import Slider from '@material-ui/core/Slider'
import {makeStyles} from '@material-ui/core/styles';
import {LOCALE} from './constants';

const MIN = 0, MAX = 300, STEP_COUNT = 100;

const useStyles = makeStyles((theme) => ({
    root: {
        '& span.MuiSlider-markLabel': {
            transform: 'none',
            left: '-14px',
            marginBottom: '17px',
        }
    },
    vertical: {
        marginLeft: theme.spacing(3),
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

type Props = {
    value: number;
    onChange?: ((event: React.ChangeEvent<{}>, value: number | number[]) => void) | undefined;
}

export default function VerticalSlider(props: Props) {
    const {value, onChange} = props;
    const valuetext = (value: number) => {
        return `${value.toLocaleString(LOCALE)}mwh`;
    }

    const MARKS = [
        {
            value: MAX,
            label: valuetext(MAX),
        },
    ];

    const classes = useStyles();
    return (
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
            value={value}
            onChange={onChange}
            classes={{
                vertical: classes.vertical,
                thumb: classes.thumb,
                valueLabel: classes.valueLabel
            }}
            className={classes.root}
        />
    )
}
