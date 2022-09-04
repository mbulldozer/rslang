import { Component, OnInit, Renderer2 } from '@angular/core';

import GamesConstants from '../../../common/games-constants';
import GlobalConstants from '../../../common/global-constants';

import AudioChallengeService from '../../../services/audio-challenge.service';
import AudioService from '../../../services/audio.service';

import { Stage } from '../../../models/games';

@Component({
  selector: 'app-audio-challenge',
  templateUrl: './audio-challenge.component.html',
  styleUrls: ['./audio-challenge.component.scss'],
})
export default class AudioChallengeComponent implements OnInit {
  stage: Stage;

  answers: any[];

  word: any;

  globalListenFunc: (() => void);

  isFullScreen: boolean = false;

  progress: number = 0;

  constructor(
    private gamesService: AudioChallengeService,
    private audioService: AudioService,
    private renderer: Renderer2,
  ) {
    this.stage = GamesConstants.initState.stage;
    this.answers = GamesConstants.initState.answers;
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
  }

  getGameState() {
    this.gamesService.getGameState()
      .subscribe((state) => {
        this.stage = state.stage;
        this.answers = state.answers;
        this.word = state.usedWords.length ? state.usedWords[state.usedWords.length - 1] : null;
        this.progress = (100 * state.usedWords.length) / this.gamesService.words.length;
        this.autoPlayWord();
      });
  }

  nextRound() {
    if (this.stage === 'level-end') {
      if (this.gamesService.nextRound()) {
        this.playWord();
      } else {
        this.audioService.pause();
      }
    } else {
      this.gamesService.skipRound();
    }
  }

  playWord() {
    const src = `${GlobalConstants.urlPath}/${this.word.audio}`;
    this.audioService.play(src);
  }

  playMeaning() {
    const src = `${GlobalConstants.urlPath}/${this.word.audioMeaning}`;
    this.audioService.play(src);
  }

  autoPlayWord() {
    if (this.stage === 'level-start') {
      this.playWord();
    }
  }

  selectAnswer(answer: string) {
    if (this.stage === 'level-start') {
      this.gamesService.selectAnswer(answer);
    }
  }

  getImageSrc() {
    return `${GlobalConstants.urlPath}/${this.word.image}`;
  }

  toogleFullScreen() {
    this.isFullScreen
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
    this.isFullScreen = !this.isFullScreen;
  }

  onKeypress(e: KeyboardEvent) {
    if (this.stage === 'level-start' || this.stage === 'level-end') {
      switch (e.code) {
        case 'Space':
          this.nextRound();
          break;
        case 'Digit1':
          this.selectAnswer(this.answers[0].word);
          break;
        case 'Digit2':
          this.selectAnswer(this.answers[1].word);
          break;
        case 'Digit3':
          this.selectAnswer(this.answers[2].word);
          break;
        case 'Digit4':
          this.selectAnswer(this.answers[3].word);
          break;
        case 'Digit5':
          this.selectAnswer(this.answers[4].word);
          break;
        default:
          break;
      }
    }
  }
}
