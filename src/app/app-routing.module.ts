import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ModeratorDetailComponent} from './moderator-detail/moderator-detail.component';
import {PlayerComponent} from './player/player.component';
import {ModeratorComponent} from './moderator/moderator.component';
import {LandingPageComponent} from './landing-page/landing-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'moderator-detail', component: ModeratorDetailComponent},
  {path: 'moderator', component: ModeratorComponent},
  {path: 'player', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
