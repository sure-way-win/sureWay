import http from "./httpService";
import config from "../config.json";
import auth from "../services/authService";

const agency = auth.getCurrentUserAgency();
const apiUrl = config.apiUrl;

export function addNewBus(obj) {
  const apiEndpoint = `${apiUrl}/Admin/vehicleRegistration`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.post(urlWithQuery, obj);
}

export function getBuses() {
  const apiEndpoint = `${apiUrl}/Admin/registeredVehicles`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}

export function getUnasignedChildren() {
  const apiEndpoint = `${apiUrl}/Admin/busNotAssignedChildren`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}
