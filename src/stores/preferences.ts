import { defineStore } from 'pinia'

export const preferencesVals = defineStore('preferences', {
  state: () => ({
    acceptedTerms: false,
  }),
  actions: {
    setAcceptedTems() {
      this.acceptedTerms = true
    },
  },
  getters: {
    getAcceptedTems: (state) => state.acceptedTerms,
  },
  persist: true,
})
