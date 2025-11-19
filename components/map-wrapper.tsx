'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MapWrapper() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/map-view'),
    { 
      loading: () => <div className="h-full w-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground">Loading Map...</div>,
      ssr: false 
    }
  ), [])

  return <Map />
}
