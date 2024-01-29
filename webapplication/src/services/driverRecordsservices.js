import http from "./httpService";
import config from "../config.json";
import auth from "../services/authService";

// Api endpoint should be registeredUsers

export function getDrivers() {
  const agency = auth.getCurrentUserAgency();
  const apiUrl = config.apiUrl;
  const apiEndpoint = `${apiUrl}/Admin/gettingDrivers`;
  const urlWithQuery = `${apiEndpoint}?agency=${encodeURIComponent(agency)}`;
  return http.get(urlWithQuery);
}
