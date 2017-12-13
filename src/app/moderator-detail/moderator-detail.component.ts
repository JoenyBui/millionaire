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
import {Room} from '../room';

@Component({
  selector: 'app-moderator-detail',
  templateUrl: './moderator-detail.component.html',
  styleUrls: ['./moderator-detail.component.css'],
  providers: [ModeratorService]
})
export class ModeratorDetailComponent implements OnInit {
  moderator;
  id: string;
  name: string;
  room: Observable<Room>|null = null;
  playerList: Observable<any[]>;

  @Output() roomIdChange = new EventEmitter<string>();
  problemId: string;

  db: AngularFireDatabase;
  moderatorService: ModeratorService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    db: AngularFireDatabase,
    moderatorService: ModeratorService
  ) {
    this.db = db;
    this.moderatorService = moderatorService;
    // moderatorService.missionConfirmed$.subscribe(
    //
    // )
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
    const self = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.moderator = this.route.snapshot.data['moderator'];
    this.moderatorService.enterRoom(this.id);

    this.moderatorService.getRoom(this.moderator.roomId).snapshotChanges().subscribe(snapshot => {
      if (snapshot.payload.val()) {
        self.room = snapshot.payload.val();
      }
      else {
        console.log('Could not get the passcode.');
      }
    });
  }
}
