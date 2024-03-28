type IAppEnv = "local" | "dev" | "uat" | "prod";
export const getTenantAPIURL = ({ schema, baseURL }) => {
  const appEnv: IAppEnv = import.meta.env.VITE_APP_ENV;
  if (baseURL.includes("://") && schema) {
    const baseURLChunks = baseURL.split("://");
    switch (appEnv) {
      case "local":
        return `${baseURLChunks[0]}://${schema}.${baseURLChunks[1]}`;

      default:
        return `${baseURLChunks[0]}://${schema}${schema === "hanamed" ? "-" : "." + appEnv + "-"}${baseURLChunks[1]}`;
    }
  }
  return baseURL;
};
