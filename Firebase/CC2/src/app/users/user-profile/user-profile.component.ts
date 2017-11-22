import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [AngularFireAuth]
  
})
export class UserProfileComponent {

  constructor(public auth: AuthService) { }

  

}
