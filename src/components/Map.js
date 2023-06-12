import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';

const Map = ({ data }) => {

  useEffect(() => {
    try {
      
  
    if (data.length === 0) {
      return; // Return if data is empty
    }
    // Initialize the map
    const map = L.map('map').setView([data[0].latitude, data[0].longitude], 18);

    // Add the tile layer
    // Add the tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
      maxZoom: 20,
    }).addTo(map);

    // Add the route as a travel route
    const waypoints = data.map((point) => L.latLng(point.latitude, point.longitude));
    L.Routing.control({
      waypoints,
      lineOptions: { styles: [{ color: "blue", opacity: 0.7, weight: 5 }] },
      addWaypoints: false,
      draggableWaypoints: false,
      collapsed: false,
    }).addTo(map);

    // Add markers for events
    data.forEach((point) => {
      //marker of sudden Braking
      if (point.suddenBraking) {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Sudden braking");
      }
      //marker of sudden Braking
      if (point.forwardWarningDirections !== "Good") {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Forward warning directions");
      }
      //marker of forward warning distance
      if (point.forwardWarningDistance !== "Ok") {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Forward warning distance");
      }
      //marker of lane departure warning
      if (point.laneDepartureWarning !== "Good") {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Lane departure warning");
      }
      //marker of Pedestrian and cyclist collision warning
      if (point.pedestrianAndCyclistCollisionWarning !== "Ok") {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Pedestrian and cyclist collision warning");
      }
      //marker of Exceeding the speed limit
      if (point.currentSpeed > point.speedAllowed + 10) {
        L.marker([point.latitude, point.longitude], { icon: L.icon({ iconUrl: "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-yellow.png", iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }) }).addTo(map).bindPopup("Time from begin trip: "+point.timeFromStart +"<br>Exceeding the speed limit");
      }
    });

    L.circleMarker([data[0].latitude, data[0].longitude], {
      radius: 6,
      color: 'black',
      fillColor: 'black',
      fillOpacity: 1
    }).addTo(map).bindPopup(`Start time: ${data[0].timeFromStart}`);
    
    L.circleMarker([data[data.length - 1].latitude, data[data.length - 1].longitude], {
      radius: 6,
      color: 'black',
      fillColor: 'black',
      fillOpacity: 1
    }).addTo(map).bindPopup(`End time: ${data[data.length - 1].timeFromStart}`);
  } catch (error) {
      console.error(error);
  }
  }, [data]);

  return <div id="map" style={{
    width: '80%',
    height: '600px',
  }}></div>;
};

export default Map;