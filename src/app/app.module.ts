import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import RoutingModule from './routing/routing.module';
import MaterialModule from './material/material.module';

import AppComponent from './app.component';
import HomeComponent from './pages/home/home.component';
import HeaderComponent from './components/header/header.component';
import SidenavListComponent from './components/sidenav-list/sidenav-list.component';
import PopUpComponent from './components/pop-up/pop-up.component';
import AuthComponent from './components/auth/auth.component';
import AuthService from './services/auth.service';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import FeaturesComponent from './components/features/features.component';
import FooterComponent from './components/footer/footer.component';
import AudioChallengeComponent from './pages/games/audio-challenge/audio-challenge.component';
import AudioChallengeService from './services/audio-challenge.service';
import DifficultySelectionComponent from './components/difficulty-selection/difficulty-selection.component';
import GameResultsComponent from './components/game-results/game-results.component';
import TimerService from './services/timer.service';
import GamesComponent from './pages/games/games.component';
import SprintComponent from "./pages/games/sprint/sprint.component";
import SprintService from "./services/sprint.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    PopUpComponent,
    AuthComponent,
    PreLoaderComponent,
    FeaturesComponent,
    FooterComponent,
    AudioChallengeComponent,
    DifficultySelectionComponent,
    GameResultsComponent,
    GamesComponent,
    SprintComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, AudioChallengeService, SprintService, TimerService],
  bootstrap: [AppComponent],
})
export default class AppModule { }
