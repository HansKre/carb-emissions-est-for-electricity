import React from 'react'
import Slider from '@material-ui/core/Slider'
import {makeStyles} from '@material-ui/core/styles';
import {LOCALE} from './constants';
import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const MIN = 0, MAX = 300, STEP_COUNT = 100;

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSlider-markLabel': {
            transform: 'none',
            left: '-14px',
            [theme.breakpoints.down('xs')]: {
                left: 0,
            },
            marginBottom: '17px',
        },
        '&.MuiSlider-vertical': {
            padding: '0 13px',
        }
    },
    vertical: {
        marginLeft: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(2),
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: theme.spacing(1),
        },
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
    const theme = useTheme();
    // smaller than XS
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const valuetext = (value: number) => {
        const localizedVal = `${value.toLocaleString(LOCALE)}`
        return isXs ? `${localizedVal}` : `${localizedVal}mwh`;
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
            id="slider"
            color="primary"
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
