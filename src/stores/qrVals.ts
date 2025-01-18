import { defineStore } from 'pinia'

export const qrVals = defineStore('qrVals', {
  state: () => ({
    link: 'http://192.168.1.17:5173/micondominio/register?tipoCuenta=propietario&codigoInvitacion=546487',
    // link: 'http://localhost:5173/micondominio/register?tipoCuenta=propietario&codigoInvitacion=546487',
  }),
  getters: {
    getLink(state): string {
      return state.link
    },
  },
  actions: {
    setLink(link: string) {
      this.link = link
    },
  },
})
