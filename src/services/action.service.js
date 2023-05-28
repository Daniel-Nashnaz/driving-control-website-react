import { API_BASE_URL } from "../common/constants";
import jwtInterceptor from "../common/jwtInterceptor";

const getAllMessagesSendOfCurrentUser = () => {
    return jwtInterceptor.get(API_BASE_URL + "/home/getAllMessagesSendOfCurrentUser");
};

const getAddressOfCurrentUser = () => {
    return jwtInterceptor.get(API_BASE_URL + "/home/currentUserAddress");
};

const updateCurrentUser = (updateUser) => {
    return jwtInterceptor.put(API_BASE_URL + "/home/update", updateUser);
};


const updatePasswordOfCurrentUser = (updatePass) => {
    return jwtInterceptor.put(API_BASE_URL + "/home/updatePassword", updatePass);
};


const ActionService = {
    getAllMessagesSendOfCurrentUser,
    getAddressOfCurrentUser,
    updateCurrentUser,
    updatePasswordOfCurrentUser,
}

export default ActionService;
