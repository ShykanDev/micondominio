import './assets/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, RiBuildingFill, LaFileInvoiceDollarSolid,MdShorttextRound,BiTextParagraph, RiImageAddLine,IoCloseCircle,FaFileInvoice, FaTrashAlt,RiChatPrivateLine,IoNotificationsOutline,MdNotificationsactive, GiHouseKeys , FaHouseUser,GiMoneyStack, GiTakeMyMoney,BiCardChecklist, RiCalendar2Line, RiHome2Line, RiInformationLine, BiCurrencyExchange, BiTrashFill} from "oh-vue-icons/icons";
addIcons(FaFlag, RiZhihuFill, RiBuildingFill, LaFileInvoiceDollarSolid,MdShorttextRound, BiTextParagraph, RiImageAddLine,IoCloseCircle,FaFileInvoice, FaTrashAlt,RiChatPrivateLine,IoNotificationsOutline,MdNotificationsactive, GiHouseKeys, FaHouseUser,GiMoneyStack, GiTakeMyMoney, BiCardChecklist, RiCalendar2Line, RiHome2Line, RiInformationLine, BiCurrencyExchange, BiTrashFill);


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPqPkq2feplJ3ORiGpt3QrnLlw1dnMJNM',
  authDomain: 'mantenimiento-condominio.firebaseapp.com',
  projectId: 'mantenimiento-condominio',
  storageBucket: 'mantenimiento-condominio.firebasestorage.app',
  messagingSenderId: '496213617885',
  appId: '1:496213617885:web:60178de2de9ffbc8427f34',
}

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia().use(piniaPluginPersistedstate))
app.component('v-icon', OhVueIcon)
app.use(router)
app.use(VueViewer)
app.mount('#app')
