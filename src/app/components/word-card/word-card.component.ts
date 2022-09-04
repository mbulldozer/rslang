import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import TextBookService from 'src/app/services/textbook.service';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
})
export default class WordCardComponent implements OnInit {
  translate: boolean;

  card: Word[];

  isLogin: boolean = false;

  audio: HTMLAudioElement = new Audio();

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
    this.audio.src = `http://localhost:27017/${source}`;
    this.audio.currentTime = 0;
    this.audio.play();
  }
}
