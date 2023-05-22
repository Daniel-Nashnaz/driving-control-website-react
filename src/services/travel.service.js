import { API_BASE_URL } from "../common/constants";

import jwtInterceptor from "../common/jwtInterceptor";


const getAllLastTravelOfUsers = () => {
    return jwtInterceptor.get(API_BASE_URL + "travel/getAllUsersByLastTravel",{
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

const getLastTripsByUser = (userId) => {
    return jwtInterceptor.get(API_BASE_URL + `travel/getLastTripsByUser/${userId}`);
};

const getStatisticsOfTripId = (tripId) => {
    return jwtInterceptor.get(API_BASE_URL + `travel/getStatisticsOfTripId/${tripId}`);
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



const TravelService = {
    getAllLastTravelOfUsers,
    getLastTripsByUser,
    getStatisticsOfTripId,

}

export default TravelService;