import axios from "axios";
import { API_BASE_URL } from "./constants";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("refresh token!!!");
      await axios
        .get(API_BASE_URL + "v1/auth/refreshtoken", {
          withCredentials: true,
        })
        .catch((err) => {
          return Promise.reject(err);
        });
      console.log(error.config);
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceptor;
