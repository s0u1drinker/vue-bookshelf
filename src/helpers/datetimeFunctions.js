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
 * Возвращает красивую дату.
 * P.S.: Да-да, я в курсе, что можно было обойтись функцией .toLocaleString(), но доверия пользовательскому браузеру у меня нет.
 * @param {Date} dt Дата
 * @param {Boolean} withTime Если необходимо отобразить время
 * @returns {String} Дата (+ время) в красивом формате: 01.01.2025 16:10
 */
export function prettyStringDate(dt, withTime = false) {
  if (typeof dt !== 'object') {
    dt = new Date(dt)
  }

  let datetime = `${dt.getDate().padStart(2, '0')}.${(dt.getMonth() + 1).padStart(2, '0')}.${dt.getFullYear()}`

  if (withTime) {
    datetime += ` ${dt.getHours().padStart(2, '0')}:${dt.getMinutes().padStart(2, '0')}`
  }

  return datetime
}
/**
 * Возвращает дату в формате ISO со смещением по часовому поясу.
 * Спасибо DeepSeek!
 * @param {Date} date Дата
 * @returns Дата в формате ISO вида: YYYY-MM-DDTHH:MM:SS+0300
 */
export function getLocalISOString(date = new Date()) {
  // Получаем смещение часового пояса в минутах
  const offset = date.getTimezoneOffset()

  // Преобразуем смещение в формат ±HH:mm
  const absOffset = Math.abs(offset)
  const hours = Math.floor(absOffset / 60)
    .toString()
    .padStart(2, '0')
  const minutes = (absOffset % 60).toString().padStart(2, '0')
  const sign = offset > 0 ? '-' : '+'

  // Модифицируем стандартную ISO строку
  return new Date(date.getTime() - offset * 60000)
    .toISOString()
    .replace(/\.\d{3}Z$/, `${sign}${hours}:${minutes}`)
}
