// ISI DENGAN PROJECT FIREBASE MILIK TEMEN-TEMEN SENDIRI
const firebaseConfig = {
  apiKey: "AIzaSyDvmpo-Cgp-Zyk-6-zvYlPl2-jXtE4zz4w",
  authDomain: "chat-app-2-c02e1.firebaseapp.com",
  projectId: "chat-app-2-c02e1",
  storageBucket: "chat-app-2-c02e1.appspot.com",
  messagingSenderId: "322611403927",
  appId: "1:322611403927:web:ad731dd6e62fea1d089dd2"
};
// BIAR GA KELAMAAN PAS MAU PANGGIL NANTI
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const rdb = firebase.database();
const stg = firebase.storage();