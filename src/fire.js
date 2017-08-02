import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyC_V-bRQTDXQfbs2cT0EDIa4hk1dgkhBeU",
    authDomain: "matt-chat-74e7f.firebaseapp.com",
    databaseURL: "https://matt-chat-74e7f.firebaseio.com",
    projectId: "matt-chat-74e7f",
    storageBucket: "matt-chat-74e7f.appspot.com",
    messagingSenderId: "821503698483"
};
var fire = firebase.initializeApp(config);
export default fire;