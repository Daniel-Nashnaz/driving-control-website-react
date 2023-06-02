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
/*
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
*/
/*
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5', 'Trip 6', 'Trip 7'],
  datasets: [
    {
      label: 'Mild',
      data: [3, 2, 5, 4, 1, 2, 3],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: 'Moderate',
      data: [2, 1, 3, 2, 4, 2, 1],
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    },
    {
      label: 'Severe',
      data: [1, 0, 2, 1, 3, 0, 2],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
      tension: 0.1
    }
  ]
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const Dashboard = () => (
  <>
    <div className='header'>
      <h1 className='title'>Sudden Braking Events</h1>
    </div>
    <Line data={data} options={options} />
  </>
);

export default Dashboard;

*/
/*
import { Bar } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const data = {
  labels: ['Label 1', 'Label 2', 'Label 3'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30],
      backgroundColor: 'red'
    },
    {
      label: 'Dataset 2',
      data: [40, 50, 60],
      backgroundColor: 'blue'
    }
  ]
};

const options = {
  scales: {
    yAxes: [
      {
        type: 'custom', // Use your custom scale here
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const Dashboard = () => (
  <Bar data={data} options={options} />
);

export default Dashboard;
*/
/*
import { Bar } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


import { useNavigate } from 'react-router-dom';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const data = {
  labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5',
   'Trip 6', 'Trip 7'],
  datasets: [
    {
      label: '5-10 mph over',
      data: [3, 2, 5, 4, 1, 2, 3],
      backgroundColor: 'rgb(75, 192, 192)'
    },
    {
      label: '10-15 mph over',
      data: [2, 1, 3, 2, 4, 2, 1],
      backgroundColor: 'rgb(255, 99, 132)'
    },
    {
      label: '15+ mph over',
      data: [1, 0, 2, 1, 3, 0, 2],
      backgroundColor: 'rgb(54, 162, 235)'
    }
  ]
};



const SpeedLimitExceededChart = () => {
  const navigate = useNavigate();
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    onClick: (event, elements) => {
      if (elements.length) {
        navigate('/info');
      }
    }
  };
  
  return (
    <>
      <div className='header'>
        <h1 className='title'>Speed Limit Exceeded</h1>
      </div>
      <div style={{ width: '500px', height: '300px' }}>
    <Bar data={data} options={options} />
  </div>
    </>
  );
};

export default SpeedLimitExceededChart;
*/

import React from 'react';
import { Card, Row, Col, Statistic, Alert, Layout, Space } from 'antd';
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
import { Bar, Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DashboardCard from '../components/DashboardCard';
import { Link, useNavigate } from 'react-router-dom';

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

const data = {
  labels: ['Sudden Braking', 'Crossing Lanes Without Signal', 'Exceeding Speed Limit', 'Safe Driving'],
  datasets: [
    {
      data: [10, 5, 15, 70],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + '%';
        return percentage;
      },
      color: '#fff',
    },
  },
};

const lineData = {
  labels: ['2021-01-01', '2021-01-02', '2021-01-03'],
  datasets: [
    {
      label: 'Sudden Braking',
      data: [5, 3, 4],
      borderColor: '#FF6384',
      fill: false,
    },
    {
      label: 'Crossing Lanes Without Signal',
      data: [2, 1, 2],
      borderColor: '#36A2EB',
      fill: false,
    },
    {
      label: 'Exceeding Speed Limit',
      data: [8, 6, 7],
      borderColor: '#FFCE56',
      fill: false,
    },
    {
      label: 'Safe Driving',
      data: [20, 22, 23],
      borderColor: '#4BC0C0',
      fill: false,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'top',
  },
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const scores = [
  {
    avgScores: 100,
    fullName: 'hadar nassi',
    userID: 3
  },
  {
    avgScores: 74.125,
    fullName: 'gadi nassi',
    userID: 2
  }
];

const labelss = scores.map((score) => score.fullName); // Extract fullName values as labels
const dataaa = scores.map((score) => score.avgScores); // Extract avgScores values as data


const dataa = {
  labels: labelss,
  datasets: [

    {
      label: 'Average Of Drivers',
      data: dataaa,
      backgroundColor: 'rgb(54, 162, 235)'
    }
  ]
};



const Dashboard = () => {
  const navigate = useNavigate();

  const handleChartClick = (event, elements) => {
    if (elements.length) {
      const clickedIndex = elements[0].index;
      const clickedUserID = scores[clickedIndex].userID;
      navigate(`/info${clickedUserID}`);
    }
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
      <Header>
        <h1 style={{ color: 'white' }}>Driver Behavior Dashboard</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Link to={"/test"}>
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
                title={"Lest Trips"}
                value={2}
              />
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/test"}>
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
                value={20}
              />
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/test"}>
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
                title={"Total Trips"}
                value={6}
              />
            </Link>
          </Col>
          <Col span={6}>
            <Link to={"/test"}>
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
                title={"Total Vehicle"}
                value={6}
              />
            </Link>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '50px' }}>
          {/* <Col span={12}>
            <Card>
              <Pie data={data} options={options} />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Line data={lineData} options={lineOptions} />
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
          </Col> */}
          <div style={{ width: '750px', height: '550px' }}>

            <Bar data={dataa} options={options} />
          </div>
        </Row>
      </Content>
    </Layout>
  );
};



export default Dashboard;
