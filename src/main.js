import { createApp } from "vue";
import { createPinia } from "pinia";
import { getFirestore } from "firebase/firestore";

import App from "./App.vue";
import router from "./router";
import "@mdi/font/css/materialdesignicons.css";
import "./assets/main.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ2YpyRpvpBCnTkYkroUDbK7DPueQ_vSg",
  authDomain: "lab8firebase-24535.firebaseapp.com",
  projectId: "lab8firebase-24535",
  storageBucket: "lab8firebase-24535.appspot.com",
  messagingSenderId: "752351892595",
  appId: "1:752351892595:web:dc31a51c9c8f8a1c12c606",
};
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

// Initialize Firebase
const initfriebase = initializeApp(firebaseConfig);
export const db = getFirestore(initfriebase);
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
