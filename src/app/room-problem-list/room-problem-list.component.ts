import { Component, OnInit, Input, Output } from '@angular/core';

import { ModeratorService } from '../moderator.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-room-problem-list',
  templateUrl: './room-problem-list.component.html',
  styleUrls: ['./room-problem-list.component.css'],
  providers: [ModeratorService]
})
export class RoomProblemListComponent implements OnInit {
  @Input() roomId: string;
  public problems: Observable<any[];
  constructor(private moderateService: ModeratorService) { }

  ngOnInit() {
    this.watchProblems();
  }

  watchProblems() {
    this.problems = this.moderateService.getRoomProblems(this.roomId).snapshotChanges().map(changes => {
      return changes.map(c => {
        return {key: c.key, val: c.payload.val()};
      });
    });
  }
}
