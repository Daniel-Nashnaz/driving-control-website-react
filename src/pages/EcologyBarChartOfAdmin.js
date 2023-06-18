import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import EcologyService from '../services/ecology.service';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'antd';



const EcologyChartOfAdmin = () => {

    const [data, setData] = useState(null);
    const navigate = useNavigate();

    let name;

    useEffect(() => {
        fetchData();
    }, []);



    const handleBarClick = (event, elements) => {
        if (elements.length > 0) {
            const driverName = chartData.labels[elements[0].index];
            const users = name.filter((item) => item.fullName === driverName);
            const userId =users[0].userId 
            navigate(`/ecologyOfUser/${userId}`)
        }

    };
    const fetchData = async () => {
        const response = await EcologyService.getAllEcologyOfDriversByAdminId();
        const data = response.data;
        setData(data);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const drivers = [...new Set(data.map((item) => item.fullName))];
     name = [...new Set(data.map((item) => ({ fullName: item.fullName, userId: item.userId })))];
    const greenData = drivers.map((driver) =>
        data
            .filter((item) => item.fullName === driver && item.ecologicalType === "Green")
            .reduce((total, item) => total + item.count, 0)
    );
    const orangeData = drivers.map((driver) =>
        data
            .filter((item) => item.fullName === driver && item.ecologicalType === "Orange")
            .reduce((total, item) => total + item.count, 0)
    );
    const redData = drivers.map((driver) =>
        data
            .filter((item) => item.fullName === driver && item.ecologicalType === "Red")
            .reduce((total, item) => total + item.count, 0)
    );

    const chartData = {
        labels: drivers,
        datasets: [
            {
                label: "Green",
                backgroundColor: "green",
                data: greenData
            },
            {
                label: "Orange",
                backgroundColor: "orange",
                data: orangeData
            },
            {
                label: "Red",
                backgroundColor: "red",
                data: redData
            }
        ]
    };



    const options = {
        scales: {
            x: {
                stacked: false,
            },
            y: {
                stacked: false,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
        },
        onClick: handleBarClick
    };
    return (
        <Card title="Driver Warnings by Ecological Type">
        <Row justify="space-between" align="middle">
          <Col >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <div style={{ backgroundColor: "green", width: "1rem", height: "1rem", marginRight: "0.5rem" }}></div>
                <div>Green with passed up to 20 km/h in 5 seconds</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                <div style={{ backgroundColor: "orange", width: "1rem", height: "1rem", marginRight: "0.5rem" }}></div>
                <div>Orange with passed between 20 and 40 km/h in 5 seconds</div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ backgroundColor: "red", width: "1rem", height: "1rem", marginRight: "0.5rem" }}></div>
                <div>Red with passed more than 40 km/h in 5 seconds</div>
              </div>
            </div>
          </Col>
          </Row>
          <Col >
            <Bar data={chartData} options={options} />
          </Col>
        
      </Card>
    );
};
export default EcologyChartOfAdmin;