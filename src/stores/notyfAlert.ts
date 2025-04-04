import type { INotyf } from "@/interfaces/INotyf";
import { defineStore } from "pinia";

export const notyfValues = defineStore('notyfValues', {
  state: () => ({
    newNotification: false,
    componentNotification: '',
    notificationContent: '',
    oldNotification: {} as INotyf,
    latestNotification: {} as INotyf,
  }),
  actions: {
    setNewNotification(value: boolean) {
      this.newNotification = value
    },
    setComponentNotification(value: string) {
      this.componentNotification = value
    },
    setNotificationContent(value: string) {
      this.notificationContent = value
    },
    setLatestNotification(value: INotyf) {
      this.latestNotification = value
    }
  },
  getters: {
    getNewNotification(state): boolean {
      return state.newNotification
    },
    getComponentNotification(state): string|null {
      return state.componentNotification
    },
    getNotificationContent(state): string|null {
      return state.notificationContent
    },
    getLatestNotification(state): INotyf {
      return state.latestNotification
    }
  }
})

