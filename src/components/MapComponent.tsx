import React from "react";

import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
function MapComponent() {
  const position = { lat: 43.795719146728516, lng: -79.43389892578125 }; // Nola Salon, Thornhill, ON
  return (
    <APIProvider apiKey={apiKey}>
      <Map center={position} zoom={5} style={{ width: "40%", height: "400px" }}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default MapComponent;
