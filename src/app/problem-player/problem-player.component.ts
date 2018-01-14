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
  allotedTime: number;
  answer: string;
  ticks = 0;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    // const timer = Observable.timer(2000, 1000);
    // timer.subscribe(this.countDown);
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
              self.allotedTime = problemVal.allotedTime;
              self.answer = problemVal.answer;

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
