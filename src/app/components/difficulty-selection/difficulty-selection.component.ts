import {Component, Input, OnInit} from '@angular/core';
import AudioChallengeService from '../../services/audio-challenge.service';
import SprintService from "../../services/sprint.service";

@Component({
  selector: 'app-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss'],
})
export default class DifficultySelectionComponent implements OnInit {
  @Input() title: string | undefined

  difficulties: number[] = [];

  selectedDifficulty: string = '';

  constructor(
    private audioChallengeService: AudioChallengeService,
    private sprintService: SprintService,
  ) { }

  ngOnInit(): void {
    this.difficulties = this.title === 'sprint'
      ? this.sprintService.getDifficulties()
      : this.audioChallengeService.getDifficulties();
    this.selectedDifficulty = this.difficulties[0].toString();
  }

  async selectDifficulty() {
    if (this.title === 'sprint') {
      await this.sprintService.loadRandomWords(+this.selectedDifficulty);
      this.sprintService.nextRound();
    } else {
      await this.audioChallengeService.loadRandomWords(+this.selectedDifficulty);
      this.audioChallengeService.nextRound();
    }
  }
}
