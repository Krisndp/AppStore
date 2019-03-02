
import * as firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyBQqRSXOsK0bVRfq1eeXe3B9z3JQx7jhjM",
    authDomain: "appmobile-53164.firebaseapp.com",
    databaseURL: "https://appmobile-53164.firebaseio.com",
    projectId: "appmobile-53164",
    storageBucket: "appmobile-53164.appspot.com",
    messagingSenderId: "730430086814"
  };

  export const firebaseApp = firebase.initializeApp(config);
