import { defineStore } from "pinia";

export const sysVals = defineStore("sysVals", {
  state: () => ({
    isUserAuth: false,
    isAdmin: false,
    isUser: false,
    invitationCode: "",
  }),
  getters: {
    getIsUserAuth: (state) => state.isUserAuth,
    getIsAdmin: (state) => state.isAdmin,
    getIsUser: (state) => state.isUser,
    getInvitationCode: (state) => state.invitationCode,
  },
  actions: {
    setIsUserAuth(status: boolean) {
      this.isUserAuth = status;
    },
    setIsAdmin(status: boolean) {
      this.isAdmin = status;
    },
    setIsUser(status: boolean) {
      this.isUser = status;
    },
    setInvitationCode(invitationCode: string) {
      this.invitationCode = invitationCode;
    },
  },
})
