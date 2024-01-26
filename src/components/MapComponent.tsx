import React from "react";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
function MapComponent() {
  const position = { lat: 43.79574966430664, lng: -79.43387603759766 }; // Nola Salon, Thornhill, ON
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        center={position}
        zoom={17}
        style={{ maxWidth: "600px", height: "500px" }}
      >
        <Marker position={position} title="Morvarid @ Nola Salon" />
      </Map>
    </APIProvider>
  );
}

export default MapComponent;
