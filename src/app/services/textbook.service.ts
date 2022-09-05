import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import GlobalConstants from '../common/global-constants';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root',
})

export default class TextBookService {
  private userId: string = '';

  private pageToMemory: string = '';

  private difficult: string = '';

  private studied: string = '';

  constructor(private http: HttpClient) { }

  public countWords$ = new Subject<number>();

  public aggregateDate$ = new Subject<Word[]>();

  public loadData$ = new Subject<Word[]>();

  public translateText$ = new Subject<boolean>();

  public getData(group: number, page: number) {
    this.http.get<Word[]>(`${GlobalConstants.urlPath}/words?group=${group}&page=${page}`)
      .subscribe((resp: Word[]) => { this.loadData$.next(resp); });
  }

  sendWord = async (wordId: string, token: string, userId: string, difficulty: string, typeReq: string = 'POST') => {
    this.difficult = difficulty;
    await fetch(`${GlobalConstants.urlPath}/users/${userId}/words/${wordId}`, {
      method: typeReq,
      body: JSON.stringify({ difficulty: this.difficult, optional: {} }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  makeWordEasy = async (wordId: string, token: string, userId: string, difficulty: string) => {
    this.difficult = difficulty;
    if (this.difficult === 'easy') {
      await fetch(`${GlobalConstants.urlPath}/users/${userId}/words/${wordId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  };

  makeWordStudied = async (wordId: string, token: string, userId: string, studied: string, typeReq: string = 'POST') => {
    this.studied = studied;
    await fetch(`${GlobalConstants.urlPath}/users/${userId}/words/${wordId}`, {
      method: typeReq,
      body: JSON.stringify({ optional: { isStudied: studied } }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  getAllUserWords = async (token: string, userId: string) => {
    this.userId = userId;
    const response = await fetch(`${GlobalConstants.urlPath}/users/${this.userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  getAggregateUserWords = async (token: string, userId: string) => {
    this.userId = userId;
    const response = await fetch(`${GlobalConstants.urlPath}/users/${this.userId}/aggregatedWords?wordsPerPage=3600&filter={"$and":[{"userWord.difficulty":"difficult"}]}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  getAggregateUserStudiedWords = async (token: string, userId: string) => {
    this.userId = userId;
    const response = await fetch(`${GlobalConstants.urlPath}/users/${this.userId}/aggregatedWords?wordsPerPage=3600&filter={"$and":[{"userWord.optional.isStudied":"studied"}]}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };

  saveLocalStorage(stage: string, page: string) {
    this.pageToMemory = `[${stage}, ${page}]`;
    localStorage.setItem('page', this.pageToMemory);
  }

  isTranslate(status: boolean) {
    this.translateText$.next(status);
  }

  getCardFromAggregate(data: Word[]) {
    this.aggregateDate$.next(data);
  }

  countUserWords(quantity: number) {
    this.countWords$.next(quantity);
  }
}
