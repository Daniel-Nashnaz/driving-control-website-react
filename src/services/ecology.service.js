import { API_BASE_URL } from "../common/constants";

import jwtInterceptor from "../common/jwtInterceptor";

const getAllEcologyOfDriversByAdminId = () => {
    return jwtInterceptor.get(API_BASE_URL + "ecology/getAllEcologyOfDriversByAdminId");
  };

  const getAllEcologyByUserId = (userId) => {
    return jwtInterceptor.get(API_BASE_URL + `ecology/getAllEcologyByUserId/${userId}`);
  };

  const getAllEcologyByTripId = (tripId) => {
    return jwtInterceptor.get(API_BASE_URL + `ecology/getAllEcologyByTripId/${tripId}`);
  };

  const EcologyService = {
    getAllEcologyOfDriversByAdminId,
    getAllEcologyByUserId,
    getAllEcologyByTripId
    
}

export default EcologyService;
  