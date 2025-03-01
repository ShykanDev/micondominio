import { defineStore } from "pinia";

export const ownerVals = defineStore('ownerVals', {
  state: () => ({
    ownerName: "",
    showReportComment: false,
    showPopUpAnswerComment: false,
    answerCommentTo: "",
    userDataId: "",
    reportCommentData:{},
  }),
  getters: {
    getOwnerName: (state) => state.ownerName,
    getShowReportComment: (state) => state.showReportComment,
    getAnswerCommentTo: (state) => state.answerCommentTo.trim(),
    getShowPopUpAnswerComment: (state) => state.showPopUpAnswerComment,
    getUserDataId: (state) => state.userDataId,
    getReportCommentData: (state) => state.reportCommentData
  },
  actions: {
    setOwnerName(value: string) {
      this.ownerName = value
    },
    setShowReportComment(value: boolean) {
      this.showReportComment = value
    },
    setAnswerCommentTo(value: string) {
      this.answerCommentTo = value
    },
    setShowPopUpAnswerComment(value: boolean, answerCommentTo: string) {
      this.answerCommentTo = answerCommentTo
      this.showPopUpAnswerComment = value
    },
    setClosePopUpAnswerComment() {
      this.showPopUpAnswerComment = false
      this.answerCommentTo = ""
    },
    setUserDataId(value: string) {
      this.userDataId = value
    },
    setReportCommentData(value: object) {
      this.showReportComment = true
      this.reportCommentData = value
    }
  }
})
