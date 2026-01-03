'use client'

import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false })

interface ILocation {
  latitude: number
  longitude: number
}

interface Iprops {
  userLocation: ILocation
  deliveryBoyLocation?: ILocation
}

export default function LiveMap(props: Iprops) {
  return <MapComponent {...props} />
}
