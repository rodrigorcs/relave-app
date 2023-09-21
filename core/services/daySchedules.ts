import { daySchedulesRepository } from "../repositories/daySchedules"
import { IDate } from "../../components/appointment"
import { EDateFormats, dayjs } from '../../utils/dayjs';

const bitStringToTimeArray = (bitString: string, intervalMinutes: number): string[] => {
  return bitString.split('')
    .map((bit, index) => (bit === '0' ? dayjs().startOf('day').add(index * intervalMinutes, 'minute').format(EDateFormats.TIME_ID) : null))
    .filter(time => time !== null) as string[];
}

export const daySchedulesService = {
  getAvailableTimesByDate: async (dateId: IDate['id']): Promise<string[]> => {
    const daySchedule = await daySchedulesRepository.getOneDaySchedule(dateId)
    const times = bitStringToTimeArray(daySchedule.busyTimes, 30);

    return times
  }
}