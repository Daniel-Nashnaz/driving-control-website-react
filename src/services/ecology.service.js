import { API_BASE_URL } from "../common/constants";

import jwtInterceptor from "../common/jwtInterceptor";

const getAllEcologyOfDriversByAdminId = () => {
    return jwtInterceptor.get(API_BASE_URL + "ecology/getAllEcologyOfDriversByAdminId");
  };

  const EcologyService = {
    getAllEcologyOfDriversByAdminId,
    
}

export default EcologyService;
  