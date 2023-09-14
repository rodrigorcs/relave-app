import { Endpoints } from "../../models/constants/Endpoints"
import { TGoogleMapsAutocompletePrediction } from "../../models/contracts/external/googleMaps"
import { httpClient } from "../../utils/httpClient"
import { Config } from '../../models/constants/Config'


export const locationActions = {
  getNearbyPlaces: async (searchInput: string): Promise<TGoogleMapsAutocompletePrediction> => {
    const res: TGoogleMapsAutocompletePrediction = await httpClient.get(Endpoints.GOOGLE_MAPS_AUTOCOMPLETE, {
      params: {
        input: encodeURIComponent(searchInput),
        location: encodeURIComponent('-12.9811756,-38.4648224'),
        radius: '2000',
        types: 'establishment',
        key: Config.GOOGLE_CLOUD_IOS_API_KEY
      }
    })
    return res
  },
}