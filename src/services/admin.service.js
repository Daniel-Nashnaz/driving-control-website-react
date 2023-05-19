import axios from "axios";
import { API_BASE_URL } from "../common/constants";

import jwtInterceptor from "../common/jwtInterceptor";

const getPublicContent = () => {
  return jwtInterceptor.get(API_BASE_URL + "home/all");
};

const getUserBoard = () => {
  return jwtInterceptor.get(API_BASE_URL + "home/user");
};

const getModeratorBoard = () => {
  return jwtInterceptor.get(API_BASE_URL + "home/mod");
};

const getAdminBoard = () => {
  return jwtInterceptor.get(API_BASE_URL + "home/admin");
};


const getAdminAddDriver = (dataOfRegister) => {
  return jwtInterceptor.post(API_BASE_URL + "home/addUser", dataOfRegister, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      'Content-Type': 'application/json'
    }
  });
};

const deleteUserByAdmin = (userId) => {
  return jwtInterceptor.delete(API_BASE_URL + `home/deleteById/${userId}`);
};

const updateUserByAdmin = (userId,data) => {
  return jwtInterceptor.put(API_BASE_URL + `home/updateUser/${userId}`,data);
};


const getAllUsersOfAdmin = () => {
  return jwtInterceptor.get(API_BASE_URL + "home/getAllUsers");
};

const AdminService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAdminAddDriver,
  getAllUsersOfAdmin,
  deleteUserByAdmin,
  updateUserByAdmin,
}

export default AdminService;
