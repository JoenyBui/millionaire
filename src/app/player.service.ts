import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class PlayerService {
  constructor(private db: AngularFireDatabase) { }

  getPlayer(id: string) {
    return this.db.object(`players/${id}`);
  }

  getRoomOnDeck(id: string) {
    return this.db.database.ref(`rooms/${id}/onDeck`);
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
