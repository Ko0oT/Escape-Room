import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LeafletMouseEvent } from 'leaflet';
import { COMPANY_LOCATION, COMPANY_LOCATION_ZOOM, DEFAULT_ZOOM } from '../../constants';
import { Location } from '../../types/types';

const defaultCustomIcon = L.icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

const currentCustomIcon = L.icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

type MapProps = {
  locations?: Location[];
  handleSelectedMarkerChange?: (evt: LeafletMouseEvent) => void;
  selectedLocationId?: number | undefined;
}

function Map({locations, handleSelectedMarkerChange, selectedLocationId}: MapProps): JSX.Element {

  function SingleMarker() {
    return (
      <Marker position={COMPANY_LOCATION} icon={defaultCustomIcon}>
      </Marker>
    );
  }

  type ClicableMarkerProps = {
    location: Location;
  }

  function ClicableMarker({location}: ClicableMarkerProps) {
    return (
      <Marker
        position={location.coords}
        icon={selectedLocationId === location.id ? currentCustomIcon : defaultCustomIcon}
        eventHandlers={{
          click: (evt: LeafletMouseEvent) => {
            if (handleSelectedMarkerChange) {
              handleSelectedMarkerChange(evt);
            }
          },
        }}
      >
      </Marker>
    );
  }

  return (
    <MapContainer center={COMPANY_LOCATION} zoom={locations ? DEFAULT_ZOOM : COMPANY_LOCATION_ZOOM} scrollWheelZoom={false} style={{height: '100%'}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {locations ? locations?.map((it) => <ClicableMarker location={it} key={it.id} />) : <SingleMarker />}
    </MapContainer>
  );
}

export default Map;
