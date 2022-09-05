import { IAudioChallengeState, ISprintState } from '../models/games';

export default class GamesConstants {
  static difficulties = [1, 2, 3, 4, 5, 6];

  static pageCount = 30;

  static sprintDesc = {
    title: 'Sprint',
    desc: 'Choose whether the translation matches the suggested word',
  };

  static audioChallengeDesc = {
    title: 'Audio Challenge',
    desc: 'Choose from the suggested answers the correct translation of the word you hear',
  };

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
  };
}
