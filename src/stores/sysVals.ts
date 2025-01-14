import { defineStore } from "pinia";

export const sysVals = defineStore("sysVals", {
  state: () => ({
    isUserAuth: false,
    isAdmin: false,
    isUser: false,
    invitationCode: "",
    userUid: "",
    adminDocId:"",
    condominiumId:"",
  }),
  getters: {
    getIsUserAuth: (state) => state.isUserAuth,
    getIsAdmin: (state) => state.isAdmin,
    getIsUser: (state) => state.isUser,
    getInvitationCode: (state) => state.invitationCode,
    getUserUid: (state) => state.userUid,
    getAdminDocId:(state) => state.adminDocId,
    getCondominiumId:(state) => state.condominiumId,
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
    setUserUid(userUid: string) {
      this.userUid = userUid;
    },
    setAdimnDocId(payload:string):void{
      this.adminDocId = payload;
    },
    setCondominiumId(payload:string):void{
      this.condominiumId = payload;
    },
  },
})
