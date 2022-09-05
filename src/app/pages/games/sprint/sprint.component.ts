import {Component, OnInit, Renderer2} from '@angular/core';
import {IAnswer, IWord, Stage} from "../../../models/games";
import AudioChallengeService from "../../../services/audio-challenge.service";
import AudioService from "../../../services/audio.service";
import GamesConstants from "../../../common/games-constants";
import GlobalConstants from "../../../common/global-constants";
import SprintService from "../../../services/sprint.service";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export default class SprintComponent implements OnInit {
  stage: Stage;

  answer: string = '';

  word: IWord | undefined;

  globalListenFunc: (() => void);

  isFullScreen: boolean = false;

  constructor(
    private gamesService: SprintService,
    private audioService: AudioService,
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
  }

  getGameState() {
    this.gamesService.getGameState()
      .subscribe((state) => {
        this.stage = state.stage;
        this.answer = state.answer;
        this.word = state.usedWords[state.usedWords.length - 1];
      });
  }

  playWord() {
    const src = `${GlobalConstants.urlPath}/${this.word?.audio}`;
    this.audioService.play(src);
  }

  selectAnswer(answer: boolean) {
      this.gamesService.selectAnswer(answer);
  }

  toogleFullScreen() {
    this.isFullScreen
      ? document.exitFullscreen()
      : document.documentElement.requestFullscreen();
    this.isFullScreen = !this.isFullScreen;
  }

  onKeypress(e: any) { }
}
