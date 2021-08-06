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
}

export default function CustomBarChart(props: Props) {
    const {data} = props;
    const theme = useTheme();
    // smaller than XS
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const tickFormatter = (value: any, index: number): string => {
        if (typeof value === 'number') {
            return Math.round(value / 1000).toLocaleString(LOCALE);
        }
        return value;
    }
    return (
        <ResponsiveContainer width="100%" height={isXs ? 250 : 350}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" />
                <YAxis name='emissions' unit=' tons' tickFormatter={tickFormatter} />
                <Bar dataKey="value" fill={theme.palette.secondary.main} />
            </BarChart>
        </ResponsiveContainer>
    );
}