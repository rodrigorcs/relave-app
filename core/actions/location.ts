import { Endpoints } from "../../models/constants/Endpoints"
import { TGoogleMapsPlaceResult } from "../../models/contracts/external/googleMaps"
import { httpClient } from "../../utils/httpClient"
import { Config } from '../../models/constants/Config'
import { AxiosResponse } from "axios"


export const locationActions = {
  getNearbyPlaces: async (searchInput: string) => {
    const res = await httpClient.get(Endpoints.GOOGLE_MAPS_TEXTSEARCH, {
      params: {
        query: searchInput,
        location: '-12.9811756,-38.4648224',
        radius: '30000',
        language: 'pt-BR',
        region: 'br',
        key: Config.GOOGLE_CLOUD_IOS_API_KEY
      }
    }) as AxiosResponse<{ results: TGoogleMapsPlaceResult[] }>
    return res.data.results
  },
}