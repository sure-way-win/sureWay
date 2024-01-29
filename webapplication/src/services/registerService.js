import http from "./httpService";
import config from "../config.json";
import auth from "../services/authService";

// Api endpoint should be registeredUsers

export function registerNewDriver(obj) {
  const agency = auth.getCurrentUserAgency();
  const apiUrl = config.apiUrl;
  const apiEndpoint = `${apiUrl}/Admin/driverRegistration`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.post(urlWithQuery, obj);
}

export async function getVehicles() {
  const agency = auth.getCurrentUserAgency();
  const apiUrl = config.apiUrl;
  const apiEndpoint = `${apiUrl}/Admin/registeredVehiclesWithoutDriver`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}
