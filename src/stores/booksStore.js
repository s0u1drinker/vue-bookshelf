import { defineStore } from 'pinia'

export const useBooksStore = defineStore('books', {
  state: () => ({
    listOfBooks: [
      {
        booksSerie: 'The Horus Heresy',
        title: 'Старая Земля',
        author: 'Ник Кайм',
        isbn: '9785918783375',
        pages: 480,
        audioDuration: 0,
        cover: '9785918783375.webp',
        dateAdd: '2024-12-17T13:24:00+0300',
        dateStart: '2024-12-21T21:42:32+0300',
        dateEnd: '',
        status: 'read',
        pagesRead: 36,
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
        dateAdd: '2024-12-19T19:12:21+0300',
        dateStart: '',
        dateEnd: '',
        status: false,
        pagesRead: 0,
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
        dateAdd: '2025-01-01T17:34:59+0300',
        dateStart: '2025-01-04T21:10:14+0300',
        dateEnd: '2025-01-09T21:52:38+0300',
        status: false,
        pagesRead: 0,
        totalListened: 337,
        isComplete: true,
      },
      {
        booksSerie: 'The Horus Heresy. Primarchs',
        title: 'Мортарион. Бледный Король',
        author: 'Дэвид Аннендейл',
        isbn: '9781800261389',
        pages: 208,
        audioDuration: 331,
        cover: '9781800261389.webp',
        dateAdd: '2025-01-01T17:33:48+0300',
        dateStart: '2025-01-01T20:38:14+0300',
        dateEnd: '2025-01-04T21:09:27+0300',
        status: false,
        pagesRead: 0,
        totalListened: 331,
        isComplete: true,
      },
      {
        booksSerie: 'The Horus Heresy. Primarchs',
        title: 'Вулкан. Владыка Змиев',
        author: 'Дэвид Аннендейл',
        isbn: '9785918783863',
        pages: 189,
        audioDuration: 281,
        cover: '9785918783863.webp',
        dateAdd: '2025-01-01T17:38:14+0300',
        dateStart: '2025-01-09T20:37:29+0300',
        dateEnd: '',
        status: 'audio',
        pagesRead: 0,
        totalListened: 138,
        isComplete: false,
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
        status: '',
        pagesRead: 0,
        totalListened: 0,
        isComplete: false,
      },
      */
    ],
  }),
  getters: {
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
    getBooksOnReadingAndOnAudition(state) {
      return state.listOfBooks.filter((item) => item.status)
    },
  },
  actions: {},
})
