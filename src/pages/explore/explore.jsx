import React, { useState, useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "./explore.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { Icon } from "leaflet";
const MapComponent = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(userLocation);
  }, [userLocation, map]);
  map.setZoom(18);
};

const homeIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2901/2901609.png",
  iconSize: [30, 30],
});
const Map = () => {
  const [userLocation, setUserLocation] = useState([51.1086, 17.0309]);

  const getUserLocation = () => {
    console.log("click");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          console.log(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <MyLocationIcon
        sx={{ fontSize: 40 }}
        id="mapButton"
        onClick={getUserLocation}
      ></MyLocationIcon>
      <MapContainer
        id="leaflert-container"
        className="markercluster-map"
        center={userLocation}
        zoom={13}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        <Marker position={userLocation} icon={homeIcon}></Marker>
        <MapComponent userLocation={userLocation} />
      </MapContainer>
    </>
  );
};
export default Map;
