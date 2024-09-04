import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// URL del ícono por defecto
const defaultIconUrl = '/icon-geobio.png'; // Reemplaza con la URL de tu ícono por defecto
const userIconUrl = '/user-icon-map.png'; // Reemplaza con la URL de un ícono para la ubicación del usuario

const MapView = ({ speciesData, userLocation }) => {
  const center = userLocation ? [userLocation.lat, userLocation.lon] : [3.42158, -76.5205];
  const zoomLevel = 15; // Zoom más cercano para mostrar claramente la ubicación actual

  // Función para crear un ícono personalizado con la imagen de la especie o un ícono por defecto
  const createCustomIcon = (url) => {
    return L.icon({
      iconUrl: url || defaultIconUrl, // Usa el ícono por defecto si no hay imagen disponible
      iconSize: [50, 50], // Ajusta el tamaño de la imagen del marcador
      iconAnchor: [25, 50], // Punto de anclaje del ícono (la base del marcador)
      popupAnchor: [0, -50], // Posición del popup en relación al marcador
      className: 'custom-marker-icon' // Clase para estilizar el ícono si es necesario
    });
  };

  const userIcon = L.icon({
    iconUrl: userIconUrl, // Ícono para la ubicación del usuario
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer center={center} zoom={zoomLevel} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>
            You are here
          </Popup>
        </Marker>
      )}
      {speciesData.map((species) => (
        <Marker
          key={species._id}
          position={[species.latitude, species.longitude]}
          icon={createCustomIcon(species.media?.identifier)} // Asigna el ícono personalizado o por defecto
        >
          <Popup>
            <div>
              <b>{species.scientificName}</b><br />
              <i>{species.family}</i><br />
              <span>Class: {species.class}</span><br />
              <span>Location: {species.verbatimLocality}, {species.stateProvince}</span><br />
              <img 
                src={species.media?.identifier || defaultIconUrl} 
                alt={species.scientificName} 
                style={{ width: "100px", height: "100px", objectFit: "cover" }} 
              /><br />
              <span>Photo by: {species.media?.creator}</span><br />
              <a href={species.media?.references} target="_blank" rel="noopener noreferrer">View on iNaturalist</a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
