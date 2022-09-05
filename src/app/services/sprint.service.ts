import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import { ISprintState, IWord } from "../models/games";
import GamesConstants from "../common/games-constants";
import GlobalConstants from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export default class SprintService {
  private gameState: BehaviorSubject<ISprintState> = new BehaviorSubject(GamesConstants.initSprintState);

  difficulties: number[] = GamesConstants.difficulties;

  words: IWord[] = [];

  isTrue: boolean = true;

  results: { correct: IWord[], wrong: IWord[], skipped: IWord[] } = {
    correct: [],
    wrong: [],
    skipped: [],
  };

  getRandomValue(max: number) {
    return Math.floor(Math.random() * max);
  }

  async loadRandomWords(groupNumber: number) {
    const pageNumber = this.getRandomValue(GamesConstants.pageCount);
    const words = await fetch(`${GlobalConstants.urlPath}/words?group=${groupNumber}&page=${pageNumber}`);
    this.words = await words.json();
  }

  getRandomWord(words: IWord[], usedWords: IWord[]) {
    let randomWord = words[this.getRandomValue(words.length)];
    while (usedWords.includes(randomWord)) {
      randomWord = words[this.getRandomValue(words.length)];
    }
    return randomWord;
  }

  getRandomAnswer(words: IWord[], word: IWord) {
    let randomAnswer = words[this.getRandomValue(words.length)];
    while (randomAnswer === word) {
      randomAnswer = words[this.getRandomValue(words.length)];
    }
    return randomAnswer.wordTranslate;
  }

  getDifficulties() {
    return this.difficulties;
  }

  getGameState() {
    return this.gameState.asObservable();
  }

  nextRound() {
    const state = this.gameState.value;
    const isNextRound = state.usedWords.length < this.words.length;
    if (isNextRound) {
      const word = this.getRandomWord(this.words, state.usedWords);
      this.isTrue = Math.random() < 0.5;
      const answer = this.isTrue
        ? word.wordTranslate
        : this.getRandomAnswer(this.words, word);

      state.stage = 'level-start';
      state.usedWords.push(word);
      state.answer = answer;
    } else {
      state.stage = 'results';
    }
    this.gameState.next(state);
  }

  selectAnswer(answer: boolean) {
    const state = this.gameState.value;
    const isCorrect = this.isTrue === answer;
    if (isCorrect) {
      state.score += 10;
    }
    this.addResult(isCorrect, state.usedWords[state.usedWords.length - 1]);
    this.gameState.next(state);
  }

  interruptGame() {
    const state: ISprintState = {
      stage: 'difficulty-selection',
      usedWords: [],
      score: 0,
      answer: '',
    };
    this.gameState.next(state);
    this.results = {
      correct: [],
      wrong: [],
      skipped: [],
    };
  }

  addResult(isCorrect: boolean, word: IWord) {
    isCorrect ? this.results.correct.push(word) : this.results.wrong.push(word);
  }
}
