import { Dayjs } from "dayjs";
import { daySchedulesService } from "../services/daySchedules";
import { dayjsToDate, getTimeId } from "../../utils/dayjs";

export const daySchedulesAction = {
  getAvailableTimesByDate: daySchedulesService.getAvailableTimesByDate,
  getTimeAvailability: async (date: Dayjs) => {
    const { id: dateId } = dayjsToDate(date)
    const availableTimes = await daySchedulesService.getAvailableTimesByDate(dateId)
    const timeIsAvailable = availableTimes.includes(getTimeId(date))

    return timeIsAvailable
  },
}