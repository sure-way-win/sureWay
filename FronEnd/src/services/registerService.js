import http from "./httpService";
import config from "../config.json";

// Api endpoint should be registeredUsers

export function registerNewDriver(obj) {
  const apiUrl = config.apiUrl;
  const apiEndpoint = apiUrl + "/Admin/driverRegistration";
  return http.post(apiEndpoint, obj);
}
