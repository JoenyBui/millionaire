import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModeratorDetailComponent} from './moderator/moderator-detail.component';
import {PlayerComponent} from './player/player.component';


const routes: Routes = [
  { path: '', redirectTo: '/moderator', pathMatch: 'full' },
  {path: 'moderator', component: ModeratorDetailComponent},
  {path: 'player', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
