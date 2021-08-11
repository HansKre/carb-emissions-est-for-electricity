import {useEffect, useState} from "react";
import ChartData from "../../types/ChartData";
import weekday from '../utils/weekdays';
import postRequest from "../utils/postRequest";
import Response from '../../types/Response';

const isDev = process.env.NODE_ENV !== 'production';
const API_URL = isDev ? '/api/estimates/mock' : '/api/estimates';

export default function useFetch(electricityValues: number[], country: string) {
    const [data, setData] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [dataWhileLoading, setDataWhileLoading] = useState<ChartData[]>(weekday.map(d => ({weekday: d, value: 0})));
    const [isLoading, setIsLoading] = useState(false);
    const [apiCallSucceeded, setApiCallSucceeded] = useState(false);
    const [apiCallFailed, setApiCallFailed] = useState(false);

    function apiCallDidSucceed() {
        setApiCallSucceeded(true);
        setApiCallFailed(false);
    }

    function apiCallDidFail() {
        setApiCallSucceeded(false);
        setApiCallFailed(true);
    }

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
                apiCallDidSucceed();
                setData(dataWhileLoading);
            })
            .catch((e) => {
                console.log(e);
                apiCallDidFail();
                setIsLoading(false);
            });
    }, [electricityValues, country]);

    return {data, isLoading, apiCallFailed, apiCallSucceeded};
}