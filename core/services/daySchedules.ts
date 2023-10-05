import { daySchedulesRepository } from "../repositories/daySchedules"
import { IDate } from "../../components/appointment"
import { EDateFormats, dayjs } from '../../utils/dayjs';

const bitStringToTimeArray = (bitString: string, intervalMinutes: number, duration: number): string[] => {
  const bits = bitString.split('');
  const requiredBits = Math.ceil(duration / intervalMinutes);

  const allDates = bits.map((bit, index) => {
    const availableForDuration = bits.slice(index, index + requiredBits).every(b => b === '0');
    return availableForDuration
      ? dayjs().startOf('day').add(index * intervalMinutes, 'minute').format(EDateFormats.TIME_ID)
      : null;
  });

  const availableDates = allDates.filter(time => time !== null) as string[];
  return availableDates;
}

export const daySchedulesService = {
  getAvailableTimesByDate: async (dateId: IDate['id'], duration: number): Promise<string[]> => {
    const daySchedule = await daySchedulesRepository.getOneDaySchedule(dateId)
    if (!daySchedule) return bitStringToTimeArray('0'.repeat(48), 30, duration);

    const employeesAvailabilities = Object.values(daySchedule.employees).map(schedule => {
      return bitStringToTimeArray(schedule, 30, duration)
    })

    const mergedAvailabilities = ([] as string[]).concat(...employeesAvailabilities);
    const uniqueAvailabilities = [...new Set(mergedAvailabilities)];

    return uniqueAvailabilities
  }
}