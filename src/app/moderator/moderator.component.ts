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
  name: string;
  roomName: string;

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

  saveNewModerator(name: string) {
    const moderatorRef = this.db.list('moderators');

    return moderatorRef.push({
      name: name
    });
  }

  saveNewRoom(name, mid) {
    const roomsRef = this.db.list('rooms');

    return roomsRef.push({
      name: name,
      mid: mid,
    });
  }

  save(roomName: string, name: string) {
    return new Promise<any>(
      (resolve, reject) => {
        this.saveNewModerator(name).then(
          (val1: any) => this.saveNewRoom(roomName, val1.key).then(
            (val2) => resolve(val2),
            (err2) => reject(err2)
          ),
          (err1) => reject(err1)
        );
      }
    );
  }

  createNewRoom() {
    const promise = this.save(this.roomName, this.name);

    promise.then(
      (val) =>
        this.router.navigate([`/moderator-room/${val.key}`]),
      (err) => console.log('has error when creating new room')
    );
  }
}
