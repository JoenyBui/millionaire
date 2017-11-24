import 'rxjs/add/operator/switchMap';
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Location} from '@angular/common';

import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

import { ProblemModeratorComponent } from '../problem-moderator/problem-moderator.component';
import { Problem } from '../problem';

import { RoomPersonListComponent } from '../room-person-list/room-person-list.component';
import {RoomProblemListComponent} from '../room-problem-list/room-problem-list.component';

import { ModeratorService } from '../moderator.service';

@Component({
  selector: 'app-moderator-detail',
  templateUrl: './moderator-detail.component.html',
  styleUrls: ['./moderator-detail.component.css'],
  providers: [ModeratorService]
})
export class ModeratorDetailComponent implements OnInit {
  id: string;
  name: string;
  roomid: string;
  playerList: Observable<any[]>;

  @Output() roomidChange = new EventEmitter<string>();
  problemId: string;

  db: AngularFireDatabase;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    db: AngularFireDatabase,
    moderatorService: ModeratorService
  ) {
    this.db = db;

    moderatorService.missionConfirmed$.subscribe(

    )
  }

  syncPlayers(): void {
    this.playerList = this.db.list(`/roomPresence/${this.roomid}/`).snapshotChanges();
    // this.db.list(`/roomPresence/${this.roomid}/`, function(snapshot) {
    //   this.playerItem =
    // });
  }

  addNewProblem(): void {
    const obj = new Problem();
    obj.mid = this.id;

    this.db.list('/problems').push(obj).then(
      (val) => this.problemId = val.key,
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.id = id;

    this.db.object(`moderators/${id}`).snapshotChanges().subscribe(action => {
      const val = action.payload.val();
      const amOnline = this.db.database.ref('/.info/connected');
      const userRef = this.db.database.ref(`/moderators/${id}/presence`);

      this.name = val.name;
      this.roomid = val.roomid;

      this.roomidChange.emit(this.roomid);

      this.syncPlayers();

      amOnline.on('value', function (snapshot) {
        if (snapshot.val()) {
          userRef.onDisconnect().remove();
          userRef.set(true);
        }
      });
    });
  }
}
