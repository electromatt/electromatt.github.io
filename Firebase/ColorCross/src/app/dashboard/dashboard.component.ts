import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
  // itemsRef: AngularFireList<any>;
  // items: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  color: string;
  brightness: number;

  constructor(db: AngularFireDatabase, user: UserService) {
    // Firebase Demo
    // this.itemsRef = db.list(user.getUserInfo());
    // this.items = this.itemsRef.snapshotChanges().map(actions => {
    //   return actions.map(a => ({ key: a.payload.key, ...a.payload.val() }));
    // });
    this.itemRef = db.object(user.getUserInfo());
    this.item = this.itemRef.valueChanges();

    this.item.subscribe( item => {
      this.color = item.color,
      this.brightness = item.brightness
    });
    
  }
  save(newColor: string) {
    this.itemRef.update({ color: newColor });
  }
  update(newBrightness: number) {
    this.itemRef.update({ brightness: newBrightness });
  }
  getColor(){
  }
  // updateItem(key: string, newText: string) {
  //   this.itemsRef.update(key, { original: newText });
  // }
}
