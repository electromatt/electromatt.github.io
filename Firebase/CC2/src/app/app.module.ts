import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './core/auth.service';
//import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  { path: '', component: UserProfileComponent },
  { path: 'profile', 
    //canActivate: [AuthguardGuard],
    component: UserProfileComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),    
    AngularFireModule.initializeApp(environment.firebase),
    //CoreModule, // <-- add core module
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    AngularFireDatabase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
