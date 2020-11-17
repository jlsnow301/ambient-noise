/*jshint esversion: 6 */


import React from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAglebuHHSx-5hZmFUAzXQ1Jr-4x-sVcYQ",
    authDomain: "ambient-noise-app.firebaseapp.com",
    databaseURL: "https://ambient-noise-app.firebaseio.com",
    projectId: "ambient-noise-app",
    storageBucket: "ambient-noise-app.appspot.com",
    messagingSenderId: "132685312648",
    appId: "1:132685312648:web:e6e52982dc854bf0d2653d"
  };
  // Initialize Firebase
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  








export default firebase;
