// src/context/AppStatusContext.tsx

import { createContext } from 'react';

export const AppStatusContext = createContext({
    rawRunning: true,
    setRawRunning: (val: boolean) => { },
    isInitialized: false,
    setIsInitialized: (val: boolean) => { }
});