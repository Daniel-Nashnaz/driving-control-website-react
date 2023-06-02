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
