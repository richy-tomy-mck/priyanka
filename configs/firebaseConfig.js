import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth/react-native";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAmucJY1lH5DQS18pzSlbuOPwqz9zQNvh0",
    authDomain: "priyanka-e575e.firebaseapp.com",
    projectId: "priyanka-e575e",
    storageBucket: "priyanka-e575e.appspot.com",
    messagingSenderId: "509817686422",
    appId: "1:509817686422:web:4b19e07a24bc91575ab5b7",
    measurementId: "G-WECLR87L7V"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
