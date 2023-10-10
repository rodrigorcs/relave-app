import { Endpoints } from '../../models/constants/Endpoints'
import { httpClient } from '../../utils/httpClient'

export const daySchedulesService = {
  getAvailableTimesByDate: async (dateId: string, duration: number) => {
    try {
      const { data: availableTimes } = await httpClient.get(Endpoints.GET_ORDERS_AVAILABILITY, {
        params: {
          dateId, duration
        }
      })
      return availableTimes

    } catch (error) {
      console.error(error)
    }
  },
}
