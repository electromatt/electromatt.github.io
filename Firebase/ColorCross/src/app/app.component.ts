import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { initializeApp, database, auth } from 'firebase';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(){
    firebase.initializeApp(environment.firebase)
  }

}
