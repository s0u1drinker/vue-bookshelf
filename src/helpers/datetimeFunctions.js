/**
 * Для отображения красивой даты: добавляет "0", если переданное число меньше 10.
 * @param {*} num Number Число
 * @returns String 1 => 01
 */
export function prettyNumberForDate(num) {
  return num < 10 ? `0${num}` : String(num)
}

/**
 * Возвращает красивую дату.
 * @param {*} dt Date Дата
 * @param {*} withTime Boolean Если необходимо отобразить время
 * @returns String Дата (+ время) в красивом формате: 01.01.2025 16:10
 */
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
