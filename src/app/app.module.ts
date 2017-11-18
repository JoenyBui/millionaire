import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatMenuModule, MatCardModule, MatIconModule, MatButtonModule, MatToolbarModule, MatCheckboxModule} from "@angular/material";
import {MatListModule, MatFormFieldModule, MatOptionModule, MatSelectModule } from "@angular/material";

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { ModeratorDetailComponent} from './moderator/moderator-detail.component';
import { PlayerComponent } from './player/player.component';
import { ModeratorComponent } from './moderator/moderator.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    ModeratorComponent,
    ModeratorDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
