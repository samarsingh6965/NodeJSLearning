import React, { createContext, useState, FC, ReactNode } from 'react';

interface ContextValue {
    isRender: boolean;
    setIsRender: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DataProviderProps {
    children: ReactNode;
}

const MyContext = createContext<ContextValue | any>(null);

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
    const [isRender, setIsRender] = useState(true);

    const contextValue: ContextValue = {
        isRender,
        setIsRender,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
