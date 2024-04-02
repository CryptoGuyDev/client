const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBvg_KnfZN63NNR6m4NoRcVNvpuxhFBhTw",
    authDomain: "client-work-6d1e6.firebaseapp.com",
    projectId: "client-work-6d1e6",
    storageBucket: "client-work-6d1e6.appspot.com",
    messagingSenderId: "643032989082",
    appId: "1:643032989082:web:f29c9744ce30377a7ece23",
    measurementId: "G-61H4P8JNKD"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// Function to check if email is connected to Stripe
function checkStripeSubscription(email) {
    // Simulate checking the Stripe subscription status based on the email
    // Replace this with actual Stripe API calls in your server-side code
    // For demonstration purposes, I'll simulate it with some dummy data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const dummyData = {
                email: email,
                subscriptionStatus: 'active', // Simulating active subscription
                subscriptionTier: 'Free' // Simulating free tier subscription
            };
            resolve(dummyData);
        }, 1000); // Simulating 1 second delay
    });
}

// Function to handle login and redirect based on subscription status
function handleLogin(email) {
    // Call the function to check the subscription status
    checkStripeSubscription(email)
    .then(data => {
        // Check subscription status and redirect accordingly
        if (data.subscriptionStatus === 'active') {
            if (data.subscriptionTier === 'Free') {
                window.location.href = 'https://www.livingprevention.org/free-member427850';
            } else if (data.subscriptionTier === 'Supporter') {
                window.location.href = 'https://www.livingprevention.org/supporter-dashboard867311';
            } else if (data.subscriptionTier === 'StartHealthy') {
                window.location.href = 'https://www.livingprevention.org/start-healthy-dashboard';
            } else if (data.subscriptionTier === 'Preventer') {
                window.location.href = 'https://www.livingprevention.org/preventer-member-dashboard773302';
            }
        } else {
            // Redirect to opt-in form if no subscription found
            window.location.href = 'signup.html'; // Redirect to signup form page
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Signup Function
const signUp = () => {  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            // Show confirmation message
            const confirmationMessage = document.createElement('div');
            confirmationMessage.innerHTML = `
                <p>You are signed up!</p>
                <button onclick="goToLoginPage()">Go back to login page</button>
            `;
            document.body.appendChild(confirmationMessage);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
}

// Function to navigate back to the login page
const goToLoginPage = () => {
    window.location.href = 'signin.html';
}

// Signed In Function
const signIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            // Signed in 
            document.write("You are Signed In")
            console.log(result)
            // Check subscription and redirect accordingly
            handleLogin(email);
        })
        .catch((error) => {
            // Handle sign-in errors
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                // Display error message for wrong password
                alert('Password is incorrect');
            } else if (errorCode === 'auth/user-not-found') {
                // Display error message for user not found
                alert('Email is incorrect');
            } else {
                // Handle other errors
                console.error(error);
            }
        });
}