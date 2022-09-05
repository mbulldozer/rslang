import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  animate, state, style, transition, trigger,
} from '@angular/animations';
import { IWord, Stage } from '../../../models/games';
import AudioService from '../../../services/audio.service';
import GamesConstants from '../../../common/games-constants';
import GlobalConstants from '../../../common/global-constants';
import SprintService from '../../../services/sprint.service';
import TimerService from '../../../services/timer.service';

@Component({
  selector: 'app-sprint',
  animations: [
    trigger('status', [
      state('default', style({
        boxShadow: 'rgba(0, 130, 163, 0.35) 0 3px 8px',
      })),
      state('mistake', style({
        boxShadow: 'rgba(255, 0, 0, 0.44) 0 5px 10px',
      })),
      state('correct', style({
        boxShadow: 'rgba(0, 255, 0, 0.44) 0 5px 10px',
      })),
      transition('default <=> correct', [
        animate('0.5s'),
      ]),
      transition('default <=> mistake', [
        animate('0.5s'),
      ]),
      transition('correct <=> mistake', [
        animate('0.5s'),
      ]),
    ]),
  ],
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss'],
})
export default class SprintComponent implements OnInit {
  stage: Stage;

  answer: string = '';

  score: number = 0;

  word: IWord | undefined;

  globalListenFunc: (() => void);

  isFullScreen: boolean = false;

  timer: number = 60;

  status: string = 'default';

  constructor(
    private gamesService: SprintService,
    private audioService: AudioService,
    private timerService: TimerService,
    private renderer: Renderer2,
  ) {
    this.stage = GamesConstants.initState.stage;
    this.globalListenFunc = () => {
    };
  }

  ngOnInit() {
    this.getGameState();
    this.globalListenFunc = this.renderer.listen('document', 'keyup', (e) => {
      e.preventDefault();
      this.onKeypress(e);
    });
  }

  ngOnDestroy() {
    this.audioService.pause();
    this.gamesService.interruptGame();
    this.globalListenFunc();
    this.timerService.stopTimer();
  }

  getGameState() {
    this.gamesService.getGameState()
      .subscribe((state) => {
        this.stage = state.stage;
        this.answer = state.answer;
        this.word = state.usedWords[state.usedWords.length - 1];
        this.score = state.score;
      });
    this.timerService.getTimer()
      .subscribe((timer) => {
        this.timer = timer;
        if (this.timer === 0) {
          this.gamesService.finishGame();
        }
      });
  }

  playWord() {
    const src = `${GlobalConstants.urlPath}/${this.word?.audio}`;
    this.audioService.play(src);
  }

  selectAnswer(answer: boolean) {
    this.status = this.gamesService.selectAnswer(answer) ? 'correct' : 'mistake';
    console.log(this.status);
  }

  toogleFullScreen() {
    this.isFullScreen
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
    this.isFullScreen = !this.isFullScreen;
  }

  onKeypress(e: any) { }

  animationDone() {
    console.log(1);
    this.status = 'default';
  }
}
