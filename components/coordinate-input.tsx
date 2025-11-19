import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Navigation, Search } from 'lucide-react'

interface CoordinateInputProps {
  onSearch: (startLat: number, startLng: number, endLat: number, endLng: number) => void
  isLoading: boolean
  defaultValues: {
    startLat: number
    startLng: number
    endLat: number
    endLng: number
  }
}

export function CoordinateInput({ onSearch, isLoading, defaultValues }: CoordinateInputProps) {
  const [startLat, setStartLat] = useState(defaultValues.startLat.toString())
  const [startLng, setStartLng] = useState(defaultValues.startLng.toString())
  const [endLat, setEndLat] = useState(defaultValues.endLat.toString())
  const [endLng, setEndLng] = useState(defaultValues.endLng.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(
      parseFloat(startLat),
      parseFloat(startLng),
      parseFloat(endLat),
      parseFloat(endLng)
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="w-5 h-5" />
          Cari Rute
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-green-600">
              <MapPin className="w-4 h-4" />
              Titik Awal (Latitude, Longitude)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Latitude"
                value={startLat}
                onChange={(e) => setStartLat(e.target.value)}
                type="number"
                step="any"
                required
              />
              <Input
                placeholder="Longitude"
                value={startLng}
                onChange={(e) => setStartLng(e.target.value)}
                type="number"
                step="any"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-red-600">
              <MapPin className="w-4 h-4" />
              Tujuan (Latitude, Longitude)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Latitude"
                value={endLat}
                onChange={(e) => setEndLat(e.target.value)}
                type="number"
                step="any"
                required
              />
              <Input
                placeholder="Longitude"
                value={endLng}
                onChange={(e) => setEndLng(e.target.value)}
                type="number"
                step="any"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              'Memuat Rute...'
            ) : (
              <>
                <Navigation className="w-4 h-4 mr-2" />
                Dapatkan Rute
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
