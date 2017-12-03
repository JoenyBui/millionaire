import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {Player} from '../player';
import {PlayerService} from '../player.service';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class PlayerDetailResolveService implements Resolve<Player> {
  constructor(private router: Router, private playerService: PlayerService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const id = route.paramMap.get('id');

    return new Promise((resolve, reject) => {
      this.playerService.getPlayer(id).snapshotChanges().subscribe(action => {
        const val = action.payload.val();
        if (val) {
          resolve(val);
        } else {
          //  id not found
          this.router.navigate(['/']);
          reject('I reject this route.');
        }
      });
    });
  }
}
