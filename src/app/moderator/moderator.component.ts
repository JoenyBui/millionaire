import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material';
import {Moderator} from '../moderator';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

// import { FirebaseObjectObservable} from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-host',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css'],
})
export class ModeratorComponent implements OnInit {
  // roomRef: AngularFireDatabase<any>;
  // room: Observable<any []>;
  db: AngularFireDatabase;

  constructor(private route: ActivatedRoute,
              private router: Router,
              db: AngularFireDatabase) {
    this.db = db;
    // this.room = db.list('room');
    // this.roomRef = db.list('room');
    // this.room = this.roomRef.valueChanges();
  }

  ngOnInit() {
  }

  save(room: string, name: string) {
    const roomsRef = this.db.list('rooms');

    return roomsRef.push({
      roomTitle: room,
      name: name
    });
  }

  createNewRoom() {
    const promise = this.save("hi", "bye");
    promise.then(
      (val) =>
        this.router.navigate([`/moderator-room/${val.key}`]),
      (err) => console.log('has error when creating new room')
    );
  }
}
