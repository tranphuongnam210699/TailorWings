import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import dotenv from "dotenv";

dotenv.config();

const {
    REACT_APP_FIREBASE_API_KEY: apiKey,
    REACT_APP_FIREBASE_AUTH_DOMAIN: authDomain,
    REACT_APP_FIREBASE_DATABASE_URL: databaseURL,
    REACT_APP_FIREBASE_PROJECT_ID: projectId,
    REACT_APP_FIREBASE_STORAGE_BUCKET: storageBucket,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: messagingSenderId,
    REACT_APP_FIREBASE_APP_ID: appId,
    REACT_APP_FIREBASE_MEASUREMENT_ID: measurementId,
} = process.env;

var config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
};

// var config = {
//     apiKey: "AIzaSyDwkJjqZjDPYkisuhH65Uj-OMs5QZjFGpY",
//     authDomain: "tailorwings-2019-fd8a1.firebaseapp.com",
//     databaseURL: "https://tailorwings-2019-fd8a1.firebaseio.com",
//     projectId: "tailorwings-2019-fd8a1",
//     storageBucket: "tailorwings-2019-fd8a1.appspot.com",
//     messagingSenderId: "427131276338",
//     appId: "1:427131276338:web:a530611bc4df11b2c7402b",
//     measurementId: "G-CRLB32Y2J3",
// };

firebase.initializeApp(config);
export const database = firebase.firestore();
export const storage = firebase.storage();
export default { database, storage };
