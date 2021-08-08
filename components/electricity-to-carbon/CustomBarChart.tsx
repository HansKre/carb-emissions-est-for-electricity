import {useTheme} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import {LOCALE} from './constants';

export type ChartData = {
    weekday: string,
    value: number
}

type Props = {
    data: ChartData[];
    id?: string;
}

export default function CustomBarChart(props: Props) {
    const {data, id = 'chart'} = props;
    const theme = useTheme();
    // smaller than XS
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    const tickFormatterY = (value: any, index: number): string => {
        if (typeof value === 'number') {
            return Math.round(value / 1000).toLocaleString(LOCALE);
        }
        return value;
    }

    const tickFormatterX = (value: any, index: number): string => {
        if (isXs && typeof value === 'string') {
            return value.substr(0, 2);
        }
        return value;
    }

    return (
        <ResponsiveContainer width="100%" height={isXs ? 250 : 250} >
            <BarChart
                data={data}
                margin={{
                    top: isXs ? 15 : 5, right: isXs ? 0 : 30, left: isXs ? 10 : 20, bottom: 5,
                }}
                id={id}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" tickFormatter={tickFormatterX} />
                <YAxis width={isXs ? 25 : 60} name='emissions' unit={isXs ? ' t' : ' tons'} tickFormatter={tickFormatterY} />
                <Bar dataKey="value" fill={theme.palette.secondary.main} />
            </BarChart>
        </ResponsiveContainer>
    );
}