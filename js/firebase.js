import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyBuBTFmQxhglCyLWV5bC7OHEIYGqSZZnEE",

  authDomain: "kac-orders.firebaseapp.com",

  projectId: "kac-orders",

  storageBucket: "kac-orders.firebasestorage.app",

  messagingSenderId: "735008354300",

  appId: "1:735008354300:web:8c9053313b2b385a5f8c79"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };