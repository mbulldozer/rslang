import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import HomeComponent from '../pages/home/home.component';
import TextbookComponent from '../pages/textbook/textbook.component';
import GamesComponent from '../pages/games/games.component';
import AudioChallengeComponent from '../pages/games/audio-challenge/audio-challenge.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'textbook', component: TextbookComponent },
  { path: '', redirectTo: '/textbook', pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'games/audio-challenge', component: AudioChallengeComponent },
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
