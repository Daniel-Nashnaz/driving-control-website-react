/*import React from 'react';
import { Pie } from 'react-chartjs-2';

const generateColors = (numColors) => {
  const colors = [];
  const goldenRatio = 0.618033988749895;
  let hue = Math.random();
  for (let i = 0; i < numColors; i++) {
    hue += goldenRatio;
    hue %= 1;
    const color = `hsl(${Math.floor(hue * 360)}, 80%, 60%)`;
    colors.push(color);
  }
  return colors;
};

const PieChartOfUser = ({ data ,title}) => {
  const labels = Object.keys(data);
  const values = Object.values(data);


  const colors = generateColors(labels.length);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },
    },
  };


  return <Pie data={chartData} options={chartOptions} />;
};
*/

import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartOfUser = ({ data, title }) => {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((sum, value) => sum + value, 0);

  const generateColors = (numColors) => {
    const colors = [];
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();
    for (let i = 0; i < numColors; i++) {
      hue += goldenRatio;
      hue %= 1;
      const color = `hsl(${Math.floor(hue * 360)}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  };

  const colors = generateColors(labels.length);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        fontSize: 20,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `Sum warning:${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (<>
    <h4 style={{ textAlign: 'center' }}>Total warning: {total}</h4>
    <Pie data={chartData} options={chartOptions} />

  </>);
};

export default PieChartOfUser;

