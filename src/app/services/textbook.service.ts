import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import GlobalConstants from '../common/global-constants';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root',
})

export default class TextBookService {
  private pageToMemory: string = '';

  private userId: string = '';

  private userToken: string = '';

  constructor(private http: HttpClient) { }

  public loadData$ = new Subject<Word[]>();

  public translateText$ = new Subject<boolean>();

  public getData(group: number, page: number) {
    this.http.get<Word[]>(`${GlobalConstants.urlPath}/words?group=${group}&page=${page}`)
      .subscribe((resp: Word[]) => { this.loadData$.next(resp); });
  }

  public sendData = async (wordId: string) => {
    const newUserWord = {
      difficulty: 'difficult',
      optional: {},
    };
    await fetch(`${GlobalConstants.urlPath}/users/${this.getUserIdFromLocalstorage()}/words/${wordId}`, {
      method: 'POST',
      body: JSON.stringify(newUserWord),
      headers: {
        Authorization: `Bearer ${this.getUserTokenFromLocalstorage()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  private getUserIdFromLocalstorage(): string {
    const local = localStorage.getItem('login') as string;
    this.userId = JSON.parse(local).userId;
    return this.userId;
  }

  private getUserTokenFromLocalstorage(): string {
    const local = localStorage.getItem('login') as string;
    this.userToken = JSON.parse(local).token;
    return this.userToken;
  }

  saveLocalStorage(stage: string, page: string) {
    this.pageToMemory = `[${stage}, ${page}]`;
    localStorage.setItem('page', this.pageToMemory);
  }

  isTranslate(status: boolean) {
    this.translateText$.next(status);
  }
}
