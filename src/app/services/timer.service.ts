import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class TimerService {
  private timer: BehaviorSubject<number> = new BehaviorSubject(0);

  time: number = 60;

  interval: number | undefined;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time -= 1;
      } else {
        this.time = 0;
      }
      this.timer.next(this.time);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.time = 60;
    this.timer.next(60);
  }

  getTimer() {
    return this.timer.asObservable();
  }
}
