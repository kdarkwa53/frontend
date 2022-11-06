// import { initializeApp } from "firebase/app";
// import { getMessaging, isSupported, getToken, onMessage } from "firebase/messaging";


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };


// initializeApp(firebaseConfig);

// const messaging = isSupported? getMessaging(): null

// // const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null



// export const requestForToken = () => {
//     return getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY })
//         .then((currentToken) => {
//             if (currentToken) {
//                 console.log('current token for client: ', currentToken);
//                 // Perform any other neccessary action with the token
//             } else {
//                 // Show permission request UI
//                 console.log('No registration token available. Request permission to generate one.');
//             }
//         })
//         .catch((err) => {
//             console.log('An error occurred while retrieving token. ', err);
//         });
// };

// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             console.log("payload", payload)
//             resolve(payload);
//         });
//     });