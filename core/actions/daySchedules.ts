import { daySchedulesService } from "../services/daySchedules";

export const daySchedulesAction = {
  getByDate: daySchedulesService.getAvailableTimesByDate,
}