import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import HomeComponent from '../pages/home/home.component';
import TextbookComponent from '../pages/textbook/textbook.component';
import GamesComponent from '../pages/games/games.component';
import AudioChallengeComponent from '../pages/games/audio-challenge/audio-challenge.component';
import SprintComponent from "../pages/games/sprint/sprint.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'textbook', component: TextbookComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/audio-challenge', component: AudioChallengeComponent },
  { path: 'games/sprint', component: SprintComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export default class RoutingModule { }
