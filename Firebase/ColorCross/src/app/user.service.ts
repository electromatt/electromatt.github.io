import { Injectable } from '@angular/core';
import { initializeApp, database, auth } from 'firebase';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  private isUserLoggedIn;

  userId;
  color;
  brightness;

  constructor(private router: Router, public afAuth: AngularFireAuth) {
    this.isUserLoggedIn = false;
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user != null) {
        // User is logged in, use the user object for its info.
        this.userId = user.uid;
        //this.isUserLoggedIn = true;
        // etc.
      } else {
        this.isUserLoggedIn = false;       
      }
  });
  }
  
  loginUser(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        this.isUserLoggedIn = false;       
      } else {
        //alert(errorMessage);
      }
      console.log(error);
    });
  }
  logoutUser(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  getUserInfo(){
    if(this.isUserLoggedIn)
      return this.userId;
  }
  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
  
}
