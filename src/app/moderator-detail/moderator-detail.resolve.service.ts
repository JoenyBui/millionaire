import { Injectable } from '@angular/core';
import {
  Router, Resolve, ActivatedRouteSnapshot, ActivatedRoute
} from '@angular/router';
// import { Promise } from 'q';
import { ModeratorService } from '../moderator.service';

import { Moderator } from '../moderator';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ModeratorDetailResolveService implements Resolve<Moderator> {
  constructor (private router: Router, private route: ActivatedRoute, private moderatorService: ModeratorService, ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const id = route.paramMap.get('id');

    return new Promise((resolve, reject) => {
      this.moderatorService.getModerator(id).snapshotChanges().subscribe(action => {
      // this.moderatorService.db.object(`moderators/${id}`).snapshotChanges().subscribe(action => {
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
