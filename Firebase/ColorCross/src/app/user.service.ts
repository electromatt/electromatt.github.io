import { Injectable } from '@angular/core';
import { initializeApp, database, auth } from 'firebase';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';

@Injectable()
export class UserService {

  private isUserLoggedIn;

  userId;
  color;
  brightness;

  constructor() {
    this.isUserLoggedIn = false;
  }
  loginUser(email,password){
    const promise = auth().signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    this.isUserLoggedIn = true;
    this.userId = this.getUserInfo();
  }

  getUserInfo(){
    return firebase.auth().currentUser.uid;
  }
  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }
  
}
