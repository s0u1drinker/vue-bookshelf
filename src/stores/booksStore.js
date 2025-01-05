import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    tempData: {
      todayPagesRead: 0,
    },
    listOfBooks: [
      {
        booksSerie: 'The Horus Heresy',
        title: 'Старая Земля',
        author: 'Ник Кайм',
        isbn: '9785918783375',
        pages: 480,
        audioDuration: 0,
        cover: '9785918783375.webp',
        dateAdd: '2024-12-17T13:24:00.000Z',
        dateStart: '2024-12-21T21:42:32.000Z',
        dateEnd: '',
        isOnReading: true,
        pagesRead: 36,
        isOnAudition: false,
        totalListened: 0,
        isComplete: false,
      },
      {
        booksSerie: 'Академия',
        title: 'Академия',
        author: 'Айзек Азимов',
        isbn: '9785040939077',
        pages: 320,
        audioDuration: 0,
        cover: '9785040939077.webp',
        dateAdd: '2024-12-19T19:12:21.000Z',
        dateStart: '',
        dateEnd: '',
        isOnReading: false,
        pagesRead: 0,
        isOnAudition: false,
        totalListened: 0,
        isComplete: false,
      },
      {
        booksSerie: 'The Horus Heresy. Primarchs',
        title: 'Сангвиний. Великий Ангел',
        author: 'Крис Райт',
        isbn: '9781800262768',
        pages: 208,
        audioDuration: 337,
        cover: '9781800262768.webp',
        dateAdd: '2025-01-01T17:34:59.000Z',
        dateStart: '2025-01-04T21:10:14.000Z',
        dateEnd: '',
        isOnReading: false,
        pagesRead: 0,
        isOnAudition: true,
        totalListened: 18,
        isComplete: false,
      },
      {
        booksSerie: 'The Horus Heresy. Primarchs',
        title: 'Мортарион. Бледный Король',
        author: 'Дэвид Аннендейл',
        isbn: '9781800261389',
        pages: 208,
        audioDuration: 331,
        cover: '9781800261389.webp',
        dateAdd: '2025-01-01T17:33:48.000Z',
        dateStart: '2025-01-01T20:38:14.000Z',
        dateEnd: '2025-01-04T21:09:27.000Z',
        isOnReading: false,
        pagesRead: 0,
        isOnAudition: false,
        totalListened: 331,
        isComplete: true,
      },
      /*
      {
        booksSerie: '',
        title: '',
        author: '',
        isbn: '',
        pages: 0,
        audioDuration: 0,
        cover: '',
        dateAdd: '',
        dateStart: '',
        dateEnd: '',
        isOnReading: true,
        pagesRead: 0,
        isOnAudition: true,
        totalListened: 0,
        isComplete: false,
      },
      */
    ],
  }),
  getters: {
    getTodayPagesRead(state) {
      return state.tempData.todayPagesRead
    },
    getBooksCount(state) {
      return state.listOfBooks.length
    },
    getBooksReadThisYearCount(state) {
      return state.listOfBooks.filter(
        (item) => new Date(item.dateEnd).getFullYear() === new Date().getFullYear(),
      ).length
    },
    getBooksCompleteCount(state) {
      return state.listOfBooks.filter((item) => item.isComplete).length
    },
  },
  actions: {},
})
