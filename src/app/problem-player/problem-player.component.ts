import { Component, OnInit, Input } from '@angular/core';
import {PlayerService} from '../player.service';

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
    this.watchOnDeck(this.roomId)
  }

  watchOnDeck(roomId) {
    const self = this
    this.playerService.getRoomOnDeck(roomId).on('value', function(snapshot) {
      if (snapshot.val()) {
        self.onDeckId = snapshot.val();
        console.log('We are in');
      } else {
        self.onDeckId = null;
        console.log('We are out');
      }
    })
  }
}
