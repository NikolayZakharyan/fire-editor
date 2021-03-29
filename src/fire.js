import firebase from 'firebase';

let firebaseConfig = {
  apiKey: 'AIzaSyCyQtjtbGmV5SQUn_sbXg1t2xJPZsfsJB8',
  authDomain: 'clousidetech.firebaseapp.com',
  databaseURL: 'https://clousidetech-default-rtdb.firebaseio.com',
  projectId: 'clousidetech',
  storageBucket: 'clousidetech.appspot.com',
  messagingSenderId: '443167101216',
  appId: '1:443167101216:web:28b64a4d727013b5a2c745',
};
// Initialize Firebase
export const fireData = firebase.initializeApp(firebaseConfig);


