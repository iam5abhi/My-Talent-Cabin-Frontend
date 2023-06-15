// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import L from 'leaflet';

// function Test() {
//   const mapCenter = [20.5937, 78.9629]; // India coordinates
//   const mapZoom = 6;

//   // Custom icon with blue marker
//   const customIcon = L.icon({
//     iconUrl: 'marker.png',
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//     className: 'custom-marker',
//   });

//   return (
//     <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
//     <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%',}}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
//       />
//       <Marker position={mapCenter} icon={customIcon}></Marker>
//     </MapContainer>
//   </div>
//   );
// }

// export default Test;
