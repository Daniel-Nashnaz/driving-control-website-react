import axios from "axios";
import { API_BASE_URL } from "../common/constants";


const register = (dataOfRegister) => {
  
  return axios.post(API_BASE_URL + "v1/auth/signup", dataOfRegister, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  getCurrentUser,
}

export default AuthService;
