import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export default class PopUpComponent {
  @Output() hidePopUp = new EventEmitter();

  close() {
    this.hidePopUp.emit();
  }
}
