import React, { useEffect, useState } from 'react';
import {  Row, Col,  Layout } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    UserOutlined,
    CarOutlined,
    ApiOutlined ,
} from "@ant-design/icons";
import DashboardCard from '../components/DashboardCard';
import { Link, useNavigate } from 'react-router-dom';
import StatisticService from '../services/statistic.service';
import { Footer } from 'antd/es/layout/layout';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const { Header, Content } = Layout;







const TripsDashboard = () => {

    const [scores, setScores] = useState([]);
    const [allVehicle, setAllVehicle] = useState(0);
    const [allTrip, setAllTrip] = useState(0);
    const [allDrivers, setAllDrivers] = useState(0);
    const [avgAll, setAvgAll] = useState(0);

    useEffect(() => {

        StatisticService.getAllScores().then(
            (response) => {
                const data = response.data;
                setAllDrivers(data.allDrivers);
                setAllTrip(data.allTrip);
                setAllVehicle(data.allVehicle);
                setAvgAll(data.avgAll);
                setScores(data.scores);
                //If have setting in system for admin!
                console.log(response.data);

            },
            (error) => {
                const content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                        console.log(content);

            }
        );


    }, []);

    const labels = scores.map((score) => score.fullName); // Extract fullName values as labels
    const columns = scores.map((score) => score.avgScores); // Extract avgScores values as data


    const navigate = useNavigate();

    const handleChartClick = (event, elements) => {
        if (elements.length) {
            const clickedIndex = elements[0].index;
            const clickedUserID = scores[clickedIndex].userID;
            navigate(`/infoAboutDriver/${clickedUserID}`);
        }
    };

    const data = {
        labels: labels,
        datasets: [

            {
                label: 'Average Of Drivers',
                data: columns,
                backgroundColor: 'rgb(54, 162, 235)'
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart Of Average Drivers',
            },
        },
        scales: {
            x: {
                ticks: {
                  font: {
                    size: 18 
                    
                  }
                }
              },
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        },
        onClick: handleChartClick
        
    }
    return (
        <Layout>
            <Content style={{ padding: '50px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Link to={"/travels"}>
                            <DashboardCard
                                icon={
                                    <ApiOutlined 
                                        style={{
                                            backgroundColor: "lightgray",
                                            borderRadius: 20,
                                            fontSize: 24,
                                            padding: 8,
                                        }}
                                    />
                                }
                                title={"Average All Trpis"}
                                value={avgAll}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to={"/userDetails"}>
                            <DashboardCard
                                icon={
                                    <UserOutlined
                                        style={{
                                            backgroundColor: "lightgray",
                                            borderRadius: 20,
                                            fontSize: 24,
                                            padding: 8,
                                        }}
                                    />
                                }
                                title={"Total Drivers"}
                                value={allDrivers}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to={"/"}>
                            <DashboardCard
                                icon={
                                    <CarOutlined                                         style={{
                                            backgroundColor: "lightgray",
                                            borderRadius: 20,
                                            fontSize: 24,
                                            padding: 8,
                                        }}
                                    />
                                }
                                title={"Total Trips"}
                                value={allTrip}
                            />
                        </Link>
                    </Col>
                    <Col span={6}>
                        <Link to={"/addVeicle"}>
                            <DashboardCard
                                icon={
                                    <CarOutlined
                                        style={{
                                            backgroundColor: "lightgray",
                                            borderRadius: 20,
                                            fontSize: 24,
                                            padding: 8,
                                        }}
                                    />
                                }
                                title={"Total Vehicle"}
                                value={allVehicle}
                            />
                        </Link>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '50px' }}>
                    <Bar data={data} options={options} />
                </Row>
                <Footer style={{textAlign:'center'}}>
                    <i><h2 style={{color:'lightgreen'}}>Click on a column to go to the dashboard for that driver</h2></i>
                </Footer>
            </Content>
        </Layout>
    );
};



export default TripsDashboard;
