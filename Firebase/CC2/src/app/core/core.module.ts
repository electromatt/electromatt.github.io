import { NgModule } from '@angular/core';

import { AuthService } from './auth.service';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  imports: [
    // AngularFireAuth,
    // AngularFireDatabase
  ],
  declarations: [AuthService],
  providers: [AuthService]
})
export class CoreModule { }
