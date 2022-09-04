import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import HomeComponent from '../pages/home/home.component';
import AudioChallengeComponent from '../pages/games/audio-challenge/audio-challenge.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
