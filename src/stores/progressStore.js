import { defineStore } from 'pinia'
import { prettyStringDate } from '@/helpers/datetimeFunctions'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    progressList: [
      {
        bookISBN: '9785918783863',
        dateStart: '2025-01-09T20:37:17+0300',
        dateStop: '2025-01-09T21:39:29+0300',
        count: 62,
        isAudio: true,
      },
      {
        bookISBN: '9785918783375',
        dateStart: '2025-01-08T19:01:23+0300',
        dateStop: '2025-01-08T19:26:54+0300',
        count: 16,
        isAudio: false,
      },
      {
        bookISBN: '9785918783375',
        dateStart: '2025-01-09T18:57:46+0300',
        dateStop: '2025-01-09T19:18:35+0300',
        count: 12,
        isAudio: false,
      },
      {
        bookISBN: '9785918783375',
        dateStart: '2025-01-09T23:14:22+0300',
        dateStop: '2025-01-09T23:31:41+0300',
        count: 14,
        isAudio: false,
      },
      /*
      {
        bookISBN: '',
        dateStart: '',
        dateStop: '',
        count: ,
        isAudio: ,
      }
       */
    ],
  }),
  getters: {
    getTodayProgress(state) {
      return state.progressList.filter((item) => prettyStringDate(item.dateStop) === prettyStringDate(Date.now()))
    },
    getCountPagesReadToday() {
      const arrayReadedToday = this.getTodayProgress.filter((item) => !item.isAudio)

      return arrayReadedToday.reduce((sum, progress) => sum + progress.count, 0)
    },
    getCountMinutesListenedToday() {
      const arrayReadedToday = this.getTodayProgress.filter((item) => item.isAudio)

      return arrayReadedToday.reduce((sum, progress) => sum + progress.count, 0)
    },
  },
  actions: {},
})
