import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';
import {PlayerService} from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
  providers: [PlayerService]
})
export class PlayerDetailComponent implements OnInit {
  player;
  id: string;
  name: string;
  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.player = this.route.snapshot.data['player'];
    this.playerService.enterRoom(this.id, this.player.roomId);

    // this.db.object(`players/${id}`).snapshotChanges().subscribe(action => {
    //   const val = action.payload.val();
    //   const amOnline = this.db.database.ref('/.info/connected');
    //   const userRef = this.db.database.ref(`/roomPresence/${val.roomId}/${id}`);
    //
    //   this.name = val.name;
    //
    //   amOnline.on('value', function (snapshot) {
    //     if (snapshot.val()) {
    //       userRef.onDisconnect().remove();
    //       userRef.set(true);
    //     }
    //   });
    // });
  }
}
