import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDXFJ6vGHzksPNwkhb-dVp8q_TnKXQ3ozk",
  authDomain: "discord-clone-2b191.firebaseapp.com",
  projectId: "discord-clone-2b191",
  storageBucket: "discord-clone-2b191.appspot.com",
  messagingSenderId: "931285338462",
  appId: "1:931285338462:web:4420a813c1fb71f2b027cf",
  measurementId: "G-2S82T0GB4H",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
