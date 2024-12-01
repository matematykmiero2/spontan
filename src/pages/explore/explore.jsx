import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./explore.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { getEventsForMap } from "../../functions";
import Button from "@mui/material/Button";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import eventTile from "../../Components/eventTile";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const MapComponent = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(userLocation || [51.1086, 17.0309]);
  }, [userLocation, map]);
};

const homeIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

  `),
  iconSize: [30, 30],
});

const eventIcon = new Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clip-rule="evenodd"/>
</svg>

  `),
  iconSize: [30, 30],
});

const groupEventsByLocation = (events) => {
  const groupedEvents = {};

  events &&
    events.forEach((event) => {
      const key = `${event.Latitude},${event.Longitude}`;
      if (!groupedEvents[key]) {
        groupedEvents[key] = [];
      }
      groupedEvents[key].push(event);
    });

  return Object.entries(groupedEvents).map(([key, events]) => {
    const [lat, lng] = key.split(",");
    return { lat, lng, events };
  });
};

const Map = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState();
  const [events, setEvents] = useState([]);
  const [time, setTime] = useState();
  const { t } = useTranslation();
  const [bounds, setBounds] = useState({
    neLat: 51.157923237343425,
    neLng: 17.066230773925785,
    swLat: 51.05930741068962,
    swLng: 16.995506286621097,
  });
  const [showSearchIcon, setShowSearchIcon] = useState(false);
  const UseMapBounds = () => {
    const map = useMap();

    useMapEvents({
      moveend: async () => {
        const zoom = map.getZoom();
        const mapBounds = map.getBounds();
        const northEast = mapBounds.getNorthEast();
        const southWest = mapBounds.getSouthWest();
        //console.log(zoom);

        const increaseBoundsByHalfKilometer = (northEast, southWest) => {
          const KM_TO_DEGREES_LAT = 1 / 111.32;
          const KM_TO_DEGREES_LNG =
            1 / (111.32 * Math.cos((northEast.lat * Math.PI) / 180));

          const additionalLat = 0.5 * KM_TO_DEGREES_LAT;
          const additionalLng = 0.5 * KM_TO_DEGREES_LNG;

          const newNorthEast = {
            lat: northEast.lat + additionalLat,
            lng: northEast.lng + additionalLng,
          };
          const newSouthWest = {
            lat: southWest.lat - additionalLat,
            lng: southWest.lng - additionalLng,
          };

          return {
            neLat: newNorthEast.lat,
            neLng: newNorthEast.lng,
            swLat: newSouthWest.lat,
            swLng: newSouthWest.lng,
          };
        };

        const bounds = increaseBoundsByHalfKilometer(northEast, southWest);
        setBounds(bounds);

        if (zoom > 12) {
          setShowSearchIcon(false);
          setEvents(await getEventsForMap(bounds, time));
        } else {
          setShowSearchIcon(true);
        }

        if (zoom < 8) {
          map.setZoom(8);
        }
      },
    });

    return null;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEventsForMap(bounds);
      setEvents(response);
    };

    fetchEvents();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
  };

  const groupedEvents = groupEventsByLocation(events);

  return (
    <div className="leaflert-container">
      <MyLocationIcon
        sx={{ fontSize: 40, cursor: "pointer" }}
        id="mapButton"
        onClick={getUserLocation}
      />

      {showSearchIcon && (
        <div
          style={{
            position: "absolute",
            bottom: "6vh",
            right: "1vh",
            padding: "10px",
            zIndex: 10000,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transform: "translateX(-50%)",
            left: "50%",
            fontWeight: "bold",
            fontSize: "16px",
            color: "#333",
          }}
          id="mapMessage"
        >
          {t("Zoom in to search in this area")}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: "1vh",
          right: "1vw",
          padding: "10px",
          zIndex: 10000,
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          textAlign: "center",

          fontWeight: "bold",
          fontSize: "16px",
          color: "#333",
        }}
      >
        <Stack direction="row">
          <Button
            variant={!time ? `contained` : `text`}
            onClick={() => setTime()}
          >
            {t("All")}
          </Button>
          <Button
            variant={time === "today" ? `contained` : `text`}
            onClick={() => setTime("today")}
          >
            {t("Today")}
          </Button>
          <Button
            variant={time === "week" ? `contained` : `text`}
            onClick={() => setTime("week")}
          >
            {t("In 7 days")}
          </Button>
        </Stack>
      </div>

      <MapContainer
        center={[51.1086, 17.0309]}
        zoom={13}
        maxZoom={18}
        minZoom={8}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && (
          <Marker position={userLocation} icon={homeIcon}></Marker>
        )}
        {groupedEvents.map(({ lat, lng, events }) => (
          <Marker key={`${lat}-${lng}`} position={[lat, lng]} icon={eventIcon}>
            <Popup>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {events.map((event) => (
                  <div key={event.id}>
                    <h3
                      style={{ color: "#3F48CC" }}
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      {event.name}
                    </h3>
                    <h4 style={{ color: "gray" }}>
                      {event.date} {event.start_time.slice(0, -3)}
                    </h4>
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}

        <UseMapBounds />
        <MapComponent userLocation={userLocation} />
      </MapContainer>
    </div>
  );
};

export default Map;
