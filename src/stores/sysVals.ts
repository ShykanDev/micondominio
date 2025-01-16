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
    isLoadingComponent: false,
    ownerInvitationCode: "",
    ownerDocId:"",
    isLoadingLogin: false,
    isLoadingOwner: false,
  }),
  getters: {
    getIsUserAuth: (state) => state.isUserAuth,
    getIsAdmin: (state) => state.isAdmin,
    getIsUser: (state) => state.isUser,
    getInvitationCode: (state) => state.invitationCode,
    getUserUid: (state) => state.userUid,
    getAdminDocId:(state) => state.adminDocId,
    getCondominiumId:(state) => state.condominiumId,
    getIsLoadingComponent:(state) => state.isLoadingComponent,
    getOwnerInvitationCode:(state) => state.ownerInvitationCode,
    getOwnerDocId:(state) => state.ownerDocId,
    getIsLoadingLogin: (state) => state.isLoadingLogin,
    getIsLoadingOwner: (state) => state.isLoadingOwner,
  },
  actions: {
    setIsUserAuth(status: boolean) {
      this.isUserAuth = status;
    },
    setIsAdmin(status: boolean) {
      this.isAdmin = status;
    },
    setIsLoadingComponent(status: boolean) {
      this.isLoadingComponent = status;
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
    setOwnerInvitationCode(payload:string):void{
      this.ownerInvitationCode = payload;
    },
    setOwnerDocId(payload:string):void{
      this.ownerDocId = payload
    },
    setIsLoadingLogin(status: boolean) {
      this.isLoadingLogin = status;
    },
    setIsLoadingOwner(status: boolean) {
      this.isLoadingOwner = status;
    },
  },
})
