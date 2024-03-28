type IAxiosConfig = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: any;
  contentType?: string;
};
export const getAxiosconfig = ({
  method,
  url,
  data,
  contentType = "application/json",
}: IAxiosConfig) => {
  return {
    method,
    url: `/api/${url}`,
    data,
    headers: {
      "Content-Type": contentType,
    },
  };
};
export const getAuthenticatedAxiosconfig = ({
  method,
  url,
  data,
  contentType = "application/json",
}: IAxiosConfig) => {
  return {
    method,
    url: `/api/${url}`,
    data,
    headers: {
      "Content-Type": contentType,
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  };
};
