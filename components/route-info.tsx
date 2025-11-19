import { Clock, Navigation, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RouteInfoProps {
  routeData: any
}

export function RouteInfo({ routeData }: RouteInfoProps) {
  if (!routeData || !routeData.routes || routeData.routes.length === 0) {
    return null
  }

  const route = routeData.routes[0]
  const distanceKm = (route.distance / 1000).toFixed(2)
  const durationMin = Math.round(route.duration / 60)
  
  const startPoint = routeData.waypoints?.[0]
  const endPoint = routeData.waypoints?.[1]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detail Perjalanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Navigation className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Jarak Tempuh</p>
              <p className="text-xl font-bold">{distanceKm} km</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Clock className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Estimasi Waktu</p>
              <p className="text-xl font-bold">{durationMin} menit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {startPoint && endPoint && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lokasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-1" />
              <div>
                <p className="font-medium">Titik Awal</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {startPoint.location[1].toFixed(6)}, {startPoint.location[0].toFixed(6)}
                </p>
              </div>
            </div>
            
            <div className="relative pl-2.5 py-2">
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border border-l border-dashed" />
            </div>

            <div className="flex gap-3">
              <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-1" />
              <div>
                <p className="font-medium">Tujuan</p>
                <p className="text-sm text-muted-foreground font-mono">
                  {endPoint.location[1].toFixed(6)}, {endPoint.location[0].toFixed(6)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{endPoint.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
