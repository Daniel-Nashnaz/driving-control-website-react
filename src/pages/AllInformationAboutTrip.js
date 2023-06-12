import { Card, Divider, Row, Table,  message } from "antd";
import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { useNavigate, useParams } from "react-router-dom";
import TravelService from "../services/travel.service";


const columns = [

  {
    title: 'Time From Start',
    dataIndex: 'timeFromStart',
    key: 'timeFromStart',
    align: 'center',
  },
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
    align: 'center',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
    align: 'center',
  },
  {
    title: 'Forward Warning Directions',
    dataIndex: 'forwardWarningDirections',
    key: 'forwardWarningDirections',
    align: 'center',
  },
  {
    title: 'Forward Warning Distance',
    dataIndex: 'forwardWarningDistance',
    key: 'forwardWarningDistance',
    align: 'center',
  },
  {
    title: 'Lane Departure Warning',
    dataIndex: 'laneDepartureWarning',
    key: 'laneDepartureWarning',
    align: 'center',
  },
  {
    title: 'Pedestrian And Cyclist Collision Warning',
    dataIndex: 'pedestrianAndCyclistCollisionWarning',
    key: 'pedestrianAndCyclistCollisionWarning',
    align: 'center',
  },
  {
    title: 'Sudden Braking',
    dataIndex: 'suddenBraking',
    key: 'suddenBraking',
    render: (value) => value ? "Yes" : "No",
    align: 'center',
  },
  {
    title: 'Speed Allowed',
    dataIndex: 'speedAllowed',
    key: 'speedAllowed',
    align: 'center',
  },
  {
    title: 'Current Speed',
    dataIndex: 'currentSpeed',
    key: 'currentSpeed',
    align: 'center',
  },
  {
    title: 'Distance Traveled Mile',
    dataIndex: 'distanceTraveledMile',
    key: 'distanceTraveledMile',
    align: 'center',
  },
];


const AllInfromationAboutTrip = () => {

  const navigate = useNavigate();
  const { tripId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await TravelService.getAllDataOfTripId(tripId);
 //     console.log('Driving data:', response.data);
      setData(response.data);
      if (response.data <= 0) {
        message.error("Trip not found!");
        //Go back page
        setTimeout(() => {
          navigate(-2);
        }, 1500);

      }
    } catch (error) {
      message.error(error.message);
      console.error('Error fetching driving data:', error);
    }
  };

  return (<>
    <Table dataSource={data} columns={columns}
      pagination={false}
      bordered={true}
      style={{ textAlign: 'center' }}
      key={record => record.id} />
    <Divider />
     <Row gutter={20}>
      {/* map of veiw location with forward! */}
      <Map data={data} />

      <Card
        style={{
          width: 240,
          height: 600
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'purple' }}>Markers information</h2>
        <h6>
          <p><h5 style={{ color: 'red' }}>Red:</h5> signifies lane departure warning</p>
          <p><h5 style={{ color: 'black' }}>Black:</h5> signifies sudden braking</p>
          <p><h5 style={{ color: 'yellow' }}>Yellow:</h5> signifies exceeding the speed limit</p>
          <p><h5 style={{ color: 'blue' }}>Blue:</h5> signifies pedestrian and cyclist collision warning</p>
          <p><h5 style={{ color: 'orange' }}>Orange:</h5> signifies forward warning distance</p>
          <p><h5 style={{ color: 'gold' }}>Gold:</h5> signifies forward warning directions</p>
        </h6>
      </Card>
    </Row>
  </>);



};


export default AllInfromationAboutTrip;