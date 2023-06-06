import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatTime } from '../common/formtar';
import { useNavigate } from 'react-router-dom';
import StatisticService from '../services/statistic.service';


const LineChart = (props) => {
    const { userId } = props;
    const navigate = useNavigate();

    const [scoreData, setScoreData] = useState([]);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        StatisticService.getAllScore(userId).then(
            (response) => {
                try {
                    const data = response.data;
                    setScoreData(data.allScores);
                } catch (error) {
                    console.error(error);
                }
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

    const labels = scoreData.map((data) => formatTime(data.tripStart));
    const dataPoints = scoreData.map((data) => data.tripScore);
    const tripIds = scoreData.map((data) => data.tripId);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Trip Scores',
                data: dataPoints,
                fill: false,
                borderColor: 'blue',
                tension: 0.2,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Line chart showing the total score of trips.',
                font: {
                    size: 25
                },
                color: 'yellow'
            },
            tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const tripScore = tooltipItem.raw;
                    return `Trip Score: ${tripScore}`;
                  },
                  afterLabel: () => 'Click here to get info!',
                },
              },
           
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const tripId = tripIds[elements[0].index];
                navigate(`/tripsummary/${tripId}`);
            }
        },
        scales: {
            y: {
                min: 0,
                max: 100,
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};
export default LineChart;