import {useEffect, useState} from "react";
import ChartData from "../../types/ChartData";
import weekday from '../utils/weekdays';
import postRequest from "../utils/postRequest";
import Response from '../../types/Response';

const isDev = process.env.NODE_ENV !== 'production';
const API_URL = isDev ? '/api/estimates/mock' : '/api/estimates';

export default function useFetch(data: ChartData[], country: string) {
    const [newData, setNewData] = useState<ChartData[]>(data);
    const [dataWhileLoading, setDataWhileLoading] = useState<ChartData[]>(data);
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
        data.forEach((value, i) => {
            if (value.outdated) {
                if (value.electricityValue === 0) {
                    update(i, 0);
                } else {
                    const pendingRequest = postRequest(API_URL, {
                        country,
                        value: value.electricityValue
                    })
                        .then((response: Response) => {
                            if (response.status === 200) {
                                update(i, response.body ? response.body : 0);
                            }
                        });
                    pendingRequests.push(pendingRequest);
                }
            }
        });
        Promise.all(pendingRequests)
            .then(() => {
                setIsLoading(false);
                apiCallDidSucceed();
                setNewData(dataWhileLoading);
            })
            .catch((e) => {
                console.log(e);
                apiCallDidFail();
                setIsLoading(false);
            });
    }, [data, country]);

    return {newData, isLoading, apiCallFailed, apiCallSucceeded};

    function update(i: number, newCarbonValue: number) {
        setDataWhileLoading(prev => {
            const newData = [...prev];
            const index = newData.findIndex(v => v.weekday === weekday[i]);
            newData[index].carbonValue = newCarbonValue;
            newData[index].outdated = false;
            return newData;
        });
    }
}