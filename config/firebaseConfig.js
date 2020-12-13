import * as firebase from 'firebase'
import '@firebase/firestore';

const settings = {timestampsInSnapshots: true};


const firebaseConfig = {
  apiKey: "AIzaSyDYbyEYEa3_aiw2gsyUn29xLGPT6H60KCk",
  authDomain: "dquizsystem-6b3bb.firebaseapp.com",
  databaseURL: "https://dquizsystem-6b3bb.firebaseio.com",
  projectId: "dquizsystem-6b3bb",
  storageBucket: "dquizsystem-6b3bb.appspot.com",
  messagingSenderId: "670048101063",
  appId: "1:670048101063:web:4efbac4c954721084654e2",
  measurementId: "G-DB3BJXBVXM"
};
 //export default !firebase.apps.length
 // ? firebase.initializeApp(firebaseConfig).firestore()
 // : firebase.app().firestore;
 firebase.initializeApp(firebaseConfig);
 

 //firebase.firestore();
 
 export default firebase;