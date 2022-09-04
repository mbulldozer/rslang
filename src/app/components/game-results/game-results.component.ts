import { Component } from '@angular/core';
import GamesService from "../../services/games.service";
import AudioService from "../../services/audio.service";
import GlobalConstants from "../../common/global-constants";
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export default class GameResultsComponent {
  correctAnswers: any[];
  wrongAnswers: any[];
  spinnerValue: number;
  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'determinate';
  skippedAnswers: any[];

  constructor(
    private gamesService: GamesService,
    private audioService: AudioService,
    ) {
    const { correct, wrong, skipped } = this.gamesService.results;
    this.correctAnswers = correct;
    this.wrongAnswers = wrong;
    this.skippedAnswers = skipped;
    this.spinnerValue = +(100 * correct.length / (correct.length + wrong.length)).toFixed(1) || 0;
  }

  playWord(audio: string) {
    const src = `${GlobalConstants.urlPath}/${audio}`;
    this.audioService.play(src);
  }
}
