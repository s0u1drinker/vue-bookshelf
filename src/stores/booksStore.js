import { defineStore } from 'pinia'
import { useProgressStore } from '@/stores/progressStore'
// Functions
import { validDateInRequestToStore, getLocalISOString } from '@/helpers/datetimeFunctions'

export const useBooksStore = defineStore('books', {
  state: () => ({
    statusList: [
      {
        idStatus: false,
        type: '',
      },
      {
        idStatus: 1,
        type: 'read',
      },
      {
        idStatus: 2,
        type: 'audio',
      },
    ],
    listOfBooks: [],
  }),
  getters: {
    /**
     * Возвращает общее количество книг.
     * @param {*} state
     * @returns Number Общее количество книг.
     */
    getBooksCount(state) {
      return state.listOfBooks.length
    },
    /**
     * Возвращает количество законченных книг с разбивкой на прочитанные и прослушанные.
     * Опционально возвращается список книг и указывается период выборки.
     * @param {Boolean} list Список книг
     * @param {Number} year Год
     * @param {Number} month Месяц
     * @returns Object all - закончено, read - прочитано, audio - прослушано
     */
    getBooksCompleteCount: (state) => {
      return (list = false, year = null, month = null) => {
        // Ответ при ошибке
        const response = { list: [], all: 0, read: 0, audio: 0 }

        // Проверка валидности переданных данных.
        if (validDateInRequestToStore(year, month)) {
          // Если данные валидны -
          let completeBooks = state.listOfBooks.filter((item) => {
            // выбираем законченные книги.
            if (item.isComplete) {
              // Дата окончания прочтения книги.
              const itemDateEnd = new Date(item.dateEnd)

              // Если год установлен
              if (year) {
                // и равен переданному значению -
                if (itemDateEnd.getFullYear() === year) {
                  // проверяем передано ли значение месяца.
                  if (month === 0 || month) {
                    // Если да - проверяем и забираем элемент.
                    if (itemDateEnd.getMonth() === month) return item
                  } else return item // Месяц не передан - забираем элемент.
                }
              } else return item // Год не передан - забираем элемент.
            }
          })

          // Формируем массив с ответом на основе отфильтрованных данных.
          response.all = completeBooks.length
          response.read = completeBooks.filter((item) => item.pagesRead).length
          response.audio = completeBooks.filter((item) => item.totalListened).length

          // Если нужен список книг - возвращаем.
          if (list) response.list = completeBooks
        }

        return response
      }
    },
    /**
     * Возвращает список книг, которые в данный момент имеют статус "Читаю" и "Слушаю".
     * Список отсортирован по дате начала.
     * @returns Array Список книг.
     */
    getBooksOnReadingAndOnAudition(state) {
      return state.listOfBooks
        .filter((item) => item.status)
        .sort((a, b) => {
          return new Date(a.dateStart) > new Date(b.dateStart) ? 1 : -1
        })
    },
    /**
     * Возвращает книги из хранилища с определённой позиции в определённом количестве.
     * @param {Number} start Начальная позиция.
     * @param {Number} limit Количество.
     * @returns {Array} Список книг.
     */
    getBooks: (state) => {
      return (start = 0, limit = null) => {
        return limit ? state.listOfBooks.slice(start, limit) : state.listOfBooks.slice(start)
      }
    },
    /**
     * Возвращает информацию о книге по ISBN.
     * @param {String} isbn ISBN книги.
     * @returns {Object} Информация о книге.
     */
    getBookInfoByISBN: (state) => {
      return (isbn) => {
        return state.listOfBooks.filter((book) => book.isbn === isbn)[0]
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Boolean} Книга в процессе изучения или нет.
     */
    isBookInProgress: (state) => {
      return (isbn) => {
        return state.getBookInfoByISBN(isbn).status ? true : false
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Всего страниц/минут в книге.
     */
    getTotalCount: (state) => {
      return (isbn) => {
        const book = state.getBookInfoByISBN(isbn)
        const status = book.status

        return status === 'read' ? book.pages : status === 'audio' ? book.audioDuration : 0
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Прочитано страниц/прослушано минут в книге.
     */
    getCurrentCount: (state) => {
      return (isbn) => {
        const book = state.getBookInfoByISBN(isbn)
        const status = book.status

        return status === 'read' ? book.pagesRead : status === 'audio' ? book.totalListened : 0
      }
    },
    /**
     * @param {String} isbn ISBN книги.
     * @returns {Number} Прогресс книги в процентах.
     */
    getBookProgressInPercent: (state) => {
      return (isbn) => {
        const total = state.getTotalCount(isbn)
        const current = state.getCurrentCount(isbn)

        return ((current * 100) / total).toFixed(1) || 0
      }
    },
  },
  actions: {
    /**
     * Обновление статуса книги по ISBN.
     * @param {String} isbn
     * @param {Number} idStatus
     */
    updateStatus(isbn, idStatus) {
      if ((isbn, idStatus)) {
        const book = this.listOfBooks.filter((item) => item.isbn === isbn)[0]
        const status = this.statusList.filter((item) => item.idStatus === idStatus)[0].type
        const progress = useProgressStore()

        if (status) {
          book.status = status
          book.dateStart = getLocalISOString()
          book.dateEnd = ''
          book.isComplete = false

          if (idStatus === 1) {
            book.pagesRead = 0
          }
          if (idStatus === 2) {
            book.totalListened = 0
          }
          progress.addNewEvent(isbn, status)
        } else throw new Error('Передан неверный идентификатор статуса.')
      } else
        throw new Error(
          `Невозможно обновить информацию о статусе: не передан один или несколько необходимых параметров (isbn: ${isbn}, idStatus: ${idStatus}).`,
        )
    },
    /**
     * Обновляет количество минут/страниц.
     * @param {String} isbn ISBN книги.
     * @param {Number} count Количество минут/страниц.
     * @param {String} dateStop Дата окончания.
     */
    updateCount(isbn, count, dateStop) {
      if (isbn) {
        const book = this.getBookInfoByISBN(isbn)

        if (count) {
          let cuurentCount, totalCount

          if (book.status === 'read') {
            book.pagesRead += count
            cuurentCount = book.pagesRead
            totalCount = book.pages
          }

          if (book.status === 'audio') {
            book.totalListened += count
            cuurentCount = book.totalListened
            totalCount = book.audioDuration
          }

          if (cuurentCount >= totalCount) {
            this.setBookComplete(isbn, dateStop)
            return true
          } else return false
        } else throw new Error('Не передана информация для обновления данных о книге.')
      } else throw new Error('Не передан ISBN книги для обновления информации.')
    },
    /**
     * Книга закончена. Обновляем информацию об этом.
     * @param {String} isbn ISBN книги.
     * @param {String} dateStop Дата окончания.
     */
    setBookComplete(isbn, dateStop) {
      const book = this.getBookInfoByISBN(isbn)

      // Делаем счётчик прочитанного/прослушанного равным общему количеству, чтобы не было проблем с какими-нибудь подсчётами.
      book.status === 'read' ? (book.pagesRead = book.pages) : false
      book.status === 'audio' ? (book.totalListened = book.audioDuration) : false
      // Выставляем значения, соответствующие законченной книге.
      book.isComplete = true
      book.dateEnd = dateStop
      book.status = false
    },
    /**
     * Добавляет мнение о книге.
     * @param {String} isbn ISBN книги.
     * @param {String} text Мнение о книге.
     */
    setOpinion(isbn, text) {
      const book = this.getBookInfoByISBN(isbn)

      book.opinion = text
    },
    /**
     * Добавляет новую книгу в хранилище.
     * @param {Object} book Данные о книге.
     */
    addNewBook(book) {
      this.listOfBooks.push({
        bookSeries: book.serie,
        title: book.name,
        author: book.author,
        isbn: String(book.isbn),
        pages: book.pages,
        audioDuration: book.audio,
        cover: '',
        dateAdd: getLocalISOString(),
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
        description: `<p>${book.descr.split('\n').join('</p><p>')}</p>`,
        opinion: '',
      })
    },
    // Обновление данных о книгах.
    updateBooks(newVal) {
      this.listOfBooks = newVal
    },
  },
})
