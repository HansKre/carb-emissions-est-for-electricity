import {useTheme} from '@material-ui/core';
import {Bar, BarChart, CartesianGrid, ReferenceLine, Tooltip, XAxis, YAxis} from 'recharts';

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
    return (
        // TODO: wrap in ResponsiveChart?
        <BarChart
            // TODO: width, height responsive
            width={575}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="weekday" />
            <YAxis />
            <Bar dataKey="value" fill={theme.palette.secondary.main} />
        </BarChart>
    );
}