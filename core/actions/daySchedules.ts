import { Dayjs } from 'dayjs'
import { dayjsToDate, getTimeId } from '../../utils/dayjs'
import { daySchedulesService } from '../services/daySchedules'

export const daySchedulesAction = {
  getAvailableTimesByDate: daySchedulesService.getAvailableTimesByDate,
  getTimeAvailability: async (date: Dayjs, duration: number) => {
    const { id: dateId } = dayjsToDate(date)
    const availableTimes = await daySchedulesService.getAvailableTimesByDate(dateId, duration)
    const timeIsAvailable = availableTimes.includes(getTimeId(date))

    return timeIsAvailable
  },
}
