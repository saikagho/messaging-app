import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBWVcfeJM5UsKFM2z3eYR7EY-fRYZx0XTY",
  authDomain: "messaging-app-backend-c39d2.firebaseapp.com",
  databaseURL: "https://messaging-app-backend-c39d2.firebaseio.com",
  projectId: "messaging-app-backend-c39d2",
  storageBucket: "messaging-app-backend-c39d2.appspot.com",
  messagingSenderId: "424847355048",
  appId: "1:424847355048:web:6218fba35a65106349a69d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
