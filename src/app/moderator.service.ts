import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {strictEqual} from 'assert';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ModeratorService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();
  private roomId: string;
  // db: AngularFireDatabase;
  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  constructor(private messageService: MessageService,
              private db: AngularFireDatabase) {
    // this.db = this.db
  }

  setRoomId(roomid: string) {
    this.roomId = roomid;
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

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }

  // getRoom(): Observable<String> {
  //   this.messageService.add('ModeratorService: fetched room');
  //   return of('12345f');
  // }
}
