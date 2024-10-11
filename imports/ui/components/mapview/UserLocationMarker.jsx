import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

const UserLocationMarker = ({ userLocation }) => {
  return (
    <Marker
      position={[userLocation.lat, userLocation.lon]}
      icon={L.icon({
        iconUrl: "/user-icon-map.png",
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
      })}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default UserLocationMarker;
// iconUrl: "/user-icon-map.png",
// iconSize: [20, 20],
// iconAnchor: [20, 40],
// popupAnchor: [0, -40],