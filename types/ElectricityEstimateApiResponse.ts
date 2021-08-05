interface ElectricityEstimateApiResponse {
    data: Data;
}

interface Data {
    id: string;
    type: string;
    attributes: Attributes;
}

interface Attributes {
    country: string;
    state?: string;
    electricity_unit: string;
    electricity_value: string;
    estimated_at: string;
    carbon_g: number;
    carbon_lb: number;
    carbon_kg: number;
    carbon_mt: number;
}

export default ElectricityEstimateApiResponse;