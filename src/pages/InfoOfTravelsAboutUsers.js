import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {  Avatar, Card, Divider, List,  Progress, message } from 'antd';
import TravelService from '../services/travel.service';
import moment from 'moment';

const formatTime = (time) => {
  return moment(time).format("MM/DD/YYYY HH:mm:ss");
}

function UserDetailsOfTravels() {

  const navigate = useNavigate();
  const { id, fullName } = useParams();
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await TravelService.getLastTripsByUser(id);
      console.log('Driving data:', response);
      setData(response.data);
      if (response.data <= 0)  {
        message.error("User not found!");
        //go back page
        setTimeout(() => {
          navigate(-2);
        }, 1000);
        
      }
    } catch (error) {
      message.error(error.message);
      console.error('Error fetching driving data:', error);
    }



  };

  return (<>
    <p style={{ textAlign: 'center' }}>
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
    </p>
    <h3 style={{ textAlign: 'center', color: 'orangered' }}>  Last Trips of driver: <b style={{ color: 'darkorange' }}>{fullName}</b></h3>
    <Divider />
    <List

      grid={{
        gutter: 16,
        xs: 4,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 3,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(trip) => (
        <List.Item>
          <Card title={<i><h5 style={{ textAlign: 'center' }}>Ttip Score:
            <div
              style={{
                width: 280,

              }}

            >
              <Progress percent={trip.tripScore} size="small" />
            </div>
          </h5>
          </i>}
          >
            <h6>
            <p>Trip Number: {trip.tripId}</p>
            <p>Travel start: {formatTime(trip.travelStart)}</p>
            <p>Travel end: {formatTime(trip.travelEnd)}</p>
            <p>Type of vehicle: {trip.typeOfVehicle}</p>
            <p>Vehicle name: {trip.vehicleName}</p>
            <p>Vehicle number: {trip.vehicleNumber}</p>
            </h6>
            <div style={{ textAlign: 'center' }}>
              <Link to={`/tripsummary/${trip.tripId}`} key="list-loadmore-more">
                More Details About This Trip
              </Link>
            </div>


          </Card>
        </List.Item>
      )}
    />
      
  </>);
};


export default UserDetailsOfTravels;