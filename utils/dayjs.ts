import dayjs, { Dayjs } from "dayjs";
import { Days } from "../models/constants/Days";

export const dayjsToDate = (date: Dayjs, index?: number) => {
  const day = date.date()
  const month = date.month()
  const dayOfWeek =
    (index !== undefined ? Days.RELATIVE_DAYS_OF_WEEK[index] : Days.DAYS_OF_WEEK[date.day()]) ??
    Days.DAYS_OF_WEEK[date.day()]

  return {
    id: date.format('YYYY-MM-DD'),
    day,
    month,
    dayOfWeek,
  }
}

export { dayjs }
