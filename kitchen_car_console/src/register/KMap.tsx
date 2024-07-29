import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function App() {
  const [position, setPosition] = useState([0, 0]);

  const handleClick = (e) => {
    setPosition([e.latlng.lat, e.latlng.lng]);
    console.log("緯度: " + e.latlng.lat + ", 経度: " + e.latlng.lng);
    alert("緯度: " + e.latlng.lat + ", 経度: " + e.latlng.lng);
  };

  return (
    <div className="App">
      <h2>地図をタップして緯度経度を取得する</h2>
      <MapContainer center={[0, 0]} zoom={3} style={{ height: "400px", width: "100%" }} onClick={handleClick}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>この場所をクリックしました</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;