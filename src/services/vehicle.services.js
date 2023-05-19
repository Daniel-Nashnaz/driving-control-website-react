import { API_BASE_URL } from "../common/constants";

import jwtInterceptor from "../common/jwtInterceptor";


const getAllVehicle = () => {
    return jwtInterceptor.get(API_BASE_URL + "vehicle/getAllVehicle",{
        withCredentials: true,
      }).then(response => {
        // handle successful response
        return response.data;
    })
        .catch(error => {
            // handle error
            console.log(error);
            return null; // or throw an error, or return a default value
        });
};


const addVehicle = (data) => {
    return jwtInterceptor.post(API_BASE_URL + "vehicle/addVehicle", data);
};

const updateVehicleById = (vehicleId, data) => {
    return jwtInterceptor.put(API_BASE_URL + `vehicle/updateVehicle/${vehicleId}`, data);

};

const deleteVehicleById = (vehicleId) => {
    return jwtInterceptor.delete(API_BASE_URL + `vehicle/deleteVehicleById/${vehicleId}`);
};

const addUserToVehicle = (data) => {
    return jwtInterceptor.post(API_BASE_URL + "vehicle/addDriver", data);
};

const getAllDrivingOfVehicle = (vehicleId) => {
    return jwtInterceptor.get(API_BASE_URL + `vehicle/allUserOfVehicle/${vehicleId}`);
};

const VehicleService = {
    getAllVehicle,
    addVehicle,
    updateVehicleById,
    deleteVehicleById,
    addUserToVehicle,
    getAllDrivingOfVehicle,

}

export default VehicleService;