import { daySchedulesService } from '../services/daySchedules'

export const daySchedulesAction = {
  getAvailableTimesByDate: daySchedulesService.getAvailableTimesByDate,
  getTimeAvailability: async (dateId: string, duration: number) => {
    const availableTimes = await daySchedulesService.getAvailableTimesByDate(dateId, duration)
    const timeIsAvailable = availableTimes.includes(dateId)

    return timeIsAvailable
  },
}
