import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { ModeratorService } from '../moderator.service';
import { Problem} from '../problem';
import {AngularFireDatabase} from 'angularfire2/database';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';

@Component({
  selector: 'app-problem-moderator',
  templateUrl: './problem-moderator.component.html',
  styleUrls: ['./problem-moderator.component.css'],
  providers: [ModeratorService]
})
export class ProblemModeratorComponent implements OnInit {
  @Input() moderatorId: string;
  @Input() roomId: string;
  name: string;
  @Output() nameChange = new EventEmitter();
  constructor(private db: AngularFireDatabase,
              private service: ModeratorService) { }

  ngOnInit() {
  }

  resetProblem() {}
  submit() {
    const obj = new Problem();
    obj.name = this.name;
    this.service.pushProblem(obj).then(
      (val) => {
        this.service.addToProblemQueue(
          {
            'problemId': val.key,
            'submittedAt': Date.now()
          }, this.roomId);
      },
      (err) => console.log(err)
      );
  }
}
