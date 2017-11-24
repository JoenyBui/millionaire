import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-room-problem-list',
  templateUrl: './room-problem-list.component.html',
  styleUrls: ['./room-problem-list.component.css']
})
export class RoomProblemListComponent implements OnInit {
  @Input() roomId: string;
  constructor() { }

  ngOnInit() {
  }

  roomidChange(roomid: string) {
    console.log(roomid);
  }

}
