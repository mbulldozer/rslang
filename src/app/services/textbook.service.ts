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

  constructor(private http: HttpClient) { }

  public loadData$ = new Subject<Word[]>();

  public translateText$ = new Subject<boolean>();

  public getData(group: number, page: number) {
    // this.http.get<Word[]>(`${GlobalConstants.urlPath}/words?group=${group}&page=${page}`)
    this.http.get<Word[]>(`http://localhost:27017/words?group=${group}&page=${page}`)
      .subscribe((resp: Word[]) => { this.loadData$.next(resp); });
  }

  saveLocalStorage(stage: string, page: string) {
    this.pageToMemory = `[${stage}, ${page}]`;
    localStorage.setItem('page', this.pageToMemory);
  }

  isTranslate(status: boolean) {
    this.translateText$.next(status);
  }
}
