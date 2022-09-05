import { Component, OnInit } from '@angular/core';
import TextBookService from 'src/app/services/textbook.service';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
})

export default class TextbookComponent implements OnInit {
  isLogin: boolean = false;

  cardActive: number = 0;

  page: number = 1;

  translated: boolean = false;

  token: string = '';

  userId: string = '';

  count: number = 0;

  constructor(private readonly textBookService: TextBookService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.loginData$.subscribe((data) => { this.isLogin = !!data; });
    this.textBookService.countWords$.subscribe((data) => this.changeColor(data));
    this.afterReloadInit();
  }

  changeColor(count: number) {
    this.count = count;
  }

  protected afterReloadInit() {
    if (localStorage.getItem('page') as string !== null) {
      const [card, page] = JSON.parse(localStorage.getItem('page') as string);
      if (card !== 6) {
        this.textBookService.getData(card, page);
      } else { this.drawDifficultWords(); }
      this.cardActive = card + 1;
      this.page = page + 1;
    }
  }

  protected chooseChapter(chapter: number) {
    this.page = 1;
    this.cardActive = chapter + 1;
    this.textBookService.getData(chapter, 0);
    this.textBookService.saveLocalStorage(`${this.cardActive - 1}`, '0');
  }

  paginationLeft() {
    if (this.page !== 1) {
      this.page -= 1;
      this.textBookService.getData(this.cardActive - 1, this.page - 1);
      this.textBookService.saveLocalStorage(`${this.cardActive - 1}`, `${this.page - 1}`);
    }
  }

  paginationRight() {
    if (this.page !== 30) {
      this.page += 1;
      this.textBookService.getData(this.cardActive - 1, this.page - 1);
      this.textBookService.saveLocalStorage(`${this.cardActive - 1}`, `${this.page - 1}`);
    }
  }

  translate() {
    if (this.translated === true) {
      this.translated = false;
      this.textBookService.isTranslate(false);
    } else {
      this.translated = true;
      this.textBookService.isTranslate(true);
    }
  }

  drawDifficultWords() {
    this.authService.loginData$.subscribe((value) => {
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        this.textBookService.getAggregateUserWords(this.token, this.userId)
          .then((resp) => this.textBookService.getCardFromAggregate(resp[0].paginatedResults));
      }
    });
  }
}
