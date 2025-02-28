/**
 * Функция проверяет валидность данных (год и месяц) для выборки из хранилища.
 * @param {Number} year Год
 * @param {Number} month Месяц
 * @returns {Boolean} Валидность данных.
 */
export function validDateInRequestToStore(year, month) {
  let errorFlag = false

  if (year && isNaN(year)) {
    errorFlag = true
    console.error(`Значение <year> не является числом: "${year}". Возвращаю "0".`)
  }

  if (month === 0 || month) {
    if (!year) {
      errorFlag = true
      console.error(
        `Странная ситуация: значение <year> не установлено (${year}), а значение <month> установлено (${month}). Возвращаю "0".`,
      )
    } else if (isNaN(month)) {
      errorFlag = true
      console.error(`Значение <month> не является числом: "${month}". Возвращаю "0".`)
    }
  }

  return !errorFlag
}
/**
 * Для отображения красивой даты: добавляет "0", если переданное число меньше 10.
 * @param {Number} num Число
 * @returns {String} 1 => 01
 */
export function prettyNumberForDate(num) {
  return num < 10 ? `0${num}` : String(num)
}

/**
 * Возвращает красивую дату.
 * @param {Date} dt Дата
 * @param {Boolean} withTime Если необходимо отобразить время
 * @returns {String} Дата (+ время) в красивом формате: 01.01.2025 16:10
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
