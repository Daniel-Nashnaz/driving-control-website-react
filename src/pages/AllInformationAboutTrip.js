import React from "react";
const data = [
    {
        "id": 1645,
        "tripID": 164,
        "timeFromStart": "00h:00m:05s",
        "latitude": 32.992129,
        "longitude": 35.6919,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 100,
        "currentSpeed": 93,
        "distanceTraveledMile": 0.23
    },
    {
        "id": 1646,
        "tripID": 164,
        "timeFromStart": "00h:00m:10s",
        "latitude": 32.9914,
        "longitude": 35.692943,
        "forwardWarningDirections": "Left",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Left",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 30,
        "currentSpeed": 58,
        "distanceTraveledMile": 0.46
    },
    {
        "id": 1647,
        "tripID": 164,
        "timeFromStart": "00h:00m:15s",
        "latitude": 32.991122,
        "longitude": 35.693367,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Left",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 20,
        "currentSpeed": 54,
        "distanceTraveledMile": 0.6
    },
    {
        "id": 1648,
        "tripID": 164,
        "timeFromStart": "00h:00m:20s",
        "latitude": 32.990529,
        "longitude": 35.693138,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 110,
        "currentSpeed": 86,
        "distanceTraveledMile": 0.69
    },
    {
        "id": 1649,
        "tripID": 164,
        "timeFromStart": "00h:00m:25s",
        "latitude": 32.989465,
        "longitude": 35.693107,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Left",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 20,
        "currentSpeed": 58,
        "distanceTraveledMile": 1.07
    },
    {
        "id": 1650,
        "tripID": 164,
        "timeFromStart": "00h:00m:30s",
        "latitude": 32.988661,
        "longitude": 35.693278,
        "forwardWarningDirections": "Right",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Right",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 60,
        "currentSpeed": 12,
        "distanceTraveledMile": 1.28
    },
    {
        "id": 1651,
        "tripID": 164,
        "timeFromStart": "00h:00m:35s",
        "latitude": 32.987714,
        "longitude": 35.693244,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 20,
        "currentSpeed": 52,
        "distanceTraveledMile": 1.67
    },
    {
        "id": 1652,
        "tripID": 164,
        "timeFromStart": "00h:00m:40s",
        "latitude": 32.987701,
        "longitude": 35.693153,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Left",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 70,
        "currentSpeed": 32,
        "distanceTraveledMile": 1.97
    },
    {
        "id": 1653,
        "tripID": 164,
        "timeFromStart": "00h:00m:45s",
        "latitude": 32.988386,
        "longitude": 35.691292,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 50,
        "currentSpeed": 29,
        "distanceTraveledMile": 2.27
    },
    {
        "id": 1654,
        "tripID": 164,
        "timeFromStart": "00h:00m:50s",
        "latitude": 32.989409,
        "longitude": 35.688795,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 70,
        "currentSpeed": 33,
        "distanceTraveledMile": 2.5
    },
    {
        "id": 1655,
        "tripID": 164,
        "timeFromStart": "00h:00m:55s",
        "latitude": 32.989465,
        "longitude": 35.688651,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 40,
        "currentSpeed": 20,
        "distanceTraveledMile": 2.88
    },
    {
        "id": 1656,
        "tripID": 164,
        "timeFromStart": "00h:01m:00s",
        "latitude": 32.989504,
        "longitude": 35.688174,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Left",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": true,
        "speedAllowed": 60,
        "currentSpeed": 35,
        "distanceTraveledMile": 3.32
    },
    {
        "id": 1657,
        "tripID": 164,
        "timeFromStart": "00h:01m:05s",
        "latitude": 32.990033,
        "longitude": 35.685804,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 70,
        "currentSpeed": 50,
        "distanceTraveledMile": 3.82
    },
    {
        "id": 1658,
        "tripID": 164,
        "timeFromStart": "00h:01m:10s",
        "latitude": 32.990104,
        "longitude": 35.685785,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 50,
        "currentSpeed": 36,
        "distanceTraveledMile": 3.84
    },
    {
        "id": 1659,
        "tripID": 164,
        "timeFromStart": "00h:01m:15s",
        "latitude": 32.990782,
        "longitude": 35.685867,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Right",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 120,
        "currentSpeed": 90,
        "distanceTraveledMile": 4.01
    },
    {
        "id": 1660,
        "tripID": 164,
        "timeFromStart": "00h:01m:20s",
        "latitude": 32.993077,
        "longitude": 35.686247,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 30,
        "currentSpeed": 11,
        "distanceTraveledMile": 4.51
    },
    {
        "id": 1661,
        "tripID": 164,
        "timeFromStart": "00h:01m:25s",
        "latitude": 32.994407,
        "longitude": 35.686492,
        "forwardWarningDirections": "Right",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "2.326",
        "suddenBraking": false,
        "speedAllowed": 40,
        "currentSpeed": 22,
        "distanceTraveledMile": 5.0
    },
    {
        "id": 1662,
        "tripID": 164,
        "timeFromStart": "00h:01m:30s",
        "latitude": 32.995539,
        "longitude": 35.687176,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Right",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 60,
        "currentSpeed": 26,
        "distanceTraveledMile": 5.17
    },
    {
        "id": 1663,
        "tripID": 164,
        "timeFromStart": "00h:01m:35s",
        "latitude": 32.995547,
        "longitude": 35.68726,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Right",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 50,
        "currentSpeed": 21,
        "distanceTraveledMile": 5.5
    },
    {
        "id": 1664,
        "tripID": 164,
        "timeFromStart": "00h:01m:40s",
        "latitude": 32.995604,
        "longitude": 35.687324,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 60,
        "currentSpeed": 41,
        "distanceTraveledMile": 5.8
    },
    {
        "id": 1665,
        "tripID": 164,
        "timeFromStart": "00h:01m:45s",
        "latitude": 32.995676,
        "longitude": 35.687327,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": true,
        "speedAllowed": 50,
        "currentSpeed": 64,
        "distanceTraveledMile": 5.98
    },
    {
        "id": 1666,
        "tripID": 164,
        "timeFromStart": "00h:01m:50s",
        "latitude": 32.995737,
        "longitude": 35.687268,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 70,
        "currentSpeed": 55,
        "distanceTraveledMile": 6.17
    },
    {
        "id": 1667,
        "tripID": 164,
        "timeFromStart": "00h:01m:55s",
        "latitude": 32.995751,
        "longitude": 35.687197,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 60,
        "currentSpeed": 47,
        "distanceTraveledMile": 6.55
    },
    {
        "id": 1668,
        "tripID": 164,
        "timeFromStart": "00h:02m:00s",
        "latitude": 32.99686,
        "longitude": 35.686033,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": true,
        "speedAllowed": 40,
        "currentSpeed": 38,
        "distanceTraveledMile": 6.74
    },
    {
        "id": 1669,
        "tripID": 164,
        "timeFromStart": "00h:02m:13s",
        "latitude": 32.997,
        "longitude": 35.686,
        "forwardWarningDirections": "Good",
        "forwardWarningDistance": null,
        "laneDepartureWarning": "Good",
        "pedestrianAndCyclistCollisionWarning": "Ok",
        "suddenBraking": false,
        "speedAllowed": 30,
        "currentSpeed": 25,
        "distanceTraveledMile": 7.11
    }
];
const AllInfromationAboutTrip = () => {

        return (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Forward Warning Directions</th>
                <th>Lane Departure Warning</th>
                <th>Pedestrian and Cyclist Collision Warning</th>
                <th>Sudden Braking</th>
                <th>Speed Allowed</th>
                <th>Current Speed</th>
                <th>Distance Traveled Mile</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.timeFromStart}</td>
                  <td>{item.latitude}</td>
                  <td>{item.longitude}</td>
                  <td>{item.forwardWarningDirections}</td>
                  <td>{item.laneDepartureWarning}</td>
                  <td>{item.pedestrianAndCyclistCollisionWarning}</td>
                  <td>{item.suddenBraking ? 'Yes' : 'No'}</td>
                  <td>{item.speedAllowed}</td>
                  <td>{item.currentSpeed}</td>
                  <td>{item.distanceTraveledMile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      


};


export default AllInfromationAboutTrip;