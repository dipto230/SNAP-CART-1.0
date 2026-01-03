'use client'

import React from 'react'
import L, { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface ILocation {
  latitude: number
  longitude: number
}

interface Iprops {
  userLocation: ILocation
  deliveryBoyLocation?: ILocation
}

export default function MapComponent({
  userLocation,
  deliveryBoyLocation,
}: Iprops) {
  // Icons
  const deliveryBoyIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/1023/1023448.png',
    iconSize: [45, 45],
  })

  const userIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/9984/9984268.png',
    iconSize: [45, 45],
  })

  const center: LatLngExpression = [
    userLocation.latitude,
    userLocation.longitude,
  ]

  const linePosition: LatLngExpression[] =
    deliveryBoyLocation
      ? [
          [userLocation.latitude, userLocation.longitude],
          [deliveryBoyLocation.latitude, deliveryBoyLocation.longitude],
        ]
      : []

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom
      className="w-full h-[500px] rounded-xl overflow-hidden shadow"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User Marker */}
      <Marker
        position={[userLocation.latitude, userLocation.longitude]}
        icon={userIcon}
      >
        <Popup>Delivery Address</Popup>
      </Marker>

      {/* Delivery Boy Marker */}
      {deliveryBoyLocation && (
        <Marker
          position={[
            deliveryBoyLocation.latitude,
            deliveryBoyLocation.longitude,
          ]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy Location</Popup>
        </Marker>
      )}

      {/* Route Line */}
      {linePosition.length === 2 && (
        <Polyline positions={linePosition} />
      )}
    </MapContainer>
  )
}
