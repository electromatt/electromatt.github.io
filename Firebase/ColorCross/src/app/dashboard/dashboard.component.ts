import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  // itemsRef: AngularFireList<any>;
  // items: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  color: string;
  brightness: number;

  constructor(db: AngularFireDatabase, user: UserService) {
    if(user.afAuth != null){
      this.itemRef = db.object(user.userId);
      this.item = this.itemRef.valueChanges();
    } else{
      console.log('not logged in');
    }

    this.item.subscribe( item => {
      this.color = item.color,
      this.brightness = item.brightness
    });
  }
  
  save1(newColor: string): any {
    this.itemRef.update({ color: newColor });
    return true;
  }
  save2(newColor: string, hex: string) {
    this.itemRef.update({ hex: hex });
    this.itemRef.update({ color: newColor });
  }
  update(newBrightness: number) {
    this.itemRef.update({ brightness: newBrightness });
  }  
}
