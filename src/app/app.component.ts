import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import * as _ from  'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;
  photo: string = 'https://images.unsplash.com/photo-1465935343323-d742334bcbda?auto=format&fit=crop&w=3392&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D';

  constructor(db: AngularFirestore) {
    this.items = db.collection('items').valueChanges();
  }
}
