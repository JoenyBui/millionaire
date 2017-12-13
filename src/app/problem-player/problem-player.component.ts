import { Component, OnInit, Input } from '@angular/core';
import {PlayerService} from '../player.service';
import {AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-problem-player',
  templateUrl: './problem-player.component.html',
  styleUrls: ['./problem-player.component.css']
})
export class ProblemPlayerComponent implements OnInit {
  @Input() playerId: string;
  @Input() roomId: string;
  @Input() onDeckId: string;
  public currentProblem: Array<any>;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.watchOnDeck(this.roomId);
  }

  onAnswer(snapshot) {
    this.playerService.submitAnswer(this.roomId, this.onDeckId, this.playerId, snapshot);
  }

  watchOnDeck(roomId) {
    const self = this;
    this.playerService.getRoomOnDeck(roomId).on('value', function (snapshot) {
      if (snapshot.val()) {
        self.onDeckId = snapshot.val();

        self.playerService.getProblem(self.roomId, self.onDeckId).then(
          (obj: AngularFireObject<any>) => {
            obj.snapshotChanges().subscribe(action => {
              const problemVal = action.payload.val();

              self.currentProblem = problemVal.items;
              console.log(problemVal);
            });
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        self.onDeckId = null;
        console.log('We are out');
      }
    });
  }
}
