// Список месяцев для компонента select.
export const months = [
  { value: 0, label: 'Январь' },
  { value: 1, label: 'Февраль' },
  { value: 2, label: 'Март' },
  { value: 3, label: 'Апрель' },
  { value: 4, label: 'Май' },
  { value: 5, label: 'Июнь' },
  { value: 6, label: 'Июль' },
  { value: 7, label: 'Август' },
  { value: 8, label: 'Сентябрь' },
  { value: 9, label: 'Октябрь' },
  { value: 10, label: 'Ноябрь' },
  { value: 11, label: 'Декабрь' },
]

/**
 * Формирует список для выбора года в компоненте select.
 * @param {*} yearStart Number Начальное значение. По умолчанию - 2023.
 * @returns Array Список для отображения.
 */
export const yearsForSelect = (yearStart = 2023) => {
  const years = []
  const currentYear = new Date().getFullYear()

  for (let i = yearStart; i <= currentYear; i++) {
    years.push({ value: i, label: i })
  }

  return years
}
