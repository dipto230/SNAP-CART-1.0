'use client'

import React, { useEffect } from 'react'
import L, { LatLngExpression } from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function Recenter({ positions }: { positions: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    if (positions[0] !== 0 && positions[1] !== 0) {
      map.setView(positions, map.getZoom(), {
        animate:true
      })
    }
  },[positions, map])
  return null
}

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
      <Recenter positions={center as any}/>
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
