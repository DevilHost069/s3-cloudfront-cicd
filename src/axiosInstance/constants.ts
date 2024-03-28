import { getTenantAPIURL } from "@utils/helpers/getTenantAPIURL";
// Url paatterns list
const urlRegexList = [
  /portal\.(.*?)\.com\.au/,
  /(.*?)\.app\.cannabizelite\.com\.au/,
];
// extract schema from current URL for tenant API endpoint
function extractTenant(hostname: string) {
  const tenantList = urlRegexList
    .map((regex) => {
      var match = hostname.match(regex);
      return match ? match[1] : null;
    })
    .filter((i) => i !== null);
  if (tenantList.length) return tenantList[0];
  return window.location.hostname.split(".")[0];
}

const tenantSchema = () => {
  const tenant = extractTenant(window.location.hostname);
  if (tenant === "hanamed") {
    document.title = "Hanamed Portal";
  }
  return tenant;
};
export const baseUrl = getTenantAPIURL({
  baseURL: import.meta.env.VITE_API_URL,
  schema: tenantSchema(),
});
