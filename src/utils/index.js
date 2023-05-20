import dayjs from 'dayjs'

export const timeFormat = (timestr) => {
  if (!timestr) return '-'
  return dayjs(timestr).format('YYYY-MM-DD HH:mm:ss')
}
