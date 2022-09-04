import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class TimerService {
  private timer: BehaviorSubject<number> = new BehaviorSubject(0);

  time: number = 0;

  interval: number | undefined;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time < 30) {
        this.time += 0.1;
      } else {
        this.time = 30;
      }
      this.timer.next(this.time / 0.3);
    }, 100);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time = 0;
    this.timer.next(0);
  }

  getTimer() {
    return this.timer.asObservable();
  }
}
