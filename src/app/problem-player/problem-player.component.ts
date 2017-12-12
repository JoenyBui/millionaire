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
  @Input() roomId: string;
  @Input() onDeckId: string;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.watchOnDeck(this.roomId);
  }

  onAnswer(snapshot) {
    console.log(snapshot);
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
