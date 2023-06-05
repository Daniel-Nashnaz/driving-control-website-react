import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    HIGH_LEVEL, HIGH_LEVEL_COLLISIONS_OF_HUMAN_GREEN, HIGH_LEVEL_COLLISIONS_OF_HUMAN_RED,
    HIGH_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN,
    HIGH_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED, HIGH_LEVEL_SUDDEN_BRAKIMG_GREEN,
    HIGH_LEVEL_SUDDEN_BRAKIMG_RED, LOW_LEVEL, LOW_LEVEL_COLLISIONS_OF_HUMAN_GREEN,
    LOW_LEVEL_COLLISIONS_OF_HUMAN_RED, LOW_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN,
    LOW_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED, LOW_LEVEL_SUDDEN_BRAKIMG_GREEN,
    LOW_LEVEL_SUDDEN_BRAKIMG_RED, MEDIUM_LEVEL, MEDIUM_LEVEL_COLLISIONS_OF_HUMAN_GREEN, MEDIUM_LEVEL_COLLISIONS_OF_HUMAN_RED,
    MEDIUM_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN,
    MEDIUM_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED,
    MEDIUM_LEVEL_SUDDEN_BRAKIMG_GREEN, MEDIUM_LEVEL_SUDDEN_BRAKIMG_RED
} from '../common/constants';
import StatisticService from '../services/statistic.service';

const checkThreshold = (value, redThreshold, greenThreshold) => {
    if (value > redThreshold) {
        return 'red';
    } else if (value < greenThreshold) {
        return 'green';
    } else {
        return 'orange';
    }
};

const commonNames = [
    'TotalNumLeftLaneDeparture',
    'TotalNumRightLaneDeparture',
    'TotalNumForwardWarningDirectionsUp',
    'TotalNumForwardWarningDirectionsLeft',
    'TotalNumForwardWarningDirectionsRight',
    'TotalNumTimesExceededSpeedLimit'
];


const BarChartOfUser = (props) => {
    const {onCardChange , userId} =props;

    const [level, setLevel] = useState(null);
    const [dataFromDb, setDataFromDb] = useState({});
    useEffect(() => {
        fetchData();

    }, []);



    const fetchData = async () => {
        StatisticService.getAllStatistic(userId).then(
            (response) => {
                const data = response.data;
                setLevel(data.level[0].alertLevel)
                setDataFromDb(data.allStatistic[0])
                const newCard = {
                    totalTrips: data.countTrips,
                    averageTrips: data.allStatistic[0].averageTripScore.toFixed(2),
                    averageSpeeds:data.allStatistic[0].averageSpeed.toFixed(2),
                    report:data.report,
                  };
                  onCardChange(newCard);

                //add avg speed and trips 
                //add level of user
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

    const getBackgroundColor = (context) => {
        const name = chartData.labels[context.dataIndex];
        const value = context.dataset.data[context.dataIndex];


        if (level === LOW_LEVEL) {
            if (name === 'TotalSuddenBrakingCount') {
                return checkThreshold(value, LOW_LEVEL_SUDDEN_BRAKIMG_RED, LOW_LEVEL_SUDDEN_BRAKIMG_GREEN);
            } else if (commonNames.includes(name)) {
                return checkThreshold(
                    value,
                    LOW_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED,
                    LOW_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN
                );
            } else if (name === 'TotalPedestrianAndCyclistCollisionWarningCount') {
                return checkThreshold(value, LOW_LEVEL_COLLISIONS_OF_HUMAN_RED, LOW_LEVEL_COLLISIONS_OF_HUMAN_GREEN);
            }

        } else if (level === MEDIUM_LEVEL) {
            if (name === 'TotalSuddenBrakingCount') {
                return checkThreshold(value, MEDIUM_LEVEL_SUDDEN_BRAKIMG_RED, MEDIUM_LEVEL_SUDDEN_BRAKIMG_GREEN);
            } else if (commonNames.includes(name)) {
                return checkThreshold(
                    value,
                    MEDIUM_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED,
                    MEDIUM_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN
                );
            } else if (name === 'TotalPedestrianAndCyclistCollisionWarningCount') {
                return checkThreshold(value, MEDIUM_LEVEL_COLLISIONS_OF_HUMAN_RED, MEDIUM_LEVEL_COLLISIONS_OF_HUMAN_GREEN);
            }
        } else if (level === HIGH_LEVEL) {
            if (name === 'TotalSuddenBrakingCount') {
                return checkThreshold(value, HIGH_LEVEL_SUDDEN_BRAKIMG_RED, HIGH_LEVEL_SUDDEN_BRAKIMG_GREEN);
            } else if (commonNames.includes(name)) {
                return checkThreshold(
                    value,
                    HIGH_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_RED,
                    HIGH_LEVEL_SPEED_OR_LANE_OR_COLLISIONS_OF_VEHICLE_GREEN
                );
            } else if (name === 'TotalPedestrianAndCyclistCollisionWarningCount') {
                return checkThreshold(value, HIGH_LEVEL_COLLISIONS_OF_HUMAN_RED, HIGH_LEVEL_COLLISIONS_OF_HUMAN_GREEN);
            }
        }
    };



    const chartData = {
        labels: [
            'TotalNumLeftLaneDeparture',
            'TotalNumRightLaneDeparture',
            'TotalNumForwardWarningDirectionsUp',
            'TotalNumForwardWarningDirectionsLeft',
            'TotalNumForwardWarningDirectionsRight',
            'TotalNumTimesExceededSpeedLimit',
            'TotalPedestrianAndCyclistCollisionWarningCount',
            'TotalSuddenBrakingCount',
        ],
        datasets: [
            {
                label: 'Total Warnings',
                data: [
                    dataFromDb.totalNumLeftLaneDeparture,
                    dataFromDb.totalNumRightLaneDeparture,
                    dataFromDb.totalNumForwardWarningDirectionsUp,
                    dataFromDb.totalNumForwardWarningDirectionsLeft,
                    dataFromDb.totalNumForwardWarningDirectionsRight,
                    dataFromDb.totalNumTimesExceededSpeedLimit,
                    dataFromDb.totalPedestrianAndCyclistCollisionWarningCount,
                    dataFromDb.totalSuddenBrakingCount,
                ],
                backgroundColor: getBackgroundColor,
                borderWidth: 2,

            },
        ],
    };

    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Bar chart showing the total number of Warnings.',
            font: {
              size: 20
            },
            color:'lightskyblue'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 10
            }
          }
        }
      };
    return (<>
        <div >
            <Bar data={chartData} options={options} />
        </div>
    </>);
};

export default BarChartOfUser;
