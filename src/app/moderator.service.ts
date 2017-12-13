import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {strictEqual} from 'assert';
import { AngularFireDatabase } from 'angularfire2/database';
import {Problem} from './problem';

@Injectable()
export class ModeratorService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  private roomId: string;

  constructor(private messageService: MessageService,
              public db: AngularFireDatabase) {
    // this.db = this.db
  }

  addToProblemQueue(problem: any, roomId: string) {
    return this.db.list(`rooms/${roomId}/problems`).push(problem);
  }

  pushProblem(obj: Problem) {
    return this.db.list('problems').push(obj);
  }

  getProblem(id: string) {
    return this.db.object(`problems/${id}`);
  }

  setRoomId(roomId: string) {
    this.roomId = roomId;
  }

  getRoomId(): string {
    return this.roomId;
  }

  getModerator(id: string) {
    return this.db.object(`moderators/${id}`);
  }

  getRoom(id: string) {
    return this.db.object(`rooms/${id}`);
  }

  enterRoom(id: string) {
    const amOnline = this.db.database.ref('/.info/connected');
    const userRef = this.db.database.ref(`/moderators/${id}/presence`);

    amOnline.on('value', function (snapshot) {
      if (snapshot.val()) {
        userRef.onDisconnect().remove();
        userRef.set(true);
      }
    });
  }

  getPlayer(id: string) {
    return this.db.object(`players/${id}`);
  }

  getRoomPlayers(id: string) {
    return this.db.list(`/roomPresence/${id}/`);
  }

  getRoomProblems(id: string) {
    return this.db.list(`rooms/${id}/problems`);
  }

  setCurrentProblem(roomId: string, problemId: string) {
    return this.db.object(`/rooms/${roomId}`).update({'onDeck': problemId});
  }
  // getRoom(): Observable<String> {
  //   this.messageService.add('ModeratorService: fetched room');
  //   return of('12345f');
  // }
}
