import axios from "axios";
import { API_URL } from "./api";
const http = (token = null) => {
  const headers = token && {
    authorization: `Bearer ${token}`,
  };
  return axios.create({
    baseURL: API_URL,
    headers,
  });
};

export default http;
