import Cookies from "js-cookie";
import { initializeApp } from "firebase/app";
import {  getToken } from "firebase/messaging";

export const REACT_APP_CUSTOMER_SERVICE_API_URL =
  process.env.REACT_APP_CUSTOMER_SERVICE_API_URL;
export const REACT_APP_UPLOAD_SERVICE_API_URL =
  process.env.REACT_APP_UPLOAD_SERVICE_API_URL;

export const REACT_APP_BASE_API_URL =
  process.env.REACT_APP_BASE_API_URL

export const REACT_APP_URL = process.env.REACT_APP_URL

export const REACT_APP_ASSETS_API_URL = process.env.REACT_APP_ASSETS_API_URL

export const REACT_APP_GOOGLE_API_URL = process.env.REACT_APP_GOOGLE_API_URL
export const REACT_APP_BUSINESS_SERVICE_API_URL =
  process.env.REACT_APP_BUSINESS_SERVICE_API_URL;
export const REACT_APP_COOKIE_DOMAIN =
  process.env.REACT_APP_COOKIE_DOMAIN;
export const NODE_ENV = process.env.NODE_ENV;


export const REACT_APP_FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
export const REACT_APP_FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
export const REACT_APP_FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
export const REACT_APP_FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
export const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
export const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
export const REACT_APP_FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCzIetgLgTPpz_vErGNRd63XpqUrioeCsA",
//   authDomain: "javolin-f0c3b.firebaseapp.com",
//   projectId: "javolin-f0c3b",
//   storageBucket: "javolin-f0c3b.appspot.com",
//   messagingSenderId: "19403684769",
//   appId: "1:19403684769:web:4fd90b63339648373d29e0",
//   measurementId: "G-7RDX95JESC"
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


export const firebase = initializeApp(firebaseConfig);

const accessToken = Cookies.get("javAccessToken");
export const urlEcodedConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Credentials': 'true'
    // withCredentials: true,
  },
};

export const authHeader = {
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
}

export const authFileHeader = {
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Accept": "application/json",
    "Content-Type": "multipart/form-data",
    'Access-Control-Allow-Credentials': 'true'
  },
}

export const standardHeader = {
  Authorization: `Bearer ${accessToken}`,
};

export const removeCookies = (accountType) => {
  try {
    if (accountType === "business") {
      Cookies.remove("javAccessToken"
      );
      Cookies.remove("javBusiness"
      );
    } else {
      console.log("Cookies removed")
      Cookies.remove("javAccessToken"
      );
      Cookies.remove("javCustomer"
      );
    }

  } catch (e) {
  }
};

export const getUserType=()=>{
  // return Cookies.get('userType')
  return 'business'
}
export const accounts = {
  customer: {
    baseURL: REACT_APP_CUSTOMER_SERVICE_API_URL,
    homeLink: "/",
    tokenName: "javAccessToken",
    userCookieName: "javBusiness"
  },
  business: {
    baseURL: REACT_APP_BUSINESS_SERVICE_API_URL,
    homeLink: "/business/dashboard",
    tokenName: "javBuzAccessToken",
    userCookieName: "javBusiness"
  },
}
export const user = Cookies.get("javCustomer");



export const formatNumber = (num) => {
  num = num.replace(/\s/g, '')
  num = num.replaceAll("-", '')
  return num
}


export const getFirebaseToken = ()=>{
  // const messaging = getMessaging();
  const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null


  getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_MESSAGING_KEY }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken)
      return currentToken
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}