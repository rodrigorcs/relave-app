import { useState, useEffect } from "react"
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, PermissionStatus, LocationObject } from 'expo-location'

export const useDeviceLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null)

  useEffect(() => {
    const execute = async () => {
      const { status } = await requestForegroundPermissionsAsync()
      if (status !== PermissionStatus.GRANTED) return

      const location = await getCurrentPositionAsync()
      setLocation(location)
    }

    execute()
  }, [])

  if (!location) return []

  const { latitude, longitude } = location.coords

  return [latitude, longitude] as const
}