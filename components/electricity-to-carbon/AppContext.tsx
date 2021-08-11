import React, {createContext} from 'react';
import ChartData from '../../types/ChartData';

interface AppContextInterface {
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setIsValide: React.Dispatch<React.SetStateAction<boolean>>;
    data: ChartData[];
    setData: React.Dispatch<React.SetStateAction<ChartData[]>>;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextInterface>({
    country: '',
    setCountry: () => {},
    date: new Date(),
    setDate: () => {},
    setIsValide: () => {},
    data: [],
    setData: () => {},
    activeStep: 0,
    setActiveStep: () => {},
});


export default AppContext;
