import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    // Firebase Demo
    this.itemsRef = db.list('color');
    this.items = this.itemsRef.snapshotChanges().map(actions => {
      return actions.map(a => ({ key: a.payload.key, ...a.payload.val() }));
    });
  }

  // Firebase demo functions
  addItem(newName: string) {
    this.itemsRef.push({ original: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { original: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
