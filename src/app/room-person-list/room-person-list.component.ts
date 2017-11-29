import { Component, OnInit, Input } from '@angular/core';
import { ModeratorService } from '../moderator.service';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-room-person-list',
  templateUrl: './room-person-list.component.html',
  styleUrls: ['./room-person-list.component.css'],
  providers: [ModeratorService]
})
export class RoomPersonListComponent implements OnInit {
  @Input() roomId: string;
  public players: Observable<any[]>;
  // items: Observable<any[]>;

  constructor(private moderateService: ModeratorService) {
  }

  watchChildAdd() {
    this.players = this.moderateService.getRoomPlayers(this.roomId).snapshotChanges().map(changes => {
      return changes.map(c => {
          return this.moderateService.getPlayer(c.key).valueChanges();
          // return new Player(c.payload.val().name);
        }
      );
    });
  }

  watchChildDelete() {
    this.moderateService.getRoomPlayers(this.roomId).stateChanges(['child_added']).subscribe(action => {
      // actions.forEach(action => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val());
      // });
    });
  }

  ngOnInit() {
    // Add events
    // this.items = this.moderateService.getRoomPlayers(this.roomId).snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
    this.watchChildAdd();
    this.watchChildDelete();
  }
}

