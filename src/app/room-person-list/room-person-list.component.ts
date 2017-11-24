import { Component, OnInit, Input, Output } from '@angular/core';

import { ModeratorService } from '../moderator.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-room-person-list',
  templateUrl: './room-person-list.component.html',
  styleUrls: ['./room-person-list.component.css']
})
export class RoomPersonListComponent implements OnInit {
  @Input() roomId: string;
  constructor() { }

  ngOnInit() {
  }

  roomidChange(roomid: string) {
    console.log(roomid);
  }
}
