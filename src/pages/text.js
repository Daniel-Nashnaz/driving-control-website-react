/*
import React from 'react';
import { Card, Row, Col, Statistic,  Alert, Layout } from 'antd';


const { Header, Content } = Layout;

const data = [
  { behavior: 'Sudden Braking', percentage: 10 },
  { behavior: 'Crossing Lanes Without Signal', percentage: 5 },
  { behavior: 'Exceeding Speed Limit', percentage: 15 },
  { behavior: 'Safe Driving', percentage: 70 },
];

const behaviorConfig = {
  appendPadding: 10,
  data,
  angleField: 'percentage',
  colorField: 'behavior',
  radius: 0.8,
  label: {
    type: 'outer',
    content: '{percentage}',
    offset: -20,
    style: {
      fontSize: 14,
      fontWeight: 'bold',
    },
  },
  interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
};

const lineConfig = {
  data: [
    { date: '2021-01-01', behavior: 'Sudden Braking', frequency: 5 },
    { date: '2021-01-01', behavior: 'Crossing Lanes Without Signal', frequency: 2 },
    { date: '2021-01-01', behavior: 'Exceeding Speed Limit', frequency: 8 },
    { date: '2021-01-01', behavior: 'Safe Driving', frequency: 20 },
    { date: '2021-01-02', behavior: 'Sudden Braking', frequency: 3 },
    { date: '2021-01-02', behavior: 'Crossing Lanes Without Signal', frequency: 1 },
    { date: '2021-01-02', behavior: 'Exceeding Speed Limit', frequency: 6 },
    { date: '2021-01-02', behavior: 'Safe Driving', frequency: 22 },
    { date: '2021-01-03', behavior: 'Sudden Braking', frequency: 4 },
    { date: '2021-01-03', behavior: 'Crossing Lanes Without Signal', frequency: 2 },
    { date: '2021-01-03', behavior: 'Exceeding Speed Limit', frequency: 7 },
    { date: '2021-01-03', behavior: 'Safe Driving', frequency: 23 },
  ],
  xField: 'date',
  yField: 'frequency',
  seriesField: 'behavior',
  yAxis: {
    label: {
      formatter: (v) => `${v} times`,
    },
  },
  legend: {
    position: 'top',
  },
  tooltip: {
    formatter: (datum) => ({
      name: datum.behavior,
      value: `${datum.frequency} times`,
    }),
  },
};

const Dashboard = () => {
  return (
    <Layout>
      <Header>
        <h1 style={{ color: 'white' }}>Driver Behavior Dashboard</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic title="Total Trips" value={50} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Total Distance Traveled" value={500} suffix="km" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Average Speed" value={60} suffix="km/h" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Safe Driving Percentage" value={70} suffix="%" />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '50px' }}>
          <Col span={12}>
            <Card>
              //{/* <Pie {...behaviorConfig} />}
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              {/* <Line{...lineConfig} />}
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '50px' }}>
          <Col span={24}>
            <Alert
              message="Excessive Speed Alert"
              description="The driver exceeded the speed limit by 20 km/h on their last trip."
              type="warning"
              showIcon
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
*/

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: [
        {
          fullName: 'hadar nassi',
          userID: 3,
          avgScores: 100.0,
        },
        {
          fullName: 'gadi nassi',
          userID: 2,
          avgScores: 74.125,
        },
      ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Dashboard() {
  return <Line options={options} data={data} />;
}
