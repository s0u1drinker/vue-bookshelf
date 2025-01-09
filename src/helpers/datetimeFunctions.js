export function prettyNumberForDate(num) {
  return (num < 10) ? `0${num}` : String(num)
}

export function prettyStringDate(dt, withTime = false) {
  if (typeof dt !== 'object') {
    dt = new Date(dt)
  }

  let datetime = `${prettyNumberForDate(dt.getDate())}.${prettyNumberForDate(dt.getMonth() + 1)}.${dt.getFullYear()}`

  if (withTime) {
    datetime += ` ${prettyNumberForDate(dt.getHours())}:${prettyNumberForDate(dt.getMinutes())}`
  }

  return datetime
}
