import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { ModeratorService } from '../moderator.service';
import { Problem} from '../problem';
import {AngularFireDatabase} from 'angularfire2/database';
import {serialize} from '@angular/compiler/src/i18n/serializers/xml_helper';
import {HttpClient, HttpParams} from '@angular/common/http';

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
              private service: ModeratorService,
              private http: HttpClient) { }

  ngOnInit() {
  }

  resetProblem() {}
  submit() {
    const roomId = this.roomId;
    const obj = new Problem();
    obj.name = this.name;
    this.service.pushProblem(obj).then(
      (val) => {
        this.service.addToProblemQueue(
          {
            'problemId': val.key,
            'submittedAt': Date.now()
          }, roomId).then(
            (val1) => this.service.setCurrentProblem(roomId, val1.key).then((val2) => {
              const body = {timeStep: 10, roomId: roomId};
              this.http.post(
                'https://us-central1-millionaire-447b3.cloudfunctions.net/timer',
                body, {
                params: new HttpParams().set('timeStep', '1').set('roomId', roomId)
              }
            ).subscribe(
                (data) => console.log(data),
                (err3) => console.log(err3)
              );
            }),
          (err) => console.log(err)
        );
      },
      (err) => console.log(err)
      );
  }
}
