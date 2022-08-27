import { Component } from '@angular/core';

@Component({
  selector: 'app-textbook',
  templateUrl: './textbook.component.html',
  styleUrls: ['./textbook.component.scss'],
})

export default class TextbookComponent {
  public auth: boolean;

  private hello: string;

  constructor() {
    this.auth = false;
    this.hello = 'hi';
  }

  protected levelA1() {
    console.log(this.hello);
  }

  levelA2() {
    console.log(this.hello);
  }

  levelB1() {
    console.log(this.hello);
  }

  levelB2() {
    console.log(this.hello);
  }

  levelC1() {
    console.log(this.hello);
  }

  levelC2() {
    console.log(this.hello);
  }

  diffWords() {
    console.log(this.hello);
  }

  // ngOnInit(): void {
  // }
}
