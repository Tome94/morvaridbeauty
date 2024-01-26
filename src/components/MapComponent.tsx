import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;
function MapComponent() {
  const position = { lat: 61.2176, lng: -149.8997 }; // Example coordinates (Anchorage, AK)
  console.log(apiKey);
  return (
    <APIProvider apiKey={apiKey}>
      <Map
        center={position}
        zoom={10}
        style={{ width: "40%", height: "400px" }}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}

export default MapComponent;
