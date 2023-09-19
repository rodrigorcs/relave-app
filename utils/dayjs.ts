import dayjs, { Dayjs } from "dayjs";
import { Days } from "../models/constants/Days";
import 'dayjs/locale/pt-br'

export const getRelativeDayOfWeek = (date: Dayjs) => {
  const today = dayjs().startOf('day');
  const tomorrow = today.add(1, 'day');

  if (date.isSame(today, 'd')) return 'Hoje';
  if (date.isSame(tomorrow, 'd')) return 'Amanhã';
  return Days.DAYS_OF_WEEK[date.day()];
}

export const dayjsToDate = (date: Dayjs) => {
  const day = date.date()
  const month = date.month() + 1
  const year = date.year()
  const dayOfWeek = getRelativeDayOfWeek(date)

  return {
    id: date.format('YYYY-MM-DD'),
    day,
    month,
    year,
    dayOfWeek,
  }
}

dayjs.locale('pt-br');

export { dayjs }
