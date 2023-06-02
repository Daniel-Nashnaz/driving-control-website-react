import { API_BASE_URL } from "../common/constants";
import jwtInterceptor from "../common/jwtInterceptor";

const getAllScores = () => {
    return jwtInterceptor.get(API_BASE_URL + "/statistic/data");
};




const StatisticService = {
    getAllScores,
}

export default StatisticService;
