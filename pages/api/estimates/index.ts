import type {NextApiRequest, NextApiResponse} from 'next';
import ElectricityEstimateApiResponse from '../../../types/ElectricityEstimateApiResponse';
import Response from '../../../types/Response';

const fetchEstimates = async (country: string, value: number): Promise<Response<number>> => {
    try {
        const url = process.env.API_URL;
        const jsonData = {
            'type': 'electricity',
            'electricity_unit': 'mwh',
            'electricity_value': value,
            country,
        }
        if (url) {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.CARBONINTERFACE_API_KEY}`
                }
            });
            if ([200, 201].includes(response.status)) {
                const json: ElectricityEstimateApiResponse = await response.json();
                return {status: 200, statusText: 'OK', body: json.data.attributes.carbon_kg};
            } else {
                return {status: response.status, statusText: response.statusText, body: null};
            }
        }
        return {status: 500, statusText: 'API-URL not found.', body: null};
    } catch (err) {
        return {status: 500, statusText: 'Internal server error while calling external API.', body: err};
    }
}

const cache = new Map();
function key(country: any, value: any): any {
    return `${country}-${value}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed.')
        return false;
    }
    const {country, value} = req.body;
    if (cache.has(key(country, value))) {
        res.status(200).json(cache.get(key(country, value)));
        return true;
    }
    if (country && value) {
        const response = await fetchEstimates(country, value);
        cache.set(key(country, value), response);
        res.status(response.status).json(response);
        return true;
    } else {
        res.status(400).send('Bad Request.');
        return false;
    }
}
