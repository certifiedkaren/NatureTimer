import { defineStore } from 'pinia'

export const usePomodoroStore = defineStore('pomodoro', {
  state: () => ({
    focusLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
  }),

  actions: {
    setFocusLength(mins) {
      this.focusLength = mins
    },

    setShortBreakLength(mins) {
      this.shortBreakLength = mins
    },

    setLongBreakLength(mins) {
      this.longBreakLength = mins
    },

    resetToDefault() {
      this.focusLength = 25
      this.shortBreakLength = 5
      this.longBreakLength = 15
    },
  },
})
