import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
    apiKey: "AIzaSyDdg_tGXRGKEEqlViksU7PB8M_3QxfOUK4",
    authDomain: "sistema-3d167.firebaseapp.com",
    projectId: "sistema-3d167",
    storageBucket: "sistema-3d167.appspot.com",
    messagingSenderId: "649529056511",
    appId: "1:649529056511:web:ad9341395431f66c8f00ca",
    measurementId: "G-0JQSKBBNQ3"
  };
  
if(firebase.app.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;