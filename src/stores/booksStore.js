import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    tempData: {
      todayPagesRead: 0,
    },
    listOfBooks: [
      {
        title: 'Старая Земля',
        author: 'Ник Кайм',
        isbn: '978-5-91878-337-5',
        pages: 480,
        audioDuration: 0,
        cover: '978-5-91878-337-5.webp',
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
        title: 'Академия',
        author: 'Айзек Азимов',
        isbn: '978-5-04-093907-7',
        pages: 320,
        audioDuration: 0,
        cover: '978-5-04-093907-7.webp',
        dateAdd: '2024-12-19T19:12:21.000Z',
        dateStart: '2024-12-20T21:01:36.000Z',
        dateEnd: '',
        isOnReading: false,
        pagesRead: 0,
        isOnAudition: true,
        totalListened: 18,
        isComplete: false,
      },
      /*
      {
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
