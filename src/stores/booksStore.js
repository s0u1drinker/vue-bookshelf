import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    tempData: {
      todayPagesRead: 0,
    },
    listOfBooks: [
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
        isOnReading: false,
        pagesRead: 0,
        isOnAudition: false,
        totalListened: 0,
        isComplete: false,
      },
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
