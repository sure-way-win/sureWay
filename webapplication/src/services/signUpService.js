import http from "./httpService";
import config from "../config.json";

const apiUrl = config.apiUrl;

export async function signUp(obj) {
  const apiEndpoint = `${apiUrl}/Admin/signup`;
  return http.post(apiEndpoint, obj);
}

export async function verify(obj) {
  const apiEndpoint = `${apiUrl}/verifyingAdmin`;
  return http.post(apiEndpoint, obj);
}
