import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import GlobalConstants from '../common/global-constants';
import GamesConstants from '../common/games-constants';
import { IGameState } from '../models/games';

@Injectable({
  providedIn: 'root',
})
export default class GamesService {
  private gameState: BehaviorSubject<IGameState> = new BehaviorSubject(GamesConstants.initState);

  difficulties: number[] = GamesConstants.difficulties;

  words: any[] = [];

  results: { correct: any[], wrong: any[], skipped: any[] } = {
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

  getRandomWord(words: any[], usedWords: any[]) {
    let randomWord = words[this.getRandomValue(words.length)];
    while (usedWords.includes(randomWord)) {
      randomWord = words[this.getRandomValue(words.length)];
    }
    return randomWord;
  }

  getRandomAnswers(words: any[], word: any) {
    const answers = [{ word: word.wordTranslate, status: 'empty' }];
    for (let i = 1; i < 5; i += 1) {
      let randomAnswer = words[this.getRandomValue(words.length)];
      while (answers.some((answer) => answer.word === randomAnswer.wordTranslate)) {
        randomAnswer = words[this.getRandomValue(words.length)];
      }
      answers.push({ word: randomAnswer.wordTranslate, status: 'empty' });
    }
    return answers.sort(() => Math.random() - 0.5);
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
      const answers = this.getRandomAnswers(this.words, word);

      state.stage = 'level-start';
      state.usedWords.push(word);
      state.answers = answers;
    } else {
      state.stage = 'results';
    }
    this.gameState.next(state);
    return isNextRound;
  }

  selectAnswer(innerText: string) {
    const state = this.gameState.value;
    const correctAnswer = state.usedWords[state.usedWords.length - 1].wordTranslate;
    const isCorrect = correctAnswer === innerText;
    this.addResult(isCorrect, state.usedWords[state.usedWords.length - 1]);
    state.answers.forEach((answer) => {
      if (answer.word === innerText) {
        answer.status = answer.word === correctAnswer ? 'correct-answer' : 'wrong-answer';
      }
    });
    state.stage = 'level-end';
    this.gameState.next(state);
  }

  skipRound() {
    const state = this.gameState.value;
    this.results.skipped.push(state.usedWords[state.usedWords.length - 1]);
    state.stage = 'level-end';
    this.gameState.next(state);
  }

  interruptGame() {
    const state: IGameState = {
      stage: 'difficulty-selection',
      usedWords: [],
      answers: [],
    };
    this.gameState.next(state);
    this.results = {
      correct: [],
      wrong: [],
      skipped: [],
    };
  }

  addResult(isCorrect: boolean, word: any) {
    isCorrect ? this.results.correct.push(word) : this.results.wrong.push(word);
  }
}
