import React, {createContext} from 'react';

interface AppContextInterface {
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setIsValide: React.Dispatch<React.SetStateAction<boolean>>;
    electricityValues: number[];
    setElectricityValues: React.Dispatch<React.SetStateAction<number[]>>;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextInterface>({
    country: '',
    setCountry: () => {},
    date: new Date(),
    setDate: () => {},
    setIsValide: () => {},
    electricityValues: [],
    setElectricityValues: () => {},
    activeStep: 0,
    setActiveStep: () => {},
});


export default AppContext;
