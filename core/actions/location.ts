import { Config } from '../../models/constants/Config'
import { Endpoints } from '../../models/constants/Endpoints'
import { TGoogleMapsPlaceResult } from '../../models/contracts/externalApi/googleMaps'
import { httpClient } from '../../utils/httpClient'
import { AxiosResponse } from 'axios'
import { isIOS } from '../../utils/platform'

const FALLBACK_LOCATION = [-12.9811756, -38.4648224] // Salvador, Shopping da Bahia

const isLocationValid = ([latitude, longitude]: never[] | readonly [number, number]) => {
  return typeof latitude === 'number' && typeof longitude === 'number'
}

export const locationActions = {
  getNearbyPlaces: async (searchInput: string, location: never[] | readonly [number, number]) => {
    const locationArray = isLocationValid(location) ? location : FALLBACK_LOCATION
    const locationString = locationArray.join(',')

    const res = (await httpClient.get(Endpoints.GOOGLE_MAPS_TEXTSEARCH, {
      params: {
        query: searchInput,
        location: locationString,
        radius: '30000',
        language: 'pt-BR',
        region: 'br',
        key: isIOS ? Config.GOOGLE_CLOUD_IOS_API_KEY : Config.GOOGLE_CLOUD_ANDROID_API_KEY,
      },
    })) as AxiosResponse<{ results: TGoogleMapsPlaceResult[] }>
    return res.data.results
  },
}
