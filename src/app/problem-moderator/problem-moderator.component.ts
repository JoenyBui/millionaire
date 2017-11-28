import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { ModeratorService } from '../moderator.service';
import { Problem} from '../problem';

@Component({
  selector: 'app-problem-moderator',
  templateUrl: './problem-moderator.component.html',
  styleUrls: ['./problem-moderator.component.css'],
  providers: [ModeratorService]
})
export class ProblemModeratorComponent implements OnInit {
  @Input() problemId: string;
  @Output() problemIdChange = new EventEmitter();
  username: string;
  @Output() usernameChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  update() {
    console.log(this.problemId);
    this.usernameChange.emit(this.username);
  }
}
