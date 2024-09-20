// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js"; // Fixed import

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
const db = getFirestore(); 

// Getting input elements
var firstName = document.getElementById('fname');
var lastName = document.getElementById('lname');
var cnic = document.getElementById('cnic');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');

window.SignUp = () => {
    let obj = {
        fname: firstName.value,
        lname: lastName.value,
        cnic: cnic.value,
        email: emailInput.value,
        password: passwordInput.value,
    };
    
    
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('User signed up:', user);
            let id = user.uid; // User ID

            // Create a reference to the "User" collection
            const ref = collection(db, "User");
            
            // Add the user object to Firestore
            await addDoc(ref, { ...obj, uid: id }) // Ensure to include uid
                .then(() => {
                    console.log("User data added to Firestore");
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error signing up:', errorCode, errorMessage);
        });
}
