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
  }

  ngOnInit() {
  }

  saveNewModerator(name: string) {
    const moderatorRef = this.db.list('moderators');

    return moderatorRef.push({
      name: name
    });
  }

  saveNewRoom(name, mid, passcode) {
    const roomsRef = this.db.list('rooms');

    return roomsRef.push({
      name: name,
      mid: mid,
      passcode: passcode
    });
  }

  updateModerator(key, obj) {
    return this.db.list('moderators').update(key, obj);
  }

  addCodeMap(passcode, roomId) {
    return this.db.object('codeToMap').update({
        [passcode] : roomId
      }
    );
  }

  generatePasscode() {
    return Math.random().toString().slice(2, 8);
  }

  save(roomName: string, name: string) {
    return new Promise<any>(
      (resolve, reject) => {
        const passcode = this.generatePasscode();
        this.saveNewModerator(name).then(
          (val1) => this.saveNewRoom(roomName, val1.key, passcode).then(
            (val2) => {
              this.updateModerator(val1.key, {roomId: val2.key});
              this.addCodeMap(passcode, val2.key);

              resolve({key: val1.key, obj: val2});
            },
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
      (val) => this.router.navigate([`/moderator/${val.key}`]),
      (err) => console.log('has error when creating new room')
    );
  }
}
