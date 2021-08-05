import React, {createContext, useState} from 'react';

interface AppContextInterface {
    isValide: boolean;
    setIsValide: React.Dispatch<React.SetStateAction<boolean>>;
    electricityValues: number[];
    setElectricityValues: React.Dispatch<React.SetStateAction<number[]>>;
}

const AppContext = createContext<AppContextInterface>({
    isValide: false,
    setIsValide: () => {},
    electricityValues: [],
    setElectricityValues: () => {}
});


export default AppContext;
