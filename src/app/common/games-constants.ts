import { IGameState } from '../models/games';

export default class GamesConstants {
  static difficulties = [1, 2, 3, 4, 5, 6];

  static pageCount = 30;

  static initState: IGameState = {
    stage: 'difficulty-selection',
    usedWords: [],
    answers: [],
  };
}
