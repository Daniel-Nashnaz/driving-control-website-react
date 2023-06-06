import React, { useEffect, useState } from 'react';

import Title from 'antd/es/typography/Title';
import {  useParams } from 'react-router-dom';
import BarChartOfUser from '../components/BarChartOfUser';
import DashboardCard from '../components/DashboardCard';
import {
  ExclamationCircleTwoTone,
  FundTwoTone,
  CarTwoTone,
} from "@ant-design/icons";
import { Col } from 'antd';
import AlertReport from '../components/AlertReport';
import LineChart from '../components/LineChartOfUser';
import StatisticService from '../services/statistic.service';
import PieChartOfUser from '../components/PieChartOfUser';


const DriverDashboard = () => {

  const { userId, fullName } = useParams();
  const [totalTrips, setTotalTrips] = useState(0);
  const [averageTrips, setAverageTrips] = useState(0);
  const [AverageSpeeds, setAverageSpeeds] = useState(0);
  const [reportOfUser, setReportOfUser] = useState("");
  const [dataOfBarChartFromDb, setDataOfBarChartFromDb] = useState({});
  const [dataOfPieChartCollision, setDataOfPieChartCollision] = useState({});
  const [dataOfPieChartLane, setDataOfPieChartLane] = useState({});

  const [levelAlert, setLevelAlert] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    StatisticService.getAllStatistic(userId).then(
      (response) => {
        try {
          const data = response.data;
          setDataOfPieChartCollision({
            "Forward Warning Directions Right": data.allStatistic[0].totalNumForwardWarningDirectionsRight,
            "Forward Warning Directions Up": data.allStatistic[0].totalNumForwardWarningDirectionsUp,
            "Forward Warning Directions Left": data.allStatistic[0].totalNumForwardWarningDirectionsLeft,
            "Pedestrian And Cyclist Collision Warning": data.allStatistic[0].totalPedestrianAndCyclistCollisionWarningCount,
          });
          setDataOfPieChartLane({
            "Warning Left Lane Departure": data.allStatistic[0].totalNumLeftLaneDeparture,
            "Warning Right Lane Departure":data.allStatistic[0].totalNumRightLaneDeparture,
          });
          setLevelAlert(data.level[0].alertLevel)
          setDataOfBarChartFromDb(data.allStatistic[0])
          setTotalTrips(data.countTrips);
          setAverageTrips(data.allStatistic[0].averageTripScore.toFixed(2));
          setAverageSpeeds(data.allStatistic[0].averageSpeed.toFixed(2));
          setReportOfUser(data.report);
        } catch (error) {
          console.error(error);
        }
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



  };


  return (<>
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>


      <div style={{ width: 300, marginTop: 80 }}>

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
      <div style={{ textAlign: 'center', width: 950, height: 550, marginRight: 40 }}>
        <Title level={3} style={{ color: 'red', textAlign: 'left' }}>Infromation about the driver: {fullName}</Title>
        <BarChartOfUser level={levelAlert} dataFromDb={dataOfBarChartFromDb} />
      </div>

    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ width: 450, height: 400, flex: 1, marginRight: 10 }}>
        <LineChart userId={userId} />
      </div>
      <div style={{ width: 400, height: 350, flex: 0.5 }}>
        <PieChartOfUser data={dataOfPieChartCollision} title={"Pie Chart showing the warning collisions."} />
      </div>
      <div style={{ width: 400, height: 350, flex: 0.5 }}>
        <PieChartOfUser data={dataOfPieChartLane} title={"Pie Chart showing the warning lane departure."} />
      </div>
    </div>
     <div style={{ marginTop: 10 }}><AlertReport report={reportOfUser} score={averageTrips} /></div> 

  </>);

};





export default DriverDashboard;
