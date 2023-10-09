import { Days } from '../models/constants/Days'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

export enum EDateFormats {
  READABLE_DATE_TIME = 'DD [de] MMMM [às] HH:mm',
  READABLE_TIME = 'HH:mm',
  TIME_ID = 'HH-mm',
  DATE_ID = 'YYYY-MM-DD',
}

export const getRelativeDayOfWeek = (date: Dayjs) => {
  const today = dayjs().startOf('day')
  const tomorrow = today.add(1, 'day')

  if (date.isSame(today, 'd')) return 'Hoje'
  if (date.isSame(tomorrow, 'd')) return 'Amanhã'
  return Days.DAYS_OF_WEEK[date.day()]
}

export const getTimeId = (time: Dayjs) => {
  return time.format(EDateFormats.TIME_ID)
}

export const dayjsToDate = (date: Dayjs) => {
  const day = date.date()
  const month = date.month() + 1
  const year = date.year()
  const dayOfWeek = getRelativeDayOfWeek(date)

  return {
    id: date.format(EDateFormats.DATE_ID),
    day,
    month,
    year,
    dayOfWeek,
  }
}

dayjs.locale('pt-br')

export { dayjs }
