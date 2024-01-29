import http from "./httpService";
import config from "../config.json";

export async function getDriverSnaps(obj) {
  const apiEndpoint = `${config.apiUrl}/Admin/gettingDriverSnaps`;
  return http.get(apiEndpoint, { params: obj });
}

export async function triggerSnap(obj) {
  const apiEndpoint = `${config.apiUrl}/Admin/triggeringSnap`;
  return http.post(apiEndpoint, obj);
}

export async function getVehicleSnap(obj) {
  const apiEndpoint = `${config.apiUrl}/Admin/gettingVehicleSnap`;
  return http.get(apiEndpoint, { params: obj });
}
