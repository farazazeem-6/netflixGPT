import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHbu-a1W0AUrle7NY6YrD0bXqyBN3o3kI",
  authDomain: "netflixgpt-d3b5f.firebaseapp.com",
  projectId: "netflixgpt-d3b5f",
  storageBucket: "netflixgpt-d3b5f.firebasestorage.app",
  messagingSenderId: "430271622369",
  appId: "1:430271622369:web:794320c0c83251f1141ba0",
  measurementId: "G-FRKC3DF8WT",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
