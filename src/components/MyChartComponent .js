/*
import React from 'react';
import { Bar } from 'react-chartjs-2';

const MyChartComponent = () => {
  const data = {
    labels: ['Sudden Stop', 'Attachment', 'Exceeding Speed'],
    datasets: [
      {
        data: [10, 2, 3],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value > 8) {
            return 'red';
          } else if (value >= 5 && value <= 8) {
            return 'orange';
          } else {
            return 'green';
          }
        }
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {

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
 
};

  return <Bar data={data} options={options} />;
};

export default MyChartComponent;
*/
/*
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const data = {
  labels: ['Trip 155', 'Trip 156', 'Trip 157', 'Trip 158', 'Trip 159', 'Trip 160', 'Trip 161', 'Trip 162', 'Trip 163', 'Trip 164'],
  datasets: [
    {
      label: 'Lane Departures',
      backgroundColor: ['red', 'orange', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green'],
      data: [4, 2, 0, 1, 0, 0, 0, 0, 1, 5]
    }
  ]
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    ]
  }
};
const dataa = {
  labels: ['Left', 'Right', 'Forward'],
  datasets: [
    {
      label: 'Warning Directions',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      data: [10, 15, 25]
    }
  ]
};

const optionss = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Distribution of Warning Directions'
  }
};

const MyChartComponent = () => (<>
  <div>
    <h2>Last 10 Trips Quality</h2>
    <Bar data={data} options={options} />
  </div>
   <div>
   <h2>Distribution of Warning Directions</h2>
   <Pie data={data} options={options} />
 </div>
</>);

*/


import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { useParams } from 'react-router-dom';
import BarChartOfUser from './BarChartOfUser';




const dataa = {
  labels: ['Up', 'Left', 'Right'],
  datasets: [
    {
      label: 'Forward Warning Directions',
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      data: [8, 5, 12]
    }
  ]
};

const optionss = {
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: 'Distribution of Forward Warning Directions'
  }
};


const MyChartComponent = () => {

  const { userId } = useParams();


  
  return (<>
    <div>
      <h2>graph of user</h2>
      <BarChartOfUser userId={userId}/>
      <MyChart />
    </div>
    
  </>);
};

const data = {
  labels: ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6'],
  datasets: [
    {
      label: 'Data',
      data: [10, 45, 21, 30, 87, 52],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          stepSize: 10,
          suggestedMax: 100,
        },
      },
    ],
  },
};

const MyChart = () => {
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default MyChartComponent;
