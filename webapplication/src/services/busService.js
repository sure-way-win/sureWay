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

export async function getBuses() {
  const apiEndpoint = `${apiUrl}/Admin/registeredVehicles`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}

export async function getUnasignedChildren() {
  const apiEndpoint = `${apiUrl}/Admin/busNotAssignedChildren`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}

export async function rejectRequest(obj) {
  const apiEndpoint = `${apiUrl}/Admin/rejectRequest`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.put(urlWithQuery, obj);
}

export async function getMatchingBusses(obj) {
  const apiEndpoint = `${apiUrl}/Admin/gettingMatchingAvailableBus`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery, { params: obj });
}

export async function assignBus(obj) {
  const apiEndpoint = `${apiUrl}/Admin/assigningBusForChildren`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.put(urlWithQuery, obj);
}
