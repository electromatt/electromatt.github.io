import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService} from '../user.service';
import { initializeApp, database, auth } from 'firebase';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

  constructor(private router:Router, private user:UserService) {
  }

  ngOnInit() {
    
  }

  loginUser(e){
    e.preventDefault();
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    console.log("logging in with username:"+email+" and password:"+password+".");
    const promise = auth().signInWithEmailAndPassword(email, password);
    console.log(promise);
    promise.catch(e => console.log(e.message));
    this.user.setUserLoggedIn();
    //this.router.navigate(['dashboard']);

    
    
  }
}
