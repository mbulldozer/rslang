import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class AudioService {
  private audio: HTMLAudioElement;

  private isPlaying: boolean;

  constructor() {
    this.audio = new Audio();
    this.isPlaying = false;
  }

  play(src: string) {
    this.pause();
    this.audio = new Audio(src);
    this.audio.load();
    setTimeout(() => {
      this.audio.play();
    }, 0);
  }

  pause() {
    this.audio.pause();
  }
}
