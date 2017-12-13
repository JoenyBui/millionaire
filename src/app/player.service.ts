import { Injectable } from '@angular/core';
import {AngularFireDatabase, snapshotChanges} from 'angularfire2/database';

@Injectable()
export class PlayerService {
  constructor(private db: AngularFireDatabase) { }

  getPlayer(id: string) {
    return this.db.object(`players/${id}`);
  }

  getRoomOnDeck(id: string) {
    return this.db.database.ref(`rooms/${id}/onDeck`);
  }

  getProblem(roomId: string, problemId: string) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.db.object(`/rooms/${roomId}/problems/${problemId}`).snapshotChanges().subscribe(action => {
        const obj = action.payload.val();

        if (obj) {
          resolve(self.db.object(`problems/${obj.problemId}`));
        } else {
          reject('Problem not found!');
        }
      });
    });
  }

  submitAnswer(roomId: string, problemId: string, playerId: string, answer: any) {
    const self = this;

    return this.db.database.ref(`/rooms/${roomId}/problems/${problemId}/answers/${playerId}`).set({
      answer: answer,
      updatedAt: Date.now()
    });
  }

  enterRoom(id: string, roomId: string) {
    const amOnline = this.db.database.ref('/.info/connected');
    // const userRef = this.db.database.ref(`/moderators/${id}/presence`);
    const userRef = this.db.database.ref(`/roomPresence/${roomId}/${id}`);

    amOnline.on('value', function (snapshot) {
      if (snapshot.val()) {
        userRef.onDisconnect().remove();
        userRef.set(true);
      }
    });
  }
}
