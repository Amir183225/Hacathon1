// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5qvhiSuzqwUe9tMFCUI24_bKk8ZtyTFU",
    authDomain: "hacathon-bb1f6.firebaseapp.com",
    projectId: "hacathon-bb1f6",
    storageBucket: "hacathon-bb1f6.appspot.com",
    messagingSenderId: "826204314435",
    appId: "1:826204314435:web:1687622c0eee74b958adf6",
    measurementId: "G-RL1PXQP2F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// Prevent form auto-refresh
function submitform(event) {
    event.preventDefault();
    signIn();
}



window.signIn = () => {
    // Getting input element
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');

    let obj = {
        email: emailInput.value,
        password: passwordInput.value,

    };
    
    // Log the object
    console.log(obj);
    
    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed in:', user);

        // Redirect to another page after successful login
        window.location.href = '/dashboard/dashboard.html'; // Change this to your desired URL
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing in:', errorCode, errorMessage);
    });
}