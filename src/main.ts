import './assets/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPqPkq2feplJ3ORiGpt3QrnLlw1dnMJNM",
  authDomain: "mantenimiento-condominio.firebaseapp.com",
  projectId: "mantenimiento-condominio",
  storageBucket: "mantenimiento-condominio.firebasestorage.app",
  messagingSenderId: "496213617885",
  appId: "1:496213617885:web:60178de2de9ffbc8427f34"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
