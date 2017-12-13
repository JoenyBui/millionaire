import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {AngularFireDatabase} from 'angularfire2/database';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  // db: AngularFireDatabase;
  name: string;
  passcode: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private db: AngularFireDatabase) {
    // this.db = db;
  }


  ngOnInit() {
  }

  saveNewPlayer(name: string, roomId: string) {
    const playerRef = this.db.list('players');

    return playerRef.push({
      name: name,
      roomId: roomId
    });
  }

  findGameRoom() {
    const passcode = this.passcode;

    return new Promise<any>(
      (resolve, reject) => {

        this.db.object(`codeToMap`).snapshotChanges().subscribe(action => {
          // TODO: This is bad code - we should just be querying the database and see if this passcode exists.
          const codeToMap = action.payload.val();

          if (passcode in codeToMap) {
            resolve({roomId: codeToMap[passcode]});
          } else {
            reject('Passcode does not exists');
          }
        });
      }
    );
  }

  joinGameRoom() {
    const playerName = this.name;
    this.findGameRoom().then((val) => {
        const roomId = val.roomId;
        this.saveNewPlayer(playerName, roomId).then((val1) => {
          this.router.navigate([`/player/${val1.key}`]);
        }, (err1) => {
          console.log(err1);
        });
      },
      (err) => {
        console.log(err);
      });
  }


}
