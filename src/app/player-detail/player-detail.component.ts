import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  id: string;
  db: AngularFireDatabase;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    db: AngularFireDatabase
  ) {
    this.db = db;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    this.db.object(`players/${id}`).snapshotChanges().subscribe(action => {
      const val = action.payload.val();
      const amOnline = this.db.database.ref('/.info/connected');
      const userRef = this.db.database.ref(`/roomPresence/${val.roomid}/${id}`);

      amOnline.on('value', function (snapshot) {
        if (snapshot.val()) {
          userRef.onDisconnect().remove();
          userRef.set(true);
        }
      });
    });
  }
}
