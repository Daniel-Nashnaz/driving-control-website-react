import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import EcologyService from '../services/ecology.service';

const MapView = () => {
  const [data, setData] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const response = await EcologyService.getAllEcologyByTripId(180);
        const result = await response.data;
        console.log(result);
      setData(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (map && data) {
      const latlngs = data.map((item) => L.latLng(item.latitude, item.longitude));
      const route = L.Routing.control({
        waypoints: latlngs,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: { styles: [{ color: '#0066ff', weight: 5 }] },
        createMarker: function (i, waypoint, n) {
          return L.marker(waypoint.latLng, {
            icon: L.divIcon({ className: 'my-marker', html: i + 1 }),
          });
        },
      });
      route.addTo(map);
    }
  }, [map, data]);

  const handleMapLoad = (event) => {
    setMap(event.target);
  };

  return (
    <div className='map-container'>
      <div className='map' onLoad={handleMapLoad}>
        {!map && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default MapView;