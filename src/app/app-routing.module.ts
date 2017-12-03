import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModeratorDetailComponent} from './moderator-detail/moderator-detail.component';
import {PlayerComponent} from './player/player.component';
import {ModeratorComponent} from './moderator/moderator.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import {RoomComponent} from './room/room.component';

import { ModeratorDetailResolveService } from './moderator-detail/moderator-detail.resolve.service';
import {PlayerDetailResolveService} from './player-detail/player-detail.resolve.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'moderator-room/:id', component: ModeratorDetailComponent, resolve: {moderator: ModeratorDetailResolveService}},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'player-room/:id', component: PlayerDetailComponent, resolve: {player: PlayerDetailResolveService}},
  {path: 'room/:id', component: RoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    ModeratorDetailResolveService,
    PlayerDetailResolveService
  ]
})
export class AppRoutingModule {
}
