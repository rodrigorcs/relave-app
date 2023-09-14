import { Endpoints } from "../../models/constants/Endpoints"
import { TGoogleMapsAutocompleteResponse } from "../../models/contracts/external/googleMaps"
import { httpClient } from "../../utils/httpClient"
import { Config } from '../../models/constants/Config'
import { AxiosResponse } from "axios"


export const locationActions = {
  getNearbyPlaces: async (searchInput: string) => {
    const res: AxiosResponse<TGoogleMapsAutocompleteResponse> = await httpClient.get(Endpoints.GOOGLE_MAPS_AUTOCOMPLETE, {
      params: {
        input: encodeURIComponent(searchInput),
        location: '-12.9811756,-38.4648224',
        radius: '30000',
        country: 'br',
        language: 'pt-BR',
        key: Config.GOOGLE_CLOUD_IOS_API_KEY
      }
    })
    return res.data
  },
}