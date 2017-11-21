import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';

import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-moderator-detail',
  templateUrl: './moderator-detail.component.html',
  styleUrls: ['./moderator-detail.component.css']
})
export class ModeratorDetailComponent implements OnInit {
  id: string;
  name: string;
  db: AngularFireDatabase;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    db: AngularFireDatabase
  ) {
    this.db = db;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.id = id;

    this.db.object(`moderators/${id}`).snapshotChanges().subscribe(action => {
      const val = action.payload.val();
      const amOnline = this.db.database.ref('/.info/connected');
      const userRef = this.db.database.ref(`/moderators/${id}/presence`);

      amOnline.on('value', function (snapshot) {
        if (snapshot.val()) {
          userRef.onDisconnect().remove();
          userRef.set(true);
        }
      });
    });
  }
}
