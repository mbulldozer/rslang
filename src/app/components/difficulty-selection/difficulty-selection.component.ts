import {Component, Input, OnInit} from '@angular/core';
import AudioChallengeService from '../../services/audio-challenge.service';
import SprintService from "../../services/sprint.service";
import GamesConstants from "../../common/games-constants";

@Component({
  selector: 'app-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss'],
})
export default class DifficultySelectionComponent implements OnInit {
  @Input() title: string | undefined;

  difficulties: number[] = [];

  selectedDifficulty: string = '';

  gameTitle: string = '';

  gameDesc: string = '';

  constructor(
    private audioChallengeService: AudioChallengeService,
    private sprintService: SprintService,
  ) { }

  ngOnInit(): void {
    if (this.title === 'sprint') {
      this.difficulties = this.sprintService.getDifficulties();
      this.gameTitle = GamesConstants.sprintDesc.title;
      this.gameDesc = GamesConstants.sprintDesc.desc;
    } else {
      this.difficulties = this.audioChallengeService.getDifficulties();
      this.gameTitle = GamesConstants.audioChallengeDesc.title;
      this.gameDesc = GamesConstants.audioChallengeDesc.desc;
    }
    this.selectedDifficulty = this.difficulties[0].toString();
  }

  async selectDifficulty() {
    if (this.title === 'sprint') {
      await this.sprintService.loadRandomWords(+this.selectedDifficulty);
      this.sprintService.startGame();
    } else {
      await this.audioChallengeService.loadRandomWords(+this.selectedDifficulty);
      this.audioChallengeService.nextRound();
    }
  }
}
