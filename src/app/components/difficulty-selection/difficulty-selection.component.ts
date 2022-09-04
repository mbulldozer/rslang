import { Component } from '@angular/core';
import GamesService from "../../services/games.service";

@Component({
  selector: 'app-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss']
})
export default class DifficultySelectionComponent {
  difficulties: number[];
  selectedDifficulty: string;

  constructor(private gamesService: GamesService) {
    this.difficulties = gamesService.getDifficulties();
    this.selectedDifficulty = this.difficulties[0].toString();
  }

  async selectDifficulty() {
    await this.gamesService.loadRandomWords(+this.selectedDifficulty);
    this.gamesService.nextRound();
  }
}
