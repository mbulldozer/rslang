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

  server: string = 'https://rs-lang-project-io.herokuapp.com';

  constructor(private readonly textBookService: TextBookService, private authService: AuthService) {
    this.translate = false;
    this.card = [];
  }

  ngOnInit(): void {
    this.textBookService.loadData$.subscribe((data) => this.drawCard(data));
    this.textBookService.translateText$.subscribe((status) => this.translation(status));
    this.authService.loginData$.subscribe((data) => { this.isLogin = !!data; });
  }

  protected translation(status: boolean) {
    this.translate = status;
  }

  drawCard(data: Word[]) {
    this.card = [...data];
  }

  playAudio(source: string) {
    this.audio.src = `${GlobalConstants.urlPath}/${source}`;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  addToDifficult(wordId: string) {
    this.authService.loginData$.subscribe((value) => {
      console.log(value);
      if (value) {
        this.userId = value.userId as string;
        this.token = value.token as string;
        this.textBookService.sendWord(wordId, this.token, this.userId, 'difficult');
      }
    });
  }
}
