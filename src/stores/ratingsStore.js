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
    ratings: [
      {
        bookISBN: '9785918780381',
        appearance: 10,
        plot: 10,
        atmosphere: 10,
        involvement: 10,
        emotions: 10,
        summary: 10,
      },
      {
        bookISBN: '9785918780374',
        appearance: 10,
        plot: 10,
        atmosphere: 10,
        involvement: 10,
        emotions: 10,
        summary: 10,
      },
      {
        bookISBN: '9785907577503',
        appearance: 8,
        plot: 9,
        atmosphere: 10,
        involvement: 9,
        emotions: 10,
        summary: 9.2,
      },
      /*
      {
        bookISBN: '',
        appearance: 0,
        plot: 0,
        atmosphere: 0,
        involvement: 0,
        emotions: 0,
        summary: 0,
      },
      */
    ],
  }),
  getters: {
    /**
     * Возвращает рейтинг книги.
     * @param {String} isbn ISBN книги.
     * @returns Object Рейтинг книги.
     */
    getBookRating: (state) => {
      return (isbn) => state.ratings.filter((item) => item.bookISBN === isbn)
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
              ? '-' // возвращаем прочерк, т.к. ни у одной из книг нет ооценки
              : (sum / allBooksWithRatingCount).toFixed(2) // или частное.
          }

          return sum
        }, 0)
      }
    },
  },
  actions: {},
})
