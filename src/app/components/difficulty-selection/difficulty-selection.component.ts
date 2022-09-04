import { Component } from '@angular/core';
import AudioChallengeService from '../../services/audio-challenge.service';

@Component({
  selector: 'app-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss'],
})
export default class DifficultySelectionComponent {
  difficulties: number[];

  selectedDifficulty: string;

  constructor(private gamesService: AudioChallengeService) {
    this.difficulties = gamesService.getDifficulties();
    this.selectedDifficulty = this.difficulties[0].toString();
  }

  async selectDifficulty() {
    await this.gamesService.loadRandomWords(+this.selectedDifficulty);
    this.gamesService.nextRound();
  }
}
