import { Avatar, Typography, List, Space, Divider, message } from 'antd';
import logo from "../../src/images/Logo-drivind-control.png";
import { CarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TravelService from '../services/travel.service';

const { Text } = Typography;
const StatisticsOfTrip = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await TravelService.getStatisticsOfTripId(tripId);
            console.log('Driving data:', response.data);
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
        <List
            itemLayout="vertical"
            size="large"
            dataSource={[data]}
            footer={
                <div>
                    <CarOutlined />
                    <Link to={`/allInfromation/${tripId}`} key="list-loadmore-more">
                        <i><b>Show all information about this trip</b></i>
                    </Link>
                </div>
            }
            renderItem={(item) => (
                <List.Item
                    key={item.tripId}
                    extra={
                        <img
                            width={350}
                            alt="logo"
                            src={logo}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=1`} />}
                        title={
                            <Text strong> <Typography.Title
                                level={3}

                            >Summary of trip number: {item.tripId}</Typography.Title>
                            </Text>}
                        description={<h5>Trip Score: {item.tripScore}</h5>}
                    />
                    <Divider type="horizontal" />
                    <Space direction="horizontal">
                        <div>
                            <h5>
                                <p style={{ color: 'gold' }}>Duration of Trip: {item.duration}</p>
                                <p style={{ color: 'gray' }}>Distance Traveled: {item.distanceTraveledMile} miles</p>
                                <p style={{ color: 'orchid' }}>Average Speed: {item.averageSpeed}</p>
                                <p style={{ color: 'forestgreen' }}>Max Speed: {item.maxSpeed}</p>
                                <p style={{ color: 'skyblue' }}>Number Times Exceeded Speed Limit: {item.numTimesExceededSpeedLimit}</p>
                                <p style={{ color: 'purple' }}>Pedestrian and Cyclist Collision Warnings: {item.pedestrianAndCyclistCollisionWarningCount}</p>
                                <p style={{ color: 'red' }}>Sudden Braking Count: {item.suddenBrakingCount}</p>
                                <p style={{ color: 'darkgoldenrod' }}>Forward Warning Directions: {item.forwardWarningDirectionsCount}</p>
                                <ul>
                                    <h6>
                                        <li>
                                            <p>Forward Warning Directions Up: {item.numForwardWarningDirectionsUp}</p>
                                        </li>
                                        <li>
                                            <p>Forward Warning Directions Left: {item.numForwardWarningDirectionsLeft}</p>
                                        </li>
                                        <li>
                                            <p>Forward Warning Directions Right: {item.numForwardWarningDirectionsRight}</p>
                                        </li>
                                    </h6>
                                </ul>
                                <p style={{ color: 'blueviolet' }}>Lane Departure Warnings: {item.laneDepartureWarningCount}</p>
                                <ul>
                                    <h6>
                                        <li>
                                            <p>Left Lane Departures: {item.numLeftLaneDeparture}</p>
                                        </li>
                                        <li>
                                            <p>Right Lane Departures: {item.numRightLaneDeparture}</p>
                                        </li>
                                    </h6>
                                </ul>
                            </h5>
                        </div>
                    </Space>
                </List.Item>
            )}
        />

    </>
    );
};

export default StatisticsOfTrip;