import React, {  useState } from 'react';

import Title from 'antd/es/typography/Title';
import { Link, useParams } from 'react-router-dom';
import BarChartOfUser from '../components/BarChartOfUser';
import DashboardCard from '../components/DashboardCard';
import {
    ExclamationCircleTwoTone,
    FundTwoTone,
    CarTwoTone,
  } from "@ant-design/icons";
import { Col, Progress } from 'antd';
import AlertReport from '../components/AlertReport';


const DriverDashboard = () => {

    const { userId,fullName } = useParams();
    const [totalTrips,setTotalTrips] = useState(0);
    const [averageTrips,setAverageTrips] = useState(0);
    const [AverageSpeeds,setAverageSpeeds] = useState(0);
    const [reportOfUser,setReportOfUser ] = useState("");

    const handleCardChange = (data) => {
        setTotalTrips(data.totalTrips);
        setAverageTrips(data.averageTrips);
        setAverageSpeeds(data.averageSpeeds);
        setReportOfUser(data.report);
      }
    


    return (<>
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        

    <div style={{ width:300 ,marginTop:80}}>
   
          <Col span={20} >
              <DashboardCard
                icon={
                    <CarTwoTone 
                    style={{
                      backgroundColor: "lightpink",
                      borderRadius: 20,
                      fontSize: 24,
                      padding: 8,
                    }}
                    />
                }
                title={"Total Trips"}
                value={totalTrips}
              />
          </Col>
          <br></br>
          <Col span={20}>
              <DashboardCard
                icon={
                    <FundTwoTone 
                    style={{
                        backgroundColor: "lightgoldenrodyellow",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Average Score"}
                value={averageTrips}
              />
          </Col>
          <br></br>
          <Col span={20} >
               <DashboardCard
                icon={
                    <ExclamationCircleTwoTone 
                    style={{
                        backgroundColor: "lightslategrey",
                        borderRadius: 20,
                        fontSize: 24,
                        padding: 8,
                    }}
                    />
                }
                title={"Average Speed"}
                value={AverageSpeeds}
              /> 
          </Col>
          <br></br>
          </div>
        <div style={{textAlign:'center' ,width:950,height:550 ,marginRight:40}}>
                <Title level={3} style={{ color: 'red',textAlign:'left' }}>Infromation about the driver: {fullName}</Title>
            <BarChartOfUser onCardChange={handleCardChange} userId={userId} />
        </div>
        
    </div>
    <div style={{marginTop:0}}><AlertReport report={reportOfUser} score={averageTrips}/></div>
   
    </>);
};





export default DriverDashboard;
