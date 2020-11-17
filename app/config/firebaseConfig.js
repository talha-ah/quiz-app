import * as firebase from 'firebase'
import '@firebase/firestore';

const settings = {timestampsInSnapshots: true};


let firebaseConfig = {
    apiKey: "AIzaSyBtjMBwLf2CnOBr8wGwPhdXILsZdX96YeY",
    authDomain: "digitalquizsystem.firebaseapp.com",
    databaseURL: "https://digitalquizsystem.firebaseio.com",
    projectId: "digitalquizsystem",
    storageBucket: "digitalquizsystem.appspot.com",
    messagingSenderId: "657420256459",
    appId: "1:657420256459:web:eef3815695d22831d7474e",
    measurementId: "G-Z2PCK3M2P5"
  };
  //export default !firebase.apps.length
 // ? firebase.initializeApp(firebaseConfig).firestore()
 // : firebase.app().firestore;
 firebase.initializeApp(firebaseConfig);
 

 //firebase.firestore();
 
 export default firebase;

