import {IAudioChallengeState, ISprintState} from '../models/games';

export default class GamesConstants {
  static difficulties = [1, 2, 3, 4, 5, 6];

  static pageCount = 30;

  static initState: IAudioChallengeState = {
    stage: 'difficulty-selection',
    usedWords: [],
    answers: [],
  };

  static initSprintState: ISprintState = {
    stage: 'difficulty-selection',
    usedWords: [],
    answer: '',
    score: 0,
  }
}
