import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private user: UserService) {
  }

  ngOnInit() {

  }

  loginUser(e) {
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;
    this.user.loginUser(email, password);
    if (this.user.getUserLoggedIn()) {
      this.router.navigate(['dashboard']);
    }else{
      
    }

  }
}
