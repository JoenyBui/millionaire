import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {environment} from '../environments/environment';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatMenuModule,
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSliderModule
} from "@angular/material";
import {MatListModule, MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';
import {MatInputModule} from '@angular/material';

import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ModeratorDetailComponent} from './moderator-detail/moderator-detail.component';
import {PlayerComponent} from './player/player.component';
import {ModeratorComponent} from './moderator/moderator.component';
import {FormsModule} from '@angular/forms';
import {GameService} from './game.service';
import {ModeratorService} from './moderator.service';
import {PlayerService} from './player.service';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PlayerDetailComponent} from './player-detail/player-detail.component';
import { RoomComponent } from './room/room.component';
import { ProblemModeratorComponent } from './problem-moderator/problem-moderator.component';
import { ProblemPlayerComponent } from './problem-player/problem-player.component';
import { RoomPersonListComponent } from './room-person-list/room-person-list.component';
import { RoomProblemListComponent } from './room-problem-list/room-problem-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';

import { MapToIterablePipe } from './pipe/map-to-iterable';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ModeratorComponent,
    ModeratorDetailComponent,
    LandingPageComponent,
    PlayerDetailComponent,
    RoomComponent,
    ProblemModeratorComponent,
    ProblemPlayerComponent,
    RoomPersonListComponent,
    RoomProblemListComponent,
    MessagesComponent,
    MapToIterablePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatListModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatSliderModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [GameService, ModeratorService, PlayerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
