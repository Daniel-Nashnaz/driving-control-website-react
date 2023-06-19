import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import EcologyService from "../services/ecology.service";
import MapView from "../components/EcologyMap";

const EcologyOfUser = () => {

    const { userId } = useParams();
    const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const response = await EcologyService.getAllEcologyByUserId(userId);
    const result = await response.data;
    setData(result);
  };

  fetchData();
}, []);

if (!data) {
  return <div>Loading...</div>;
}
if(data.length ===0){
  return <div>User Not Found!!!</div>;

}
const colors = {
    Green: 'green',
    Orange: 'orange',
    Red: 'red',
  };

const chartData = {
  labels: data.map((item) => item.ecologicalType),
  datasets: [
    {
      label: 'Ecological Type',
      data: data.map((item) => item.count),
      backgroundColor: data.map((item) => colors[item.ecologicalType]),
      borderWidth: 1,
    },
  ],
};

return (
  <>
    <div className='header'>
      <h1 className='title'>Ecological Type Pie Chart Of User</h1>
    </div>
    <Pie data={chartData} />
    {/* add veiw of trip ecology and map of trip... */}
    <MapView/>

  </>
);
};


export default EcologyOfUser;