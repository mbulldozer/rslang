import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import TextBookService from 'src/app/services/textbook.service';
import AuthService from 'src/app/services/auth.service';
import GlobalConstants from 'src/app/common/global-constants';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
})
export default class WordCardComponent implements OnInit {
  translate: boolean;

  card: Word[];

  isLogin: boolean = false;

  token: string = '';

  userId: string = '';

  audio: HTMLAudioElement = new Audio();

  server: string = GlobalConstants.urlPath;

  difficult: boolean = false;

  studied: boolean = false;

  active: any[] = [];

  protected visibility!: string;

  constructor(private readonly textBookService: TextBookService, private authService: AuthService) {
    this.translate = false;
    this.card = [];
  }

  ngOnInit(): void {
    this.textBookService.loadData$.subscribe((data) => this.drawCard(data));
    this.textBookService.aggregateDate$.subscribe((data) => this.drawDifficultCard(data));
    this.textBookService.translateText$.subscribe((status) => this.translation(status));
    this.authService.loginData$.subscribe((data) => { this.isLogin = !!data; });
  }

  protected translation(status: boolean) {
    this.translate = status;
  }

  drawCard(data: Word[]) {
    this.difficult = false;
    this.card = [...data];
    this.getDifficultWords();
    this.getStudiedtWords();
  }

  drawDifficultCard(data: Word[]) {
    this.difficult = true;
    this.card = [...data];
  }

  playAudio(source: string) {
    this.audio.src = `${GlobalConstants.urlPath}/${source}`;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  addToDifficult(wordId: string) {
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        for (let i = 0; i < this.card.length; i += 1) {
          if (this.card[i].id === wordId) {
            if (this.card[i].studied === 'visible') {
              this.textBookService.sendWord(wordId, this.token, this.userId, 'difficult', 'PUT');
              break;
            } else {
              this.textBookService.sendWord(wordId, this.token, this.userId, 'difficult', 'POST');
            }
          }
        }
      }
    });
    this.addDifficultMark(wordId);
  }

  deleteFromDifficult(wordId: string) {
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        this.textBookService.makeWordEasy(wordId, this.token, this.userId, 'easy');
        this.card.splice(this.card.findIndex((element) => element._id === wordId), 1);
      }
    });
  }

  protected addDifficultMark(wordId: string) {
    const items = [...this.card];
    this.card.forEach((el, index) => {
      if (el.id === wordId) {
        items[index].difficult = 'visible';
      }
    });
  }

  protected addStudiedMark(wordId: string) {
    const items = [...this.card];
    this.card.forEach((el, index) => {
      if (el.id === wordId) {
        items[index].studied = 'visible';
      }
    });
  }

  getDifficultWords() {
    const items = [...this.card];
    let response: any = [];
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        this.textBookService.getAggregateUserWords(this.token, this.userId)
          .then((resp) => {
            response = resp[0].paginatedResults.map((el: any[]) => el);
            response = response.map((el: any) => el._id);
            response.forEach((element: any) => {
              if (this.card.filter((el) => el.id === element)) {
                const index = this.card.findIndex((el) => el.id === element);
                if (index > -1) {
                  items[index].difficult = 'visible';
                }
              }
            });
          });
      }
    });
  }

  getStudiedtWords() {
    let count = 0;
    const items = [...this.card];
    let response: any = [];
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        this.textBookService.getAggregateUserStudiedWords(this.token, this.userId)
          .then((resp) => {
            response = resp[0].paginatedResults.map((el: any[]) => el);
            response = response.map((el: any) => el._id);
            response.forEach((element: any) => {
              if (this.card.filter((el) => el.id === element)) {
                const index = this.card.findIndex((el) => el.id === element);
                if (index > -1) {
                  items[index].studied = 'visible';
                }
              }
            });
            for (let i = 0; i < this.card.length; i += 1) {
              if (this.card[i].studied === 'visible') {
                count += 1;
              }
            }
            this.textBookService.countUserWords(count);
          });
      }
    });
  }

  studiedWord(wordId: string) {
    this.getStudiedtWords();
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        for (let i = 0; i < this.card.length; i += 1) {
          if (this.card[i].id === wordId) {
            if (this.card[i].difficult === 'visible') {
              this.textBookService.makeWordStudied(wordId, this.token, this.userId, 'studied', 'PUT');
              break;
            } else {
              this.textBookService.makeWordStudied(wordId, this.token, this.userId, 'studied', 'POST');
            }
          }
        }
      }
    });
    this.addStudiedMark(wordId);
  }
}
