import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyA9Ouk5KjjbIupZkGrKkSGpiOT3snPx09c",
  authDomain: "twitter-app-9d570.firebaseapp.com",
  databaseURL: "https://twitter-app-9d570.firebaseio.com",
  projectId: "twitter-app-9d570",
  storageBucket: "",
  messagingSenderId: "349385788235"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db= app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  user = uid => this.db.ref(`users/${uid}`);

  authUser=()=> {
    return new Promise(function (resolve, reject) {
        app.auth().onAuthStateChanged(function(user) {
          if (user) {
             resolve(user);
          } else {
             reject('User not logged in');
          }             
       });
    });
}
  users = () => this.db.ref('users');
}

export default Firebase;