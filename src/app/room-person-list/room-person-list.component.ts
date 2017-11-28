import { Component, OnInit, Input, Output } from '@angular/core';

import { ModeratorService } from '../moderator.service';
import { Subscription } from 'rxjs/Subscription';
// import {Dictionary, List} from 'underscore';
import {Map} from 'rxjs/util/Map';

import { ChangeDetectorRef } from '@angular/core';

import { Player } from '../player';
import {Dictionary} from 'underscore';
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
  items: Observable<any[]>;

  // playersList: Dictionary<Player> = {};
  // moderateService: ModeratorService;

  constructor(private moderateService: ModeratorService, private ref: ChangeDetectorRef) {
  }

  watchChildAdd() {
    const self = this;

    this.players = this.moderateService.getRoomPlayers(this.roomId).snapshotChanges().map(changes => {
      return changes.map(c => {
        return this.moderateService.getPlayer(c.key).valueChanges();
        // return new Player(c.payload.val().name);
      }
    )};
    // this.moderateService.getRoomPlayers(this.roomId).stateChanges(['child_added']).subscribe(action => {
    //   if (action.payload.val() === true) {
    //     this.moderateService.getPlayer(action.key).valueChanges().subscribe(obj => {
    //       // const objPlayer = new Player();
    //       // objPlayer.name = obj.name;
    //       // self.players[action.key] = new Player(obj.name);
    //       return obj;
    //
    //       // self.ref.detectChanges();
    //     });
    //   }
    // });
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
    this.items = this.moderateService.getRoomPlayers(this.roomId).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    this.watchChildAdd();
    this.watchChildDelete();
  }
}

