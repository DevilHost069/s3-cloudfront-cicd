// import { IBrandingData } from "@server/configurations/configuration";
import { IConfiguration, IConfigurationRes, useGetConfigurations } from "@server/configurations/useGetConfigurations";
import React, { createContext, useContext, useEffect, useState } from "react";

export type IConfigurationOptionsContext = {
    configurations: IConfigurationRes | undefined;
    setConfigurations: React.Dispatch<React.SetStateAction<IConfigurationRes>>;
};
const ConfigurationContext = createContext<IConfigurationOptionsContext | undefined>(undefined);


export function useConfiguration() {
    const context = useContext(ConfigurationContext);
    if (!context) {
        throw new Error("useConfiguration must be used within a ConfigurationProvider");
    }
    return context;
}

function ConfigurationOptionsProvider({ children }) {
    const { data, isError, isLoading } = useGetConfigurations();

    const [configurations, setConfigurations] = useState<IConfigurationRes | undefined>(data);
    return (
        <ConfigurationContext.Provider value={{ configurations: data, setConfigurations }}>
            {children}
        </ConfigurationContext.Provider>
    );
}

export default ConfigurationOptionsProvider;
