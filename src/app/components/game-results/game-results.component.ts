import {Component, Input, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import AudioChallengeService from '../../services/audio-challenge.service';
import AudioService from '../../services/audio.service';
import GlobalConstants from '../../common/global-constants';
import SprintService from "../../services/sprint.service";

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss'],
})
export default class GameResultsComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() score: string | undefined;

  correctAnswers: any[] = [];

  wrongAnswers: any[] = [];

  skippedAnswers: any[] = [];

  spinnerValue: number = 0;

  color: ThemePalette = 'warn';

  mode: ProgressSpinnerMode = 'determinate';

  scoreResults: string = '';

  constructor(
    private audioChallengeService: AudioChallengeService,
    private sprintService: SprintService,
    private audioService: AudioService,
  ) { }

  ngOnInit(): void {
    const results = this.title === 'sprint' ? this.sprintService.results : this.audioChallengeService.results;
    const { correct, wrong, skipped } = results;
    this.correctAnswers = correct;
    this.wrongAnswers = wrong;
    this.skippedAnswers = skipped;
    this.spinnerValue = +((100 * correct.length) / (correct.length + wrong.length)).toFixed(1) || 0;
    this.scoreResults = this.score ? ` - ${this.score}` : '';
  }

  playWord(audio: string) {
    const src = `${GlobalConstants.urlPath}/${audio}`;
    this.audioService.play(src);
  }
}
