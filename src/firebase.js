import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
      apiKey: "AIzaSyCjWYXUBFpj-fxq9RFMXFwTAarO-qXoQh4",
      authDomain: "investmate-ef72a.firebaseapp.com",
      projectId: "investmate-ef72a",
      storageBucket: "investmate-ef72a.firebasestorage.app",
      messagingSenderId: "987791605869",
      appId: "1:987791605869:web:c9851800f69e611ef7bf64",
      measurementId: "G-2BJM0PS0TT"
    };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
