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

  private difficult: string = '';

  constructor(private http: HttpClient) { }

  public loadData$ = new Subject<Word[]>();

  public translateText$ = new Subject<boolean>();

  public getData(group: number, page: number) {
    this.http.get<Word[]>(`${GlobalConstants.urlPath}/words?group=${group}&page=${page}`)
      .subscribe((resp: Word[]) => { this.loadData$.next(resp); });
  }

  sendWord = async (wordId: string, token: string, userId: string, difficulty: string) => {
    this.difficult = difficulty;
    await fetch(`${GlobalConstants.urlPath}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      body: JSON.stringify({ difficulty: this.difficult, optional: { check: 'one word' } }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  saveLocalStorage(stage: string, page: string) {
    this.pageToMemory = `[${stage}, ${page}]`;
    localStorage.setItem('page', this.pageToMemory);
  }

  isTranslate(status: boolean) {
    this.translateText$.next(status);
  }
}
