import React, {useContext, useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import AppContext from './AppContext';
import postRequest from '../utils/postRequest';
import CustomBarChart, {ChartData} from './CustomBarChart';
import weekday from '../utils/weekdays';
import Response from '../../types/Response';
import CustomBackdrop from '../backdrop/CustomBackdrop';

export default function Emissions() {
    // TODO: avoid re-renders due to new reference
    const {country, electricityValues} = useContext(AppContext);
    const [data, setData] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [dataWhileLoading, setDataWhileLoading] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const pendingRequests: Promise<any>[] = [];
        electricityValues.forEach((value, i) => {
            if (value) {
                const pendingRequest = postRequest('/api/estimates/mock', {
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
                    })
                    .catch(e => console.log(e));
                pendingRequests.push(pendingRequest);
            }
        });
        Promise.all(pendingRequests).then(() => {
            setIsLoading(false);
            setData(dataWhileLoading);
        });
    }, [electricityValues]);

    return (
        <>
            <CustomBackdrop isLoading={isLoading} />
            <Typography variant="h6" gutterBottom>
                Your carbon emissions
            </Typography>
            <CustomBarChart data={data} />
        </>
    );
}