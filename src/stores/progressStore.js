import { defineStore } from 'pinia'
import { useBooksStore } from '@/stores/booksStore'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progressList: [
      {
        isbn: '9785918783863',
        list: [
          {
            idEvent: 0,
            type: 'audio',
            isEnd: false,
            progress: [
              {
                dateStart: '2025-01-09T20:37:17+0300',
                dateStop: '2025-01-09T21:39:29+0300',
                count: 62,
              },
              {
                dateStart: '2025-01-14T21:22:07+0300',
                dateStop: '2025-01-14T21:58:09+0300',
                count: 36,
              },
              {
                dateStart: '2025-01-20T20:57:33+0300',
                dateStop: '2025-01-20T21:37:34+0300',
                count: 40,
              },
            ],
          },
        ],
      },
      {
        isbn: '9781800262768',
        list: [
          {
            idEvent: 0,
            type: 'audio',
            isEnd: true,
            progress: [
              {
                dateStart: '2025-01-04T21:10:14+0300',
                dateStop: '2025-01-04T22:26:54+0300',
                count: 112,
              },
              {
                dateStart: '2025-01-06T18:57:46+0300',
                dateStop: '2025-01-06T20:18:35+0300',
                count: 112,
              },
              {
                dateStart: '2025-01-09T20:14:22+0300',
                dateStop: '2025-01-09T21:52:38+0300',
                count: 113,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785918783375',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: false,
            progress: [
              {
                dateStart: '2025-01-08T19:01:23+0300',
                dateStop: '2025-01-08T19:26:54+0300',
                count: 16,
              },
              {
                dateStart: '2025-01-09T18:57:46+0300',
                dateStop: '2025-01-09T19:18:35+0300',
                count: 12,
              },
              {
                dateStart: '2025-01-09T23:14:22+0300',
                dateStop: '2025-01-09T23:31:41+0300',
                count: 14,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785389151222',
        list: [
          {
            idEvent: 0,
            type: 'audio',
            isEnd: true,
            progress: [
              {
                dateStart: '2024-09-01T14:18:48+0300',
                dateStop: '2024-09-01T15:26:49+0300',
                count: 68,
              },
              {
                dateStart: '2024-09-02T16:35:13+0300',
                dateStop: '2024-09-02T17:39:18+0300',
                count: 64,
              },
              {
                dateStart: '2024-09-03T16:23:44+0300',
                dateStop: '2024-09-03T17:26:48+0300',
                count: 63,
              },
              {
                dateStart: '2024-09-04T16:44:23+0300',
                dateStop: '2024-09-04T17:54:24+0300',
                count: 70,
              },
              {
                dateStart: '2024-09-05T16:39:58+0300',
                dateStop: '2024-09-05T17:50:01+0300',
                count: 70,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785389097209',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: true,
            progress: [
              {
                dateStart: '2023-09-27T12:37:11+0300',
                dateStop: '2023-09-27T16:37:11+0300',
                count: 182,
              },
              {
                dateStart: '2023-09-28T12:37:11+0300',
                dateStop: '2023-09-28T17:37:11+0300',
                count: 214,
              },
              {
                dateStart: '2023-09-30T18:37:11+0300',
                dateStop: '2023-09-30T22:14:11+0300',
                count: 148,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785918780381',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: true,
            progress: [
              {
                dateStart: '2023-06-20T16:59:21+0300',
                dateStop: '2023-06-20T20:18:42+0300',
                count: 104,
              },
              {
                dateStart: '2023-06-22T18:04:21+0300',
                dateStop: '2023-06-22T22:00:29+0300',
                count: 105,
              },
              {
                dateStart: '2023-06-24T16:27:29+0300',
                dateStop: '2023-06-24T19:18:21+0300',
                count: 107,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785918780374',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: true,
            progress: [
              {
                dateStart: '2023-12-18T20:58:16+0300',
                dateStop: '2023-12-19T00:03:16+0300',
                count: 144,
              },
              {
                dateStart: '2023-12-19T20:03:16+0300',
                dateStop: '2023-12-19T23:18:16+0300',
                count: 140,
              },
              {
                dateStart: '2023-12-20T20:48:16+0300',
                dateStop: '2023-12-20T23:56:16+0300',
                count: 100,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785907577503',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: true,
            progress: [
              {
                dateStart: '2023-01-03T19:19:40+0300',
                dateStop: '2023-01-03T21:01:40+0300',
                count: 100,
              },
              {
                dateStart: '2023-01-03T21:19:40+0300',
                dateStop: '2023-01-04T01:01:40+0300',
                count: 68,
              },
              {
                dateStart: '2023-01-04T12:33:40+0300',
                dateStop: '2023-01-04T14:47:40+0300',
                count: 104,
              },
              {
                dateStart: '2023-01-05T19:39:40+0300',
                dateStop: '2023-01-05T22:51:40+0300',
                count: 70,
              },
              {
                dateStart: '2023-01-06T19:22:40+0300',
                dateStop: '2023-01-06T23:33:40+0300',
                count: 170,
              },
            ],
          },
        ],
      },
      {
        isbn: '9785042040863',
        list: [
          {
            idEvent: 0,
            type: 'read',
            isEnd: true,
            progress: [
              {
                dateStart: '2023-01-07T10:11:54+0300',
                dateStop: '2023-01-07T14:26:56+0300',
                count: 164,
              },
              {
                dateStart: '2023-01-08T17:50:16+0300',
                dateStop: '2023-01-08T19:16:16+0300',
                count: 70,
              },
              {
                dateStart: '2023-01-08T22:00:33+0300',
                dateStop: '2023-01-08T23:42:16+0300',
                count: 70,
              },
            ],
          },
        ],
      },
      /*
      {
        isbn: '',
        list: [
          {
            idEvent: 0,
            type: '',
            isEnd: false,
            progress: [
              {
                dateStart: '',
                dateEnd: '',
                count: 0,
              },
            ]
          },
        ]
      },
       */
    ],
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
  },
})
