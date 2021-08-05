import type {NextApiRequest, NextApiResponse} from 'next';
import ElectricityEstimateApiResponse from '../../../../types/ElectricityEstimateApiResponse';
import Response from '../../../../types/Response';

const exampleResp = (country: string, value: number): ElectricityEstimateApiResponse => {
    return {
        "data": {
            "id": "2d968fce-859d-4dc1-9489-987e795f42bb",
            "type": "estimate",
            "attributes": {
                "country": country,
                "electricity_unit": "mwh",
                "electricity_value": value.toPrecision(3),
                "estimated_at": "2020-07-24T02:23:24.441Z",
                "carbon_g": Math.round((18051428 / 42) * value),
                "carbon_lb": Math.round((39796 / 42) * value),
                "carbon_kg": Math.round((18051 / 42) * value),
                "carbon_mt": Math.round((18 / 42) * value),
            }
        }
    }
}

const mockApiCall = async (country: string, value: number): Promise<Response<number>> => {
    const delay = Math.round(Math.random() * 3000);
    return new Promise(resolve => setTimeout(() => resolve(
        {status: 200, statusText: 'Ok', body: exampleResp(country, value).data.attributes.carbon_kg}
    ), delay));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed.')
        return false;
    }
    const {country, value} = req.body;
    if (country && value) {
        const response = await mockApiCall(country, value);
        res.status(response.status).json(response);
    } else {
        res.status(400).send('Bad Request.');
    }
}