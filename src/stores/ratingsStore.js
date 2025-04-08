import { defineStore } from 'pinia'

export const useRatingsStore = defineStore('ratings', {
  state: () => ({
    parameters: [
      { appearance: 'Внешний вид' },
      { plot: 'Сюжет' },
      { atmosphere: 'Атмосфера' },
      { involvement: 'Вовлеченность' },
      { emotions: 'Эмоции' },
    ],
    template: {
      appearance: 0,
      plot: 0,
      atmosphere: 0,
      involvement: 0,
      emotions: 0,
      summary: 0,
    },
    ratingArray: [
      { value: 10, label: 10 },
      { value: 9, label: 9 },
      { value: 8, label: 8 },
      { value: 7, label: 7 },
      { value: 6, label: 6 },
      { value: 5, label: 5 },
      { value: 4, label: 4 },
      { value: 3, label: 3 },
      { value: 2, label: 2 },
      { value: 1, label: 1 },
    ],
    ratings: [],
  }),
  getters: {
    /**
     * @returns Список параметров рейтинга.
     */
    getParameters(state) {
      return state.parameters
    },
    /**
     * @returns Шаблон для заполнения.
     */
    getTemplate(state) {
      return state.template
    },
    /**
     * @returns Рейтинг для выбора в выпадающем списке.
     */
    getRatingArray(state) {
      return state.ratingArray
    },
    /**
     * Возвращает рейтинг книги.
     * @param {String} isbn ISBN книги.
     * @returns Object Рейтинг книги.
     */
    getBookRating: (state) => {
      return (isbn) => {
        const rating = state.ratings.filter((item) => item.bookISBN === isbn)[0]

        return rating || state.getTemplate
      }
    },
    /**
     * Возвращает средний рейтинг книг.
     * @param {Array} books Список книг или, если не передан, рейтинг всех книг.
     * @returns Number Рейтинг книг.
     */
    getAverageRating: (state) => {
      return (books = null) => {
        // Флаг указывает на то, что был передан массив с книгами.
        // Этот массив имеет структуру из bookStorage,
        // поэтому обрабатывается не так, как элемент хранилища ratingStorage.
        const flagItemFromBooks = books ? true : false
        // Счётчик книг с рейтингом.
        let allBooksWithRatingCount = 0

        // Если массив "не пришёл" - работаем с рейтингами из хранилища.
        books = books || state.ratings

        return books.reduce((acc, current, index) => {
          // Текущее значение, временное значение, сумма.
          let item, tmp, sum

          // Если флаг установлен.
          if (flagItemFromBooks) {
            // Ищем в текущем хранилище элемент с таким же ISBN.
            tmp = state.ratings.find((elem) => elem.bookISBN === current.isbn)
            // Если что-то найдено
            if (tmp) {
              // Сохраняем рейтинг.
              item = tmp.summary
              // Увеличиваем счётчик книг с рейтингом.
              allBooksWithRatingCount++
            } else item = 0 // Ничего не найдено - сохраняем 0, счётчик не трогаем.
          } else {
            // Если флага нет - просто сохраняем рейтинг.
            item = current.summary
            // И, конечно же, увеличиваем счётчик.
            allBooksWithRatingCount++
          }

          // Суммируем рейтинг.
          sum = acc + item
          // Если элемент последний
          if (index === books.length - 1) {
            // Если делимое или делитель равны 0
            return sum === 0 || allBooksWithRatingCount === 0
              ? '-' // возвращаем прочерк, т.к. ни у одной из книг нет оценки
              : (sum / allBooksWithRatingCount).toFixed(2) // или частное.
          }

          return sum
        }, 0)
      }
    },
  },
  actions: {
    // Добавление рейтинга.
    addNewRating(isbn, ratingTemplate) {
      this.ratings.push({ bookISBN: isbn, ...ratingTemplate })
    },
    // Обновление данных о рейтингах.
    updateRating(newVal) {
      this.ratings = newVal
    },
  },
})
