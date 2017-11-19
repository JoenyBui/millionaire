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
  roomRef: AngularFireObject<any>;
  room: Observable<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              db: AngularFireDatabase) {
    this.roomRef = db.object('room');
    this.room = this.roomRef.valueChanges();
  }

  ngOnInit() {
  }

  save(room: string, name: string) {
    return this.roomRef.set({
      roomTitle: room,
      name: name
    });
  }

  createNewRoom() {
    const promise = this.save("hi", "bye")
    promise.then(_ =>
      this.router.navigate(['/moderator-room/1'])
    ).catch(err => console.log(err, 'You do not have access'));
  }
}
