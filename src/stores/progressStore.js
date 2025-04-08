import { defineStore } from 'pinia'
import { useBooksStore } from '@/stores/booksStore'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progressList: [],
  }),
  getters: {
    /**
     * Возвращает прогресс по ISBN книги.
     * @param {String} isbn ISBN книги.
     * @returns {Array} Прогресс чтения/прослушивания книги.
     */
    getProgressListByISBN: (state) => {
      return (isbn) => {
        return state.progressList.filter((item) => item.isbn === isbn)[0]?.list
      }
    },
    /**
     * Возвращает количество прочитанных страницы/прослушанных минут за определённый день.
     * @param {Object} day Дата типа Date.
     * @returns {Object} Прогресс (страницы/минуты) за день.
     */
    getStatisticsByDate: (state) => {
      return (day) => {
        if (typeof day === 'object') {
          const response = {
            minutes: 0,
            pages: 0,
          }

          state.progressList.forEach((book) => {
            book.list.forEach((item) => {
              item.progress.forEach((elem) => {
                const currentDate = new Date(elem.dateStop)

                if (day.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
                  if (item.type === 'read') {
                    response.pages += elem.count
                  } else if (item.type === 'audio') {
                    response.minutes += elem.count
                  } else {
                    throw new Error(`Неверный статус у книги с ISBN:${book.isbn}`)
                  }
                }
              })
            })
          })

          return response
        } else throw new Error('Переменная для хранения даты имеет неверный тип.')
      }
    },
    /**
     * Данные о событии по идентификатору.
     * @param {String} isbn ISBN книги.
     * @param {Number} idEvent ID события.
     * @returns {Object} Данные о событии.
     */
    getEventByID: (state) => {
      return (isbn, idEvent) => {
        const progressList = state.getProgressListByISBN(isbn)

        return progressList.filter((item) => item.idEvent === idEvent)[0]
      }
    },
    /**
     * Возвращает последнее событие в списке прогресса по ISBN.
     * @param {String} isbn ISBN книги.
     * @returns {Object} Последнее событие в списке прогреса.
     */
    getLastEventByISBN: (state) => {
      return (isbn) => {
        const list = state.getProgressListByISBN(isbn)

        return list.at(-1)
      }
    },
    /**
     * Всего прочитано/прослушано в текущем событии.
     * @param {String} isbn ISBN книги.
     * @param {Number} idEvent ID события.
     * @returns {Number} Количество страниц/минут.
     */
    getAllCountsInLastEvent: (state) => {
      return (isbn) => {
        const event = state.getLastEventByISBN(isbn)

        return event.progress.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.count
        }, 0)
      }
    },
    /**
     * @param {String} ISBN книги.
     * @returns {Object} Информация о статусе книги.
     */
    getBookStatus: (state) => {
      return (isbn) => {
        const progress = state.getProgressListByISBN(isbn)
        const lastBookRead = progress?.filter((item) => item.type === 'read').at(-1)
        const lastBookAudio = progress?.filter((item) => item.type === 'audio').at(-1)

        return {
          read: {
            complete: lastBookRead && lastBookRead.isEnd,
            progress: lastBookRead && !lastBookRead.isEnd,
            get text() {
              return this.complete ? 'Прочитано' : this.progress ? 'Читаю' : ''
            },
            get color() {
              return this.complete ? 'green' : this.progress ? 'orange' : ''
            },
          },
          audio: {
            complete: lastBookAudio && lastBookAudio.isEnd,
            progress: lastBookAudio && !lastBookAudio.isEnd,
            get text() {
              return this.complete ? 'Прослушано' : this.progress ? 'Слушаю' : ''
            },
            get color() {
              return this.complete ? 'green' : this.progress ? 'orange' : ''
            },
          },
          get textButton() {
            return this.read.progress ? 'Страницы' : this.audio.progress ? 'Минуты' : false
          },
        }
      }
    },
    /**
     * Возвращает информацию о прочитанных книгах.
     * @returns {Object} Общее количество, прочитано, прослушано, массив с событиями.
     */
    getFinishedBooks(state) {
      const result = []
      let events
      let read = 0
      let audio = 0

      state.progressList.forEach((item) => {
        events = []

        item.list.forEach((event) => {
          if (event.isEnd) {
            if (event.type === 'read') read++
            if (event.type === 'audio') audio++

            events.push(event)
          }
        })

        if (events.length)
          result.push({
            isbn: item.isbn,
            list: events,
          })
      })

      return {
        count: read + audio,
        read,
        audio,
        data: result,
      }
    },
    /**
     * Возвращает информацию о прочитанных книгах по месяцам за указанный год.
     * @param {Number} year Год.
     * @returns {Array} Разбивка по месяцам аудио+прочитано.
     */
    getFinishedBooksPerMonthInYear: (state) => {
      return (year) => {
        const result = {
          read: 0,
          audio: 0,
          months: [],
        }

        for (let i = 0; i < 12; i++) {
          const month = { read: 0, audio: 0 }

          state.getFinishedBooks.data.forEach((item) => {
            item.list.forEach((event) => {
              const dateStop = new Date(event.progress.at(-1).dateStop)
              if (dateStop.getMonth() === i && dateStop.getFullYear() === year) {
                if (event.type === 'read') month.read++
                if (event.type === 'audio') month.audio++
              }
            })
          })

          result.read += month.read
          result.audio += month.audio
          result.months.push(month)
        }

        return result
      }
    },
  },
  actions: {
    // Добавление нового события начала чтения/прослушивания.
    addNewEvent(isbn, type) {
      const progress = this.progressList.filter((item) => item.isbn === isbn)

      switch (progress.length) {
        case 0:
          // Записи о такой книге ещё нет. Добавляем.
          this.progressList.push({
            isbn,
            list: [
              {
                idEvent: 0,
                type,
                isEnd: false,
                progress: [],
              },
            ],
          })
          break
        case 1:
          // Книга есть. Добавляем новое событие в list.
          progress[0].list.push({
            idEvent: progress[0].list.length,
            type,
            isEnd: false,
            progress: [],
          })
          break
        default:
          throw new Error('В хранилище <ProgressStore> найдены несколько записей у одной книги.')
      }
    },
    /**
     * Добавляет запись о прогрессе в изучении книги.
     * @param {String} isbn ISBN книги.
     * @param {String} dateStart Дата начала события.
     * @param {String} dateStop Дата окончания события.
     * @param {Number} count Количество минут/страниц.
     */
    addNewProgress(isbn, dateStart, dateStop, count) {
      const bookStore = useBooksStore()
      const event = this.getLastEventByISBN(isbn)

      if (event) {
        // Добавляем информацию о событии.
        event.progress.push({
          dateStart,
          dateStop,
          count,
        })
        // Обновляем bookStore И проверяем не закончилась ли книга.
        if (bookStore.updateCount(isbn, count, dateStop)) {
          event.isEnd = true
        }
      }
    },
    // Обновление данных о прогрессе.
    updateProgress(newVal) {
      this.progressList = newVal
    },
  },
})
